angular.module('influenza')
    .controller('beginCtrl', ['$scope', function ($scope) {
        $scope.isDisabled = false;
        /*$scope.disableButton = function (event) {
    $scope.isDisabled = true;
    $(event.target).removeClass('butn')
    $(event.target).addClass('disabled');

}*/
    }])
    .controller('uploadFileCtrl', ['$scope', '$http', function ($scope, $http) {
        console.log('Upload File Controller working');
    }])
    .controller('twitterHandlesCtrl', ['$scope', '$http', 'tweetSocket', function ($scope, $http, tweetSocket) {
        $scope.status = "Track!";
        $scope.twitter = {
            influencers: "",
            trend: ""
        };

        $scope.track = function (list) {
            console.log('twitterHandlesCtrl working...');
            $scope.status = "please wait";
            //
            /*var handles = list.influencers.split(',');*/
            /*console.log('Handles = ' + handles);
            console.log(typeof (handles));*/



            tweetSocket.on('tweet', function (data) {
                console.info("@" + data.handle + " (" + data.name + ") : " + data.tweetText);

            });

            $http({
                method: 'POST',
                url: '/sendlist',
                data: {
                    /*"screen_name": ['aminspeaks', 'binarygru', 'prisharma25', 'toddmotto', 'producthunt', 'producthuntgif', 'producthuntlive', 'producthuntbook', 'producthuntpod']*/
                    "screen_name": list.influencers.split(',')
                }

            }).then(function successCallback(response) {
                    $scope.status = "Done!";
                    console.log('Got This response from server--' + response.data);
                },
                function errorCallback(response) {
                    $scope.status = "Shit went down bro. Try restarting everything.";
                    console.log('Shit went down');
                });
        };
        console.log('testCtrl is working');
            }])
