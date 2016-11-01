var express = require('express');
var router = express.Router();

var Coffee = require('../models/coffee');

// get all
router.get('/', function(req, res, next) {

	Coffee.find(function(err, data) {
	    if (err) {
	        res.send(err)
	    }
	    
	    res.json(data);
	});
});

router.get('/init', function(req, res, next) {
	var type = ['arabica', 'canephora'];
	var region = ['Moccoo', 'Brazilian', 'Colombian', 'Indian', 'African', 'Arabic'];
	var technology = ['powder', 'freeze-dried', 'granulated'];
	var label = ['Baristas', 'Dallmayr', 'Indian Coffee House', 'Lavazza', 'Nestle', 'Starbucks', 'Tchibo'];

	var count = type.length * region.length * technology.length * label.length;

	for(var i = 0; i < count; i++) {
		Coffee.create({
			type		: type[Math.floor((Math.random() * type.length))],
			region		: region[Math.floor((Math.random() * region.length))],
		    technology	: technology[Math.floor((Math.random() * technology.length))],
		    label		: label[Math.floor((Math.random() * label.length))],
		    price		: Math.floor((Math.random() * 50) + 20)
		});
	}

	res.redirect('/');
});

// filter
router.post('/', function(req, res, next) {

	var p = req.body;

	Coffee.find({
			type: 		{ $in: p.type }, 
			region: 	{ $in: p.region },
			technology: { $in: p.technology },
			label: 		{ $in: p.label },
			price: 		{ $gte: p.price.at, $lt: p.price.to}
	    }, 
	    function(err, data) {
	    if (err) {
	        res.send(err)
	    }

	    res.json(data);
	});

});

module.exports = router;