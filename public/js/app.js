angular.module('influenza',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

        $stateProvider
        
        
        .state('begin', {
            url:'/upload',
            templateUrl:'/partials/uploadfile.ejs',
            controller:'uploadFileCtrl'
            
    });
    

});


