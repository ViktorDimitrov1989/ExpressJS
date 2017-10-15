var express = require('express');
var router = express.Router();

const Meme = require('../models/MemeSchema');

/* GET searchMemes page. */
router.get('/', function (req, res, next) {
    console.log(req.params);
    console.log(req.type);
    let meme = req.params;
    res.render('getMemeDetails', {meme: meme});
});

module.exports = router;