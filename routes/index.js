var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.io.emit('socketToMe', 'home');
    res.render('index', { 'title': 'IMo' });
});

module.exports = router;
