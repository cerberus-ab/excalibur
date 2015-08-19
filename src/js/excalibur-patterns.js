/**
 * Примеры реализации шаблонов проектирования:
 * порождающие, структурные, поведенческие
 *
 */
!function(E) {

    /** @type {object} инициализация модуля */
    var _patterns = E.Patterns = {};

    /**
     * Порождающие шаблоны проектирования ======================================
     *
     */

    /**
     * @class Одиночка
     * @example
     * @description Класс, который может иметь только один экземпляр.
     */
    _patterns.Singleton = (function() {
        var instance = null;
        return function SingltonConstructor() {
            if (instance) {
                return instance;
            }
            if (this && this.constructor === SingltonConstructor) {
                instance = this;
                // constructor body
            }
            else {
                return new SingltonConstructor();
            }
        }
     })();

    /**
     * Поведенческие шаблоны проектирования ====================================
     *
     */

    /**
     * @class Наблюдатель
     * @description Определяет зависимость между объектами таким образом,
     * что при изменении состояния одного объекта будут оповещены все зависящие от него.
     */
    _patterns.Observer = function() {
        /** @type {object} топики */
        var topics = {};
        /**
         * Подписка на топик
         * @param  {string} name название топика
         * @param  {function} listener подписчик
         * @return {object} управление подпиской (remove)
         */
        this.subscribe = function(name, listener) {
            // если топик не существует, то создать его
            if (!topics[name]) {
                topics[name] = { queue: [] };
            }
            // добавить подписчика и запомнить его индекс
            var index = topics[name].queue.push(listener) -1;
            // вернуть управление подпиской
            return {
                /**
                 * Удаление подписки
                 */
                remove: function() {
                    delete topics[name].queue[index];
                }
            };
        };
        /**
         * Публикация топика
         * @param  {string} name название топика
         */
        this.publish = function(name) {
            var self = this;
            // если топик не существует или не имеет подписчиков, то вернуть
            if (!topics[name] || !topics[name].queue.length) return;
            // получить аргументы вызова подписчиков
            var args = Array.prototype.slice.call(arguments, 1);
            // уведомить каждого подписчика
            topics[name].queue.forEach(function(listener) {
                listener.apply(self, args);
            });
        };
    };

}(Excalibur);
