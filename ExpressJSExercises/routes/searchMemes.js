var express = require('express');
var router = express.Router();

/* GET searchMemes page. */
router.get('/', function(req, res, next) {
  res.render('searchMemes');
});

module.exports = router;