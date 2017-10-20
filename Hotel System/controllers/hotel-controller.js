const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const Coment = mongoose.model('Comment');


module.exports = {

    addGet: (req, res) => {

        res.render('hotels/generateHotel');
    },
    addPost: (req, res) => {
        Hotel.create(req.body).then((createdHotel) => {
            req.user.hotels.push(createdHotel._id);
            req.user.save().then(() => {
                res.locals.successMessage = 'Hotel created';
                res.render('home/index');
            })
        })
    },
    list: (req, res) => {
        Hotel.find({}).sort('-creationDate').limit(20).then((hotels) => {
            res.render('hotels/hotelList', { hotels: hotels });
        })
    },
    detDetails: (req, res) => {
        let hotelId = req.query.id;
        Hotel.findById(hotelId).populate('comments').then((hotel) => {

            if (!hotel) {
                res.locals.successMessage = 'Hotel does not exist';
                res.render('home/index');
            }

            res.render('hotels/details', { selectedHotel: hotel, comments: hotel.comments });
        })
    },
    addComment: (req, res) => {
        let hotelId = req.params.id;
        let comment = req.body;
        comment.creator = req.user.username;

        Hotel.findById(hotelId).then(hotel => {

            if (!hotel) {
                res.locals.successMessage = 'Hotel does not exist';
                res.render('home/index');
                return;
            }

            Coment.create(comment).then(createdComment => {
                hotel.comments.push(createdComment._id);
                req.user.comments.push(createdComment._id);
                hotel.save().then(() => {
                    req.user.save().then(() => {
                        res.redirect(`/details?id=${hotelId}`);
                    })
                })
            })
        })
    }
};