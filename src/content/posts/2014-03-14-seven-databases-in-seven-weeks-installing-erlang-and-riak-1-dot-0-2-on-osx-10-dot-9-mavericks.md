---
title: "Seven Databases in Seven Weeks: Installing Erlang and Riak 1.0.2 on OSX 10.9"
date: 2014-03-14T12:00:00-04:00
archived: true
---

I've been reading and working through [Seven Databases in Seven Weeks](http://pragprog.com/book/rwdata/seven-databases-in-seven-weeks) lately, but when I got to the chapter on [Riak](http://basho.com/riak/) this week I ran into a problem: the latest version of Riak (1.4.8 as of right now) is different enough that I couldn't follow the book's tutorial, and installing the older version of Riak used to write the examples turned out to be a little bit of a challenge.

Since I did figure it out eventually, here is an explanation of how I got Riak 1.0.2 running on my Mavericks machine. The main issue (as far as I can tell, though I am far from an expert on this stuff) is that these older versions of Erlang and Riak don't compile correctly with clang, which is the default C++ compiler for OSX 10.9. So you have to install gcc instead, and make sure Erlang and Riak are built using that.

To start, I installed gcc via [homebrew](http://brew.sh/): `brew install apple-gcc42`.

Then I basically followed [Basho's instructions for installing Erlang via kerl](http://docs.basho.com/riak/1.3.0/tutorials/installation/Installing-Erlang/#Install-using-kerl). I did have to change a few things, so I've documented the whole process in this post, but most of this came from their docs.

First install [kerl](https://github.com/spawngrid/kerl), which is basically like virtualenv or rvm for Erlang.

```bash
curl -O https://raw.github.com/spawngrid/kerl/master/kerl
chmod a+x kerl
```

Then create a `~/.kerlrc` file containing this configuration, so that Erlang will be compiled using gcc instead of clang (the rest of the build settings are as suggested by Basho's docs).

```bash
KERL_CONFIGURE_OPTIONS="CC=gcc-4.2 --disable-hipe --enable-smp-support
                        --enable-threads --enable-kernel-poll
                        --enable-darwin-64bit"
```

Now you can tell kerl to build, install and activate Erlang. Version R14B03 is the latest one that will work with Riak 1.0.2. (FYI, this version of Riak is not compatible with Erlang R14B04, which I learned the tedious way.)

```bash
./kerl build R14B03 r14b03
./kerl install r14b03 ~/erlang/r14b03
. ~/erlang/r14b03/activate
```

With Erlang installed, you're ready to set up Riak. You can [download the Riak 1.0.2 source from Github](https://github.com/basho/riak/archive/riak-1.0.2.zip). Riak won't build correctly with clang either, so you need to specify gcc when compiling again. (I'm not sure that running `make rel` is neccessary here, but that's what I did.)

```bash
CC=gcc-4.2 make rel
CC=gcc-4.2 make devrel
```

And now (whew!) you should have a functional old version of Riak, and you can get back to learning about databases.
