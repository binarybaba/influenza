var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var userRouter = require('./controllers/routes/users.js');
var indexRouter = require('./controllers/routes/index.js');
var Twitter = require('twitter'); //for Twitter Stream API
var passport = require('passport');
var twiterStrategy = require('passport-twitter').Strategy;

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/',indexRouter);
app.use('/users', userRouter);


var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
    access_token_key:process.env.TWITTER_TOKEN_KEY,
    access_token_secret:process.env.TWITTER_TOKEN_SECRET
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
client.stream('statuses/filter', {follow:54500095}, function(stream){
    stream.on('data', function(tweet){
        console.log('@'+tweet.user.screen_name+' - '+tweet.text);
        console.log('----------');
    });
    stream.on('error', function(error){
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




app.listen(port, function(){
    console.log("Listening on port "+port);
});