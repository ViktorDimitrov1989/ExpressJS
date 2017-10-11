/*jshint esversion: 6 */
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const connString = 'mongodb://localhost:27017/mongoDBExercise';
mongoose.Promise = global.Promise;

mongoose.connect(connString, {
    useMongoClient:true
});