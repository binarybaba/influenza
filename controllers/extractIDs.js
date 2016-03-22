var Twitter = require('twitter');
var Promise = require('bluebird');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});


exports.getIDs = function (screenNames) {
    var ids = [];
    screenNames.map(function (elem) {
        client.get('users/show', {
            screen_name: elem,
            include_entities: false
        }, function (err, tweets, response) {
            ids.push(tweets.id);
            console.log(ids);
        });

    })

    /*for (var i = 0; i < screenNames.length; i++) {
        client.get('users/show', {
            screen_name: screenNames[i],
            include_entities: false
        }, function (error, tweets, response) {
            ids.push(tweets.id);
            console.log(ids);
        });

    }*/
    return ids;

}
var arr = [];
var findId = function (screenName) {
    return new Promise(function (resolve, reject) {
        resolve(screenName);
    });
};

var andAddIDs = function (val) {
    arr.push(getID_cb(val));
}

var goThroughAllElems = function (ar) {
    ar.map(andAddIDs);
}
var getID_cb = function (s_name) {

    client.get('show/users', {
        screen_name: s_name
    }, function (err, tweets, response) {
        return tweets.id;
    })
}

exports.getId = function (name) {
    findId(name)
        .then(function (screen_name) {
            getID_cb(screen_name);
        })
        .then(function () {
            console.log(arr);
        })
}