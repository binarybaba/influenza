angular.module('influenza')
    .factory('tweetFactory', function () {
        var influencerList = [];
        var service = {};
        service.getInfluencers = function () {
            return influencerList;
        };
        service.pushInfluencerList = function (list) {
            influencerList = list;
        }
        return service;

    });
