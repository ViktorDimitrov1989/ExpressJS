var express = require('express');
var router = express.Router();

const Genre = require('./../models/GenreSchema');
const Meme = require('./../models/MemeSchema');

/* GET addMeme form. */
router.get('/', function (req, res, next) {

  Genre.find({}).then((genres) => {
    res.render('addMeme', { genres });
  })

})
  .post('/', (req, res, next) => {
    //console.log(req.files)
    //console.log(req.body);
    let file = req.files.meme;
    let memeObj = req.body;
    let pathMeme = `./${file.name}`;
    memeObj.memePath = pathMeme;

    file.mv(pathMeme, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });

    Meme
      .create(memeObj)
      .then((newMeme) => {
        let targetGenre = files.genreSelect;

        Genre.findOne({ genreName: targetGenre }).then((foundedGenre) => {
          foundedGenre.push(targetGenre._id);
          foundedGenre.save().then(() => {
            res.render('addMeme', { status: true });
          });
        });
      });



  });

module.exports = router;
