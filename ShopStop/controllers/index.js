/*jshint esversion: 6 */
const homeHandler = require('./home');
const productHandler = require('./product.js');
const categoryHandler = require('./category.js');
const userController = require('./user-constroller');

module.exports = {
    home: homeHandler,
    product: productHandler,
    category: categoryHandler,
    user: userController
}