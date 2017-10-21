const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const hotelSchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true},
    location: { type: mongoose.Schema.Types.String, required: true},
    image: { type: mongoose.Schema.Types.String, required: true},
    category: { type: ObjectId, required: true, ref: 'Category'},
    description: { type: mongoose.Schema.Types.String, required: true},
    creationDate: {type: Date, default: Date.now},
    viewCounter: {type: Number, default: 0},
    likedUsers: [{type: ObjectId, ref: 'User'}],
    comments: [{type: ObjectId, ref: 'Comment'}], default: []
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;





