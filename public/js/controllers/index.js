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
    .controller('testCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.printIt = function () {
            console.log('stuff from controller');
            $http({
                method: 'POST',
                url: '/sendlist',
                data: {
                    "screen_name": ['aminspeaks', 'binarygru', 'prisharma25']
                }

            }).then(function successCallback(response) {
                    console.log('Got This response from server--' + response.data);
                },
                function errorCallback(response) {
                    console.log('Shit went down');
                });
        };
        console.log('testCtrl is working');
            }])