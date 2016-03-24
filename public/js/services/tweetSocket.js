angular.module('influenza')
    .factory('tweetSocket', ['socketFactory', function (socketFactory) {
        return socketFactory();
    }]);