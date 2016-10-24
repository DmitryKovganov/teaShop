angular.module('mainController', [])

	.controller('homeController', function($scope, $http) {
		
	})

	.controller('teaController', function($scope, $http, TeaService) {
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