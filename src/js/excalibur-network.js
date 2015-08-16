/**
 * Функции работы с атрибутикой компьютерной сети
 *
 */
!function(E) {

    /**
     * Дополнение раздела работы со строками
     * функции контроля и валидации: ipv4, mac, mask
     *
     */
    var _string = E.String;

    /**
     * Является ли строка десятичной записью ipv4-адреса
     * @param  {string} str целевая строка
     * @return {boolean} true/false
     */
    _string.test.isIPv4 = function(str) {
        return _string.regTest(str, "^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$");
    };

    /**
     * Является ли строка записью mac-адреса
     * @param  {string} str целевая строка
     * @return {boolean} true/false
     */
    _string.test.isMAC = function(str) {
        return _string.regTest(str, "^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$");
    };

    /**
     * Является ли строка корректной записью маски подсети (IPv4)
     * @param  {string} str целевая строка
     * @return {number|boolean:false} размер маски или false
     */
    _string.test.isMask = function(str) {
        // является корректным ipv4-адресом
        if (!_string.test.isIPv4(str)) return false;
        // получить бинарное представление маски
        var bin = str.split(".").map(function(current) {
            return _string.toFixedString((current -0).toString(2), 8, "0");
        }).join("");
        // вернуть размер маски
        return _string.regTest(bin, "^1+0*$") ? bin.indexOf("0") : false;
    };

    /**
     * Новый раздел в библиотеке
     *
     */
    var _network = E.Network = {};

    /**
     * Получить контрольную сумму hex-строки (CRC16)
     * @param  {string} hexstr целевая hex-строка
     * @return {string} контрольная сумма
     */
    _network.getCRC16 = function(hexstr) {
        // проверка строки
        if (!_string.test.isHEX(hexstr)) {
            throw new TypeError(hexstr + " is not a hex-string");
        }
        // дополнение длины до кратности 4
        while (hexstr.length % 4 !== 0) hexstr += "0";
        // получить сумму
        var sum = E.Array.sum(hexstr.match(/.{4}/g), function(previous, current) {
            return previous + parseInt(current, 16);
        });
        while (sum >> 16) sum = (sum & 0xFFFF) + (sum >> 16);
        return _string.toFixedString((0xFFFF - sum).toString(16).toUpperCase(), 4, "0");
    };

    /**
     * Получить адрес подсети
     * @param  {string} addr ipv4-адрес
     * @param  {string} mask маска
     * @return {string} ipv4-адрес подсети
     */
    _network.getNetworkAddress = function(addr, mask) {
        // проверка аргументов
        if (!_string.test.isIPv4(addr)) {
            throw new TypeError(addr + " is not a ipv4-address");
        }
        if (!_string.test.isMask(mask)) {
            throw new TypeError(mask + " is not a mask");
        }
        // вычислить
        var addr_ps = addr.split(".");
        return mask.split(".").map(function(current, index) {
            return (current -0) & (addr_ps[index] -0);
        }).join(".");
    };

}(Excalibur);
