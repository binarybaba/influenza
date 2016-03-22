var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});
global.ids = [];


exports.getIDs = function (screenNames) {

    screenNames.map(function (val) {
        client.get('users/show', {
            screen_name: val,
            include_entities: false
        }, function (error, tweets, response) {
            ids.push(tweets.id);

        });
    });

    return ids;
}