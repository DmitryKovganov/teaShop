angular
	.module('myShop')
	.factory('teaService', teaService);

teaService.$inject = ['$http'];

function teaService($http) {
	return {
		init : function() {
			return $http.get('/');
		},
		filter : function(data) {
			return $http.post('/', data);
		}
	};
};