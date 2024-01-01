---
title: "Adding syntax highlighting to knitting patterns"
date: 2014-03-23T12:00:00-04:00
layout: "@layouts/posts/PrismKnittingLayout.astro"
---

A few weeks ago a coworker sent me [Karen Shoop's awesome essay about the similarities between knitting patterns and regular expressions](http://www.cs4fn.org/regularexpressions/knitters.php). While thinking about that, as well the as the knitting chart generator I'm going to make someday, really, it occurred to me that syntax highlighting knitting patterns could be genuinely useful. So I tried it!

If you're not familiar with knitting patterns, they use a semi-standardized set of symbols and shorthand to record exactly how to recreate a particular texture or garment. The pattern will tell you things like how many stitches you need, what sort of stich to make and when and how to add or remove stitches.

For example, here's the top of a sock I'm working on. The top of the cuff looks different than the rest, which is the result of a different pattern of stitches. (There are two kinds of stitches in knitting, knit and purl, though they are really the same stitch flipped 180 degrees&mdash;the back of a knit stitch looks like a purl stitch, and vice versa.)

![knit sock stitches](@assets/knit-sock.jpg)

The knitting pattern abbreviation for the cuff (at the top of the photo) is this:

```
k1 p1 until end of round
```

That translates to "knit one stitch, then purl one stitch, then knit, then purl ... until you get back to where you started". (This sock is being knit as a tube, hence "round".)

Instructions for the lower part of the sock are like this:

```
k3 p1 until end of round
```

Almost the same, but with a different ratio of knits and purls, which makes a different texture.

For another example, here's a closeup of a hat I made. Same two stitches, but in more complicated patterns:

![knit hat stitches](@assets/knit-hat.jpg)

A section of that hat's texture (the diagonal stripes) would be transcribed like this:

```
k2, p2 to end of round.
k1, (p2, k2) to 3 sts before end of round, p2, k1
(p2, k2) to end of round
p1, (k2, p2) to 3 sts before end of round, k2, p1
```

So you can see how that starts to get more challenging to read and follow. (The parentheses indicate a series of stitches you should repeat.)

Wikipedia has [an interesting taxonomy of the kinds of knitting abbreviations](http://en.wikipedia.org/wiki/Knitting_abbreviations), but that didn't seem like the most practical way to highlight the different portions of knitting pattern instructions. Instead I thought about the things that most often cause me to make an error while following a pattern, the parts that should be more distinct from each other while reading. I came up with this list:

- which kind of stitch to make (knit or purl)
- portions of the pattern that repeat
- adding or removing stitches

I wasn't really interested in writing my own syntax highlighter (yet, anyway), so I used [Prism.js](http://prismjs.com/) and wrote my own knitting pattern language definition, giving each of those pattern features their own distinct color. (And, in a neat circling back around to the essay I linked to at the beginning of this post, I used regular expressions to do so!)

Here's the more complicated pattern from above, this time with syntax highlighting:

<pre><code class="language-knitting">k2, p2 to end of round.
k1, (p2, k2) to 3 sts before end of round, p2, k1
(p2, k2) to end of round
p1, (k2, p2) to 3 sts before end of rnd, k2, p1
</code></pre>

Much easier to read, I think!

For another, more complicated, example, here's a portion of [this lace tank top pattern](http://www.knitty.com/ISSUEss14/PATTfiftyfifty.php). This pattern includes increasing and decreasing stitches (the abbreviations in teal and yellow), and repeated instructions (in orange).

<pre><code class="language-knitting">k2, p2 to end of round.
Rnd 1: K1, *k4, sl1, k1, sl1, k5; rep from * to last st, k1.
Rnd 2: K1, *k3, k2tog, yo, k1, yo, ssk, k4; rep from * to last st, k1.
Rnd 3: K1, *(k3, sl1) twice, k4; rep from * to last st, k1.
Rnd 4: K1, *k2, k2tog, yo, k3, yo, ssk, k3; rep from * to last st, k1.
Rnd 5: K1, *k2, sl1, k5, sl1, k3; rep from * to last st, k1.
Rnd 6: K1, *k1, k2tog, yo, k5, yo, ssk, k2; rep from * to last st, k1.
Rnd 7: K1, *(k1, sl1, k2, sl1) twice, k2; rep from * to last st, k1.
Rnd 8: K1, *k2tog, yo, k1, yo, ssk, k1; rep from * to last st, k1.
Rnd 9: K1, *sl1, k3, k1tbl, sl1, k4, sl1, k1; rep from * to last st, k1.
Rnd 10: K2tog, *yo, k3, yo, sl1, k2tog, psso; rep from * to last 6 sts, yo, k3, yo, ssk, k1.
Rnds 11-12: Knit.
</code></pre>

I've put my (pretty simple) language definition [up on Github](https://github.com/alliejones/prism-knitting), if you're interested in trying it out. I'm sure there is room for improvement in the regexes I've written, though this was definitely a great way to get practice with writing more complex ones than I typically do.
