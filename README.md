# Excalibur
*Just another javascript-native library*

+ [excalibur[-core]](#excalibur-core)
+ [excalibur-array-sort](#excalibur-array-sort)
+ [excalibur-math-sequence](#excalibur-math-sequence)

## excalibur[-core]
[source](src/js/excalibur.js) [minified](build/js/excalibur.js)

Главный модуль библиотеки, ядро. Все остальные модули дополняют его функционал; содержит базовые методы работы с массивами, объектами, функциями и прочими элементами нативного JavaScript.
```html
<script src="js/excalibur.js"></script>
```
Excalibur (E)
+ Object
  - extend
+ Function
  - getName
  - Counter
+ Array
  - swap
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
[source](src/js/excalibur-array-sort.js) [minified](src/js/excalibur-array-sort.js)

Модуль реализаций различных сортировок для массивов.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-array-sort.js"></script>
```
E.Array.sort
+ bubble
+ cocktail
+ gnome
+ quick

## excalibur-math-sequence
[source](src/js/excalibur-math-sequence.js) [minified](src/js/excalibur-math-sequence.js)

Модуль различных числовых последовательностей.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-math-sequence.js"></script>
```
E.Math.sequence
+ fibonacci
+ prime
