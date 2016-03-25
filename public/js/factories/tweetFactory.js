angular.module('influenza')
    .factory('tweetFactory', function () {
        var influencerList = [];
        var idList = [];
        var Influencer = {
            id: '',
            name: '',
            handle: '',
            count: 0,
            tweetText: '',
        };

        var service = {};
        service.getInfluencers = function () {

            //need id and handle in an object so that we can access it via a new controller of a new view
            /* return track.influencers;*/
            return Influencer; //dummy

        }
        return service;

    });
