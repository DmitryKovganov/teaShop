var express = require('express');
var router = express.Router();

// var Drink = require('../models/drink');

// router.get('*', function(req, res) {
//     res.sendfile('../public/index.html');
// });

router.get('/', function(req, res, next) {
	// Drink.create({name: "" + new Date().getTime()});

	// Drink.find(function(err, teas) {
	//     if (err)
	//         res.send(err)

	//     res.send(teas);
	// });

	res.send('index');
});

module.exports = router;