!function(E) {

    /**
     * Функции числовых последовательностей ====================================
     *
     */
    var sequence = E.Math.sequence = {};

    /**
     * Получить последовательность чисел фибоначчи
     * @param  {integer} numb индекс требуемого числа
     * @param  {boolean:false} all получить всю последовательность
     * @return {number|Array} требуемое число или вся последовательность
     */
    sequence.fibonacci = (function() {
        var fibs = [1,1];
        return function(numb, all) {
            for (var len = fibs.length; len < numb; ++len) {
                fibs.push(fibs[len -2] + fibs[len -1]);
            }
            return all ? fibs.slice(0, numb) : fibs[numb -1];
        }
    }());

}(Excalibur);
