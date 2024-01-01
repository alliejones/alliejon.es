---
title: "Getting started with Grunt"
date: 2013-04-04T12:00:00-04:00
archived: true
---

I love [Grunt](http://gruntjs.com/). I wouldn't want to work on a JavaScript project much bigger than a file or two without it, now that I've realized how much time and hassle it saves me.

But getting started using it involves a lot of friction. Even though I'm familiar with the tool I still drag my feet setting it up on a new project.

Yesterday, so that I would no longer have this problem, I created a template Gruntfile for myself. It contains the tasks I use on nearly every project:

- JavaScript linting (with JSHint)
- file concatenation and compression (using Uglify)
- file watching (so that I don't have to invoke Grunt manually every time I change a file)
- Growl notifications for warnings and errors (so you don't have to waste screen space keeping your terminal visible)

With the exception of Growl, these are all official Grunt packages.

This would be a great starter configuration for someone new to Grunt, and once you have this setup working it is easy to find and add new tasks. Using it is pretty straightforward, but I'll explain the important details below. (I've also saved this file [as a gist](https://gist.github.com/alliejones/5306809) if you want to save your own changes.)

```js
module.exports = function (grunt) {
  var defaultTasks = ["jshint", "concat", "uglify"]; // used for watch as well

  var files = [
    /* your source files */
  ];

  grunt.initConfig({
    jshint: { all: files.concat(["Gruntfile.js"]) },

    concat: {
      all: {
        src: files,
        dest: "project.all.js",
      },
    },

    uglify: {
      all: { files: { "project.min.js": files } },
    },

    watch: {
      all: {
        files: files,
        tasks: defaultTasks,
        options: { debounceDelay: 250 },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("default", defaultTasks);

  var growl = require("growl");

  ["warn", "fatal"].forEach(function (level) {
    grunt.util.hooker.hook(grunt.fail, level, function (opt) {
      growl(opt.name, {
        title: opt.message,
        image: "Console",
      });
    });
  });
};
```

A note: These instructions assume you are using OSX.

### Requirements

Grunt requires [Node.js and npm](http://nodejs.org/) to be installed (npm, Node's package manager, is included in the Node installer).

Grunt comes in two parts, one that only needs to be installed once and a second that is installed for each project.

The first time you set up Grunt, you should run `npm -g install grunt-cli`. This makes the `grunt` command available on your system. ([More information here](http://gruntjs.com/getting-started#how-the-cli-works).)

Then, from the root directory of the project you'd like to use Grunt with, run the following to install the packages you need via npm:

```bash
npm install grunt
npm install grunt-contrib-concat
npm install grunt-contrib-uglify
npm install grunt-contrib-watch
npm install grunt-contrib-jshint
npm install growl
```

The Growl notifications also require that Growl be installed, as well as the Growl command line tool `growlnotify` ([downloadable here](http://growl.info/downloads#generaldownloads)).

### Configuration

You should save the Gruntfile to your project's root directory with the filename `Gruntfile.js`.

Gruntfiles are just JavaScript, so you can use variables and functions as you normally would. I've set up this Gruntfile so that you only have to specify the locations of your project's JavaScript files once, at the top of the file.

```js
var files = ["main.js", "src/**/*.js"];
```

This array of file paths will be passed to each Grunt task automatically. Grunt supports glob paths as well (so `src/**/*.js` will include every file with the extension `.js` in any subfolder of `src`).

If you need specify files in a more particular fashion, the [supported syntax](http://gruntjs.com/configuring-tasks#files) is extremely flexible and powerful, but I rarely find myself needing that much complexity.

To actually use the tasks you've configured, run `grunt watch` from the root directory of your project. Your JavaScript files will be automatically checked for errors, concatenated and minified each time you modify a file, and your JavaScript build process will be much less tedious!
