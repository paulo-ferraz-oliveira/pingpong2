Table tennis HTML5 2d canvas (new) demo (no sound)
==================================================

This very small JavaScript project builds on top of a previous one,
[pingpong](https://github.com/paulo-ferraz-oliveira/pingpong).

It presents better practices on the use of the JavaScript programming language,
implements a better (and fixed-step) game loop, and shows my first attempt at
using JavaScript modules.

It also aims at:

* presenting a working (fun?) example of the use of the HTML5 canvas,
* showing readable (and linted) JavaScript code,
* showing that something fun can be easily achieved with very little effort!

Getting Started
---------------

`git clone` this repo to your local environment and execute `make` in the shell,
then open [http://127.0.0.1:8080/index.html](http://127.0.0.1:8080/index.html)
with your favorite browser.

Contributions
-------------

I accept Pull Requests and issues to improve this :-)

Credits
-------

We almost never do anything by ourselves, let alone invent something new:

* thanks to YouTube's Meth Meth Method for some pong basics using ES6,
* thanks to Nicholas C. Zakas for a very good JavaScript linting tool,
* thanks to my fellow players that, like me, spent countless hours in front of
flashing lights and some sounds and stories,
* thanks to Allan Alcorn, for the original Atari Pong

What's it missing?
------------------

Improved collision detection for top/right/bottom/left paddle/ball interaction.

Changelog
---------

### 1.0.0
- initial version
- implements a JavaScript HTML5 2d canvas fixed-step game loop for a 1-player
table tennis demo
