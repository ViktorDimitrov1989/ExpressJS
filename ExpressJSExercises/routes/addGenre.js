var express = require('express');
var router = express.Router();

const Genre = require('./../models/GenreSchema');

/* GET addGenre form. */
router
.get('/', function(req, res, next) {
  res.render('addGenre');
})
.post('/', function (req, res, next){
  let objParams = req.body;
  
  Genre
  .create(objParams)
  .then((obj) => {
      console.log(obj);

      res.render('addGenre', {status: true});
  })
  .catch(handleErr);
});

function handleErr (err){
  console.log(err);
}

module.exports = router;