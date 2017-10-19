const mongoose = require('mongoose');
const Thread = require('../models/Thread');
const Message = mongoose.model('Message');
const User = mongoose.model('User');


module.exports = {

    chatRoomGet: (req, res) => {
        const usernameToChatWith = req.params.username;
        let currentUserId = req.user._id;
        User.findOne({ username: usernameToChatWith }).then((userToChatWith) => {
            Thread.findOne({ users: { $all: [userToChatWith._id, currentUserId] } }).then((thread) => {

                if(!thread){
                    return res.redirect('/?error=Thread no longer exists!');
                }

                Message.find({thread: thread._id})
                .sort({dateCreated:1})
                .populate('user')
                .then((messages) => {
                    res.render('thread/chat-room', messages); 
                })
            })
                
        })



    },

    chatRoomPost: (req, res) => {
        const usernameToChatWith = req.params.username;



    }




}


