---
title: "Opening the box: things I learned while learning about sockets"
date: 2013-03-21T12:00:00-04:00
archived: true
---

One of the pieces of advice we were given at the beginning of Hacker School was "open the box"---that is, don't blindly use things in your programming projects without any idea of how they work. Don't gloss over things you don't understand, take the time to learn more about them. Feeling encouraged to really deepen your level of understanding (and having the time to do so!) is one of the best things about Hacker School's focus on learning and becoming a better programmer.

One of my Hacker School goals is to fill in the gaps and fuzzy patches in my understanding of the web stack and how the Web works. Towards that end, this week I read through Jesse Storimer's [Working with TCP Sockets](http://workingwithtcpsockets.com/).

I kept track of all of the unfamiliar topics I found myself investigating further while reading through the book and writing my own code based on his examples. I'd probably never finish this post if I wrote out explanations of each of these things, but even just the list is interesting.

### Things I learned while learning about sockets

- the TCP urgent flag (that no one ever uses)
- some of the differences between the MRI, JRuby and Rubinius implementations of Ruby
- Ruby functions that were new to me: `pack`, `unpack`, `exit`
- C's fixed-width integer data type
- binary representation of text
- the concepts big-endian and little-endian
- 4 bits (half a byte) is a 'nibble' (Cute.)
- the difference between threads and processes
- the FTP specification
- POSIX signals (and capturing them in Ruby scripts)

In the same vein as this, [Sasha Laundy](http://www.sashalaundy.com) has a great [post about how she learned all kinds of things while trying to fix a bug in Octopress](http://blog.sashalaundy.com/blog/2013/03/25/on-rakefiles-and-rabbit-holes/).
