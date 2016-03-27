var express = require('express'); //
var fs = require('fs');
var port = process.env.PORT || 3000;
var session = require('express-session');
var passport = require('passport');
var multer = require('multer');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var twitterStrategy = require('passport-twitter').Strategy;
var router = require('./controllers/routes/index');
var userRouter = require('./controllers/routes/users');
var upload = multer({
    dest: './uploads/'
});
var Promise = require('bluebird');
var extractIDs = require('./controllers/extractIDs');
/*var Twitter = require('twitter'); //for Twitter Stream API*/
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/', router);
app.use('/users', userRouter);

/*app.use(session({
    secret: 'cat and dogs',
    resave: 'true',
    saveUninitialized: 'true'
}));*/

/*Configuring passport*/
/*app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new twitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: '/redirectToUser'
    },
    function (token, tokenSecret, profile, done) {
        console.log('Happens from token');
        done(null, user);
    }
));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/users/',
    failureRedirect: '/error'
}));
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/redirectToUser', function (req, res) {
    res.redirect('/users');
});*/
/*Configuring passport*/

/*Configuring socket.io*/
io.on('connect', function (socket) {
    console.log('Tracking starts now.');
    socket.on('disconnect', function () {
        console.log('Tracking ends');
    });
});

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

var hasTrend = function (trend, tweetText) {
    if (tweetText.toLowerCase().indexOf(trend.toLowerCase()) > -1) {
        return true;
    } else {
        return false;
    }

}

app.post('/sendlist', bodyParser.urlencoded({
        'extended': 'true'
    }), function (req, res) {
        var InfluencerList = [];
        var idList = [];
        var trend = req.body.trend;
        for (var i = 0; i < req.body.screen_name.length; i++) {
            //make extractIDs return a jsobject with handle
            extractIDs(req.body.screen_name[i])
                .then(function (influencer) {
                    InfluencerList.push(influencer);
                    idList.push(influencer.id);
                    //got to figure out a way to make idlist an object containing the id + screenname
                    //instead of an array with just ids because async call will fuck shit up
                    return {
                        list: InfluencerList,
                        id_list: idList
                    };
                })
                .then(function (Influencer) {
                    if (Influencer.list.length === req.body.screen_name.length) {
                        return Influencer;
                    }
                })
                .then(function (Influencers) {
                    if (Influencers) {
                        console.log(Influencers);
                        res.send(Influencers);
                        client.stream('statuses/filter', {
                            follow: Influencers.id_list.join(',')
                                /*follow: '54500095,9283602,155294583,329661096,2208027565,222638700'*/
                        }, function (stream) {
                            stream.on('data', function (tweet) {

                                console.log('@' + tweet.user.screen_name + ' - ' + tweet.text + '\n');
                                /*console.log(tweet);*/
                                /*Reject all retweets and manual retweets*/
                                if (!tweet.quoted_status && !tweet.retweeted_status) {
                                    /*And if it has the trend we want, emit it.*/
                                    if (hasTrend(trend, tweet.text)) {
                                        io.emit('tweet', {
                                            handle: tweet.user.screen_name,
                                            name: tweet.user.name,
                                            tweetText: tweet.text,
                                            id: tweet.user.id
                                        });
                                    };

                                }
                                //emit with tweet.id and tweet.user.screen_name and tweet.user.name and tweet.user.profile_image_url
                            });
                            stream.on('error', function (error) {
                                console.log(error); //emit delete count from error.delete.status.id and send to socket
                            });
                        });
                    }
                });
        }




        /*req.body.screen_name.map(function (elem) {
            client.get('users/show', {
                screen_name: elem,
                include_entities: false
            }, function (error, tweets, response) {
                arr.push(JSON.parse(response.body).id);
                console.log(getIDs.print('otherthing'));


            })

        });*/
    }

);


/*
client.get('search/tweets', {q: '@OXIGENWALLET'}, function(error, tweets, response){
    
    console.log(tweets);
    console.log('==========================================');
    for(var i = 0; i<tweets.statuses.length;i++){
        console.log(tweets.statuses[i].text);
    }
    
});
*/

/*9283602 is for Rizwan*/
/*54500095 is for Amin*/
/*follow:'9283602,54500095'*/

/*client.stream('statuses/filter', {
    follow: '54500095'
}, function (stream) {
    stream.on('data', function (tweet) {
        console.log('@' + tweet.user.screen_name + ' - ' + tweet.text);
        console.log('----');
        console.log(tweet);

    });
    stream.on('error', function (error) {
        console.log(error);
    });
});*/


/*======================This works just fine=============================*/
/*client.stream('statuses/filter', {track:'#binbatuafriday'}, function(stream){
    stream.on('data', function(tweet){
        console.log('@'+tweet.user.screen_name+' - '+tweet.text);
        console.log('----------')
    });
    stream.on('error', function(error){
       console.log(error); 
    });
});*/
/*======================This works just fine=============================*/

/*
app.get('/', function(req, res){
    res.render('index');
});
*/




http.listen(port, function () {
    console.log("Listening on port " + port);
});
