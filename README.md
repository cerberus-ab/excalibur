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
[source](src/js/excalibur-array-sort.js)

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
+ merge
+ shell

## excalibur-math-sequence
[source](src/js/excalibur-math-sequence.js)

Модуль различных числовых последовательностей.
```html
<script src="js/excalibur.js"></script>
<script src="js/excalibur-math-sequence.js"></script>
```
E.Math.sequence
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
+ E.Pattern (module)
+ E.Coding (core)
+ E.Coding.base64 (module)
