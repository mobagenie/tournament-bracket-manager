const angular = require('angular');
const app = angular.module('tbm', [
    require('angular-route'),
]);

app.config(($locationProvider, $routeProvider) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
    });

    $routeProvider.when('/', {
        controller: 'HomeCtrl',
        controllerAs: 'home',
        template: require('./home/tpl.html'),
    });
});

require('./home')(app);
