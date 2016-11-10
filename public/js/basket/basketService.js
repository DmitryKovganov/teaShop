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
        increase: increase,
        total: total
    };
    return service;

    ////////////

    function get() {
        return basket;
    };

    function add(goods) {
        if (getIndexOfGoods(goods._id) == -1) {
            basket.push({ data: goods, count: 1 });
        }
        else {
            increase(goods._id, 1);
        }
    };

    function remove(id) {
        var index = getIndexOfGoods(id);
        if (index != -1) {
            basket.splice(index, 1);
        }
    };

    function increase(id, diff) {
        var index = getIndexOfGoods(id);
        basket[index].count += diff;
        if (basket[index].count == 0) {
            basket.splice(index, 1);
        }
    };

    function total() {
        return basket.reduce(function(previousValue, item) {
            return previousValue + item.count * item.data.price;
        }, 0);
    }

    function getIndexOfGoods(id) {
        return basket.map(function(item) { return item.data._id; }).indexOf(id);
    }
};