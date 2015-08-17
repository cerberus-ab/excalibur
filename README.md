# Excalibur
*Just another javascript-native library*

+ [excalibur[-core]](#excalibur-core)
+ [excalibur-array-sort](#excalibur-array-sort)
+ [excalibur-math-sequence](#excalibur-math-sequence)
+ [excalibur-math-equation](#excalibur-math-equation)
+ [excalibur-network](#excalibur-network)
+ [excalibur-patterns](#excalibur-patterns)

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
  - getOwnProperties
  - getOwnValues
  - copy
  - copyRaw
+ Function
  - getName
  - Counter
+ Array
  - swap
  - sum
  - mult
  - create
+ Math
  - GOLDEN_RATIO
  - isInteger
  - isPrime
  - getDividers
  - isPerfect
  - getRandomInt
  - factorial
  - pow
+ Class
  - extend
+ String
  - regTest
  - toCamelCase
  - toUnderlineCase
  - rmTags
  - rmSpaces
  - toFixedString
  - test
    * isHEX
    * isBIN
+ Performance
  - run

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
**Описание**

Сортирует элементы целевого массива, используя указанный алгоритм сортировки и функцию сравнения пар элементов. Изменяет и возвращает исходный массив.

**Синтаксис**
```javascript
E.Array.sort[name](array[, reverse]);
E.Array.sort[name](array, compare[, reverse]);
```
+ `name`: Используемый алгоритм сортировки (см. список доступных ниже).
+ `array`: Целевой массив элементов.
+ `compare`: Используемая функция сравнения пар элементов. (Optional)
+ `reverse`: Флаг реверсии используемой функции сравнения. (Optional, Default: false)

**Алгоритмы сортировки**
+ `bubble` Сортировка пузырьком
+ `cocktail` Шейкерная сортировка
+ `gnome` Гномья сортировка
+ `quick` Быстрая сортировка
+ `merge` Сортировка слиянием
+ `shell` Сортировка Шелла

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

#### E.Math.equation.dichotomy

**Описание**

Численное решение уравнения (нахождение корня) методом дихотомии или половинного деления. Правильное решение возможно лишь в том случае, если известно, что на заданном интервале имеется корень и он является единственным. Соответственно, для нахождения корней уравнений большого порядка, сначала необходимо отделить их по отрезкам. Возвращает корень, полученный с заданной точностью.

**Синтаксис**
```javascript
E.Math.equation.dichotomy(func, range[, options]);
```
+ `func`: Целевая функция. 
+ `range`: Диапазон поиска.
  - `beg`: Левая граница диапазона (Default: -10).
  - `end`: Правая граница диапазона (Default: 10).
+ `options`: Настройки выполнения (Optional).
  - `max`: максимальное число итераций (Default: 100).
  - `eps`: требуемая точность (Default: 0.001).

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
  - [isIPv4](#estringtestisipv4)
  - [isMAC](#estringtestismac)
  - [isMask](#estringtestismask)
  - isPort
+ E.Network
  - [getCRC16](#enetworkgetcrc16)
  - [getNetworkAddress](#enetworkgetnetworkaddress)

#### E.String.test.isIPv4

**Описание**

Проверить является ли переданная строка десятичной записью IPv4 адреса. Возвращает true/false. 

**Синтаксис**
```javascript
E.String.test.isIPv4(str);
```
+ `str`: Проверяемая строка.

#### E.String.test.isMAC

**Описание**

Проверить является ли переданная строка записью MAC адреса. Возвращает true/false. Проверка регистронезависимая.

**Синтаксис**
```javascript
E.String.test.isMAC(str);
```
+ `str`: Проверяемая строка.

#### E.String.test.isMask

**Описание**

Проверить является ли переданная строка записью маски подсети. В случае успеха функция возвращает размер маски, иначе false.

**Синтаксис**
```javascript
E.String.test.isMask(str);
```
+ `str`: Проверяемая строка.

#### E.Network.getCRC16

**Описание**

Вычисление контрольной суммы HEX-строки с использованием алгоритма CRC16. Если длина целевой строки не кратна 4, то до нужной длины будут дописаны нули в конец. 

**Синтаксис**
```javascript
E.Network.getCRC16(hexstr);
```
+ `hexstr`: Целевая hex-строка.

#### E.Network.getNetworkAddress

**Описание**

Получить адрес подсети путем сложения (логическое И) IPv4 адреса хоста и используемой маски подсети.

**Синтаксис**
```javascript
E.Network.getNetworkAddress(addr, mask);
```
+ `addr`: IPv4 адрес хоста.
+ `mask`: Используемая маска подсети.

## excalibur-patterns
[source](src/js/excalibur-math-sequence.js)

Модуль реализации различных шаблонов проектирования. Некоторые реализации представлены как примеры и не должны использоваться в рабочем коде.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-patterns.js"></script>
```
**Пространство имен**
```javascript
E.Patterns
```
+ порождающие
  - Singleton
+ структурные
+ поведенческие
  - Observer
