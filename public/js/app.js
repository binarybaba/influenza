angular.module('influenza', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        /*$locationProvider.html5Mode(true);*/
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('begin', {
                url: '/upload',
                templateUrl: '/partials/handlesData.ejs',
                controller: 'twitterHandlesCtrl'
            })





    });
