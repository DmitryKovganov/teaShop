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

        });
        
});

app.controller('teaController', function($scope, $http, TeaService) {

	$scope.formData = {type: 'sinensis', oxidation: 'black'};

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