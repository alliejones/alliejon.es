---
title: "Run your own mini Heroku with Dokku"
date: 2014-03-09T12:00:00-04:00
archived: true
---

I find building toy projects much more fun if I can get them on the internet to show them off to people. Having things that only run on my local machine just isn't the same. When you're using technology newer or more complicated than the LAMP stack, though, deploying things to a server can be a challenging (at least if your patience for being a sysadmin is as limited as mine).

Heroku is a popular choice for painlessly getting small projects online, but I'm difficult and the 30 second start up time for rarely used sites on the free tier annoys me, and I'm not ready to pay \$30 or so a month to host a toy project.

During my Hacker School batch I got my [multiuser drawing app](http://drawtogether.by.alliejon.es/) running on a \$5/month [Digital Ocean](https://www.digitalocean.com/) droplet, but configuring Nginx to work with Node and websockets pushed the limits of my sysadmin skills and patience.

However, Digital Ocean offers many different preconfigured server images, and I recent set up a droplet with their Dokku image. It has turned out to be perfect for getting small projects online without too much work and I love it.

[Dokku](https://github.com/progrium/dokku) is basically a tiny Heroku clone written in bash. It uses Heroku buildpacks to compile projects, so if your application runs on Heroku it should run on Dokku. Once your Dokku server is running, adding and deploying a new project is as easy as doing this:

```bash
git remote add mywebsite dokku@mywebsite.com:myproject
git push mywebsite master
```

Once everything finishes building, your project will be running at `myproject.mywebsite.com`!

If this seems appealing, there are a bunch of good tutorials for getting started, and the Dokku docs are also helpful. This is what I did, and the resources I used:

1. **Set up a subdomain with wildcard DNS**  
   I had to work around my hosting a bit for this: I was using [NearlyFreeSpeech](https://www.nearlyfreespeech.net/), where this blog is hosted, for DNS, but they don't support wildcard subdomains. However, [Gandi](https://www.gandi.net/), where I registered my goofy domain hack address in the first place, does. After switching my DNS over, I was able to point `alliejon.es` here, while `by.alliejon.es` (and `*.by.alliejon.es`) point to my Digital Ocean server.

2. **Create a Digital Ocean droplet using their [Dokku tutorial](https://www.digitalocean.com/community/articles/how-to-use-the-digitalocean-dokku-application)**  
   (DO has a lot of really great beginner articles on server setup besides this one that are worth looking through, too.)

3. **Deploy my own application**  
   I had tested the Dokku setup with Heroku's sample node application (as suggested by the tutorial above), and that worked great, but my first attempt at deploying [drawtogether](http://drawtogether.by.alliejon.es/) just led to mysterious 500 errors. So, a tip: don't forget to add a Procfile to your project repository so Dokku actually knows how to run your application. Once I figured that out, everything worked perfectly with no additional configuration on my part. Awesome!

All told, even with my DNS fiddling, a lot of googling because I was wondering if websockets would work out of the box (they do) and forgetting to create a Procfile, it only took me a few hours to get everything running. Definitely worth it for simple deployment with git and inexpensive project hosting.
