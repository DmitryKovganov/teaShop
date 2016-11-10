angular
	.module('myShop')
	.controller('teaController', teaController);

teaController.$inject = ['$scope', '$http', 'teaService', 'basketService'];

function teaController($scope, $http, teaService, basketService) {
	$scope.initData = initData;
	$scope._data = {};
	$scope.formData = {};
	$scope.teas = [];

	$scope.itemsPerPage = 12;
 	$scope.currentPage = 0;
 	$scope.pageCount = 0;

 	$scope.setParams = setParams;
 	$scope.useFilter = useFilter;

 	$scope.range = range;
 	$scope.prevPage = prevPage;
 	$scope.nextPage = nextPage;
 	$scope.DisablePrevPage = DisablePrevPage;
 	$scope.DisableNextPage = DisableNextPage;

 	$scope.addToBasket = addToBasket;

	$scope.slider = {
	    minValue: 30,
	    maxValue: 70,
	    options: {
	        floor: 0,
	        ceil: 100,
	        showTicksValues: 20,
	        step: 5,
	        minRange: 20,
        	pushRange: true,
	        noSwitching: true,
	        draggableRange: true,
	        translate: function(value) {
		    	return '$' + value;
		    }
	    }
	};

	$scope.initData();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
																									INITIAL DATA
*/

	function initData() {
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
			price: { at: 0, to: 100}
		};
	}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
																									REQUEST TO DB
*/

	function setParams(pageNumber) {
		var params = {};
		params.data = { 
			type : $scope.formData.type.map(function(a) {return a.value;}),
			region : $scope.formData.region.map(function(a) {return a.value;}),
			oxidation : $scope.formData.oxidation.map(function(a) {return a.value;}),
			leaf : $scope.formData.leaf.map(function(a) {return a.value;}),
			label : $scope.formData.label.map(function(a) {return a.value;}),
			price: $scope.formData.price
		};
		params.pageNumber = pageNumber;
		params.pageItemsCount = $scope.itemsPerPage;
		return params;
	}

	function useFilter(pageNumber) {
		teaService.filter($scope.setParams(pageNumber))
			.success(function(result) {
				$scope.teas = result.data;
				$scope.pageCount = Math.ceil(result.itemsCount / $scope.itemsPerPage) - 1;
				$scope.currentPage = pageNumber;
			});
	};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
																									WATCH SLIDER
*/

	$scope.$watch('slider.minValue', function(v){
		$scope.formData.price.at = v;
	});

	$scope.$watch('slider.maxValue', function(v){
		$scope.formData.price.to = v;
	});

	$scope.$watchCollection('formData', function(v){
		$scope.useFilter(0);
	});

	$scope.$watchCollection('formData.price', function(v){
		$scope.useFilter(0);
	});


//////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
																									PAGING
*/

    function range() {
	    var rangeSize = 5;
	    var ps = [];
	    var start;

	    start = $scope.currentPage;
	    if (start > $scope.pageCount-rangeSize) {
	      start = $scope.pageCount - rangeSize + 1;
	    }

	    for (var i = start; i < start + rangeSize; i++) {
	      if (i >= 0) 
	         ps.push(i);
	    }
	    return ps;
  	};

	function prevPage() {
		if ($scope.currentPage > 0) {
	  		$scope.useFilter($scope.currentPage - 1);
		}
	};

	function nextPage() {
		if ($scope.currentPage < $scope.pageCount) {
			$scope.useFilter($scope.currentPage + 1);
		}
	};

	function DisablePrevPage() {
		return $scope.currentPage === 0 ? "disabled" : "";
	};

	function DisableNextPage() {
		return $scope.currentPage === $scope.pageCount ? "disabled" : "";
	};

	function addToBasket(tea) {
		basketService.add(tea);
	};
};