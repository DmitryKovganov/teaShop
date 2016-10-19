var express = require('express');
var router = express.Router();

var Tea = require('../models/tea');

router.get('/', function(req, res, next) {
	Tea.create({name: "" + new Date().getTime()});

	Tea.find(function(err, teas) {
	    if (err)
	        res.send(err)

	    res.send(teas);
	});

	// res.send(teas);
});

module.exports = router;