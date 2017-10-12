/*jshint esversion: 6 */
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

let tagSchema = new mongoose.Schema({
    tagName: { type: String, require: true },
    creationDate: { type: Date, require: true, default: Date.now()},
    images: [{type: ObjectId, ref: 'Image'}]
});

tagSchema.pre('save', function(next){
    this.tagName = this.tagName.toLowerCase();
    next();
});

module.exports = mongoose.model('Tag', tagSchema);

