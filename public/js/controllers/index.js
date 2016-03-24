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
    .controller('twitterHandlesCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.status = "";
        $scope.printIt = function () {
            console.log('stuff from controller');
            $scope.status = "please wait";
            $http({
                method: 'POST',
                url: '/sendlist',
                data: {
                    "screen_name": ['aminspeaks', 'binarygru', 'prisharma25', 'toddmotto', 'producthunt', 'producthuntgif', 'producthuntlive', 'producthuntbook', 'producthuntpod']
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
