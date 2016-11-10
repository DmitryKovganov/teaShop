angular
	.module('myShop')
	.controller('basketController', basketController);

basketController.$inject = ['$scope', 'basketService'];

function basketController($scope, basketService) {
	$scope.basket = basketService.get();
	$scope.removeFromBasket = remove;
	$scope.increase = increase;

	function remove(id) {
		basketService.remove(id);
	}

	function increase(id, diff) {
		basketService.increase(id, diff)
	}
}