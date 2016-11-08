var express = require('express');
var router = express.Router();

var Tea = require('../models/tea');

// filter
router.post('/', function(req, res, next) {
	var p = req.body;
	var data = p.data;

	var getQuery = function() {
		return Tea.find({
			type: 		{ $in: data.type }, 
			region: 	{ $in: data.region },
			oxidation: 	{ $in: data.oxidation },
			leaf: 		{ $in: data.leaf },
			label: 		{ $in: data.label },
			price: 		{ $gte: data.price.at, $lt: data.price.to}
	    });
	};

    getQuery().count().lean().exec(function(errorCount, count) {
    	getQuery().skip(p.pageNumber * p.pageItemsCount).limit(p.pageItemsCount).lean().exec(function(errorPaging, result) {
	    	var obj = {};
	    	obj.data = result;
	    	obj.itemsCount = count;
	        res.json(obj);
		});
    });
});

router.get('/init', function(req, res, next) {
	var type = ['sinensis', 'assamica'];
	var region = ['Chinese', 'Indian', 'Ceylon', 'Japanese', 'Indochina', 'African', 'Turkish', 'Arabic'];
	var oxidation = ['green', 'black', 'white', 'yellow', 'oolong', 'puer'];
	var leaf = ['big', 'middle', 'small'];
	var label = ['Lipton', 'Dilmah', 'Teabox', 'Greenfield', 'Earl Grey', 'Akbar Tea'];

	var count = type.length * region.length * oxidation.length * leaf.length * label.length;

	for(var i = 0; i < count; i++) {
		Tea.create({
			type		: type[Math.floor((Math.random() * type.length))],
			region		: region[Math.floor((Math.random() * region.length))],
		    oxidation	: oxidation[Math.floor((Math.random() * oxidation.length))],
		    leaf		: leaf[Math.floor((Math.random() * leaf.length))],
		    label		: label[Math.floor((Math.random() * label.length))],
		    price		: Math.floor((Math.random() * 50) + 20)
		});
	}

	res.redirect('/');
});

module.exports = router;