var express = require('express');
var router = express.Router();

var Coffee = require('../models/coffee');

// get all
router.get('/', function(req, res, next) {
	Coffee.create({
		type		: "Arabica",
		region		: "Mocco",
	    label		: "Nescafe",
	    price		: 120
	});

	Coffee.find(function(err, data) {
	    if (err) {
	        res.send(err)
	    }

	    res.send(data);
	});
});

// filter
router.post('/', function(req, res, next) {
	Coffee.find(function(err, data) {
	    if (err) {
	        res.send(err)
	    }

	    res.send(teas);
	});
});

module.exports = router;