angular.module('influenza')
    .controller('indexCtrl', ['$scope',function($scope){
        $scope.isDisabled=false;
        $scope.disableButton = function(event){
            $scope.isDisabled=true;
            $(event.target).removeClass('butn')
            $(event.target).addClass('disabled');
            
        }
    }])
