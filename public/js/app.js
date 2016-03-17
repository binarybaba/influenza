angular.module('influenza',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('sign-in', {
            url:'/sign-in',
            templateUrl:'/partials/sign2.ejs'
            
    });
    

});


;