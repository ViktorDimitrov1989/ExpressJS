const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true},
    comment: { type: mongoose.Schema.Types.String, required: true},
    datePosted: {type: Date, default: Date.now},
    creator: { type: String, required: true}
});

const Coment = mongoose.model('Comment', commentSchema);

module.exports = Coment;





