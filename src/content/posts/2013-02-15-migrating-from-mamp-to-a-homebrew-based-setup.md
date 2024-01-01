---
title: "Migrating from MAMP to Homebrew"
date: 2013-02-15T12:00:00-04:00
archived: true
---

I've been using [MAMP](http://www.mamp.info/) (the free version, not MAMP Pro) on my local machine for development and testing for a long time, mostly out of laziness. [FuelPHP](http://www.fuelphp.com/)'s `oil` utility does not work well with MAMP's MySQL, however, so today I decided it was finally time to switch to using homebrew-installed MySQL and PHP and OSX 10.8's included Apache.

It was generally painless (I used [these instructions](http://blog.stevenlu.com/2012/10/12/moving-away-from-mamp-and-into-homebrew/) and [this blog post](http://coolestguyplanettech.com/downtown/install-and-configure-apache-mysql-php-and-phpmyadmin-osx-108-mountain-lion) about enabling Apache on Mountain Lion) but I didn't want to have to recreate all of my local databases. Some Googling only turned up the location of MAMP Pro's database files. I found the files for regular MAMP at `/Applications/MAMP/db/mysql/` and moved them to `/usr/local/var/mysql/` and everything was good to go.

While researching this, I also came across [this blog post](http://eddmann.com/posts/the-ultimate-mamp-setup-hands-down/) explaining a setup that automatically makes each folder in your `Sites` directory available at `<foldername>.dev` and set that up as well. It's awesome. No more editing my hosts file and Apache config!
