const mongoose = require('mongoose');
const path = 'mongodb://localhost/ExpressJSExercises';

mongoose.Promise = global.Promise;

module.exports = (() => {
    mongoose.connect(path, {
        useMongoClient: true
    })

    console.log('DB Listening');
})()