const Car = require('mongoose').model('Car');


module.exports = {

    addCarGet: (req, res) => {
        res.render('admin-panel/create-car');
    },

    addCarPost: (req, res) => {
        let carData = req.body;

        let objtoCreate = {
            brand: carData.brand,
            model: carData.model,
            image: carData.image,
            productionYear: carData.productionYear,
            addedOn: Date.now()
        }

        Car.create(objtoCreate).then((createdCar) => {
            console.log(createdCar);
            res.redirect('/');
        })

    }

}