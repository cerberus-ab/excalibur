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
            beg: -1.,
            /** @type {number} правая граница */
            end: 1.
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

    /**
     * Численное взятие определенного интеграла
     * @deprecated
     * @param  {function} func подынтегральная функция
     * @param  {object} range диапазон
     * @param  {object} options настройки
     * @return {number} значение интеграла
     */
    _equation.getDefiniteIntegral = function(func, range, options) {
        // диапазон по умолчанию
        range = E.Object.extend({
            /** @type {number} левая граница */
            beg: -1.,
            /** @type {number} правая граница */
            end: 1.
        }, range);
        // настройки по умолчанию
        options = E.Object.extend({
            /** @type {string:[rect]} используемый алгоритм */
            algo: "rect",
            /** @type {number:integer} количество квантов */
            quant: 1000
        }, options);

        switch (options.algo) {
            // метод прямоугольников
            case "rect":
                var dx = (range.end - range.beg) / options.quant;
                for (var sum = i = 0; i != options.quant; ++i) {
                    sum += func(range.beg + dx * (.5 + i));
                }
                return sum * dx;
            // иначе ничего хорошего
            default:
                return undefined;
        }
    };

    /**
     * Численное дифференцирование (первого порядка) функции в точке
     * метод двусторонней разности
     * @deprecated
     * @param  {function} func дифференцируемая функция
     * @param  {number} arg аргумент функции
     * @param  {number} step шаг дифференцирования (Optional, Default: 0.001)
     * @return {number} значение первой производной функции в этой точке
     */
    _equation.getDifferent = function(func, arg, step) {
        step = step || .001;
        return (func(arg + step) - func(arg - step)) / step / 2;
    };

}(Excalibur);
