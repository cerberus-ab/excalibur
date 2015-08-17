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
        this._topics = {};
    };
    /**
     * Подписка на топик
     * @param  {string} topic название топика
     * @param  {function} listener подписчик
     * @return {object} управление подпиской (remove)
     */
    _patterns.Observer.prototype.subscribe = function(topic, listener) {
        var self = this;
        // если топик не существует, то создать его
        if (!self._topics[topic]) {
            self._topics[topic] = { queue: [] };
        }
        // добавить подписчика и запомнить его индекс
        var index = self._topics[topic].queue.push(listener) -1;
        // вернуть управление подпиской
        return {
            /**
             * Удаление подписки
             */
            remove: function() {
                delete self._topics[topic].queue[index];
            }
        };
    };
    /**
     * Публикация топика
     * @param  {string} topic название топика
     */
    _patterns.Observer.prototype.publish = function(topic) {
        var self = this;
        // если топик не существует или не имеет подписчиков, то вернуть
        if (!self._topics[topic] || !self._topics[topic].queue.length) return;
        // получить подписчиков этого топика
        var listeners = self._topics[topic].queue;
        // получить аргументы вызова подписчиков
        var args = Array.prototype.slice.call(arguments, 1);
        // уведомить каждого подписчика
        listeners.forEach(function(listener) {
            listener.apply(self, args);
        });
    };

}(Excalibur);
