angular
	.module('myShop')
	.factory('teaService', teaService);

teaService.$inject = ['$http'];

function teaService($http) {
	return {
		get : function() {
			return $http.get('/tea');
		},
		filter : function(data) {
			return $http.post('/tea', data);
		}
	};
};