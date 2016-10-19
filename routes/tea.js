var express = require('express');
var router = express.Router();

var Tea = require('../models/tea');

router.get('/', function(req, res, next) {
	var obj = {name: "" + new Date().getTime()};
	Tea.create({name: obj});

	res.send(obj);
});

module.exports = router;