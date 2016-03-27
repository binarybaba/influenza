var Twitter = require('twitter');
var Promise = require('bluebird');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});




module.exports = function (handle) {
    return new Promise(function (resolve, reject) {
        var Influencer = {};
        client.get('users/show', {
            screen_name: handle
        }, function (errors, tweets, response) {
            Influencer = {
                id: tweets.id,
                screen_name: tweets.screen_name,
                profile_image_url: tweets.profile_image_url,
                count: 0
            }
            resolve(Influencer);
        });
    });

}


/*for (var i = 0; i < screenNames.length; i++) {
    client.get('users/show', {
        screen_name: screenNames[i],
        include_entities: false
    }, function (error, tweets, response) {
        ids.push(tweets.id);
        console.log(ids);
    });

}*/
