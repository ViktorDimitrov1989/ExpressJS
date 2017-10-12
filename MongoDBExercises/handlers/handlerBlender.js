/*jshint esversion: 6 */
const homeHandler= require('./homeHandler');
const addImageHandler = require('./addImageHandler');
const addTagHandler = require('./tagHandler');
const searchHandler = require('./searchHandler');
const staticFileHandler = require('./staticHandler');
const delImageHandler = require('./deleteImageHandler');

module.exports = [homeHandler,addTagHandler,searchHandler,addImageHandler,staticFileHandler,delImageHandler];