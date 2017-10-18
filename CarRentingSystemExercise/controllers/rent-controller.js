const mongoose = require('mongoose');
const Car = require('mongoose').model('Car');
const User = require('mongoose').model('User');
const KeyChain = require('mongoose').model('KeyChain');


module.exports = {
    getRentDetails: (req, res) => {

        let id = req.params.id;
        Car.findById(id).then((foundedCar) => {

            res.render('rent/rent-car', { car: foundedCar });
        })
    },

    rentCar: (req, res) => {
        let id = req.params.id;
        let userId = req.user.id;

        let days = Number(req.body.days);

        Car.findById(id).then((car) => {
            car.isRented = true;
            car.save().then(() => {
                User.findByIdAndUpdate(userId).then((foundedUser) => {
                    foundedUser.cars.push(car._id);
                    let keyObj = {
                        car: car._id,
                        renter: foundedUser._id,
                        rentDate: Date.now(),
                        days: days
                    };

                    KeyChain.create(keyObj).then(() => {
                        res.redirect('/');
                    });
                });
            })

        });

    }
}


