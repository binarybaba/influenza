angular.module('influenza')
    .controller('beginCtrl', ['$scope', function ($scope) {
        $scope.isDisabled = false;
        /*$scope.disableButton = function (event) {
    $scope.isDisabled = true;
    $(event.target).removeClass('butn')
    $(event.target).addClass('disabled');

}*/
    }])

.controller('twitterHandlesCtrl', ['$scope', '$http', 'tweetSocket', function ($scope, $http, tweetSocket) {
    //removed tweetFactory
    $scope.status = "Track!";
    $scope.twitter = {
        influencers: "",
        trend: ""
    };

    $scope.track = function (twitterObj) {

        //send the influencers list. to tweetFactory
        /*tweetFactory.influencerList = twitterObj.influencers.split(',');*/

        console.log('twitterHandlesCtrl working...');
        $scope.status = "please wait";

        tweetSocket.on('tweet', function (data) {
            console.info("@" + data.handle + " (" + data.name + ") : " + data.tweetText);
            //this is where the count will increase and sent to tweetFactory so that the service
            //can do the update on the reportCtrl
        });

        $http({
            method: 'POST',
            url: '/sendlist',
            data: {
                /*"screen_name": ['aminspeaks', 'binarygru', 'prisharma25', 'toddmotto', 'producthunt', 'producthuntgif', 'producthuntlive', 'producthuntbook', 'producthuntpod']*/
                "screen_name": twitterObj.influencers.split(','),
                "trend": twitterObj.trend
            }

        }).then(function successCallback(response) {
                $scope.status = "Done!";
                console.log('Got This response from server--' + response.data);
                //make sure the data we recieve data with the twitter handles. That way, we can pass
                // it to tweetFactory. async is messing it up.
                /*console.log("Sending that to tweetfactory");*/
                /* tweetFactory.idList = response.data; //pass id+handle as an object.*/
            },
            function errorCallback(response) {
                $scope.status = "Shit went down bro. Try restarting everything.";
                console.log('Shit went down');
            });
    };
    console.log('testCtrl is working');
            }])
