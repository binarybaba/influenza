var express = require('express'); //
var fs = require('fs');
var port = process.env.PORT || 3000;
var session = require('express-session');
var passport = require('passport');
var multer = require('multer');
var bodyParser = require('body-parser');
var twitterStrategy = require('passport-twitter').Strategy;
var router = require('./controllers/routes/index');
var userRouter = require('./controllers/routes/users');
var upload = multer({
    dest: './uploads/'
});
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


/*
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});
*/

app.post('/upload', upload.single('influencers'), function (req, res) {
    var infIDs = [];
    fs.readFile('./' + req.file.path, {
        encoding: 'utf-8'
    }, function (err, data) {
        if (!err) {
            var i = 0;
            data.split(',').map(function (val) {
                client.get('users/show', {
                    screen_name: val,
                    include_entities: false
                }, function (error, tweets, response) {
                    /*infIDs.push(JSON.parse(response.body).id);*/

                });

            });
            console.log(infIDs);
        } else {
            console.log(err);
        }
    });
    res.status(204).end();

});

app.post('/sendlist', bodyParser.urlencoded({
        'extended': 'true'
    }), function (req, res) {
        res.json(extractIDs.getId(req.body.screen_name));

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