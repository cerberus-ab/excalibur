/**
 * Различные процедуры определения среднего по массиву:
 * массив может расцениваться как коллекция, если переопределить метод сложения элементов
 *
 */
!function(E) {

    // пространство имен
    var _array = E.Array,
        _average = E.Array.average = {};

    /**
     * Получить среднее значение
     * @param  {Array} array целевой массив
     * @param  {function} adder функция сложения
     * @return {number} среднее значение
     */
    _average.get = function(array, adder) {
        return _array.sum(array, adder, 0.) / array.length;
    };

    /**
     * Получить пошаговое среднее
     * @param  {Array} array целевой массив
     * @param  {function} adder функция сложения
     * @return {Array} пошаговое среднее
     */
    _average.step = function(array, adder) {
        return array.map(function(current, index) {
            return _average.get(array.slice(0, index +1), adder);
        });
    };

    /**
     * Получить линейное взвешенное скользящее среднее
     * @param  {Array} array целевой массив
     * @param  {number:integer} n количество точек для расчета
     * @param  {number} step шаг прогрессии значимости
     * @param  {function} adder функция сложения
     * @return {Array} линейное взвешенное скользящее среднее
     */
    _average.wma = function(array, n, step, adder) {
        // проверка количества точек и длины
        var len = array.length;
        if (n > len) {
            throw new RangeError("expected " + n + " to be less than array length");
        }
        // общий знаменатель как коэффициент
        var k = 2. / (n * (2 * n + step * (n - 1)));
        // вернуть скользящее среднее
        return array.map(function(current, index) {
            // проверка на null
            if (index < n - 1) return null;
            // расчитать и вернуть
            return k * _array.sum(array.slice(index - n + 1, index + 1), function(previous, current, index, array) {
                return (n + index * step) * adder.apply(this, arguments);
            });
        });
    };

    /**
     * Получить простое скользящее среднее
     * как частный случай линейного взвешенного
     * @param  {Array} array целевой массив
     * @param  {number:integer} n количество точек для расчета
     * @param  {function} adder функция сложения
     * @return {Array} простое скользящее среднее
     */
    _average.sma = function(array, n, adder) {
        return _average.wma(array, n, 0, adder);
    };

}(Excalibur);
