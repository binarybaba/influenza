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


var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

app.post('/sendlist', bodyParser.urlencoded({
        'extended': 'true'
    }), function (req, res) {
        var idlist = [];
        for (var i = 0; i < req.body.screen_name.length; i++) {
            extractIDs(req.body.screen_name[i])
                .then(function (id) {
                    idlist.push(id);
                    return idlist;
                })
                .then(function (idList) {
                    if (idList.length === req.body.screen_name.length) {
                        return idlist;
                    }
                })
                .then(function (ids) {
                    if (ids) {
                        res.send(ids);
                        client.stream('statuses/filter', {
                            follow: ids.join(',')
                            /*follow: '54500095,9283602,155294583,329661096,2208027565,222638700'*/
                        }, function (stream) {
                            stream.on('data', function (tweet) {
                                console.log('@' + tweet.user.screen_name + ' - ' + tweet.text + '\n');
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




app.listen(port, function () {
    console.log("Listening on port " + port);
});
