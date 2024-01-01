---
title: "Javascript: String.replace()"
date: 2014-02-09T12:00:00-04:00
archived: true
---

I've always used `String.replace()` in Javascript pretty much like this:

```js
"Some <foo>".replace("<foo>", "bar");
// 'Some bar'
```

Or with a regular expression if I was feeling fancy or the pattern to match was more complex:

```js
"Some <foo>".replace(/<\w+>/, "bar");
// 'Some bar'

"Some <baz> and a bit of <foo>".replace(/<\w+>/g, "bar");
// 'Some bar and a bit of bar'
```

What I didn't realize until this week is that you can also [pass a callback function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_function_as_a_parameter) to `replace()`, which makes it possible to perform more complicated (and also possibly easier to follow) manipulation of the matched portions of the string before they're replaced.

You could even use this to create a super simple (and, sure, probably inadvisable) templating system:

```js
var variables = { foo: "one", bar: "two", baz: "sea" };
var template = "{{foo}} if by land, {{bar}} if by {{baz}}";

template.replace(/\{\{(\w+)\}\}/g, function (match, group, offset, string) {
  return variables[group];
});
// 'one if by land, two if by sea'
```

The function is called once for each match within the string, and each parenthesized group in the match gets passed as a parameter to the callback function (which does mean the number of function parameters is variable, based on how many groups you have in your regular expression). Here I've used grouping to pull out the variable name inside the `&lcub;&lcub; &rcub;&rcub;` delimiters and use it as an object property.

Not a Javascript feature I will use every day, but definitely one that will come in handy occasionally (and most likely be much cleaner than whatever code I might have written without it).
