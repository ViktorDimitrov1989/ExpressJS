/*jshint esversion: 6 */
const homeHandler = require('./home');
const staticFilesHandler = require('./static-files.js');
const addProductViewHandler = require('./product.js');



module.exports = [homeHandler, staticFilesHandler, addProductViewHandler];