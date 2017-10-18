const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
let productSchema = mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, require: true},
    description: {type: mongoose.Schema.Types.String},
    price: {
        type: mongoose.Schema.Types.Number,
        min: 0,
        max: Number.MAX_VALUE,
        default: 0
    },
    image: mongoose.Schema.Types.String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    creator: {type: ObjectId, ref: 'User', required: true},
    buyer: {type: ObjectId, ref: 'User', required: true}
})

let Product = mongoose.model('Product', productSchema);

module.exports = Product;