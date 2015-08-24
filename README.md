# Excalibur
_Just another javascript-native library_

Настоящая библиотека не является готовым профессиональным решением тех или иных задач. Это своего рода коллекция различного полезного функционала и реализаций популярных и интересных общих решений, в которых я испытывал потребность или был искушен в течение своего опыта клиентской (да и серверной) разработки на JavaScript. Модули библиотеки не имеют внешних зависимостей и выполнены на нативном JavaScript. В случае использования в элементах библиотеки решений других разработчиков я буду указывать их в аннотациях к заимствованным кускам кода.

Всего: 9 модулей расширений, 1 константа, 69 функций, 8 классов.

+ [excalibur[-core]](#excalibur-core)
+ [excalibur-object-map](#excalibur-object-map)
+ [excalibur-string-form](#excalibur-string-form)
+ [excalibur-array-average](#excalibur-array-average)
+ [excalibur-array-sort](#excalibur-array-sort)
+ [excalibur-math-sequence](#excalibur-math-sequence)
+ [excalibur-math-equation](#excalibur-math-equation)
+ [excalibur-network](#excalibur-network)
+ [excalibur-patterns](#excalibur-patterns)
+ [excalibur-structure](#excalibur-structure)

## excalibur[-core]
[source](src/js/excalibur.js)

Главный модуль библиотеки, ядро. Все остальные модули дополняют его функционал; содержит базовые методы работы с массивами, объектами, функциями и прочими элементами нативного JavaScript.
```html
<script src="js/excalibur.js"></script>
```
**Пространство имен**
```javascript
Excalibur = E
```
+ Object
  - extend
  - forEach
  - getOwnProperties
  - getOwnMethods
  - getOwnValues
  - copy
  - copyRaw
+ Function
  - getName
  - Counter
  - Single
  - Identifier
+ Variable
  - conv
+ Array
  - indexOfAll
  - freak
  - compare
  - swap
  - sum
  - mult
  - create
  - createRandomInt
+ Math
  - GOLDEN_RATIO
  - isInteger
  - isPrime
  - getDividers
  - isPerfect
  - random
  - randomInt
  - factorial
  - pow
  - log
  - getCombinationNumber
  - getCombination
+ Class
  - extend
  - getOwnMethods
  - isClass
+ String
  - indexOfAll
  - regTest
  - toCamelCase
  - toUnderlineCase
  - rmTags
  - rmSpaces
  - toFixedString
  - test
    * isHEX
    * isBIN
+ [Performance](#eperformance)
  - [run](#eperformancerun)

### E.Performance

Раздел библиотеки предоставляет различные методы оценки производительности кода программы.

#### E.Performance.run

Оценка времени выполнения функции. Имеется возможность указать количество, контекст и аргументы вызова целевой функции.
```javascript
E.Performance.run(func[, attr, options]);
```
+ `func`([args]): Выполняемая функция. Аргументы и контекст определяются настройками.
+ `attr`: Атрибуты выполнения процедуры. (Optional)
  - `amount`: Количество вызовов. (Default: 1)
  - `name`: Название выполняемой функции. (Default: определяется автоматически)
+ `options`: Настройки выполнения процедуры и вызова целевой функции. (Optional)
  - `context`: Контекст вызова целевой функции. (Default: window)
  - `args`: Аргументы вызова целевой функции. (Default: [])
  - `end`(result): Функция обработки результатов. (Default: см. ниже)

Результат выполнения процедуры содержит расширенные атрибуты выполнения:
+ `tbeg`: Абсолютное время старта процедуры.
+ `tend`: Абсолютное время конца процедуры.

Функция обработки результатов по умолчанию:
```javascript
console.log("Run %s [%d am]: %d ms",
  result.name,
  result.amount,
  result.tend.getTime() - result.tbeg.getTime()
);
```

**Примеры**

Сравнение производительности различных алгоритмов сортировки на примере набора случайных целых чисел. Будут оценены алгоритмы сортировки, реализованные в самой библиотеке. Функция принимает два аргумента: количество элементов в сортируемом наборе и количество вызовов процедуры генерации набора и его сортировки.
```javascript
function sortPerformance(size, amount) {
  E.Object.forEach(E.Array.sort, function(sort, name) {
      E.Performance.run(function() {
          sort(E.Array.createRandomInt(size, 1000));
      }, {
          amount: amount,
          name: name + "(" + size + ", random)"
      });
  });
}
```
Результат выполнения функции для наборов из 200 случайных целых чисел и при 1000 вызовах процедуры. Как видно, при таких исходных данных гномья сортировка значительно уступает остальным, а быстрая сортировка и сортировка Шелла - явные фавориты.
```shell
$ sortPerformance(200, 1000)
> Run bubble(200, random) [1000 am]: 178 ms
  Run cocktail(200, random) [1000 am]: 152 ms
  Run gnome(200, random) [1000 am]: 468 ms
  Run quick(200, random) [1000 am]: 55 ms
  Run merge(200, random) [1000 am]: 88 ms
  Run shell(200, random) [1000 am]: 48 ms
```

## excalibur-object-map
[source](src/js/excalibur-object-map.js)

Модуль построения карты объектов. Здесь под картой понимается дерево собственных свойств объекта, классифицированных по типу, включая и обработку вложенных объектов.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-object-map.js"></script>
```
**Пространство имен**
```javascript
E.Object
```

#### E.Object.Map

Базовый класс карты объекта. Основной интерфейс: вернуть карту объекта, получить статистику по карте, преобразовать карту в строковой вид для чтения.

```javascript
var map = new E.Object.Map(obj);
```
+ `obj`: Целевой объект.

**prototype.traverse**

Рекурсивный обход всех элементов карты. Возвращает экземпляр карты.

```javascript
map.traverse(callback);
```
+ `callback`(path, node): Функция обратного вызова для обработки текущего узла. Аргументы:
  - `path`: Строковая запись пути к текущему узлу.
  - `node`: Текущий узел карты.

**prototype.show** 

Вернуть карту объекта для какой-либо обработки из вне.

```javascript
map.show();
```

**prototype.statistics**

Получить статистику по карте объекта. Базовый вариант возвращает общее количество обычных свойств и функций.

```javascript
map.statistics();
```

**prototype.toString**

Преобразовать карту объекта в строковый вид.

```javascript
map.toString();
```

**Примеры**

Получить статистику по объекту E.Array.
```shell
$ var map = new E.Object.Map(E.Array);
$ map.show();
> Object {functions: Array[7], properties: Array[0], objects: Object}
$ map.statistics();
> Object {functions: 13, properties: 0}
$ map.toString();
> null
     indexOfAll
     compare
     swap
     sum
     mult
     slideAverage
     create
  -> sort
       bubble
       cocktail
       gnome
       quick
       merge
       shell
```

## excalibur-string-form
[source](src/js/excalibur-string-form.js)

Модуль расширения строковых проверок для часто используемых пользовательских данных в формах.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-string-form.js"></script>
```
**Пространство имен**
```javascript
E.String.test
```
+ isLogin
+ isPassword
+ isURL
+ isEmail
+ isPhoneNumber

## excalibur-array-sort
[source](src/js/excalibur-array-sort.js)

Модуль реализаций различных сортировок для массивов.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-array-sort.js"></script>
```
**Пространство имен**
```javascript
E.Array.sort
```

#### E.Array.sort[algo]

Сортирует элементы целевого массива, используя указанный алгоритм сортировки и функцию сравнения пар элементов. Изменяет и возвращает исходный массив.

```javascript
E.Array.sort[algo](array[, reverse]);
E.Array.sort[algo](array, compare[, reverse]);
```
+ `algo`: Используемый алгоритм сортировки (см. список доступных ниже).
+ `array`: Целевой массив элементов.
+ `compare`: Используемая функция сравнения пар элементов. (Optional)
+ `reverse`: Флаг реверсии используемой функции сравнения. (Optional, Default: false)

Алгоритмы сортировки:
+ `bubble` Сортировка пузырьком
+ `cocktail` Шейкерная сортировка
+ `gnome` Гномья сортировка
+ `quick` Быстрая сортировка
+ `merge` Сортировка слиянием
+ `shell` Сортировка Шелла

## excalibur-array-average
[source](src/js/excalibur-array-average.js)

Модуль различных процедур определения среднего значения по набору элементов.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-array-average.js"></script>
```
**Пространство имен**
```javascript
E.Array.average
```
+ get
+ step
+ sma
+ wma

## excalibur-math-sequence
[source](src/js/excalibur-math-sequence.js)

Модуль различных числовых последовательностей.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-math-sequence.js"></script>
```
**Пространство имен**
```javascript
E.Math.sequence
```
+ arithmetic
+ geometric
+ fibonacci
+ prime
+ mersenne

## excalibur-math-equation
[source](src/js/excalibur-math-equation.js)

Модуль численного решения уравнений.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-math-equation.js"></script>
```
**Пространство имен**
```javascript
E.Math.equation
```
+ [dichotomy](#emathequationdichotomy)
+ [getDefiniteIntegral](#emathequationgetdefiniteintegral)

#### E.Math.equation.dichotomy

Численное решение уравнения (нахождение корня) методом дихотомии или половинного деления. Правильное решение возможно лишь в том случае, если известно, что на заданном интервале имеется корень и он является единственным. Соответственно, для нахождения корней уравнений большого порядка, сначала необходимо отделить их по отрезкам. Возвращает корень, полученный с заданной точностью.

```javascript
E.Math.equation.dichotomy(func, range[, options]);
```
+ `func`(arg): Целевая функция от аргумента. 
+ `range`: Диапазон поиска.
  - `beg`: Левая граница диапазона. (Default: -1)
  - `end`: Правая граница диапазона. (Default: 1)
+ `options`: Настройки выполнения. (Optional)
  - `max`: максимальное число итераций. (Default: 100)
  - `eps`: требуемая точность. (Default: 0.001)

**Примеры**

Поиск корня уравнения _sin(2x) - ln(x) - 1_ на отрезке [0,1]. Корень имеется и он единственный.
```shell
$ E.Math.equation.dichotomy(function(arg) { 
  return Math.sin(2 * arg) - Math.log(arg) - 1; 
}, { 
  beg: 0., 
  end: 1. 
});
> 0.9482421875
```
Поиск корня этого же уравнения на отрезке [1,2]. Корня нет.
```shell
$ E.Math.equation.dichotomy(function(arg) { 
  return Math.sin(2 * arg) - Math.log(arg) - 1; 
}, { 
  beg: 1., 
  end: 2. 
});
> Uncaught RangeError: Maximum iterations count exceeded
```

#### E.Math.equation.getDefiniteIntegral

Численное интегрирование функции одной переменной, заключающиеся в замене подынтегральной функции на константу на каждом элементарном отрезке. Возвращает численный результат интегрирования.

```javascript
E.Math.equation.getDefiniteIntegral(func, range[, options]);
```
+ `func`(arg): Подынтегральная функция от аргумента. 
+ `range`: Отрезок интегрирования.
  - `beg`: Нижняя граница отрезка. (Default: -1)
  - `end`: Верхняя граница отрезка. (Default: 1)
+ `options`: Настройки выполнения. (Optional)
  - `algo`: Используемый алгоритм: rect. (Default: rect)
  - `quant`: Количество квантов, участков разбиения. (Default: 1000)

**Примеры**

Численное интегрирование функции _x^3 - 3x_ на отрезке [-1, 8]. 
```shell
$ E.Math.equation.getDefiniteIntegral(function(arg) { 
  return Math.pow(arg, 3) - 3 * arg; 
}, { 
  end: 8 
});
> 929.2493621249995
```

## excalibur-network
[source](src/js/excalibur-network.js)

Модуль работы с атрибутикой компьютерной сети.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-network.js"></script>
```
**Пространство имен**
```javascript
E.String.test
E.Networks
```
+ E.String.test
  - isIPv4
  - isMAC
  - isMask
  - isPort
+ E.Network
  - [getCRC16](#enetworkgetcrc16)
  - [getNetworkAddress](#enetworkgetnetworkaddress)

#### E.Network.getCRC16

Вычисление контрольной суммы HEX-строки с использованием алгоритма CRC16. Если длина целевой строки не кратна 4, то до нужной длины будут дописаны нули в конец. 

```javascript
E.Network.getCRC16(hexstr);
```
+ `hexstr`: Целевая hex-строка.

#### E.Network.getNetworkAddress

Получить адрес подсети путем сложения (логическое И) IPv4 адреса хоста и используемой маски подсети.

```javascript
E.Network.getNetworkAddress(addr, mask);
```
+ `addr`: IPv4 адрес хоста.
+ `mask`: Используемая маска подсети.

## excalibur-patterns
[source](src/js/excalibur-patterns.js)

Модуль реализации различных шаблонов проектирования. Некоторые реализации представлены как примеры и не должны использоваться в рабочем коде.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-patterns.js"></script>
```
**Пространство имен**
```javascript
E.Patterns
```
+ Порождающие
  - Singleton
+ Структурные
+ Поведенческие
  - Observer

## excalibur-structure
[source](src/js/excalibur-structure.js)

Модуль предоставляет различные структуры данных.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-structure.js"></script>
```
**Пространство имен**
```javascript
E.Structure
```
+ Связный список
+ Бинарное дерево
  - [Binary Tree](#estructurebinarytree)
  - [Binary Search Tree](#estructurebinarysearchtree)

#### E.Structure.BinaryTree

Базовый класс бинарного дерева. Предоставляет такие операции как: различный обход узлов дерева, определение количества узлов, получение ключей и значений всех узлов. В настоящее время не имеет методов добавления, удаления и получения элементов. Поэтому используется как наследуемый для других структур данных на базе бинарных деревьев.

```javascript
var tree = new E.Structure.BinaryTree;
```

**prototype.traverse**

Рекурсивный обход всех элементов дерева в заданном порядке. Возвращает экземпляр дерева.

```javascript
tree.traverse(callback[, order]);
```
+ `callback`: Функция обратного вызова для обработки текущего узла.
+ `order`: Порядок обхода элементов. Доступные значения: inorder, preorder, postorder. (Default: inorder) 

**prototype.size**

Получить количество элементов в дереве.

```javascript
tree.size();
```

**prototype.keys**

Рекурсивно обойти дерево и получить массив ключей его элементов.

```javascript
tree.keys([order]);
```
+ `order`: Порядок обхода элементов (см. prototype.traverse).

**prototype.values**

Рекурсивно обойти дерево и получить массив значений его элементов.

```javascript
tree.values([order]);
```
+ `order`: Порядок обхода элементов (см. prototype.traverse).

#### E.Structure.BinarySearchTree

Класс двоичного дерева поиска. Наследован от базового класса бинарного дерева. Интерфейс включает три основные операции: поиск элемента по ключу, добавление элемента как пары ключ-значение, удаление элемента по ключу.

```javascript
var tree = new E.Structure.BinarySearchTree;
```

**prototype.find**

Поиск элемента дерева по его ключу. Возвращает значение искомого элемента.

```javascript
tree.find(key);
```
+ `key`: Числовой ключ искомого элемента.

**prototype.insert**

Добавить в дерево новую пару ключ/значение. Если по указанному ключу уже существует элемент в дереве, то его значение будет изменено на указанное. Возвращает экземпляр дерева.

```javascript
tree.insert(key[, value]);
```
+ `key`: Числовой ключ нового элемента.
+ `value`: Значение нового элемента. (Optional, Default: null)

**prototype.remove**

Удалить элемент дерева по ключу. Возвращает экземпляр дерева.

```javascript
tree.remove(key);
```
+ `key`: Числовой ключ удаляемого элемента.
