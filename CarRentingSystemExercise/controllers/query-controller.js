const mongoose = require('mongoose');
const Car = require('mongoose').model('Car');

module.exports = {

    viewAll: (req, res) => {
        let page = Number(req.query.page);

        let prevPage = page - 1;
        let nextPage = page + 1;

        Car.find({}).where('isRented').equals(false).sort('-addedOn').skip(page * 10).limit(10).then((cars) => {
        
            if(prevPage < 0){
                prevPage = 0;
            }

            let page = {
                prevPage: prevPage,
                nextPage: nextPage
            }

            res.render('query/viewAll', {cars: cars, page: page});
        });

    }


}