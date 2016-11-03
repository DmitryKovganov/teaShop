// angular.module('myShop', ['mainController', 'mainService']);

var app = angular.module('myShop', ['ui.router', 'rzModule', 'btorfs.multiselect']);

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
	$scope.selection = {};

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
	$scope._data.type = [
		{
		    "id": "1",
		    "description": "Китайская разновидность",
		    "value": "sinensis"
		},
		{
		    "id": "2",
		    "description": "Ассамская разновидность",
		    "value": "assamica"
		}];
	$scope._data.region = [
		{
		    "id": "1",
		    "description": "Китайский",
		    "value": "Chinese"
		},
		{
		    "id": "2",
		    "description": "Индийский",
		    "value": "Indian"
		},
		{
		    "id": "3",
		    "description": "Цейлонский",
		    "value": "Ceylon"
		},
		{
		    "id": "4",
		    "description": "Японский",
		    "value": "Japanese"
		},
		{
		    "id": "5",
		    "description": "Индокитайский",
		    "value": "Indochina"
		},
		{
		    "id": "6",
		    "description": "Африканский",
		    "value": "African"
		},
		{
		    "id": "7",
		    "description": "Турецкий",
		    "value": "Turkish"
		},
		{
		    "id": "8",
		    "description": "Арабский",
		    "value": "Arabic"
		}];
	$scope._data.oxidation = [
		{
		    "id": "1",
		    "description": "Зеленый",
		    "value": "green"
		},
		{
		    "id": "2",
		    "description": "Черный",
		    "value": "black"
		},
		{
		    "id": "3",
		    "description": "Белый",
		    "value": "white"
		},
		{
		    "id": "4",
		    "description": "Жёлтый",
		    "value": "yellow"
		},
		{
		    "id": "5",
		    "description": "Улун",
		    "value": "oolong"
		},
		{
		    "id": "6",
		    "description": "Пуэр",
		    "value": "puer"
		}];
	$scope._data.leaf = [
		{
		    "id": "1",
		    "description": "Крупный",
		    "value": "big"
		},
		{
		    "id": "2",
		    "description": "Средний",
		    "value": "middle"
		},
		{
		    "id": "3",
		    "description": "Мелкий",
		    "value": "small"
		}];
	$scope._data.label = [
		{
		    "id": "1",
		    "description": "Lipton",
		    "value": "Lipton"
		},
		{
		    "id": "2",
		    "description": "Dilmah",
		    "value": "Dilmah"
		},
		{
		    "id": "3",
		    "description": "Teabox",
		    "value": "Teabox"
		},
		{
		    "id": "4",
		    "description": "Greenfield",
		    "value": "Greenfield"
		},
		{
		    "id": "5",
		    "description": "Earl Grey",
		    "value": "Earl Grey"
		},
		{
		    "id": "6",
		    "description": "Akbar Tea",
		    "value": "Akbar Tea"
		}];

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

	// $scope.checkAll = function(prop) {
	// 	$scope.formData[prop] = angular.copy($scope._data[prop]);
	// }

	// $scope.uncheckAll = function(prop) {
	// 	$scope.formData[prop] = []; 
	// }

	$scope.setData = function() {
		return { 
			type : $scope.formData.type.map(function(a) {return a.value;}),
			region : $scope.formData.region.map(function(a) {return a.value;}),
			oxidation : $scope.formData.oxidation.map(function(a) {return a.value;}),
			leaf : $scope.formData.leaf.map(function(a) {return a.value;}),
			label : $scope.formData.label.map(function(a) {return a.value;}),
			price: $scope.formData.price
		};
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
		params.filter = $scope.setData();
		params.index = $scope.setIndex(direction);
		console.log(params);
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