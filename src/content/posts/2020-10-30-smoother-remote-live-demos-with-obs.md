---
title: "Smoother remote live demos with OBS"
date: 2020-10-30T12:00:00-04:00
archived: true
---

Like the rest of the world, I've been doing a lot more communication over video chat in 2020. I've had remote teammates for a long time, so not much has changed with how I communicate with coworkers. My volunteering, however, feels totally different: for the past few years I have helped teach web development to high school students through [CodeNation](https://codenation.org/), and this is the first school year the class has been entirely over video rather than in-person in a classroom.

Teaching effectively requires a lot of skill, and teaching remotely feels even more challenging! (I hope this isn't news to anyone.) Technology can't fix most of the challenges, but I still couldn't resist experimenting with my setup to make presenting and coding remotely a little easier. I went into this thinking I was just indulging myself in some fun yak-shaving, but I was pleasantly surprised at how little fuss a better setup required, so I'm documenting it here in case other folks find it useful! (And though I've been using it for teaching so far, this may end up upping my work presentation standards too ...)

My goal was to make it easy to switch between slides in presentation mode and a code editor ([Glitch](https://glitch.com/) in the browser, in my case, but this would work just as well for a standalone program) without having to share my entire screen. This means I can keep a class schedule, presenter notes, the meeting chat and whatever else visible on my own screen without showing them to everyone. I'm not dealing with audio setup here because it's not neccessary in Zoom; you can continue to use your regular webcam and audio.

[OBS](https://obsproject.com/) (yes, the same program Twitch streamers use) makes this pretty easy! And while I haven't even scratched the surface of all the fancy things you can do with OBS, once you have this set up it should be straightforward to experiment with fancier things. I'm assuming you're using OSX and presenting over Zoom in these instructions, but the general approach should work for other OSes and conferencing software too.

There are only a few setup steps:

1. Install OBS and a virtual camera plugin
2. Configure your "scenes" (the different sections of your screen you'd like to display)
3. Share the virtual camera in Zoom
4. Present!

### Installing OBS

[Download OBS from the project's website](https://obsproject.com/) and install it.

OBS for Windows comes with a virtual camera plugin pre-installed, but you need to download a separate plugin for OSX. I used [obs-mac-virtualcam](https://github.com/johnboiles/obs-mac-virtualcam). Download the latest `.pkg` file from the [releases page](https://github.com/johnboiles/obs-mac-virtualcam/releases) and install it as well.

When you start OBS for the first time, it will ask you about what preset settings you'd like. You can cancel out of this window, it doesn't really matter for this setup.

### Set up your scenes

OBS lets you combine a bunch of different input sources into one video output. For this simple setup (switching between two application windows) you only need to use "window capture", but it's worth experimenting with some of the other options! You can display the output of a specific web URL or add a nice background image or webcam feed pretty easily.

To add a new scene:

- Make sure the "Scenes" tab is selected (you should see this in the lower left of the OBS interface by default).
- Click the "+" button and name your scene something that makes sense to you (I usually pick something like "Slides" and "Browser").
- Then click the "Sources" tab, click "+" again and select "Window Capture" from the dropdown.
- Choose "Create new" and then, in the "Properties" dialog that opens, choose the window you want for your first scene.  
  If you can't tell windows apart from their titles, selecting a window will show you a preview. If you just see a list of windows named "void" or it seems like things are missing, you may need to [grant OBS access to screen recording](https://support.apple.com/guide/mac-help/control-access-to-screen-recording-on-mac-mchld6aa7d23/mac).
- Click "OK".

In the main OBS window, you can now manually drag and resize the window capture to make it a custom size. If you just want this one window, I find it easier to right click on the preview and select "Tranform > Fit to screen" to automatically make the whole capture visible and as big as possible.

For your second scene (and any additional scenes), repeat these steps to create a new scene and a new window capture.

### Use the virtual camera in Zoom

To connect OBS to your meeting software, you can use a "virtual camera". This feature needs to be turned on in OBS: go to the "Tools" menu and select "Start Virtual Camera". (If it says "Stop Virtual Camera" the camera is already on, and you don't need to do anything. If you don't see either option, double-check that you've installed the virtual camera plugin.)

You don't need to do anything else in OBS! Don't worry about the "Start Streaming" or "Start Recording" buttons; you just need the virtual camera on to send OBS output to Zoom.

Zoom works particularly well with this setup because you can share the output of a second camera while keeping your regular webcam unchanged. Zoom provides [more detailed instructions if you'd like them](https://support.zoom.us/hc/en-us/articles/201362153-Sharing-your-screen-content-or-second-camera), but the short version is: in the dialog that opens when you click the "Share Screen" button in a meeting, select "Advanced" and then "Content from 2nd Camera". Click the "Switch camera" button to the virtual camera output if you don't see it right away.

### Present!

You should be good to go switching between your different scenes! As you're presenting, select the scene/window you'd like to share from the Sources tab in the OBS window and it will update the camera output.

I experimented with using the [Advanced Scene Switcher plugin](https://obsproject.com/forum/resources/advanced-scene-switcher.395/) to switch between scenes when I moused over the window associated with each scene, but in the end that felt too fussy (and despite moving my mouse very carefully it was still easy to accidentally switch scenes when I didn't intend to). I think OBS also has a lot of other built-in automatic scene switching options you could potentially use, but for this not-very-complicated setup manual switching seems simplest.
