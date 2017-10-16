const handlers = require('../handlers');
const mutler = require('multer');

let upload = mutler({dest: './content/images'});

module.exports = (app) => {
    app.get('/', handlers.home.index);

    app.get('/product/add', handlers.product.addGet);
    app.post('/product/add', upload.single('image'),  handlers.product.addPost);
    
    app.get('/category/add', handlers.category.addGet);
    app.post('/category/add', handlers.category.addPost);
    app.get('/category/:category/products', handlers.category.productByCategory)
}