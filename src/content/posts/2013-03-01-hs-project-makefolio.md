---
title: "HS Project: Makefolio"
date: 2013-03-01T12:00:00-04:00
archived: true
---

For my first project at Hacker School, I decided to build a static site generator for portfolios. (Wondering what a static site generator is? Here's a [pretty good explanation](http://www.odopod.com/blog/introduction-static-website-generators/).)

I have attempted to migrate [my portfolio](http://alliejon.es/) to a few different static site generators without success. (I think the one I got farthest with was [Punch](http://laktek.github.com/punch/), but I still ran into trouble.) My format of mostly images with a small amount of text was just not the sort of the website most generators' authors had in mind, so trying to shoehorn my existing website into their format was difficult.

Writing a site generator that handled collections of images well seemed like both a way to solve my problem and a perfectly-sized challenge. I wasn't totally sure how to accomplish it, but I had a general idea and a specific end goal in mind: being able to generate my current site using the tool I would write.

## My goals

### Get more comfortable with Ruby

Prior to this project, I'd written enough Ruby to know that I liked it, but hadn't built anything substantial. This was a great way to get more familar with the language (especially without the added complexity of Rails). Having other Hacker Schoolers review my code and suggest more Ruby-like ways to do things was incredibly helpful too.

### Gain more experience structuring applications

Most of my previous programming experience involved working with pre-existing frameworks, and I want more experience making the structural decisions neccessary when building software from (mostly) scratch.

### Try test-driven development

I think I'm a convert! Though I felt like I was spending far too much time writing tests and trying to understand Rspec at the beginning of the project, by the mid-point I was so glad I had taken the time to write them. It felt great to be able to dramatically refactor things and know I hadn't broken everything. (A big benefit to my other goal of getting more experience organizing my code!)

### Better understand how templating works

I have more to do on this one. I used basic ERB templates, but I can't say I really understand what is happening when I pass a Ruby `Binding` object to a template. Something to investigate further.

## Other things I learned

This was the first time I've tried to write a thorough README for something I've made, and I was surprised at how well it clarified what I wanted Makefolio to do. Multiple features and improvements occurred to me as I was writing. (I now have a better appreciation of Amazon's [press release first](http://www.allthingsdistributed.com/2006/11/working_backwards.html) method of product development!)
