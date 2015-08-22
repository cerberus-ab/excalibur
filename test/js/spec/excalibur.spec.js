describe("Excalibur Core", function() {

    describe("Инициализация библиотеки", function() {

        var basic_parts = ["Object", "Function", "Array", "Math", "String", "Class", "Performance"];

        it("определена глобально как 'Excalibur'", function() {
            assert.isDefined(window.Excalibur);
        });

        it("имеет глобальный короткий синоним как 'E'", function() {
            assert.isDefined(window.E);
            assert.strictEqual(window.E, window.Excalibur);
        });

        it("имеет следующие базовые разделы: " + basic_parts.join(", "), function() {
            basic_parts.forEach(function(part) {
                assert.ownProperty(Excalibur, part);
            });
        });

        describe("E.Math", function() {

            var _math = E.Math;

            describe("isInteger", function() {

                var isint = [-10, 0, 1, 20],
                    isnotint = [2.5, "some string", undefined, null, NaN, Infinity];

                it("является целым: " + Test.setString(isint), function() {
                    isint.forEach(function(current) {
                        assert.isTrue(_math.isInteger(current),
                            "expected " + current + " to be an integer number");
                    });
                });

                it("не является целым: " + Test.setString(isnotint), function() {
                    isnotint.forEach(function(current) {
                        assert.isFalse(_math.isInteger(current),
                            "expected " + current + " to be not an integer number");
                    });
                });

            });

            describe("isPrime", function() {

                var isprime = [3, 13, 23, 101],
                    isnotprime = [-5, 0, 1, 6, 16, 128, 4.23];

                it("является простым: " + Test.setString(isprime), function() {
                    isprime.forEach(function(current) {
                        assert.isTrue(_math.isPrime(current),
                            "expected " + current + " to be a prime number");
                    });
                });

                it("не является простым: " + Test.setString(isnotprime), function() {
                    isnotprime.forEach(function(current) {
                        assert.isFalse(_math.isPrime(current),
                            "expected " + current + " to be not a prime number");
                    });
                });

            });

            describe("isPerfect", function() {

                var isperf = [6, 28],
                    isnotperf = [4,8,64,100];

                it("является совершенным: " + Test.setString(isperf), function() {
                    isperf.forEach(function(current) {
                        assert.isTrue(_math.isPerfect(current),
                            "expected " + current + " to be a perfect number");
                    });
                });

                it("не является совершенным: " + Test.setString(isnotperf), function() {
                    isnotperf.forEach(function(current) {
                        assert.isFalse(_math.isPerfect(current),
                            "expected " + current + " to be not a perfect number");
                    });
                });

            });

            describe("getCombinationNumber", function() {

                it("количество сочетаний 2 по 6 равно 15", function() {
                    assert.equal(_math.getCombinationNumber(2, 6), 15);
                })

            });

            describe("getCombination", function() {

                it("все сочетания 4 по 6 в числовом виде", function() {
                    var expected = [15,23,27,29,30,39,43,45,46,51,53,54,57,58,60];
                    assert.equal(_math.getCombination(4,6).toString(), expected.toString());
                });

                it("все сочетания 2 по 6 в бинарном виде", function() {
                    var expected = [
                        "110000",
                        "101000",
                        "100100",
                        "100010",
                        "100001",
                        "011000",
                        "010100",
                        "010010",
                        "010001",
                        "001100",
                        "001010",
                        "001001",
                        "000110",
                        "000101",
                        "000011"
                    ];
                    assert.equal(_math.getCombination(2,6,"bin").toString(), expected.toString());
                });

                it("все сочетания 3 по 6 числовыми наборами", function() {
                    var expected = [
                        [0,1,2],
                        [0,1,3],
                        [0,1,4],
                        [0,1,5],
                        [0,2,3],
                        [0,2,4],
                        [0,2,5],
                        [0,3,4],
                        [0,3,5],
                        [0,4,5],
                        [1,2,3],
                        [1,2,4],
                        [1,2,5],
                        [1,3,4],
                        [1,3,5],
                        [1,4,5],
                        [2,3,4],
                        [2,3,5],
                        [2,4,5],
                        [3,4,5]
                    ];
                    assert.equal(_math.getCombination(3,6,"set").toString(), expected.toString());
                });

            });

        });

    });

});
