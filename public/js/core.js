// angular.module('myShop', ['mainController', 'mainService']);

var app = angular.module('myShop', ['ui.router', 'rzModule', 'checklist-model']);

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
	$scope.slider = {
	    minValue: 0,
	    maxValue: 70,
	    options: {
	        floor: 0,
	        ceil: 100,
	        showTicksValues: 10,
	        step: 1,
	        minRange: 3,
        	pushRange: true,
	        noSwitching: true,
	        draggableRange: true,
	        translate: function(value) {
		    	return '$' + value;
		    }
	    }
	};


	$scope._data = {};
	$scope._data.type = ['sinensis', 'assamica'];
	$scope._data.region = ['Chinese', 'Indian', 'Ceylon', 'Japanese', 'Indochina', 'African', 'Turkish', 'Arabic'];
	$scope._data.oxidation = ['green', 'black', 'white', 'yellow', 'oolong', 'puer'];
	$scope._data.leaf = ['big', 'middle', 'small'];
	$scope._data.label = ['Lipton', 'Dilmah', 'Teabox', 'Greenfield', 'Earl Grey', 'Akbar Tea'];

	$scope.formData = { 
		type : angular.copy($scope._data.type),
		region : angular.copy($scope._data.region),
		oxidation : angular.copy($scope._data.oxidation),
		leaf : angular.copy($scope._data.leaf),
		label : angular.copy($scope._data.label),
		price: { }
	};

	$scope.index = 1;

	$scope.$watch('slider.minValue', function(v){
		$scope.formData.price.at = v;
	});

	$scope.$watch('slider.maxValue', function(v){
		$scope.formData.price.to = v;
	});

	$scope.checkAll = function(prop) {
		$scope.formData[prop] = angular.copy($scope._data[prop]);
	}

	$scope.uncheckAll = function(prop) {
		$scope.formData[prop] = []; 
	}

	$scope.setIndex = function(direction) {
		var index = 0;
		var intDirection = parseInt(direction);

		if (intDirection == 0) {
			$scope.index = 1;
		}

		if ($scope.index + intDirection > 0) {
			$scope.index += intDirection;
			index = $scope.index - 1; // тк начало индексирования с 1, а смещение начальное 0
		}

		return index;
	}

	$scope.setParams = function(direction) {
		var params = {};
		params.filter = $scope.formData;
		params.index = $scope.setIndex(direction);
		return params;
	}

	TeaService.get()
		.success(function(data) {
			$scope.teas = data;
		});

	$scope.useFilter = function(direction) {
		TeaService.filter($scope.setParams(direction))
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