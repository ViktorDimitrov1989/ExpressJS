const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const hotelSchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true},
    location: { type: mongoose.Schema.Types.String, required: true},
    image: { type: mongoose.Schema.Types.String, required: true},
    type: { type: mongoose.Schema.Types.String, required: true},
    description: { type: mongoose.Schema.Types.String, required: true},
    creationDate: {type: Date, default: Date.now},
    hotels: [{type: ObjectId, ref: 'Hotel'}], default: [],
    comments: [{type: ObjectId, ref: 'Comment'}], default: []
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;





