// angular.module('myShop', ['mainController', 'mainService']);

var app = angular.module('myShop', ['ui.router', 'checklist-model']);

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

	$scope.roles = [
		// 'guest', 
		// 'user', 
		// 'customer', 
		// 'admin'
	];

	$scope.formData = { type : ['sinensis', 'assamica'],
		region : ['Chinese', 'Indian', 'Ceylon', 'Japanese', 'Indochina', 'African', 'Turkish', 'Arabic'],
		oxidation : ['green', 'black', 'white', 'yellow', 'oolong', 'puer'],
		leaf : ['big', 'middle', 'small'],
		label : ['Lipton', 'Dilmah', 'Teabox', 'Greenfield', 'Earl Grey', 'Akbar Tea'],
		price: { at: 28, to: 35 }
	};

	// $scope.checkFirst = function() {
	// 	$scope.formData.type.splice(0, $scope.formData.type.length); 
	// 	$scope.formData.region.splice(0, $scope.formData.region.length); 
	// 	$scope.formData.oxidation.splice(0, $scope.formData.oxidation.length); 
	// 	$scope.formData.leaf.splice(0, $scope.formData.leaf.length); 
	// 	$scope.formData.label.splice(0, $scope.formData.label.length);
	// 	// $scope.user.roles.push('guest');
	// };

	// $scope.formData = { type : ['sinensis', 'assamica'],
	// 	region : ['Chinese', 'Indian', 'Ceylon', 'Japanese', 'Indochina', 'African', 'Turkish', 'Arabic'],
	// 	oxidation : ['green', 'black', 'white', 'yellow', 'oolong', 'puer'],
	// 	leaf : ['big', 'middle', 'small'],
	// 	label : ['Lipton', 'Dilmah', 'Teabox', 'Greenfield', 'Earl Grey', 'Akbar Tea'],
	// 	price: { at: 28, to: 35 }
	// };

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