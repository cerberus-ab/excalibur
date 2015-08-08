!function(E) {

    /**
     * Функции сортировки массивов =============================================
     *
     */
    var _sort = E.Array.sort = {};

    /**
     * Функция-билдер функций сортировки
     * @param  {function} algorithm алгоритм сортировки
     * @param  {object} settings настройки
     */
    function SortBuilder(algorithm, settings) {
        // настройки создания по умолчанию
        settings = E.Object.extend({
            /**
             * Функция сравнения по умолчанию
             * @function
             * @param  {Mixed} left левый элемент
             * @param  {Mixed} right правый элемент
             * @return {integer} результат сравнения (-1|0|1)
             */
            compare: function(left, right) {
                if (left > right) return 1;
                if (left < right) return -1;
                return 0;
            }
        }, settings);
        /**
         * Вернуть функцию сортировки
         * @param  {array} array целевой массив
         * @param  {function|boolean} arg2 функция сравнения или реверс
         * @return {boolean|undefined} arg3 реверс
         */
        return function(array, arg2, arg3) {
            // заданная функция сортировки
            var compare = typeof arg2 === "function"
                ? arg2 : settings.compare;
            // реверс порядка
            var reverse = arguments.length == 2 && typeof arg2 !== "function"
                ? !!arg2 : !!arg3;
            // сортировка с использованием реверса (при необходимости)
            algorithm(array, function(arg1, arg2) {
                return compare.apply(this, reverse ? Array.prototype.reverse.call(arguments) : arguments);
            });
            // вернуть отсортированный массив
            return array;
        }
    }

    /**
     * Сортировка пузырьком
     *
     */
    _sort.bubble = SortBuilder(function(array, compare) {
        var i, j,
            len = array.length;
        for (var i = 0; i != len -1; ++i) {
            for (j = i +1; j != len; ++j) {
                if (compare(array[i], array[j]) > 0) {
                    E.Array.swap(array, i, j);
                }
            }
        }
    });

    /**
     * Шейкерная сортировка
     *
     */
    _sort.cocktail = SortBuilder(function(array, compare) {
        var i,
            len = array.length,
            left = 0,
            right = len -1;
        do {
            for (i = left; i != right; ++i) {
                if (compare(array[i], array[i +1])) {
                    E.Array.swap(array, i, i +1);
                }
            }
            right--;
            for (i = right; i != left; --i) {
                if (!compare(array[i], array[i -1])) {
                    E.Array.swap(array, i, i -1);
                }
            }
            left++;
        } while (left < right);
    });

    /**
     * Гномья сортировка
     *
     */
    _sort.gnome = SortBuilder(function(array, compare) {
        var i = 0,
            len = array.length;
        while (i != len) {
            if (i == 0 || !compare(array[i -1], array[i])) {
                ++i;
            }
            else {
                E.Array.swap(array, i -1, i);
                --i;
            }
        }
    });

    /**
     * Быстрая сортировка
     *
     */
    _sort.quick = SortBuilder((function(){

        function qsort(array, left, right, compare) {
            var i = left,
                j = right,
                pivot = array[Math.floor((i + j)/2)];
            do {
                while (compare(array[i], pivot) < 0) i++;
                while (compare(array[j], pivot) > 0) j--;
                if (i <= j) {
                    E.Array.swap(array, i, j);
                    i++;
                    j--;
                }
            } while (i <= j);
            if (left < j) qsort(array, left, j, compare);
            if (i < right) qsort(array, i, right, compare);
            return array;
        }

        return function(array, compare) {
            return qsort(array, 0, array.length -1, compare);
        }
    }()));

}(Excalibur);
