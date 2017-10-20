const controllers = require('../controllers')

module.exports = app => {
  app.get('/', controllers.home.get)
  app.get('/user/register', controllers.user.register.get)
  app.post('/user/register', controllers.user.register.post)
  app.post('/user/logout', controllers.user.logout)
  app.get('/user/login', controllers.user.login.get)
  app.post('/user/login', controllers.user.login.post)
  app.get('/user/find', controllers.user.find);
  app.get('/thread/:username', controllers.thread.chatRoomGet);
  app.post('/thread/:username', controllers.thread.chatRoomPost);
  app.get('/user/:id/block', controllers.user.block);
  app.get('/user/:id/unblock', controllers.user.unblock);


  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}
