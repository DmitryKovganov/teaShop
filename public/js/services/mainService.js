angular.module('mainService', [])

	.factory('TeaService', function($http) {
		return {
			get : function() {
				return $http.get('/tea');
			},
			filter : function(data) {
				return $http.post('/tea', data);
			}
		}
	});