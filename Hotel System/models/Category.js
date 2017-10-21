const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.String, required: true, unique: true},
    hotels: [{type: ObjectId, ref: 'Hotel', default: []}],
    creator: { type: ObjectId, required: true, ref: 'User'}
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;