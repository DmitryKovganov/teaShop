var express = require('express');
var router = express.Router();

router.get('*', function(req, res) {
    res.sendfile('../public/index.html');
});

router.get('/', function(req, res, next) {
	res.send('index');
});

module.exports = router;