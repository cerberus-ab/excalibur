# Excalibur
*Just another javascript-native library*

+ [excalibur[-core]](#excalibur-core)
+ [excalibur-array-sort](#excalibur-array-sort)
+ [excalibur-math-sequence](#excalibur-math-sequence)
+ [soon](#soon)

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
+ Function
  - getName
  - Counter
+ Array
  - swap
  - sum
  - mult
  - create
+ Math
  - isInteger
  - isPrime
  - getRandomInt
  - factorial
  - pow
+ Class
  - extend
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

## soon
+ E.Array.sort (module)
  - insert
  - selection
+ E.String (core)
+ E.String.regexp (module)
+ E.Math.binary (module)
+ E.Math.big (module)
+ E.Pattern (core)
+ E.Coding (core)
+ E.Coding.base64 (module)
