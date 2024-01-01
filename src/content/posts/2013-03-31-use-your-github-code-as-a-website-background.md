---
title: "Use your Github code as a website background"
date: 2013-03-31T12:00:00-04:00
archived: true
---

I've been thinking about the best way to add my Hacker School projects to my portfolio. Prior to the past six weeks, I haven't written much code I could share publicly, and most of my projects included enough design that it wasn't difficult to create a representative screenshot. That's not the case with everything I'm working on now.

Displaying the source code itself seemed like a good possible solution---maybe not _quite_ as interesting as images, but not bad. But I didn't want to have to copy and paste code or clutter up my HTML with what would be essentially decorative text.

## The final product

<pre class="codepen" data-height="300" data-type="result" data-href="vExdA" data-user="alliejones" data-safe="true"><code></code><a href="https://codepen.io/alliejones/pen/vExdA">Check out this Pen!</a></pre>
<script async src="https://codepen.io/assets/embed/ei.js"></script>

## Loading the source code

My first thought was to use a `<script>` tag, similar to the way JavaScript templates can be embedded in a page. Something like this.

```html
<script type="text" src="/path/to/code.rb"></script>
```

That doesn't work, however. JavaScript can't access the script tag's contents unless the code is embedded in the page, rather than linked, so I'd still have to copy and paste. (There may be other problems with this approach, too, but I didn't pursue it any further.)

I then realized that Github has an API, and most of my code is already hosted there, so I wouldn't even have to do any extra work to make the source accessible. Perfect.

[Github's API](http://developer.github.com/v3/) supports [JSONP](http://en.wikipedia.org/wiki/JSONP), so you can access it via JavaScript from any domain. (I just learned recently that jQuery includes support for JSONP AJAX requests. It handles the callback function for you so that a JSONP request can be treated like a normal AJAX request.)

```js
$.getJSON(
  "https://api.github.com/repos/alliejones/makefolio/contents/lib/makefolio/project.rb?callback=?",
  function (response) {
    var code = Base64.decode(response.data.content);
    $("div").attr("data-code", code); // see below
  }
);
```

The one complication is that the file contents are base-64 encoded in Github's response, so I had to find [a JavaScript base-64 decoding library that supported utf-8](https://github.com/dankogai/js-base64/). (Only Firefox has built in functions to encode/decode base-64 data, and even it [requires a workaround for utf-8](https://developer.mozilla.org/en-US/docs/DOM/window.btoa#Unicode_Strings).)

## Getting it on the page with CSS

Using a pseudo-element seemed like the best approach in this case, since I'm creating a largely decorative effect and trying to avoid having to change the structure of my HTML.

By combining the `attr()` [CSS expression](https://developer.mozilla.org/en-US/docs/CSS/attr), CSS generated content and a [custom data attribute](http://html5doctor.com/html5-custom-data-attributes/), you can set the contents of a pseudo element to pretty much any text.

When `attr()` is applied to a pseudo-element, its context is the pseudo-element's parent element, so the data attribute should be set on the original, content-containing element. The custom data attribute doesn't even need to exist in the HTML---it can be added via jQuery, as I'm doing in my AJAX request callback.

```js
$("div").attr("data-code", code);
```

(An aside: jQuery includes a [`data`](http://api.jquery.com/data/) function that can be used to _access_ custom data attributes that have been set on HTML elements, but using that function to _set_ custom data doesn't update the DOM, so it won't work in this case.)

With a few additional CSS properties to set the appropriate monospaced font and place our background text behind the actual content, this is ready for whatever additional styling you might like to add.

```css
div {
  position: relative;
}

div:after {
  content: attr(data-code);
  font-family: monospace;
  top: 0;
  left: 0;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
  position: absolute;
  white-space: pre;
  z-index: -1;
}
```

It isn't possible to have syntax highlighted code with this particular CSS approach, because the `content` property only supports plain text. I'm okay with single-color code in this case, and didn't want to deal with integrating a code highlighting library as well, but you could probably wrangle something by adding the extra HTML elements containing your highlighted code to the page via JavaScript.

## Additional considerations

### Don't use Github as a CDN

The first version of my sample on Codepen was broken in Chrome Canary for a reason unrelated to what I was ultimately trying to achieve. Out of laziness, I was linking to a base-64 decoding library hosted on `raw.github.com`, and Canary refused to load it.

Github serves raw source code files with the MIME type of `text/plain` and the HTTP header `X-Content-Type-Options: nosniff`. That header was new to me, but it is basically a request from the server that browsers accept the MIME type specified, rather than trying to guess what type of file they may be receiving. The end result is that browsers that respect the `nosniff` header won't execute JavaScript code sent as `text/plain`. (Github does this because they'd prefer you didn't hotlink to raw source code in a repository, which seems pretty reasonable.)

This is a recent change in Canary that will eventually make its way to Chrome. IE already supports `nosniff` and Firefox is planning to do so. There's [a Chromium issue](https://code.google.com/p/chromium/issues/detail?id=180007) that explains further.

### Browser support and accessibility

Browser support for this isn't bad (Webkit, Firefox, IE 10), though since the source code is loaded asynchronously (and therefore doesn't block the page from rendering) and this is really just a cool detail rather than critical content, it degrades nicely in older browsers.

Github's API is only available over HTTPS, so some browsers may refuse to make the AJAX request if the initiating page was loaded over HTTP. (This may be why it doesn't work in earlier versions of IE, but I'm not sure.)

CSS generated content is printed by default, so the code should probably be hidden in a print stylesheet. Apparently [screenreaders' behavior with pseudo-elements](http://www.456bereastreet.com/archive/201205/css_generated_content_and_screen_readers/) varies widely, so I'm not sure what the best solution to that would be.
