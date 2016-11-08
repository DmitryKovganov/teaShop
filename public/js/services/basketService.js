angular
    .module('myShop')
    .service('backetService', backetService);

// teaService.$inject = ['$http'];

function backetService() {
    var backet = {};
    return {
        getBacket: function () {
            return backet;
        },
        setBacket: function(value) {
            backet = value;
        }
    };
};