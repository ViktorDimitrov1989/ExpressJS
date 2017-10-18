const mongoose = require('mongoose');
require('../models/Category');
require('../models/Product');

mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.connectionString, {
        useMongoClient:true
    });

    let database = mongoose.connection;

    database.once('open', (err) => {
        if(err){
            console.log(err);
            return;
        }

        console.log('connected!');
    });

    database.on('err', (err) => {
        console.log(err);
    })

    require('../models/User').seedAdminUser();
}