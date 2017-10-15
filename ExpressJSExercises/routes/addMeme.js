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
    let file = req.files.meme;
    let memeObj = req.body;
    let pathMeme = `./views/images/${file.name}`;
    memeObj.memePath = pathMeme;

    file.mv(pathMeme, (err) => {
      console.log(pathMeme);
      if (err) {
        console.log(err);
        return;
      }
    });

    Meme
      .create(memeObj)
      .then((newMeme) => {
        let targetGenre = memeObj.genreSelect;

        Genre.findOne({ genreName: targetGenre }).then((foundedGenre) => {
          foundedGenre.memeList.push(newMeme._id);
          foundedGenre.save().then(() => {
            Genre.find({}).then((genres) => {
              res.render('addMeme', {genres: genres, status: true});
            });
          });
        });
      });



  });

module.exports = router;
