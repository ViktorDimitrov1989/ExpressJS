var express = require('express');
var router = express.Router();

const Meme = require('./../models/MemeSchema');

/* GET viewAll memes listing. */
router.get('/', function (req, res, next) {
    //TODO get all memes and pass them
    Meme
    .find({})
    .then((memes) => {
        console.log(memes);
        res.render('viewAllMemes', {memes: memes});
    });
});

module.exports = router;