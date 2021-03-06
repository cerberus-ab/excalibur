/**
 * Excalibur[-core].js 0.3.0
 * https://github.com/cerberus-ab/excalibur
 * (c) 2015 Antony Belov <cerberus.ab@mail.ru>
 * Excalibur may be freely distributed under the MIT License
 *
 */
!function() {

    var root = this;

    var E = Excalibur = {};

    // инициализация как модуль или в глобальном контексте
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = E;
        }
        exports.E = E;
    } else {
        root.E = E;
    }

    // как AMD-модуль
    if (typeof define === "function" && define.amd) {
        define("excalibur", [], function() {
          return E;
        });
    }

    /**
     * Методы работы с объектами ===============================================
     *
     */
    var _object = E.Object = {};

    /**
     * Object extend
     *
     * @name E.Object.extend
     * @param {object} dst
     * @param {object} src Multiple supported
     * @param {boolean} deep Optional, Default: false
     * @returns {object}
     */
    _object.extend = function(dst, src, deep) {
        var lastArg = arguments[arguments.length -1];

        src = Array.prototype.slice.call(arguments, 1,
            arguments.length - (typeof lastArg === 'boolean' ? 1 : 0));
        deep = typeof lastArg === 'boolean'
            ? lastArg : false;

        src.forEach(function(obj) {
            for (var property in obj) if (obj.hasOwnProperty(property)) {
                if (deep && obj[property] && obj[property].constructor === Object) {
                    dst[property] = dst[property] || {};
                    Object.extend(dst[property], obj[property], deep);
                } else {
                    dst[property] = obj[property];
                }
            }
        });

        return dst;
    };

    /**
     * Обойти собственные свойства объекта
     * @param  {object} obj целевой объект
     * @param  {function} callback выполняемая функция
     * @param  {Mixed} thisArg контекст выполняемой функции
     */
    _object.forEach = function(obj, callback, thisArg) {
        if (arguments.length < 3) {
            thisArg = window;
        }
        for (var property in obj) if (obj.hasOwnProperty(property)) {
            callback.call(thisArg, obj[property], property, obj);
        }
    };

    /**
     * Получить перечень собственных свойств объекта
     * @param  {object} obj целевой объект
     * @return {array} набор собственных свойств
     */
    _object.getOwnProperties = function(obj) {
        var arr = [];
        for (var property in obj) if (obj.hasOwnProperty(property)) {
            arr.push(property);
        }
        return arr;
    };

    /**
     * Получить собственные методы объекта
     * @param  {object} obj целевой объект
     * @return {array} набор собственных методов
     */
    _object.getOwnMethods = function(obj) {
        return _object.getOwnProperties(obj).filter(function(property) {
            return typeof obj[property] === "function";
        });
    };

    /**
     * Получить перечень значений собственных свойств объекта
     * @param  {object} obj целевой объект
     * @return {array} набор значений
     */
    _object.getOwnValues = function(obj) {
        var arr = [];
        for (var property in obj) if (obj.hasOwnProperty(property)) {
            arr.push(obj[property]);
        }
        return arr;
    };

    /**
     * Копирование объекта
     * @param  {object} obj целевой объект
     * @param  {boolean} deep глубокое наложение (Default: false)
     * @return {object} копия объекта
     */
    _object.copy = function(obj, deep) {
        return _object.extend({}, obj, deep);
    };

    /**
     * Вернуть сырую копию объекта,
     * то есть обнуленные собственные свойства объекта
     * @param  {object} obj целевой объект
     * @param  {Mixed} value используемое значение для свойств (Default: undefined)
     * @return {object} сырая копия объекта
     */
    _object.copyRaw = function(obj, value) {
        var raw = {};
        _object.getOwnProperties(obj).forEach(function(property) {
            raw[property] = value;
        });
        return raw;
    };

    /**
     * Методы работы с функциями ===============================================
     *
     */
    var _function = E.Function = {};

    /**
     * Биндинг функции
     *
     * @function
     * @name E.Function.bind
     * @param {function} func Целевая функция
     * @param {Mixed} context Новый контекст
     * @returns {function}
     */
    _function.bind = function(func, context) {
        return function() {
            return func.apply(context, arguments);
        }
    };

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
     * @class Функция с запоминанием числа вызовов
     * @param  {function} func целевая функция
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
        };
    };

    /**
     * @class Функция с возможность лишь одного вызова
     * @param  {function} func целевая функция
     */
    _function.Single = function(func) {
        var isexec = false,
            result;
        // выполнить функцию
        this.run = function() {
            if (isexec) {
                return result;
            }
            else {
                isexec = true;
                return result = func.apply(this, arguments);
            }
        };
    };

    /**
     * @class Генератор уникального идентификатора
     * @param  {object} options настройки
     */
    _function.Identifier = function(options) {
        // настройки по умолчанию
        options = _object.extend({
            /** @type {string} префикс */
            prefix: "i",
            /** @type {number:integer} начальный номер */
            begin: 0,
            /** @type {number:integer} шаг инкремента */
            step: 1
        }, options);
        // массив используемых и текущий индекс
        var ids = [],
            index = options.begin;
        /**
         * Вернуть следующий идентификатор
         * @return {string} id
         */
        this.next = function() {
            ids.push(options.prefix + index);
            index += options.step;
            return ids[ids.length -1];
        };
        /**
         * Получить количество используемых идентификаторов
         * @return {number:integer} количество
         */
        this.size = function() {
            return ids.length;
        };
        /**
         * Очистить список используемых идентификаторов
         */
        this.empty = function() {
            ids.length = 0;
            index = options.begin;
        };
    };

    /**
     * Методы работы с переменными =============================================
     *
     */
    var _variable = E.Variable = {};

    /**
     * Явное приведение типа переменной
     * @deprecated
     * @param  {Mixed} value переменная
     * @param  {string} type требуемый тип (Default: boolean)
     * @return {Mixed} приведенная переменная
     */
    _variable.conv = function(value, type) {
        var result;
        switch (type || "boolean") {
            case "boolean":
                result = !!value;
                break;
            case "number":
                result = value -0;
                break;
            case "string":
                result = typeof value.toString === "function"
                    ? value.toString()
                    : typeof value;
                break;
            case "array":
                result = [value];
                break;
            case "object":
                result = { property: value };
                break;
            // no default;
        }
        return result;
    };

    /**
     * Методы работы с массивами ===============================================
     *
     */
    var _array = E.Array = {};

    /**
     * Проверка является ли переменная массивом
     *
     * @function
     * @name E.Array.isArray
     * @param {Mixed} value Целевая переменная
     * @returns {boolean}
     */
    _array.isArray = function(value) {
        return value instanceof Array;
    };

    /**
     * Найти все вхождения элемента в массиве
     * @param  {array} array целевой массив
     * @param  {Mixed} needle искомый элемент
     * @return {array} набор индексов всех вхождений
     */
    _array.indexOfAll = function(array, needle) {
        var matches = [];
        for (var pos = array.indexOf(needle); pos +1; pos = array.indexOf(needle, pos + 1)) {
            matches.push(pos);
        }
        return matches;
    };

    /**
     * Узнать сколько раз элемент встречается в массиве
     * @param  {array} array целевой массив
     * @param  {Mixed} needle искомый элемент
     * @return {number:integer} количество вхождений
     */
    _array.freak = function(array, needle) {
        return _array.indexOfAll(array, needle).length;
    };

    /**
     * Сравнить два массива
     * @param  {array} arr1 первый массив
     * @param  {array} arr2 второй массив
     * @return {boolean} true/false
     */
    _array.compare = function(arr1, arr2) {
        return arr1.toString() == arr2.toString();
    };

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
     * Вычислить сумму набора элементов
     * @param  {array} array целевой массив
     * @param  {function} getter функция получения значимой величины
     * @param  {number} initial начальное значение (Optional, Default: 0)
     * @return {number} результат сложения
     */
    _array.sum = function(array, getter, initial) {
        getter = getter || function(current) {
            return typeof current !== "number" ? 0 : current;
        };
        return array.reduce(function(previous, current) {
            return previous + getter.call(array, current);
        }, initial || 0);
    };

    /**
     * Вычислить произведение набора элементов
     * @param  {array} array целевой массив
     * @param  {function} getter функция получения значимой величины
     * @param  {number} initial начальное значение (Optional, Default: 1)
     * @return {number} результат произведения
     */
    _array.mult = function(array, getter, initial) {
        getter = getter || function(current) {
            return typeof current !== "number" ? 1 : current;
        };
        return array.reduce(function(previous, current) {
            return previous * getter.call(array, current);
        }, initial || 1);
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
     * Создать массив из случайных целых чисел
     * @param  {number:integer} length количество элементов
     * @param  {number:integer} arg1 левая граница диапазона
     * @param  {number:integer} arg2 правая граница диапазона
     * @return {Array} новый массив
     */
    _array.createRandomInt = function(length, arg1, arg2) {
        var args = Array.prototype.slice.call(arguments, 1);
        return _array.create(length, function creator() {
            return _math.randomInt.apply(this, args);
        });
    };

    /**
     * Достать случайный элемент(ы) из массива
     * изменяет исходный массив!
     * @param  {Array} array целевой массив
     * @param  {number:integer} amount количество требуемых элементов (Optional, Default: 1)
     * @return {Mixed|Array} случайнй элемент или набор
     */
    _array.popRandom = function(array, amount) {
        amount = amount || 1;
        var result = [];
        while (amount-- && array.length) {
            result.push(array.splice(_math.randomInt(array.length -1), 1)[0]);
        }
        return result.length > 1 ? result : result[0];
    };

    /**
     * Перемешать массив в случайном порядке
     * @param  {Array} array целевой массив
     * @return {Array} новый массив
     */
    _array.randomize = function(array) {
        return _array.popRandom(array, array.length);
    };

    /**
     * Математические функции ==================================================
     *
     */
    var _math = E.Math = {};

    /** @type {number} константа Пифагора (~1.414) */
    _math.PYTHAGORAS = Math.sqrt(2);

    /** @type {number} константа Феодора (~1.732) */
    _math.THEODORUS = Math.sqrt(3);

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
     * Проверить является ли число натуральным
     * @param  {number} numb число
     * @return {boolean} true/false
     */
    _math.isNatural = function(numb) {
        return _math.isInteger(numb) && numb >= 0;
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
     * @param   {number}  numb число
     * @return  {boolean} true/false
     */
    _math.isPerfect = function(numb) {
        return _math.isInteger(numb) && numb > 0
            && _array.sum(_math.getDividers(numb)) == numb;
    };

    /**
     * Проверить является ли число фигурным k-угольным
     * @param  {number} numb число
     * @param  {number:integer} k количество углов фигуры
     * @return {boolean} true/false
     */
    _math.isFigurate = function(numb, k) {
        return _math.isNatural(_math.quadratic(k - 2, 4 - k, -2 * numb)[1]);
    };

    /**
     * Получить случайной число в диапазоне
     * @param  {number} arg1 левая граница
     * @param  {number} arg2 правая граница
     * @return {number} случайное число
     */
    _math.random = function(arg1, arg2) {
        var min = arguments.length == 1 ? 0 : arg1 -0,
            max = arguments.length == 1 ? arg1 -0 : arg2 -0;
        return Math.random() * (max - min) + min;
    };

    /**
     * Получить случайной целое в диапазоне
     * @param  {number:integer} arg1 левая граница
     * @param  {number:integer} arg2 правая граница
     * @return {number:integer} случайное целое
     */
    _math.randomInt = function(arg1, arg2) {
        var min = arguments.length == 1 ? 0 : arg1 -0,
            max = arguments.length == 1 ? arg1 -0 : arg2 -0;
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
        if (!_math.isInteger(pow)) return Math.pow(numb, pow);
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
     * Решение квадратного уравнения через дискриминант
     * @param  {number} a первый коэффициент
     * @param  {number} b второй коэффициент
     * @param  {number} c третий коэффициент
     * @return {Array} корни уравнения
     */
    _math.quadratic = function(a, b, c) {
        var sqrtD = Math.sqrt(b * b - 4 * a * c);
        return [
            (-b - sqrtD) / a / 2,
            (-b + sqrtD) / a / 2
        ];
    };

    /**
     * Взять логарифм по основанию
     * @param  {number} number число
     * @param  {number} base основание (Default: e)
     * @return {number} значение логарифма
     */
    _math.log = function(number, base) {
        return Math.log(number) / (base ? Math.log(base) : 1.);
    };

    /**
     * Получить число сочетаний n по k
     * @param  {number} k числитель
     * @param  {number} n знаменатель
     * @return {number} количество сочетаний
     */
    _math.getCombinationNumber = function(k, n) {
        for (var res = 1, i = 0; i != k; i++) {
            res *= (n - i)/(k - i);
        } return res;
    };

    /**
     * Получить все варианты сочетаний n по k
     * @param  {number:integer} k числитель
     * @param  {number:integer} n знаменатель
     * @param  {string:[num, bin, set]} формат возвращаемого набора (Default: num)
     * @return {Array} набор сочетаний
     */
    _math.getCombination = function(k, n, format) {
        // формирование набора
        for (var comb = [], i = 0, cur = (1 << k) -1, tmp; cur < (1 << n); i++) {
            comb.push(cur);
            tmp = (cur | (cur -1)) +1;
            cur = tmp | ((((tmp & -tmp) / (cur & -cur)) >> 1) -1);
        }
        // если представить в бинарном виде или числовыми наборами, то дальнейшая обработка
        if (format === "bin" || format === "set") {
            // набор в бинарном виде (обратный порядок)
            var comb_bin = comb.map(function(current) {
                var bin = current.toString(2);
                return new Array(n - bin.length + 1).join("0") + bin;
            }).reverse();
            // вернуть в бинарном виде или числовыми наборами
            return format === "bin" ? comb_bin
                : comb_bin.map(function(current) {
                    return _string.indexOfAll(current, "1");
                });
        }
        // иначе вернуть в целых числах
        else return comb;
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
     * Extend instance, extra wrapper
     *
     * @function
     * @name E.Class.extra
     * @param {object} instance
     * @param {object} props Target properties
     * @returns {object} Extended instance
     */
    _class.extra = function(instance, props) {
        var extra = Object.create(instance);
        extra.superclass = instance;
        _object.extend(extra, props || {});
        return extra;
    };

    /**
     * Определить собственные методы класса
     * @param  {function|object} fce функция-конструктор класса или экземпляр
     * @return {array} набор собственных методов
     */
    _class.getOwnMethods = function(fce) {
        // определить функцию-конструктор
        if (typeof fce === "object") {
            fce = fce.constructor;
        }
        else if (typeof fce !== "function") {
            throw new TypeError(fce + " is not a function or object");
        }
        // делегирование вызова
        return _object.getOwnMethods(fce.prototype);
    };

    /**
     * Проверить является ли функция классом (то есть функцией-конструктором)
     * @deprecated
     * @param  {function|string} fc целевая функция или ее название
     * @return {boolean} true/false
     */
    _class.isClass = function(fc) {
        if (typeof fc !== "function" && typeof fc !== "string") return false;
        return _string.regTest(typeof fc === "function" ? _function.getName(fc) : fc, "^_?[A-Z]");
    };

    /**
     * Работа со строками ======================================================
     *
     */
    var _string = E.String = {};

    /** @type {object} различные проверки целевой строки */
    _string.test = {};

    /**
     * Экранирование спецсимволов HTML в тексте для вывода
     *
     * @function
     * @name E.String.escapeHTML
     * @param {string} text Целевой текст с разметкой
     * @returns {string}
     */
    _string.escapeHTML = (function() {
        var esymb = {
            '&':    '&amp;',
            '<':    '&lt;',
            '>':    '&gt;',
            '\"':   '&quot;',
            '\'':   '&#39;',
            '/':    '&#x2F;',
            ' ':    '&nbsp;'
        };
        return function(text) {
            return String(text).replace(/[&<>"'\/ ]/g, function(s) {
                return esymb[s];
            });
        }
    })();

    /**
     * Trim implementation
     *
     * @function
     * @name E.String.trim
     * @param {string} str
     * @returns {string}
     */
    _string.trim = function(str) {
        return str.replace(/^\s+|\s+$/g, '');
    };

    /**
     * Найти все вхождения подстроки в строку
     * @param  {string} str целевая строка
     * @param  {string} needle искомая подстрока
     * @return {array} набор индексов всех вхождений
     */
    _string.indexOfAll = function(str, needle) {
        var matches = [];
        for (var pos = str.indexOf(needle); pos +1; pos = str.indexOf(needle, pos + 1)) {
            matches.push(pos);
        }
        return matches;
    };

    /**
     * Проверка строки регулярным выражением
     * @param  {string} str целевая строка
     * @param  {string|RegExp} regular регулярное выражение
     * @param  {string} flags флаги (Optional)
     * @return {boolean} true/false
     */
    _string.regTest = function(str, regular, flags) {
        return regular ? new RegExp(regular, flags).test(str) : true;
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
     * @deprecated
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
     * Удалить комментарии из текста
     * @param  {string} text целевой текст
     * @author Ryan Wheale (from stackoverflow.com)
     * @return {string} текст без комментариев
     */
    _string.rmComments = function(text) {
        return text.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:\/\/(?:.*)$)/gm, "");
    };

    /**
     * Минификация json-текста (удаление комментариев и пробелов)
     * @param  {string:json} json целевой json
     * @return {string:json} результат
     */
    _string.minifyJSON = function(json) {
        return _string.rmSpaces(_string.rmComments(json));
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
     * Является ли строка бинарной записью
     * @param  {string} str целевая строка
     * @return {boolean} true/false
     */
    _string.test.isBIN = function(str) {
        return _string.regTest(str, "^[01]*$");
    };

    /**
     * Template string class
     *
     * @class
     * @constructor
     * @name E.String.Template
     * @param {string} template
     * @param {object} options Optional
     */
    _string.Template = function TemplateString(template, options) {
        /**
         * Used template
         *
         * @property
         * @private
         * @name E.String._template
         * @type {string}
         */
        this._template = template;
        /**
         * Used options
         *
         * @property
         * @private
         * @name E.String._options
         * @type {object}
         */
        this._options = _object.extend({
            /** @type {RegExp} Interpolate regexp (Default ERB-style) **/
            interpolate : /<%=([\s\S]+?)%>/g
        }, options);
        /**
         * Template attributes
         *
         * @property
         * @private
         * @name E.String._attrs
         * @type {Array}
         */
        this._attrs = (function(self) {
            var attrs = [];
            self._template.replace(self._options.interpolate, function(match, interpolate) {
                var key = _string.trim(interpolate);
                if (attrs.indexOf(key) === -1) {
                    attrs.push(key);
                }
                return match;
            });
            return attrs;
        })(this);
    };

    /**
     * Return source template
     *
     * @method
     * @name E.String.Template.prototype.source
     * @returns {string}
     */
    _string.Template.prototype.source = function() {
        return this._template;
    };

    /**
     * Return template attrs
     *
     * @method
     * @name E.String.Template.prototype.attrs
     * @returns {Array}
     */
    _string.Template.prototype.attrs = function() {
        return this._attrs;
    };

    /**
     * Execute template
     *
     * @method
     * @name E.String.Template.prototype.execute
     * @param {object} attrs
     * @param {boolean} hard Optional throw error for undefined attr
     * @returns {string}
     */
    _string.Template.prototype.execute = function(attrs, hard) {
        return this._template.replace(this._options.interpolate, function(match, interpolate) {
            var key = _string.trim(interpolate);
            if (typeof attrs[key] !== 'undefined') {
                return attrs[key];
            } else if (hard) {
                throw new SyntaxError('expected ' + key);
            } else {
                return match;
            }
        });
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
             * Функция завершения и обработки результата
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

    /**
     * Set immediate function
     *
     * @function
     * @name E.Performance.setImmediate
     * @param {function} callback
     */
    _performance.setImmediate = function(callback) {
        setTimeout(callback, 0);
    };

}.call(this);
