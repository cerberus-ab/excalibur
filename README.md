# Excalibur
*Just another javascript-native library*

## excalibur[-core]
Главный модуль библиотеки, ядро. Все остальные модули дополняют его функционал; содержит базовые методы работы с массивами, объектами, функциями и прочими элементами нативного JavaScript.
```html
<script src="js/excalibur.js"></script>
```
Excalibur (E) [source](src/js/excalibur.js)
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
Модуль реализаций различных сортировок для массивов.
```html
<script src="js/excalibur-array-sort.js"></script>
```
E.Array.sort [source](src/js/excalibur-array-sort.js)
+ bubble
+ cocktail
+ gnome
+ quick

## excalibur-math-sequence
Модуль различных числовых последовательностей.
```html
<script src="js/excalibur-math-sequence.js"></script>
```
E.Math.sequence [source](src/js/excalibur-math-sequence.js)
+ fibonacci
+ prime
