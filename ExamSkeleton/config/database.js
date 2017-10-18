const mongoose = require('mongoose');
const config = require('./config');
mongoose.Promise = global.Promise;

const User = require('../models/User');

module.exports = (config) => {
    mongoose.connect(config.dbPath, {
        useMongoClient: true
    });

    const db = mongoose.connection;
    db.once('open', (err) => {
    
        if (err) {
            throw err;
        }
       
        User.seedAdministrator().then(() => {
            console.log('DB ready!');
        }).catch((reason) => {
            console.log('Error has occured!');
            console.log(reason);
        });
    });

    
    db.on('error', reason => {
        console.log(reason);
    })
}