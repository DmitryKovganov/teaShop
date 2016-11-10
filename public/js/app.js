angular
	.module('myShop', ['ui.router', 'rzModule', 'btorfs.multiselect'])
	.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider   
        .state('tea', {
            url: '/',
            templateUrl: './js/main/partial-tea.html',
            controller: 'teaController'
        })

        .state('basket', {
            url: '/basket',
            templateUrl: './js/basket/partial-basket.html',
            controller: 'basketController'
        })

        .state('pay', {
            url: '/pay',
            templateUrl: './js/pay/partial-pay.html',
            controller: 'payController'
        })
};

// 	$scope.formData = {type: 'arabica', region: ['Moccoo', 'Brazilian', 'Colombian', 'Indian', 'African', 'Arabic'], technology: 'powder', label: ['Lavazza', 'Starbucks'], price: { at: 28, to: 35 }};