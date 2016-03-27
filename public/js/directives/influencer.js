angular.module('influenza')
    .directive('influencer', function () {
        return {
            scope: {},
            restrict: 'E',
            template: '<div>influe</div>',
            link: function (scope, elem, attrs) {
                console.log('consoling from directive');
            }
        }
    })
