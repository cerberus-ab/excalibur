/**
 * Расширение строковых проверок для клиентских форм
 *
 */
!function(E) {

    var _string = E.String,
        _object = E.Object;

    /**
     * Проверки строки на валидный логин:
     *   латиница, цифры, дефис и подчеркивание;
     *   строка должна начинаться с буквы
     *
     * @function
     * @name E.String.test.isLogin
     * @param {string} str Целевая строка
     * @param {object} options Настройки проверки
     * @returns {boolean}
     */
    _string.test.isLogin = function(str, options) {
        options = _object.extend({
            /** @property {number:integer} Минимальная длина строки */
            min: 3,
            /** @property {number:integer} Максимальная длина строки */
            max: 15
        }, options);

        return _string.regTest(str, '^[a-z][a-z0-9_-]{'
                + (options.min - 1) + ','
                + options.max + '}$',
            'i');
    };

    /**
     * Проверка строки на валидный пароль:
     *   латиница, цифры, дефис и подчеркивание,
     *   восклицательный и вопросительный знаки, собака
     *
     * @function
     * @name E.String.test.isPassword
     * @param {string} str Целевая строка
     * @param {object} options Настройки проверки
     * @returns {boolean}
     */
    _string.test.isPassword = function(str, options) {
        options = _object.extend({
            /** @property {number:integer} Минимальная длина строки */
            min: 6,
            /** @property {number:integer} Максимальная длина строки */
            max: 40
        }, options);

        return _string.regTest(str, '^[a-z0-9_\!\?\@-]{'
                + options.min + ','
                + options.max + '}$',
            'i');
    };

    /**
     * Проверка строки на доменное имя
     * @param  {string} str целевая строка
     * @return {boolean} true/false
     */
    _string.test.isURL = function(str) {
        return _string.regTest(str, "^(http|https|ftp)://([a-z0-9][a-z0-9_-]*(?:.[a-z0-9][A-Z0-9_-]*)+):?(d+)?/?", "i");
    };

    /**
     * Проверка строки на email
     * @deprecated
     * @param  {string} str целевая строка
     * @return {boolean} true/false
     */
    _string.test.isEmail = function(str) {
        return _string.regTest(str, "^.+@.+\..+$", "i");
    };

    /**
     * Проверка строки на телефонный номер
     * @deprecated
     * @param  {string} str целевая строка
     * @return {boolean} true/false
     */
    _string.test.isPhoneNumber = function(str) {
        return _string.regTest(str, "^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$");
    };

}(Excalibur);
