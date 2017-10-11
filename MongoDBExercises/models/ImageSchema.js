/*jshint esversion: 6 */
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

let imageSchema = new mongoose.Schema({
    imageUrl: { type: String, require: true },
    imageTitle: { type: String, require: true, default: ''},
    creationDate: { type: Date, require: true, default: Date.now()},
    description: {type: String, require: true},
    tagsID: [{type: ObjectId, ref: 'Tag'}]
});

module.exports = mongoose.model('Image', imageSchema);