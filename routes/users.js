var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.io.emit("socketToMe", "users");
    // console.log(res.io);
  res.send('respond with a resource');
});

module.exports = router;
