angular
    .module('myShop')
    .directive('backetView', backetView);



function backetView(backetService) {
  return {
    restrict: 'AE',
    replace: true,
    template: '<p style="background-color:{{color}}">Hello World</p>',
    link: function(scope,elem,attrs) {
      elem.bind('click',function() {
        scope.$apply(function(){
          scope.color="white";
        });
      });

      elem.bind('mouseover',function() {
        elem.css('cursor','pointer');
        scope.$apply(function(){
          scope.color=scope.changeColor();
        });
      });

      scope.$watch('color',function(changedVal) {
        console.log('changed detected');
      });
    }
  };
}