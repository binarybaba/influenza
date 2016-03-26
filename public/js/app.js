angular.module('influenza', ['ui.router', 'btford.socket-io'])
    .config(function ($stateProvider, $urlRouterProvider) {
        /*$locationProvider.html5Mode(true);*/
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('begin', {
                url: '/upload',
                templateUrl: '/partials/handlesData.ejs',
                controller: 'twitterHandlesCtrl'
            })
            .state('report', {
                url: '/report',
                templateUrl: '/partials/report.ejs',
                controller: 'reportCtrl'
            })
    });
