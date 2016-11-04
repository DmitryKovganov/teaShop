var express = require('express');
var router = express.Router();

var Tea = require('../models/tea');
var limitOnPage = 12;

// get all
router.get('/', function(req, res, next) {
	var callback = function(err, data) {
	    if (err) {
	        res.send(err)
	    }
	    
	    res.json(data);
	};

	Tea.find()
	.limit(limitOnPage)
	.exec(callback);
});



// filter
router.post('/', function(req, res, next) {
	var p = req.body;

    var callback = function(err, data) {
	    if (err) {
	        res.send(err)
	    }

	    res.json(data);
	};

	Tea.find({
		type: 		{ $in: p.type }, 
		region: 	{ $in: p.region },
		oxidation: 	{ $in: p.oxidation },
		leaf: 		{ $in: p.leaf },
		label: 		{ $in: p.label },
		price: 		{ $gte: p.price.at, $lt: p.price.to}
    })
    // .skip(req.body.index * limitOnPage)
    // .limit(limitOnPage)
	.exec(callback);
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