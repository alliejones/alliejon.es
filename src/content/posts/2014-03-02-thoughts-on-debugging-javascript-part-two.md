---
title: "Thoughts on debugging JavaScript, part two"
date: 2014-03-02T12:00:00-04:00
archived: true
---

import { Link } from "gatsby";

Following up my [dev tools lovefest](/blog/2014/02/23/thoughts-on-debugging-javascript/), I have some more advice on debugging JavaScript, including some approaches I find helpful and editor features worth learning. First, some strategy:

## Develop a theory

Starting the process of tracking down a bug can be overwhelming if you're working on code you're unfamiliar with, either because you've never seen it before or because you wrote it months ago and have completely forgotten about its details. It is easy (for me, anyway) to feel paralyzed by not even knowing how things were _intended_ to work or how all of the pieces fit together, let alone what component is now causing problems.

One approach I find helpful in this situation is to invent a theory about what's causing the bug, and attempt to confirm or disprove that specific explanation. I say "invent" because, while a plausible theory helps, pretty much any reasonable one will suggest some concrete details of the code you need to investigate.

For example, say I've been given a bug where a particular widget in the application isn't rendering. My first theory might be, "Maybe the ajax request to the API isn't returning data in the correct format", or "I wonder if the render function isn't getting called for some reason", or "My coworker made some changes to the template function recently, something weird could be happening there".

The point isn't to guess correctly on the first try, but instead to start digging through the low-level details of the code. It is much easier to do that with a working theory that suggests specific questions like, "Where in this code does the widget's render function get called?" or "What data format is this widget expecting?". You might not have been (probably weren't, even) right, but in finding that out you've learned a lot about how everything works, and you're better positioned to develop your next theory, which will likely be more accurate.

A bonus benefit of this approach is that as you continue to use it and your familiarity with the code you're working on increases, your intuition about what is causing a bug improves, and your first guess _will_ be right more often.

## Break things

The code you're working on is (I sincerely hope) under version control, which is awesome, because it means you're free to break everything in your quest to fix things. Restoring order afterwards is as easy as running `git reset`.

When I first started working on a production application with a team of other developers, I was afraid to touch core parts of the code, because _what if I ruined everything?!_ But don't be timid&mdash;just because committing that change would break all kinds of things doesn't mean you can't do it in your development environment.

When you're learning a complicated system, it can really help a lot to sprinkle around `console.log`s with abandon, or comment out a critical function call just to see what fails. Sometimes I will comment out everything and try to "rebuild" it by re-enabling components piece-by-piece, to better understand how the parts work together and depend on each other.

As a caveat, this does require some knowledge of which parts of your dev environment might be shared or not revertable (there may be things you really shouldn't mess with, like a shared database), but my point stands.

## Use a linter

Save yourself from losing hours of your life to typos and hard-to-spot errors ([IE trailing comma bug](http://trailingcomma.com/), anybody?) and let a linter find them for you.

I use Sublime Text with the [Sublime-JSHint package](https://github.com/victorporof/Sublime-JSHint) to show lint errors as I type. (This also saves a lot of time I'd otherwise spend reloading the app I'm working on only to get a syntax error because I forgot a curly brace.) But you use whatever works for you and your editor of choice.

Running JSHint on an older codebase or one without consistent style conventions for the first time might make you want to cry, but persevere. You don't have to fix every single warning just because it's there. (I say this for my own benefit as much as yours, trust me. I also suggest making a very lenient `.jshintrc` that disables the rules that are more like style preferences and only checks the likely-to-cause-bugs ones.)

The first time JSHint finds a case statement that's falling through accidentally or a variable that's being unintentionally reused and causing mysterious problems, it will totally be worth it.

## Learn your editor

As previously established in the first installment of this advice, I love nerding out over tools, and this is another instance of that. But learning how to move around a large codebase quickly is ridiculously helpful when debugging, and well worth the time spent learning some of the intricacies of your editor.

My editor of choice is Sublime Text 3 in Vintage mode (yay vim keybindings), and these are the commands I use all the time while debugging. I'm including the Sublime shortcuts for these since I know them, but most editors probably have similar features.

- **Fuzzy file matching**&nbsp; `Cmd-P`  
  Look up a file based on a partial filepath. Saves so much time when you're looking for `SomeWidgetView.js` but you're not entirely sure where in the repo it lives.
- **Function search**&nbsp; `Cmd-P`, then type `@`  
  List all of the functions in a file (and search them, if you start typing a function name after the `@`). A good way to get an overview of a giant file you're unfamiliar with.
- **Search within a file, jump to a line number**&nbsp; `/` and `gg<line>` (specific to Vintage mode)  
  Become familiar enough with these that they're automatic, so that answering a question like, "Huh, where else does this function get used?" or looking at the line with a syntax error is frictionless.
- **Go to definition**&nbsp; `Opt-Cmd-↓`  
  Jump right to the definition of a function. I've had mixed results as far as this actually working in ST, but it saves a lot of digging when it does.

## Leave a path behind you

Once you've spent twenty minutes puzzling out exactly _what_ data that `getData()` function retrieves and why, do future debuggers a favor and leave a comment documenting your findings. If making another person's task much easier in the future isn't motivating enough, consider that the person debugging next time is very likely to be you (especially now that you've become the dev who fixed a bug in this code most recently). Or that if you can't finish this task today, you might have to figure this out again when you come back to the code tomorrow.

If another dev gives you a helpful explanation of how a library works or lets you know about a quirk of the framework on IRC or via email, take a minute to clean it up and post it on the dev wiki or wherever other devs can access it. It doesn't require a lot of time and it is definitely worth it.
