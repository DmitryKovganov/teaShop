// angular.module('myShop', ['mainController', 'mainService']);

var app = angular.module('myShop', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider   
        .state('tea', {
            url: '/tea',
            templateUrl: './js/partial-tea.html',
            controller: 'teaController'
        })

        .state('coffee', {
            url: '/coffee',
            templateUrl: './js/partial-coffee.html',
            controller: 'coffeeController'
        })
        
});

app.controller('teaController', function($scope, $http, TeaService) {

	$scope.formData = {type: 'sinensis', oxidation: 'black', label: 'Lipton'};

	TeaService.get()
		.success(function(data) {
			$scope.teas = data;
		});

	$scope.useFilter = function() {
		TeaService.filter($scope.formData)
			.success(function(data) {
				$scope.teas = data;
			});
	};

});

app.factory('TeaService', function($http) {

	return {
		get : function() {
			return $http.get('/tea');
		},
		filter : function(data) {
			return $http.post('/tea', data);
		}
	};

});

// coffee -------------------------------------------------
app.controller('coffeeController', function($scope, $http, CoffeeService) {

	$scope.formData = {type: 'arabica', technology: 'powder', label: 'Lavazza'};

	CoffeeService.get()
		.success(function(data) {
			$scope.coffees = data;
		});

	$scope.useFilter = function() {
		CoffeeService.filter($scope.formData)
			.success(function(data) {
				$scope.coffees = data;
			});
	};

});

app.factory('CoffeeService', function($http) {

	return {
		get : function() {
			return $http.get('/coffee');
		},
		filter : function(data) {
			return $http.post('/coffee', data);
		}
	};

});