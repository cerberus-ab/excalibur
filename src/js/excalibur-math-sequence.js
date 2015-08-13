!function(E) {

    /**
     * Функции числовых последовательностей ====================================
     *
     */
    var _sequence = E.Math.sequence = {};

    /**
     * Получить арифметическую прогрессию
     * @param  {number} beg начальный член
     * @param  {number} diff разность прогрессии
     * @param  {integer} numb индекс требуемого числа
     * @param  {boolean|false} all получить всю последовательность
     * @return {number|Array} требуемое число или вся последовательность
     */
    _sequence.arithmetic = function(beg, diff, numb, all) {
        return all ? E.Array.create(numb, function(currentValue, index) {
            return beg + diff * index;
        }) : beg + diff * (numb - 1);
    };

    /**
     * Получить геометрическую прогрессию
     * @param  {number} beg начальный член
     * @param  {number} ratio знаменатель прогрессии
     * @param  {integer} numb индекс требуемого числа
     * @param  {boolean|false} all получить всю последовательность
     * @return {number|Array} требуемое число или вся последовательность
     */
    _sequence.geometric = function(beg, ratio, numb, all) {
        return all ? E.Array.create(numb, function(currentValue, index) {
            return beg * E.Math.pow(ratio, index);
        }) : beg * E.Math.pow(ratio, numb - 1);
    };

    /**
     * Получить последовательность чисел фибоначчи
     * @param  {integer} numb индекс требуемого числа
     * @param  {boolean:false} all получить всю последовательность
     * @return {number|Array} требуемое число или вся последовательность
     */
    _sequence.fibonacci = (function() {
        var fibs = [1,1];
        return function(numb, all) {
            for (var len = fibs.length; len < numb; ++len) {
                fibs.push(fibs[len -2] + fibs[len -1]);
            }
            return all ? fibs.slice(0, numb) : fibs[numb -1];
        }
    }());

    /**
     * Получить последовательность простых чисел
     * @deprecated
     * @param  {integer} numb индекс требуемого числа
     * @param  {boolean:false} all получить всю последовательность
     * @return {number|Array} требуемое число или вся последовательность
     */
    _sequence.prime = (function() {
        var fibs = [1,2];
        return function(numb, all) {
            for (var len = fibs.length, last = fibs[len -1]; len < numb; ++len) {
                do {
                    last++;
                } while (!E.Math.isPrime(last));
                fibs.push(last);
            }
            return all ? fibs.slice(0, numb) : fibs[numb -1];
        }
    }());

    /**
     * Получить последовательность чисел Мерсенна (не простые)
     * @param  {integer} numb индекс требуемого числа
     * @param  {boolean:false} all получить всю последовательность
     * @return {number|Array} требуемое число или вся последовательность
     */
    _sequence.mersenne = (function(){
        var mers = [];
        /**
         * Функция формирование числа
         * @param  {integer} index индекс числа
         * @return {number} число с этим индексом
         */
        function getNumber(index) {
            return E.Math.pow(2, index) - 1;
        }
        // вернуть функцию
        return function(numb, all) {
            for (var len = mers.length; len < numb; ++len) {
                mers.push(getNumber(len + 1));
            }
            return all ? mers.slice(0, numb) : mers[numb -1];
        }
    }());


}(Excalibur);
