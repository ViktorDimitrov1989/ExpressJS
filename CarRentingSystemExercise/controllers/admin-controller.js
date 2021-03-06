const Car = require('mongoose').model('Car');


module.exports = {

    addCarGet: (req, res) => {
        res.render('admin-panel/create-car');
    },

    addCarPost: (req, res) => {
        let carData = req.body;
        console.log(req.body);
        let objtoCreate = {
            brand: carData.brand,
            model: carData.model,
            image: carData.image,
            productionYear: carData.productionYear,
            addedOn: Date.now(),
            pricePerDay: Number(carData.price)
        }

        Car.create(objtoCreate).then((createdCar) => {
            console.log(createdCar);
            res.redirect('/');
        })

    }

}