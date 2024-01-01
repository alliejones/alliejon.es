---
title: "JavaScript function statements vs. function expressions"
date: 2013-02-19T12:00:00-04:00
archived: true
---

I was talking about JavaScript scope today (and how, when first learning the language, I assumed JS had block rather than functional scope and was often confused). That reminded me of a seemingly-strange Javascript behavior I had discovered previously.

When declaring functions, this works:

```js
function two() {
  one();
}
two();
function one() {
  console.log("one!");
}
```

But this does not (throwing the error `one is not a function`):

```js
var two = function () {
  one();
};
two();
var one = function () {
  console.log("one!");
};
```

(I had trouble finding a concise way to describe these two methods of creating a function, but _JavaScript: The Good Parts_ enlightened me: function statements and function expressions.)

This behavior happens because when JavaScript initially parses a file, it evaluates all of the function statements first, before executing anything. So a named function (a function statement) is always available before any code is executed, regardless of where the function appears in a file. An anonymous function assigned to a variable is only available after the variable is defined and assigned the function.

[Daniel Mendel](http://danielmendel.github.com), fellow Hacker Schooler, talked through this with me and also wrote [a blog post about it](http://danielmendel.github.com/blog/2013/02/20/cool-stuff-i-learned-doing-code-review/).
