!function() {

    window.E = window.Excalibur = {};

    /**
     * Методы работы с объектами ===============================================
     *
     */
    var _object = E.Object = {};

    /**
     * Наложить свойства одного объекта на другой
     * @param  {object} dst целевой объект
     * @param  {object} src накладываемый объект
     * @param  {boolean} deep глубокое наложение
     * @return {object} результирующий целевой объект
     */
    _object.extend = function(dst, src, deep) {
        for (var property in src) {
            if (deep && src[property] && src[property].constructor === Object) {
                dst[property] = dst[property] || {};
                Object.extend(dst[property], src[property]);
            } else {
                dst[property] = src[property];
            }
        }
        return dst;
    };

    /**
     * Методы работы с функциями ===============================================
     *
     */
    var _function = E.Function = {};

    /**
     * Получить название функции
     * @param  {function} func целевая функция
     * @return {string} название функции
     */
    _function.getName = function(func) {
        if (typeof func !== "function") {
            throw new TypeError(func + " is not a function");
        }
        return func.toString().match(/function ([^(]*)\(/)[1] || "anonymous";
    };

    /**
     * Функция с запоминанием числа вызовов
     * @class
     * @param {function} func целевая функция
     */
    _function.Counter = function(func) {
        var count = 0;
        // выполнить функцию
        this.run = function() {
            count++;
            return func.apply(this, arguments);
        };
        // получить количество вызовов этой функции
        this.count = function() {
            return count;
        }
    };

    /**
     * Методы работы с массивами ===============================================
     *
     */
    var _array = E.Array = {};

    /**
     * Поменять местами элементы массива
     * @param  {Array} array целевой массив
     * @param  {integer} i первый индекс
     * @param  {itneger} j второй индекс
     * @return {Array} целевой массив
     */
    _array.swap = function(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    };

    /**
     * Вычислить сумму элементов массива
     * @param  {Array} array целевой массив
     * @param  {function} adder функция сложения
     * @param  {Mixed} initial начальное значение (Default: 0)
     * @return {Mixed} результат сложения
     */
    _array.sum = function(array, adder, initial) {
        if (typeof adder !== "function") {
            adder = function(previous, current, index, array) {
                return previous + (typeof current !== "number" ? 0 : current);
            }
        }
        initial = initial || 0;
        return array.reduce(adder, initial);
    };

    /**
     * Вычислить произведение элементов массива
     * @param  {Array} array целевой массив
     * @param  {function} multer функция произведения
     * @param  {Mixed} initial начальное значение (Default: 1)
     * @return {Mixed} результат сложения
     */
    _array.mult = function(array, multer, initial) {
        if (typeof multer !== "function") {
            multer = function(previous, current, index, array) {
                return previous * (typeof current !== "number" ? 1 : current);
            }
        }
        initial = initial || 1;
        return array.reduce(multer, initial);
    };

    /**
     * Создание массива
     * @param  {integer} length размер массива
     * @param  {function} creator функция создания элементов
     * @return {Array} новый массив
     */
    _array.create = function(length, creator) {
        var callback;
        switch (typeof creator) {
            // правило формирования
            case "string":
                switch (creator) {
                    case "natural":
                        // натуральные числа
                        callback = function(currentValue, index) {
                            return index;
                        }
                        break;
                    // иначе строковые константы
                    default:
                        callback = function() { return creator; }
                        break;
                }
                break;
            // передан колбэк
            case "function":
                callback = creator;
                break;
            // иначе константы
            default:
                callback = function() { return creator; }
                break;
        }
        return Array.apply(null, { length: length }).map(callback);
    };

    /**
     * Математические функции ==================================================
     *
     */
    var _math = E.Math = {};

    /** @type {number} золотое сечение (~1.618) */
    _math.GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

    /**
     * Проверить является ли число целым
     * @param  {number} numb число
     * @return {boolean} true/false
     */
    _math.isInteger = function(numb) {
        return typeof numb === "number" && numb % 1 == 0;
    };

    /**
     * Проверить является ли целое число простым
     * @deprecated
     * @param  {number} numb число
     * @return {boolean} true/false
     */
    _math.isPrime = function(numb) {
        if (!_math.isInteger(numb) || numb < 2) return false;
        for (var i = 2, d = Math.sqrt(numb); i <= d; ++i) {
            if (numb % i == 0) return false;
        }
        return true;
    };

    /**
     * Получить собственные делители числа
     * @deprecated
     * @param  {integer} numb число
     * @param  {boolean} isprime только простые (Default: false)
     * @return {array} набор собственных делителей
     */
    _math.getDividers = function(numb, isprime) {
        var div = 2,
            dividers = [1];
        // только простые
        if (isprime) {
            while (numb > 1) {
                if (numb % div == 0 && _math.isPrime(div)) {
                    if (dividers.indexOf(div) < 0) {
                        dividers.push(div);
                    }
                    numb /= div;
                }
                else div++;
            }
        }
        // все собственные делители
        else {
            for (var max = numb/2; div <= max; div++) {
                if (numb % div == 0) {
                    dividers.push(div);
                }
            }
        }
        // вернуть
        return dividers;
    };

    /**
     * Проверить является ли целое число совершенным
     * @param  {number}  numb число
     * @return {boolean} true/false
     */
    _math.isPerfect = function(numb) {
        return _math.isInteger(numb) && numb > 0
            && _array.sum(_math.getDividers(numb)) == numb;
    };

    /**
     * Получить случайной целое в диапазоне
     * @param  {integer} range1 левая граница
     * @param  {integer} range2 правая граница
     * @return {integer} случайное целое
     */
    _math.getRandomInt = function(range1, range2) {
        var min = range1 -0,
            max = range2 -0;
        if (arguments.length == 1) {
            max = min;
            min = 0;
        }
        if (isNaN(min) || isNaN(max)) {
            throw new RangeError("Invalid range");
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * Посчитать факториал числа
     * @param  {integer} n число
     * @return {number} факториал числа
     */
    _math.factorial = (function() {
        var fv = [1,1];
        return function(n) {
            return fv[n] ? fv[n] : fv[n] = _math.factorial(n - 1) * n;
        }
    }());

    /**
     * Возведение числа в степень
     * @param  {number} numb число
     * @param  {number} pow степень
     * @return {number} результат
     */
    _math.pow = function(numb, pow) {
        // проверка степени
        pow -= 0;
        if (!pow) return 1;
        // если степень дробная, то обычный метод
        if (!_math.isInteger(numb)) return Math.pow(numb, pow);
        // иначе быстрое возведение для целых чисел
        var result = 1;
        while (pow) {
            if (pow % 2 == 0) {
                pow /= 2;
                numb *= numb;
            }
            else {
                pow--;
                result *= numb;
            }
        }
        return result;
    };

    /**
     * Работа с классами =======================================================
     *
     */
    var _class = E.Class = {};

    /**
     * Наследование
     * @param  {function} Child дочерний класс
     * @param  {function} Parent родительский класс
     */
    _class.extend = function(Child, Parent) {
        Child.prototype = Object.create(Parent.prototype);
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;
    };

    /**
     * Работа со строками ======================================================
     *
     */
    var _string = E.String = {};

    /** @type {object} различные проверки целевой строки */
    _string.test = {};

    /**
     * Проверка строки регулярным выражением
     * @param  {string} str целевая строка
     * @param  {string} regular регулярное выражение
     * @return {boolean} true/false
     */
    _string.regTest = function(str, regular) {
        return regular ? new RegExp(regular).test(str) : true;
    };

    /**
     * Конвертировать строку в Camel Case
     * @param  {string} str целевая строка
     * @return {string} строка в Camel Case
     */
    _string.toCamelCase = function(str) {
        return str.replace(/-[a-z]/g, function(g) {
            return g[1].toUpperCase();
        });
    };

    /**
     * Конвертировать строку в Underline Case
     * @param  {string} str целевая строка
     * @param  {boolean} lowercase нижний регистр (Default: true)
     * @return {string} строка в Camel Case
     */
    _string.toUnderlineCase = function(str, lowercase) {
        str = str.replace(/\s+/g, "_");
        return typeof lowercase === "undefined" || lowercase
            ? str.toLowerCase() : str;
    };

    /**
     * Удалить теги из текста
     * @param  {string} text целевой текст
     * @return {string} текст без тегов
     */
    _string.rmTags = function(text) {
        return text.replace(/<\/?[^>]+>/g, "");
    };

    /**
     * Удалить пробельные символы из текста
     * @param  {string} text целевой текст
     * @return {string} текст без пробельных символов
     */
    _string.rmSpaces = function(text) {
        return text.replace(/\s/g, "");
    };

    /**
     * Получить запись объекта с фиксированной длиной
     * @param  {Mixed} target целевой объект
     * @param  {number:integer} length требуемая длина
     * @param  {string} filler заполняющий символ (Default: ' ')
     * @return {string} строковое представление с фиксированной длиной
     */
    _string.toFixedString = function(target, length, filler) {
        var str = target.toString(),
            len = str.length,
            filler = typeof filler !== "undefined" ? filler[0] : ' ';

        return len > length
            ? str.substring(0, length)
            : Array(length - len + 1).join(filler) + str;
    };

    /**
     * Является ли строка шестнадцатиричной записью
     * @param  {string} str целевая строка
     * @return {boolean} true/false
     */
    _string.test.isHEX = function(str) {
        return _string.regTest(str, "^[0-9a-fA-F]*$");
    };

    /**
     * Оценка производительности ===============================================
     *
     */
    var _performance = E.Performance = {};

    /**
     * Измерить время выполнения функции
     * @param  {function} func целевая функция
     * @param  {object} attrs атрибуты выполнения
     * @param  {object} options настройки выполнения
     * @return {object} результаты выполнения
     */
    _performance.run = function(func, attrs, options) {
        // атрибуты выполнения по умолчанию
        attrs = E.Object.extend({
            /** @type {integer} количество вызовов */
            amount: 1,
            /** @type {string} название целевой функции */
            name: E.Function.getName(func)
        }, attrs);

        // настройки выполнения по умолчанию
        options = E.Object.extend({
            /** @type {Mixed} контекст выполнения целевой функции */
            context: window,
            /** @type {Array} аргументы выполнения целевой функции */
            args: [],
            /**
             * Функция заврешения и обработки результата
             * @function
             * @param  {object} result резульаты выполнения
             */
            end: function(result) {
                console.log("Run %s [%d am]: %d ms",
                    result.name,
                    result.amount,
                    result.tend.getTime() - result.tbeg.getTime()
                );
            }
        }, options);

        /** @type {Date} время запуска */
        attrs.tbeg = new Date();
        // выполнить целевую функцию
        for (var i = 0; i != attrs.amount; ++i) {
            func.apply(options.context, options.args);
        }
        /** @type {Date} время остановки */
        attrs.tend = new Date();

        // обработка результата
        if (typeof options.end === "function") {
            options.end(attrs);
        }
        return attrs;
    };

}();
