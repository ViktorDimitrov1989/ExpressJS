const Hotel = require('mongoose').model('Hotel');


module.exports = {

    index: (req, res) => {

        Hotel.find({}).sort('-creationDate').limit(20).then((hotels) => {
            res.render('home/index', {hotels: hotels});
        });
        
    },
    about: (req, res) => {
        res.render('home/about');
    }
    
};