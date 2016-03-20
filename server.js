var express = require('express'); //
var port = process.env.PORT || 3000;
var session = require('express-session');
var passport = require('passport');
var twitterStrategy = require('passport-twitter').Strategy;

var router = require('./controllers/routes/index');
var userRouter = require('./controllers/routes/users');
/*var authRouter = require('./controllers/routes/auth');*/

var Twitter = require('twitter'); //for Twitter Stream API

var app = express();

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', router);
app.use('/users', userRouter);


app.use(session({
    secret: 'cat and dogs',
    resave: 'true',
    saveUninitialized: 'true'
}));

/*Configuring passport*/
app.use(passport.initialize());
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
});



var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});



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

/*
client.stream('statuses/filter', {
    track: '#SAvsAFG'
}, function (stream) {
    stream.on('data', function (tweet) {
        console.log('@' + tweet.user.screen_name + ' - ' + tweet.text);

    });
    stream.on('error', function (error) {
        console.log(error);
    });
});
*/


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