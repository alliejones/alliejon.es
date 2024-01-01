---
title: "Missing dependencies with Heroku, Python and pip"
date: 2013-03-28T12:00:00-04:00
archived: true
---

I've been experimenting with some machine learning techniques after [Hilary Mason](http://www.hilarymason.com/) spoke about it to Hacker School last week. I'll save discussing exactly what I've been working on for another post, but I've been programming in Python to take advantage of the libraries available to assist with the math involved.

I want to build some web applications based on my scripts, so I've been working on a bare-bones Flask app to provide their results in `json` format. Getting a server running on EC2 proved beyond my sysadmin abilities and patience at the moment, so I decided to deploy to Heroku instead.

My script uses the `hcluster` library, which depends on `numpy`, and this is where I ran into trouble. When I pushed my application to Heroku, it would attempt to install the packages in `pip`'s `requirements.txt`. `hcluster` would fail to install because it couldn't find `numpy`, even if `pip` had already attempted to install `numpy` (or so I thought). This happened regardless of the order of the packages in the requirements file.

The solution turned out to be removing `hcluster` from `requirements.txt` temporarily, pushing to Heroku so `numpy` would be installed successfully, then restoring `hcluster` to `requirements.txt` and pushing again. Not the most elegant fix, but it worked. [This StackOverflow question](http://stackoverflow.com/questions/11797688/matplotlib-requirements-with-`pip`-install-in-virtualenv) about a different library pointed me towards this solution.

It turns out that `pip` first runs each module's `setup.py`, then installs. (So I thought `numpy` was being installed first, but it actually wasn't.) Apparently checking for module dependencies in the setup script is an incorrect use of `setup.py`, but it seems like `hcluster` isn't the only library to do so. There's also [a Github issue](https://github.com/pypa/pip/issues/25) for `pip` that provides more context.
