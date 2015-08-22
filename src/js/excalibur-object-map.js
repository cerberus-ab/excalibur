/**
 * @module Модуль формирования карты объектов
 *
 */
!function() {

    var _object = E.Object;

    /**
     * Приватный метод рекурскивного создания объекта карты
     * @this   {Map} экземпляр карты
     * @param  {object} node целевой объект
     * @return {object} объект карты
     */
    function create(node) {
        var self = this,
            /** @type {array} все собственные свойства объекта */
            ps = _object.getOwnProperties(node),
            map = {
                /** @type {array} функции и методы узла */
                functions: [],
                /** @type {array} свойства узла */
                properties: [],
                /** @type {Object} вложенные объекты узла */
                objects: {}
            };
        ps.forEach(function(property) {
            switch (typeof node[property]) {
                case "function":
                    map.functions.push(property);
                    break;
                case "object":
                    map.objects[property] = create.call(self, node[property]);
                    break;
                default:
                    map.properties.push(property);
                    break;
            }
        });
        return map;
    }

    /**
     * Привантные метод формирования пути к элементу карты
     * @this   {Map} экземпляр карты
     * @param  {string} path текущий путь
     * @param  {string} name название объекта
     * @return {string} новый путь
     */
    function pathto(path, name) {
        return path ? path + "." + name : name;
    }

    /**
     * Приватный метод получения глубины пути
     * @this   {Map} экземпляр карты
     * @param  {string} path текущий путь
     * @return {number:integer} глубина пути
     */
    function getdeep(path) {
        return path !== null ? path.split(".").length : 0;
    }

    /**
     * Приватный метод получения имени узла по пути
     * @this   {Map} экземпляр карты
     * @param  {string} path текущий путь
     * @return {string} имя узла как часть пути
     */
    function getname(path) {
        return path !== null ? path.split(".").pop() : null;
    }

    /**
     * Функция рекурсивного обхода
     * @this   {Map} экземпляр карты
     * @param  {string} path текущий путь
     * @param  {object} node текущий объект
     * @param  {function} callback функция обратного вызова
     */
    function order(path, node, callback) {
        // вызов колбэка
        callback.call(this, path, node);
        // обход вложенных объектов
        for (var property in node.objects) {
            if (node.objects.hasOwnProperty(property)) {
                // вызов функции обхода
                order.call(this,
                    pathto.call(this, path, property),
                    node.objects[property],
                    callback
                );
            }
        }
    }

    /**
     * Карта объекта
     * @class
     * @param  {object} obj целевой объект
     */
    _object.Map = function(obj) {
        this._map = create.call(this, obj);
    };

    /**
     * Обход карты объекта
     * @param  {function} callback функция обратного вызова
     * @return {Map} экземпляр карты
     */
    _object.Map.prototype.traverse = function(callback) {
        order.call(this, null, this._map, callback);
        return this;
    };

    /**
     * Вернуть объект карты как он есть
     * @return {object} объект карты
     */
    _object.Map.prototype.show = function() {
        return this._map;
    };

    /**
     * Получить статистику по объекту
     * @return {object} статистика
     */
    _object.Map.prototype.statistics = function() {
        var statistics = {
            functions: 0,
            properties: 0
        };
        this.traverse(function(path, node) {
            statistics.functions += node.functions.length;
            statistics.properties += node.properties.length;
        });
        return statistics;
    };

    /**
     * Получить строковое представление карты
     * @deprecated
     * @return {string} карта строкой
     */
    _object.Map.prototype.toString = function() {
        var self = this,
            str = "";
        this.traverse(function(path, node) {
            var deep = getdeep.call(self, path);
            // объект как узел
            str += " " + new Array(deep + 1).join("-") + "> "
                + getname.call(self, path) + "\n";
            // свойства объекта
            node.properties.forEach(function(property) {
                str += new Array(deep + 5).join(" ") + property + "\n";
            });
            // функции и методы объекта
            node.functions.forEach(function(property) {
                str += new Array(deep + 5).join(" ") + property + "\n";
            });
        });
        return str;
    };

}();
