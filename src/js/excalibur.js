!function() {

    window.E = window.Excalibur = {};

    /**
     * Методы работы с объектами ===============================================
     *
     */
    E.Object = {};

    /**
     * Наложить свойства одного объекта на другой
     * @param  {object} dst целевой объект
     * @param  {object} src накладываемый объект
     * @param  {boolean} deep глубокое наложение
     * @return {object} результирующий целевой объект
     */
    E.Object.extend = function(dst, src, deep) {
        for (var property in src) {
            if (deep && src[property] && src[property].constructor === Object) {
                dst[property] = dst[property] || {};
                Object.extend(dst[property], src[property]);
            } else {
                dst[property] = src[property];
            }
        }
        return dst;
    };

    /**
     * Методы работы с функциями ===============================================
     *
     */
    E.Function = {};

    /**
     * Получить название функции
     * @param  {function} func целевая функция
     * @return {string} название функции
     */
    E.Function.getName = function(func) {
        if (typeof func !== "function") {
            throw new TypeError(func + " is not a function");
        }
        return func.toString().match(/function ([^(]*)\(/)[1] || "anonymous";
    };

    /**
     * Функция с запоминанием числа вызовов
     * @class
     * @param {function} func целевая функция
     */
    E.Function.Counter = function(func) {
        var count = 0;
        // выполнить функцию
        this.run = function() {
            count++;
            return func.apply(this, arguments);
        };
        // получить количество вызовов этой функции
        this.count = function() {
            return count;
        }
    };

    /**
     * Методы работы с массивами ===============================================
     *
     */
    E.Array = {};

    /**
     * Поменять местами элементы массива
     * @param  {Array} array целевой массив
     * @param  {integer} i первый индекс
     * @param  {itneger} j второй индекс
     * @return {Array} целевой массив
     */
    E.Array.swap = function(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    };

    /**
     * Математические функции ==================================================
     *
     */
    E.Math = {};

    /**
     * Получить случайной целое в диапазоне
     * @param  {integer} range1 левая граница
     * @param  {integer} range2 правая граница
     * @return {integer} случайное целое
     */
    E.Math.getRandomInt = function(range1, range2) {
        var min = range1 -0,
            max = range2 -0;
        if (arguments.length == 1) {
            max = min;
            min = 0;
        }
        if (isNaN(min) || isNaN(max)) {
            throw new RangeError("Invalid range");
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * Работа с классами =======================================================
     *
     */
    E.Class = {};

    /**
     * Наследование
     * @param  {function} Child дочерний класс
     * @param  {function} Parent родительский класс
     */
    E.Class.extend = function(Child, Parent) {
        Child.prototype = Object.create(Parent.prototype);
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;
    };

}();
