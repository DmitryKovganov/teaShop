angular
	.module('myShop')
	.controller('basketController', basketController);

basketController.$inject = ['$scope', 'basketService'];

function basketController($scope, basketService) {
	$scope.basket = basketService.get();

	$scope.removeFromBasket = remove;

	function remove(item) {
		basketService.remove(item);
	}
}