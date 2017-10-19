const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    content: { type: mongoose.Schema.Types.String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    thread: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Thread' },
    dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;