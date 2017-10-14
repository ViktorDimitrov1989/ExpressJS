var express = require('express');
var router = express.Router();

/* GET viewAll listing. */
router.get('/', function (req, res, next) {
    //TODO get all memes and pass them
    res.render('viewAllMemes');
});

module.exports = router;