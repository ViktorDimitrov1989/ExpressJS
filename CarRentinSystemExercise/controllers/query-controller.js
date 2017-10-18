const mongoose = require('mongoose');
const Car = require('mongoose').model('Car');

module.exports = {

    viewAll: (req, res) => {
        Car.find({}).sort('-addedOn').then((cars) => {
            res.render('viewAll', {cars: cars});
        })


    }


}