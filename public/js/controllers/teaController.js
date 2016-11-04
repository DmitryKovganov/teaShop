angular
	.module('myShop')
	.controller('teaController', teaController)
	.filter('pagination', function() {
	    return function(input, start) {
	        start = parseInt(start, 10);
	        return input.slice(start);
	    };
	});

teaController.$inject = ['$scope', '$http', 'teaService'];

function teaController($scope, $http, teaService) {
	$scope.slider = {
	    minValue: 69,
	    maxValue: 100,
	    options: {
	        floor: 0,
	        ceil: 100,
	        showTicksValues: 20,
	        // step: 5,
	        minRange: 20,
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
		price: { at: 0, to: 0}
	};

	// $scope.index = 1;

	$scope.$watch('slider.minValue', function(v){
		$scope.formData.price.at = v;
	});

	$scope.$watch('slider.maxValue', function(v){
		$scope.formData.price.to = v;
	});

	$scope.$watchCollection('formData', function(v){
		$scope.useFilter();
	});

	$scope.$watchCollection('formData.price', function(v){
		$scope.useFilter();
	});

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

	$scope.teas = [];

	$scope.useFilter = function() {
		teaService.filter($scope.setData())
			.success(function(data) {
				$scope.teas = data;
				$scope.currentPage = 0;
			});
	};

	$scope.useFilter();

	$scope.itemsPerPage = 12;
 	$scope.currentPage = 0;

	$scope.showData = function( ){
	    $scope.range = function() {
	    var rangeSize = 4;
	    var ps = [];
	    var start;

	    start = $scope.currentPage;
	    if ( start > $scope.pageCount()-rangeSize ) {
	      start = $scope.pageCount()-rangeSize+1;
	    }

	    for (var i=start; i<start+rangeSize; i++) {
	      if(i>=0) 
	         ps.push(i);
	    }
	    return ps;
	  };


	  $scope.prevPage = function() {
	    if ($scope.currentPage > 0) {
	      $scope.currentPage--;
	    }
	  };

	  $scope.DisablePrevPage = function() {
	    return $scope.currentPage === 0 ? "disabled" : "";
	  };

	  $scope.pageCount = function() {
	    return Math.ceil($scope.teas.length/$scope.itemsPerPage)-1;
	  };

	  $scope.nextPage = function() {
	    if ($scope.currentPage < $scope.pageCount()) {
	      $scope.currentPage++;
	    }
	  };

	  $scope.DisableNextPage = function() {
	    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
	  };

	  $scope.setPage = function(n) {
	    $scope.currentPage = n;
	  };
	         
	}

	$scope.showData();

};