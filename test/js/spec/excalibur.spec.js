describe("Excalibur Core", function() {

    describe("Инициализация библиотеки", function() {

        it("определена глобально как 'Excalibur'", function() {
            assert.isDefined(window.Excalibur);
        });

        it("имеет глобальный короткий синоним как 'E'", function() {
            assert.isDefined(window.E);
            assert.strictEqual(window.E, window.Excalibur);
        });

    });

});
