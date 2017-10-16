var express = require('express');
var router = express.Router();

const Genre = require('../models/GenreSchema');
const Meme = require('../models/MemeSchema');

/* GET searchMemes page. */
router.get('/', function (req, res, next) {
  Genre.find({}).then((genres) => {
    res.render('searchMemes', { genres: genres });
  });
})
  .post('/', (req, res, next) => {
    let memeName = req.body.memeName;
    let genreSelect = req.body.genreSelect;

    Genre.findOne({ genreName: genreSelect }).populate('memeList').then(genre => {
      let result = [];

      for (let meme of genre.memeList) {
        if(meme.memeName.includes(memeName)){
          result.push(meme);
        }
      }

      res.render('viewSearchedMemes', { memes: result });
    });
  });

module.exports = router;