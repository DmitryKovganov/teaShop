angular
	.module('myShop', ['ui.router', 'rzModule', 'btorfs.multiselect'])
	.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider   
        .state('tea', {
            url: '/tea',
            templateUrl: './js/partials/partial-tea.html',
            controller: 'teaController'
        })

        // .state('coffee', {
        //     url: '/coffee',
        //     templateUrl: './js/partials/partial-coffee.html',
        //     controller: 'coffeeController'
        // })
};

// 	$scope.formData = {type: 'arabica', region: ['Moccoo', 'Brazilian', 'Colombian', 'Indian', 'African', 'Arabic'], technology: 'powder', label: ['Lavazza', 'Starbucks'], price: { at: 28, to: 35 }};