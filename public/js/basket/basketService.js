angular
    .module('myShop')
    .service('basketService', basketService);

// teaService.$inject = ['$http'];

function basketService() {
    var basket = [];

    var service = {
        get: get,
        add: add,
        remove: remove,
        increment: increment
    };
    return service;

    ////////////

    function get() {
        return basket;
    };

    function add(goods) {
        basket.push(goods);
    };

    function remove(goods) {
        var index = basket.map(function(item) { return item._id; }).indexOf(goods._id);
        if (index != -1) {
            basket.splice(index, 1);
        }
    };

    function increment() {
        /* */
    };
};