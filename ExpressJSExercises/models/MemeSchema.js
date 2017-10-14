const mongoose = require('mongoose');

let meme = new mongoose.Schema({
    memeName: {type: String, required: true},
    memePath: {type: String, required: true},
    dateOfCreation: {type: Date, default: Date.now()},
    votes: {type: Number, default: 0},
    memeDescription: {type: String}
});

module.exports = mongoose.model('Meme', meme);

