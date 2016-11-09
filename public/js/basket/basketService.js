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

    function remove(id) {
        basket = basket.slice(id, id + 1);
    };

    function increment() {
        /* */
    };
};