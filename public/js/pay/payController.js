angular
	.module('myShop')
	.controller('payController', payController);

payController.$inject = ['$scope', 'basketService'];

function payController($scope, basketService) {
	$scope.total = basketService.total();
	$scope.pay = pay;

	function pay() {
		basketService.clean();
		$scope.total = basketService.total();
	}
}