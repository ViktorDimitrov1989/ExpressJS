const User = require('../models/User');
const Thread = require('../models/Thread');
const encryption = require('../util/encryption');

module.exports = {
  register: {
    get: (req, res) => {
      res.render('user/register')
    },
    post: (req, res) => {
      let userData = req.body

      if (
        userData.password &&
        userData.password !== userData.confirmedPassword
      ) {
        userData.error = 'Passwords do not match'
        res.render('user/register', userData)
        return
      }

      let salt = encryption.generateSalt()
      userData.salt = salt

      if (userData.password) {
        userData.hashedPass = encryption.generateHashedPassword(
          salt,
          userData.password
        )
      }

      User.create(userData)
        .then(user => {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render('users/register', { error: 'Wrong credentials!' })
              return
            }

            res.redirect('/')
          })
        })
        .catch(error => {
          userData.error = error
          res.render('user/register', userData)
        })
    }
  },
  login: {
    get: (req, res) => {
      res.render('user/login')
    },
    post: (req, res) => {
      let userData = req.body

      User.findOne({ username: userData.username }).then(user => {
        if (!user || !user.authenticate(userData.password)) {
          res.render('user/login', { error: 'Wrong credentials!' })
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            res.render('user/login', { error: 'Wrong credentials!' })
            return
          }

          res.redirect('/')
        })
      })
    }
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  find: (req, res) => {
    let username = req.query.username;
    let currentUser = req.user;
    if (username === req.user.username) {
      return res.redirect('/?error=Cannot chata with yourself!');
    }

    User.findOne({ username: username }).then((userToChatWith) => {

      if (!userToChatWith) {
        return res.redirect('/?error=User does not exist.');
      }

      Thread.findOne({ users: { $all: [userToChatWith._id, currentUser._id] } }).then((existingThread) => {

        if (!existingThread) {
          let threadToCreate = {
            users: [userToChatWith._id, currentUser._id]
          };

          Thread.create(threadToCreate)
            .then(() => {
              currentUser.otherUsers.push(userToChatWith._id);
              userToChatWith.otherUsers.push(currentUser._id);
              Promise.all([currentUser.save(), userToChatWith.save()]);
            })
        }

        res.redirect(`/thread/${userToChatWith.username}`)
      })

    }).catch((err) => {
      console.log(err);
    })

  },
  block: (req, res) => {
    let userToBlockId = req.params.id;

    User.findById(userToBlockId).then((foundedUser) => {

      if (!foundedUser) {
        return res.redirect('/?error=User does not exist.');
      }

      if (req.user.blockedUsers.indexOf(userToBlockId) >= 0) {
        return res.redirect('/?error=User already blocked.');
      }

      req.user.blockedUsers.push(userToBlockId);
      req.user.save().then(() => {
        res.redirect('/');
      })
    })
  },
  unblock: (req, res) => {
    let userToUnblock = req.params.id;

    let removeIndex = req.user.blockedUsers.indexOf(userToUnblock);

    if(removeIndex >= 0){
      req.user.blockedUsers.splice(removeIndex, 1);

      req.user.save().then(() => {
        res.redirect('/');
      })

    }else{
      return res.redirect('/?error=User is not blocked.');
    }


  }



}
