angular
	.module('myShop')
	.controller('payController', payController);

payController.$inject = ['$scope', 'basketService'];

function payController($scope, basketService) {
	$scope.total = basketService.total();
}