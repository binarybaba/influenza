var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var indexRouter = require('./controllers/routes/index.js');
var Twitter = require('twitter');

app.use(express.static('public'));
/*app.set('views', ['./public','./public/partials/']);*/ 
/*Commenting ^this out because we dont need public partials to be rendered server side and it's causing a lot of shit with angular + ui.router*/

app.set('views', './views');

/*Setting the views here. So we've just moved ./partials/index.ejs to its own views folder at ./views/ */
app.set('view engine', 'ejs');


app.use('/', indexRouter);

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

client.stream('statuses/filter', {track:'#ParisAttacks'}, function(stream){
    stream.on('data', function(tweet){
        console.log('@'+tweet.user.screen_name+' - '+tweet.text);
        console.log('----------')
    });
    stream.on('error', function(error){
       console.log(error); 
    });
});


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