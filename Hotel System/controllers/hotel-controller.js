const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const Coment = mongoose.model('Comment');
const Category = require('mongoose').model('Category');

module.exports = {

    addGet: (req, res) => {
        Category.find({}).then((categories) => {
            res.render('hotels/generateHotel', { categories: categories });
        })

    },
    addPost: (req, res) => {
        let hoteltoCreate = {
            title: req.body.title,
            location: req.body.location,
            image: req.body.image,
            location: req.body.location,
            category: req.body.category,
            description: req.body.description
        }


        Hotel.create(hoteltoCreate).then((createdHotel) => {

            Category.findById(req.body.category).then((cat) => {
                cat.hotels.push(createdHotel._id);
                req.user.hotels.push(createdHotel._id);
                cat.save().then(() => {
                    req.user.save().then(() => {
                        res.locals.successMessage = 'Hotel created';
                        res.render('home/index');
                    })
                })

            })

        })
    },
    list: (req, res) => {

        let page = Number(req.query.page) || 1;

        Hotel.count({}).then(hotelCount => {
            let limit = 2;
            let maxPages = Math.ceil(hotelCount / limit);

            if (page > maxPages) {
                page = maxPages;
            }
            if (page < 0) {
                page = 1;
            }

            let pages = {
                nextPage: page + 1,
                prevPage: page - 1
            }

            Hotel.find({}).sort('-creationDate').skip((page - 1) * limit).limit(limit).then((hotels) => {
                res.render('hotels/hotelList', { hotels: hotels, pages: pages });
            })
        })


    },
    detDetails: (req, res) => {
        let hotelId = req.query.id;
        Hotel.findById(hotelId).populate('comments').then((hotel) => {

            if (!hotel) {
                res.locals.globalError = 'Hotel does not exist';
                res.render('home/index');
            }

            hotel.viewCounter += 1;
            hotel.save().then(() => {
                res.render('hotels/details', { selectedHotel: hotel, comments: hotel.comments });
            })

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
    },
    like: (req, res) => {
        let hotelId = req.params.id;

        Hotel.findById(hotelId).then((selectedHotel) => {

            let targetId = req.user._id;
            let index = selectedHotel.likedUsers.indexOf(targetId);
            if (index >= 0) {
                selectedHotel.likedUsers.splice(index, 1);
            } else {
                selectedHotel.likedUsers.push(targetId);
            }

            selectedHotel.save().then(() => {
                res.redirect(`/details?id=${hotelId}`);
            })
        })


    },
    listByCategory: (req, res) => {
        let categoryName = req.params.category;

        Category.findOne({ category: categoryName })
            .populate('hotels').then((category) => {
                let hotels = category.hotels;
                res.render('hotels/hotelList', {hotels: hotels});
            })
    }
};