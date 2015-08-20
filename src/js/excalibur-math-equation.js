!function(E) {

    /**
     * Численные методы решения уравнений
     *
     */
    var _equation = E.Math.equation = {};

    /**
     * Нахождение корня уравнения методом Дихотомии
     * @param  {function} func целевая функция
     * @param  {object} range диапазон поиска
     * @param  {object} options настройки
     * @return {number} корень уравнения
     */
    _equation.dichotomy = function(func, range, options) {
        // диапазон по умолчанию
        range = E.Object.extend({
            /** @type {number} левая граница */
            beg: -10,
            /** @type {number} правая граница */
            end: 10
        }, range);
        // настройки по умолчанию
        options = E.Object.extend({
            /** @type {number:integer} максимальное число итераций */
            max: 100,
            /** @type {number} требуемая точность */
            eps: 0.001
        }, options);


        var beg = range.beg,
            end = range.end,
            x0, y0,
            ic = 0;

        do {

            if (++ic > options.max) {
                throw new RangeError("Maximum iterations count exceeded");
            }
            x0 = (beg + end)/2;
            y0 = func(x0);
            if (y0 < 0) {
                end = x0;
            }
            else {
                beg = x0;
            }

        } while (Math.abs(y0) > options.eps);

        return x0;
    };


}(Excalibur);
