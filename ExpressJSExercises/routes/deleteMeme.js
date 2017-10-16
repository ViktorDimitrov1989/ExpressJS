var express = require('express');
var router = express.Router();
const fs = require('fs');

const Meme = require('../models/MemeSchema');
const Genre = require('../models/GenreSchema');

/* POST deleteMeme. */
router.get('/:id', function (req, res, next) {
    let id = req.params.id;

    Genre.find({ memeList: id }).then((genreToEdit) => {
    
        for (let genre of genreToEdit) {
            let index = genre.memeList.indexOf(id);
            console.log(genre);
            if (index >= 0) {
                genre.memeList.splice(index, 1);
            }

            genre.save().then(() => {
                Meme.findByIdAndRemove(id).then((memeToRemove) => {
                    fs.unlink(memeToRemove.memePath, (err) => {
                        console.log(memeToRemove.memePath);
                        if (err) {
                            console.log(err.message);
                            return;
                        }

                        res.redirect('/');
                    });
                });
            });
        }
    });

});

module.exports = router;