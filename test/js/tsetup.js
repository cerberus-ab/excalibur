// настройки окружения
var assert = chai.assert;
mocha.setup("bdd");

/**
 * Дополнительный функционал тестового окружения ===============================
 *
 */

var Test = {};

Test.setString = function(array) {
    return array.map(function(current) {
        if (current === undefined) return "undefined";
        if (current === null) return "null";
        if (typeof current.toString !== "function") return "object";
        return current.toString();
    }).join(", ");
};

/**
 * Расширение assert'а =========================================================
 *
 */

/**
 * Проверка наличия собственного метода у класса или объекта
 * @param  {object|function} target целевой объект или функция-конструктор класса
 * @param  {string} method требуемый метод
 * @param  {string} msg сообщение (Optional)
 */
assert.ownMethod = function(target, method, msg) {
    // определить целевой объект
    target = typeof target === "function" ? target.prototype : target;
    // выполнить проверку
    assert.isTrue(target.hasOwnProperty(method)
        && typeof target[method] === "function",
            msg || "expected to have an own method '" + method + "'");
};

/**
 * Проверка наличия собственного свойства у объекта
 * @param  {object} obj целевой объект
 * @param  {string} prop требуемое свойство
 * @param  {string} msg сообщение (Optional)
 */
assert.ownProperty = function(obj, prop, msg) {
    assert.isTrue(obj.hasOwnProperty(prop),
        msg || "expected to have an own property '" + prop + "'");
};

/**
 * Проверка наследования дочернего класса от родительского
 * @deprecated
 * @param  {function} child дочерний класс
 * @param  {function} parent родительский класс
 * @param  {string} msg сообщение (Optional)
 */
assert.isExtends = function(child, parent, msg) {
    assert.strictEqual(child.superclass, parent.prototype,
        msg || "expected class extending");
};
