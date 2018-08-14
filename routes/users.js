var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', function(req, res) {
    console.log(req.body);

    // console.log(res.io);
  res.send('hi : '+req.body.name);
});

module.exports = router;
