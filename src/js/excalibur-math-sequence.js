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
     * Функция-билдер функция последовательностей
     * @param {function} creator функция создания следующего элемента
     * @param {object} options настройки инициализации
     */
    function SequenceBuilder(creator, options) {
        // настройки по умолчанию
        options = E.Object.extend({
            /** @type {Array} начальные элементы */
            initial: []
        }, options);
        /** @type {Array} последовательность */
        var seq = Array.isArray(options.initial) ? options.initial : [];
        /**
         * Вернуть функцию последовательности
         * @param  {integer} numb индекс требуемого числа
         * @param  {boolean:false} all получить всю последовательность
         * @return {number|Array} требуемое число или вся последовательность
         */
        return function Sequence(numb, all) {
            for (var index = seq.length; index < numb; ++index) {
                seq.push(creator(index, seq));
            }
            return all ? seq.slice(0, numb) : seq[numb -1];
        }
    };

    /**
     * Последовательность Фибоначчи
     *
     */
    _sequence.fibonacci = SequenceBuilder(function(index, seq) {
        return seq[seq.length - 2] + seq[seq.length - 1];
    }, {
        initial: [1,1]
    });

    /**
     * Последовательность простых чисел
     * @deprecated
     *
     */
    _sequence.prime = SequenceBuilder(function(index, seq) {
        var last = seq[seq.length - 1];
        do {
            last++;
        } while (!E.Math.isPrime(last));
        return last;
    }, {
        initial: [1,2]
    });

    /**
     * Последовательность Мерсенна (не простые)
     *
     */
    _sequence.mersenne = SequenceBuilder(function(index, seq) {
        return E.Math.pow(2, index + 1) - 1;
    });

}(Excalibur);
