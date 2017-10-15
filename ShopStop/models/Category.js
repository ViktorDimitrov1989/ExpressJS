const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

let categorySchema = mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, require: true},
    products: [{type: ObjectId, ref: 'Product'}]
})

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;