/**
 * Различные процедуры определения среднего по массиву:
 * массив может расцениваться как коллекция, если переопределить метод получения значимой величины
 *
 */
!function(E) {

    // пространство имен
    var _array = E.Array,
        _average = E.Array.average = {};

    /**
     * Получить среднее значение
     * @param  {Array} array целевой массив
     * @param  {function} getter функция получения значимой величины
     * @return {number} среднее значение
     */
    _average.get = function(array, getter) {
        return _array.sum(array, getter, 0) / array.length;
    };

    /**
     * Получить пошаговое среднее
     * @param  {Array} array целевой массив
     * @param  {function} getter функция получения значимой величины
     * @return {Array} пошаговое среднее
     */
    _average.step = function(array, getter) {
        return array.map(function(current, index) {
            return _average.get(array.slice(0, index +1), getter);
        });
    };

    /**
     * Получить линейное взвешенное скользящее среднее
     * @param  {Array} array целевой массив
     * @param  {number:integer} n количество точек для расчета
     * @param  {number} step шаг прогрессии значимости (Default: 0)
     * @param  {function} getter функция получения значимой величины
     * @return {Array} линейное взвешенное скользящее среднее
     */
    _average.wma = function(array, n, step, getter) {
        // проверка аргументов
        var len = array.length;
        if (n > len) {
            throw new RangeError("expected " + n + " to be less than array length");
        }
        step = step || 0;
        getter = getter || function(current) {
            return typeof current !== "number" ? 0 : current;
        };
        // общий знаменатель как коэффициент
        var k = 2. / n / (2 * n + step * (n - 1));
        // вернуть скользящее среднее
        return array.map(function(current) {
            return getter.call(array, current);

        }).map(function(current, index, array) {
            return index < n - 1 ? null

                : k * array.slice(index - n + 1, index + 1).reduce(function(previous, current, index, array) {
                    return previous + (n + index * step) * current;
                }, 0);
        });
    };

    /**
     * Получить простое скользящее среднее
     * как частный случай линейного взвешенного
     * @param  {Array} array целевой массив
     * @param  {number:integer} n количество точек для расчета
     * @param  {function} getter функция получения значимой величины
     * @return {Array} простое скользящее среднее
     */
    _average.sma = function(array, n, getter) {
        return _average.wma(array, n, 0, getter);
    };

}(Excalibur);
