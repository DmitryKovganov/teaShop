angular
	.module('myShop')
	.controller('basketController', basketController);

basketController.$inject = ['$scope', 'basketService'];

function basketController($scope, basketService) {
	$scope.basket = basketService.basket();
	$scope.totalPrice = basketService.total();
	$scope.removeFromBasket = remove;
	$scope.increase = increase;

	function remove(id) {
		basketService.remove(id);
		$scope.totalPrice = basketService.total();
	}

	function increase(id, diff) {
		basketService.increase(id, diff);
		$scope.totalPrice = basketService.total();
	}
}