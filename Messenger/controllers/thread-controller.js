const mongoose = require('mongoose');
const Thread = require('../models/Thread');
const Message = mongoose.model('Message');
const User = mongoose.model('User');
const imageChecker = require('../util/imageChecker');

module.exports = {

    chatRoomGet: (req, res) => {
        const usernameToChatWith = req.params.username;
        let currentUserId = req.user._id;
        User.findOne({ username: usernameToChatWith }).then((userToChatWith) => {
            Thread.findOne({ users: { $all: [userToChatWith._id, currentUserId] } }).then((thread) => {

                if (!thread) {
                    return res.redirect('/?error=Thread no longer exists!');
                }

                Message.find({ thread: thread._id })
                    .sort({ dateCreated: 1 })
                    .populate('user')
                    .then((messages) => {

                        for (let message of messages) {
                            if (imageChecker.isImage(message.content)) {
                                message.isImage = true;
                            } else if (imageChecker.isLink(message.content)) {
                                message.isLink = true;
                            }
                        }

                        if(userToChatWith.blockedUsers.indexOf(req.user._id) >= 0){
                            let blocked = true;
                            res.render('thread/chat-room', { messages: messages, blocked: blocked });
                        }else{
                            let blocked = false;
                            res.render('thread/chat-room', { messages: messages, blocked: blocked});
                        }


                        
                    })
            })

        })

    },

    chatRoomPost: (req, res) => {
        const usernameToChatWith = req.params.username;

        let msgContent = req.body.content;
        let recieverUsername = req.params.username;
        let creator = req.user._id;

        //content,user/sender, thread
        User.findOne({ username: recieverUsername }).then((reciever => {
            Thread.findOne({ users: { $all: [reciever._id, creator] } })
                .then((thread) => {

                    if (!thread) {
                        return res.redirect('/?error=Thread no longer exists!');
                    }

                    if (msgContent.length > 1000) {
                        return res.redirect('/?error=A message shouldn’t be more than 1000 symbols long.')
                    }

                    let message = {
                        content: msgContent,
                        user: creator,
                        thread: thread._id
                    }

                    Message.create(message).then(() => {
                        res.redirect(`/thread/${recieverUsername}`);
                    })

                })

        }));
    }


}


