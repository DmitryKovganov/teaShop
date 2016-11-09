angular
    .module('myShop')
    .directive('basketView', basketView);


function basketView() {
  return {
    restrict: 'A',
    template: '<span>lol</span>',
    replace: true,
    controller: 'basketController'
  };
}