/*jshint esversion: 6 */
const homeHandler = require('./home');
const staticFilesHandler = require('./static-files.js');
const addProductViewHandler = require('./product.js');
const categoryHandler = require('./category.js');

module.exports = [homeHandler, staticFilesHandler, addProductViewHandler, categoryHandler];