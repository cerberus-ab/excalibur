/**
 * Расширение строковых проверок для клиентских форм
 *
 */
!function(E) {

    var _string = E.String;

    /**
     * Проверка строки на логин:
     *   3-16 символов,
     *   латиница, цифры, дефис и подчеркивание,
     *   строка должна начинаться с буквы
     *
     * @param  {string} str целевая строка
     * @return {boolean} true/false
     */
    _string.test.isLogin = function(str) {
        return _string.regTest(str, "^[a-z][a-z0-9_-]{2,15}$", "i");
    };

    /**
     * Проверка строки на пароль:
     *   6-40 символов,
     *   латиница, цифры, дефис и подчеркивание,
     *   восклицательный и вопросительный знаки, собака
     *
     * @param  {string} str целевая строка
     * @return {boolean} true/false
     */
    _string.test.isPassword = function(str) {
        return _string.regTest(str, "^[a-z0-9_\!\?\@-]{6,40}$", "i");
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
