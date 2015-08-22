describe("Module: Patterns", function() {

    describe("Инициализация модуля", function() {

        it("определен как раздел 'E.Patterns'", function() {
            assert.isDefined(E.Patterns);
        });

    });

    describe("Порождающие шаблоны", function() {

        describe("Singleton (example)", function() {

            var Singleton = E.Patterns.Singleton,
                sing = null;

            it("создание экземпляра через вызов функции", function() {
                sing = Singleton();
            });

            it("попытка создать второй экземпляр уже через конструктор", function() {
                var sing2 = new Singleton;
                assert.strictEqual(sing, sing2);
            });

        });

    });

    describe("Структурные шаблоны", function() {

    });

    describe("Поведенческие шаблоны", function() {

        describe("Observer", function() {

            var Observer = E.Patterns.Observer,
                obs,
                own_methods = ["subscribe", "publish"],
                subscribe_methods = ["remove"];

            it("класс наблюдателя определен", function() {
                assert.isFunction(Observer);
            });

            it("собственные методы: " + own_methods.join(", "), function() {
                own_methods.forEach(function(method) {
                    assert.ownMethod(Observer, method);
                });
            });

            it("подписка возвращает интерфейс управления: " + subscribe_methods.join(", "), function() {
                obs = new Observer;
                var sub = obs.subscribe("test", function() { /* do somethink */ });
                subscribe_methods.forEach(function(method) {
                    assert.ownMethod(sub, method);
                });
            });

        });

    });

});
