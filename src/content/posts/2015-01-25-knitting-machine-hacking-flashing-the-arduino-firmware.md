---
title: "Knitting machine hacking: flashing the Arduino firmware"
date: 2015-01-25T12:00:00-04:00
---

_Wondering what this is about? See [the introduction](/blog/2014/12/02/adventures-in-knitting-machine-hacking/) to my knitting machine hacking adventures._

Successfully flashing the firmware on my Arduino so I could use my AYAB shield took a bit of fiddling, especially because I'm running OSX instead of Linux.

I'll list the straightforward (as I can manage) steps that actually worked first, for anyone else trying to do this, and the messy narrative version afterwards (since that's the fun/infuriating part!).

If you use these instructions and run into problems, or have suggestions for improvements, please get in touch! I'm happy to help though I'm far from expert in these things (so while I hope these instructions won't mess up your Arduino, I definitely can't promise that). This is what worked for me, though.

## How to install AYAB Arduino firmware on OSX

AYAB comes with a Python-based GUI, but I couldn't get it to run successfully on my OSX machine, and it isn't neccessary for flashing the Arduino firmware anyway. These instructions explain how to get the firmware image and use `avrdude` to flash the firmware from the command line.

I did this on OSX Yosemite (10.10) but my guess is it would work fine on any relatively recent version of OSX.

1. **Install `avrdude` 5.x (I used 5.11.1 specifically)**  
   Homebrew only has a formula for `avrdude` 6.x, but if you don't want to build `avrdude` yourself, an older version is downloadable from Objective Development as part of their CrossPack toolkit. You need the `2012-11-28` release. Here is a [direct link to the dmg file](http://www.obdev.at/downloads/crosspack/CrossPack-AVR-20121128.dmg).

2. **Download or clone [the AYAB software repo](https://bitbucket.org/chris007de/ayab-apparat/)**

3. **Find and edit `avrdude.conf` or download a corrected version**
   The `avrdude` config provided by AYAB won't work when used on a computer without parallel ports (which I'm pretty sure means any modern Mac).

   I put the [modified version I used](https://gist.github.com/alliejones/022b9d3cc422bdc8bf36) on Github if you'd like to download it.

   Alternately, to edit it yourself, find the config file in the repo at `/plugins/ayab_plugin/firmware/avrdude.conf`. Do a search and replace on this file, replacing any instances of `par;` with `serbb;`. (Thanks to [this Arduino forum post](http://forum.arduino.cc/index.php?topic=49229.0) for this fix.)

4. **Find `firmware.hex` in the AYAB repo**  
   The path relative to the AYAB repo root directory is `/software/python/ayab/plugins/ayab_plugin/firmware/[KNITTING MACHINE MODEL]/[ARDUINO TYPE]/firmware.hex`. You'll need to pick the directories that match your knitting machine and Arudino. There are different files for the different combinations.

5. **Determine which USB port your Arduino is connected to**
   Your Arduino needs to be connected to your computer via the USB cable for this command to work (and for the firmware flashing you will be doing shortly!).
   Running `ls /dev/tty.usbmodem*` should show you the correct serial port. (I think this is dependent on your OS version and Arduino model, so you may have to do a bit of Googling if this specific command doesn't work.)

6. **Actually flash your firmware!**  
   Now you should have collected all of the information you'll need. Here's the avrdude command to run: `avrdude -v -p atmega328p -C "[PATH TO AVRDUDE.CONF]" -c arduino -P [ARDUINO SERIAL PORT] -b115200 -D -Uflash:w:"[PATH TO FIRMWARE.HEX]":i`
   A note: I have an Arduino Uno, and you _may_ have to change the `-p atmega328p` too if you're using an Arduino Mega, but I'm not sure.

So if all goes well, avrdude should do its thing and flash the firmware, and you're ready to install your AYAB shield, yay!

## How I figured all this out

In short: trial and error and a lot of Googling. (As with so many things!)

My previous Arduino experiments have been at the "making an LED blink" level, just to give you an idea of my familiarity with hardware things (and to explain all my fumbling around).

I started by trying to get the AYAB GUI to run on OSX, since it has a firmware flashing utility built in, but after an hour or so of fiddling with Python dependencies and trying to figure out how to install what it was was missing, I decided this wasn't going to be a very productive direction.

Instead, I set up a Linux VM using Parallels (though I bet you could use VirtualBox for this too) and installed the GUI in that. This was much less painful and following the AYAB-provided instructions seemed to work.

This turned out to not be the case with the firmware flashing utility, however. The main part of the application, which you use to control the knitting machine once everything is set up, worked fine. But trying to run the firmware utility just gave me an error.

I'm not sure if using a virtual machine for firmware flashing would have worked, because I never got that far. Using `pip` to install AYAB (as per the instructions) doesn't seem to install the `avrdude` utility the GUI runs behind the scenes, so it fails to do anything.

I figured this out from error messages in the debugging console that opens with the GUI, once I realized the console was actually providing me with useful information.

`avrdude` _does_ seem to be in the repo, so I spent a while trying to manually copy it to the right directory so that the AYAB GUI could find it, but for whatever reason I couldn't get this to work. While I was trying this, though, I realized that the console error messages also showed me exactly what the GUI was trying to do for me, which was run `avrdude` with a bunch of arguments.

A little bit of research into what `avrdude` does (since I'd never heard of it before) confirmed that running it was probably all I needed to do, and showed me what files from the AYAB repo I needed. (The command the GUI runs is the one I provide above in the step-by-step directions.)

And so I saved a copy of that command, and tried installing `avrdude` on OSX! (OSX because I'm not a very efficient Linux user, and I was worried the virtual machine stuff would mess things up.)

Homebrew's version of `avrdude` didn't like the config file from the AYAB repo, and then I realized that the `avrdude` version provided by AYAB was 5.x and Homebrew's was 6.x---that seemed likely to be source of the problem. Since the `avrdude.conf` file was huge and I wasn't entirely sure which parts were relevant or really what it was doing at all, I guessed it would be easier to try and find an older, compatible version rather than update the config for the new version.

After rummaging through a bunch of tutorials and search results and seeing if I could build an 5.x version of `avrdude` from source (nope) I eventually found the old version of CrossPack I linked to in my instructions.

Now I had a running, hopefully-compatible version of `avrdude`! So close! And yet still not quite there apparently!

Running `avrdude` with all the right (I hoped) arguments and file paths gave me the mysterious errors `parallel port access not available in this configuration` and `programmer type not specified`. Googling those errors turned up [this forum post](http://forum.arduino.cc/index.php?topic=49229.0) which seemed to describe exactly the problem I was having (and my laptop certainly doesn't have a parallel port), so I tried the suggested solution.

And with that last change, it worked! `avrdude` ran for a minute or two and then I had a newly-flashed Arduino.

In retrospect, it is hilarious that I thought "just" buying an Arduino shield for my knitting machine might be too simple a project, and I wouldn't feel very accomplished getting it to work. Definitely not the case! I felt pretty damn victorious by the time I was done with this part of the process.

Next up: installing the Arduino in the knitting machine and the moment of truth!
