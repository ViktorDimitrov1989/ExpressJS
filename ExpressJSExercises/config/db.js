const mongoose = require('mongoose');
//todo ?
const path = 'mongodb://localhost/ExpressJSExercises';

mongoose.Promise = global.Promise;

module.exports = mongoose.createConnection(path, {
    useMongoClient: true
})