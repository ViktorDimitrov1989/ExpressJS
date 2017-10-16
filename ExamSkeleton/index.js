const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello');
});

mongoose.connect('mongodb://localhost:27017/exam-skeleton-db')
    .then(() => {
        console.log('DB ready!');
        app.listen(port);
    });


