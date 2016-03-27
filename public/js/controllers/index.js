angular.module('influenza')
    .controller('beginCtrl', ['$scope', function ($scope) {
        $scope.showBeginButton = true;
        $scope.hideButton = function () {
                $scope.showBeginButton = false;
            }
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
    //Buttons
    $scope.showStatus = true;
    $scope.showProceed = false;



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
                $scope.showStatus = false;
                $scope.showProceed = true;
                console.log('Got This response from server--');
                console.log(response.data.list);
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

.controller('reportCtrl', ['$scope', '$http', 'tweetSocket', function ($scope, $http, tweetSocket) {
    console.log('reportCtrl working');
    $scope.influencers = [
        {
            handle: "aminspeaks",
            profile_image_url: "http://pbs.twimg.com/profile_images/648944261233139713/2QR_Atk2_normal.jpg",
            count: 2
        },
        {
            handle: "binarygru",
            profile_image_url: "http://pbs.twimg.com/profile_images/648944261233139713/2QR_Atk2_normal.jpg",
            count: 4

        }
    ]
}])
