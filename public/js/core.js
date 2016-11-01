// angular.module('myShop', ['mainController', 'mainService']);

var app = angular.module('myShop', ['ui.router', 'checklist-model']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider   
        .state('tea', {
            url: '/tea',
            templateUrl: './js/partials/partial-tea.html',
            controller: 'teaController'
        })

        .state('coffee', {
            url: '/coffee',
            templateUrl: './js/partials/partial-coffee.html',
            controller: 'coffeeController'
        })
        
});

app.controller('teaController', function($scope, $http, TeaService) {
	$scope._data = {};
	$scope._data.type = ['sinensis', 'assamica'];
	$scope._data.region = ['Chinese', 'Indian', 'Ceylon', 'Japanese', 'Indochina', 'African', 'Turkish', 'Arabic'];
	$scope._data.oxidation = ['green', 'black', 'white', 'yellow', 'oolong', 'puer'];
	$scope._data.leaf = ['big', 'middle', 'small'];
	$scope._data.label = ['Lipton', 'Dilmah', 'Teabox', 'Greenfield', 'Earl Grey', 'Akbar Tea'];

	$scope.formData = { type : $scope._data.type,
		region : $scope._data.region,
		oxidation : $scope._data.oxidation,
		leaf : $scope._data.leaf,
		label : $scope._data.label,
		price: { at: 28, to: 35 }
	};

	$scope.checkAll = function(prop) {
		if ($scope.formData[prop].length != $scope._data[prop].length) {
			$scope.formData[prop] = angular.copy($scope._data[prop]);
		}
		else {
			$scope.formData[prop] = [];
		}
	};

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

	$scope.init = function() {
		TeaService.init();
	};

});

app.factory('TeaService', function($http) {

	return {
		get : function() {
			return $http.get('/tea');
		},
		filter : function(data) {
			return $http.post('/tea', data);
		},
		init : function() {
			return $http.get('/tea/init');
		},
	};

});

// coffee -------------------------------------------------
app.controller('coffeeController', function($scope, $http, CoffeeService) {

	$scope.formData = {type: 'arabica', region: ['Moccoo', 'Brazilian', 'Colombian', 'Indian', 'African', 'Arabic'], technology: 'powder', label: ['Lavazza', 'Starbucks'], price: { at: 28, to: 35 }};

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

	$scope.init = function() {
		CoffeeService.init();
	};

});

app.factory('CoffeeService', function($http) {

	return {
		get : function() {
			return $http.get('/coffee');
		},
		filter : function(data) {
			return $http.post('/coffee', data);
		},
		init : function() {
			return $http.get('/coffee/init');
		},
	};

});