---
title: "Adventures in knitting machine hacking"
date: 2014-12-02T12:00:00-04:00
---

My love of combining technology and textiles is well-documented already, so it is likely unsurprising I've had my eye on knitting machine hacks for a while.

Knitting machines are strange beasts. The most common ones, the machines I am familiar with, were made by Brother in the 70s and 80s for home knitters and are no longer manufactured. In [college](http://www.risd.edu/academics/textiles/) I took two semesters of knitting classes[^1] that used them, and they are odd and finicky and it isn't surprising they never quite caught on. They make fabric much faster than hand-knitting, but they also require a lot of skill to operate and they really aren't anything close to automatic.

You can still do a lot of neat things with them, though, and they are a much more accessible textile-making tool than many of the others I learned to use. (Maybe someday I'll have my own loom for weaving, but that seems pretty unlikely to happen while I live in a New York apartment.)

As far as hacks go, [Becky Stern's](https://learn.adafruit.com/electroknit) is probably the most well-known, but I found this disclaimer pretty intimidating[^2] (and I can use knitting machines and Python already!):

> Working with these machines is very difficult. Before you begin, look at your life, and what choices brought you to this point. Are you proficient at using the knitting machine's normal functions? Can you read and run Python scripts? Have you ever done any serial communication between your computer and another device before? If you answered "no" to any of these questions, work on these skills first before attempting to follow this guide.

I don't have any hardware skills, and tackling a modification to an expensive knitting machine as a first project seems likely to end poorly.

Happily, some enterprising German hackers made an alternative knitting machine hack that seemed more approachable to my intimidated-by-hardware self. [All Yarns Are Beautiful](http://ayab-knitting.com/) designed an Arduino shield that interfaces with electronic Brother machines. Even better, the process is nondestructive and reversible, _and_ it supports a less expensive model than the 930e used in the Adafruit hack.

A few weeks ago I finally decided I wanted to make my own hacked machine, despite my fear I would buy all these parts and ultimately get nowhere. I got lucky and found a Brother 910 with a broken card reader on EBay. The 910 originally read patterns off of mylar cards, which meant the pattern functions were unusable, but made it perfect for my purposes---the AYAB Arduino replaces that component completely.

This week the machine and the shield arrived, and I've made a lot of progress! I've been keeping notes and will be following up this post with others about the whole process. (And, hopefully, some finished products!)

If you'd like to see a Brother 910 in action, I found [this cool video of Karen Allen demonstrating how she uses one to make sweaters](http://www.marthastewart.com/article/karen-allen-fiber-arts#ooid=tucG9lMjpDBHTAjkgKVoOjIbbCJFL5KT). (Though she's using the original card reader for patterns, she's done some knit hacking too! I've never seen someone use two carriages at once to knit with that many colors.)

[^1]: How cool is it you can study this in college? I still think it's amazing. (Probably moreso now that I am not fighting with knitting machines at 2am though, hah.)
[^2]: Having now attempted this project, I will say the disclaimer isn't _wrong_ exactly, but I think you can do fine with two skills out of three. I would say one of those skills should be using a knitting machine, though, since they can be tricky enough on their own without the complication of a hack.
