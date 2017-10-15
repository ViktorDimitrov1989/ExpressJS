var express = require('express');
var router = express.Router();

const Meme = require('../models/MemeSchema');

/* GET searchMemes page. */
router.get('/', function (req, res, next) {

    Meme.findById(req.query.id)
    .then(meme => {
        res.render('getMemeDetails', {meme: meme});
    });
    
});

module.exports = router;