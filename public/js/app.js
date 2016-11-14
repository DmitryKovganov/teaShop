angular
	.module('myShop', ['ui.router', 'rzModule', 'angularjs-dropdown-multiselect'])
	.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('tea', {
            url: '/',
            templateUrl: 'partials/partial-tea.html',
            controller: 'teaController'
        })

        .state('basket', {
            url: '/basket',
            templateUrl: 'partials/partial-basket.html',
            controller: 'basketController'
        })

        .state('pay', {
            url: '/pay',
            templateUrl: 'partials/partial-pay.html',
            controller: 'payController'
        })
};