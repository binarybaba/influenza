**Influenza - Real-time Twitter Influencer Tracking**
===================

I made this app for a friend who is into Social Media Marketing. This is the first thing I've developed on the full stack so there might be some unsolved issues I haven't checked. You're most welcome to fork it. 

The app uses Twitter's REST API and Streams API and Socket.io to give a live count of the number of  tweets your influencers have tweeted with a specific hashtag. 

>**Note:**
>If you omit the hashtag, it will counts all the tweets of your influencers.

________

**Setting it up**
-------------

Since Twitter does not allow more than one standing connection to the public endpoints of the Streams API, you will have to have your own tokens. Go [here](https://apps.twitter.com/app/new), fill up the form and you'll get your consumer keys and tokens.

Then, open gulpfile.js and put the keys in the respected fields-

    gulp.task('serve', ['inject'], function () {
        var options = {
            script: 'server.js',
            delayTime: 1,
            env: {
                'PORT': 5000,
                'TWITTER_CONSUMER_KEY': 'xxx',
                'TWITTER_CONSUMER_SECRET': 'xxx',
                'TWITTER_TOKEN_KEY': 'xxx',
                'TWITTER_TOKEN_SECRET': 'xxx',
                'HOSTNAME': 'http://localhost:'
            },
            watch: jsFiles
        };



**And you're done!**
----------------

Fire up the terminal and you can use `gulp serve` if you're planning to modify the source so that gulp can keep track of them and keeps the server alive when testing or the regular `node server`



**Thank you**
------------------

 - [bluebird's promises](http://bluebirdjs.com)
 - [socket.io](http://socket.io)
 - [node-twitter](http://github.com/desmondmorris/node-twitter)
 - [btford's angular-socket-io](http://github.com/btford/angular-socket-io)


**License**
=========
The MIT License (MIT)
Copyright (c) 2016 copyright Amin Mohamed Ajani

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
