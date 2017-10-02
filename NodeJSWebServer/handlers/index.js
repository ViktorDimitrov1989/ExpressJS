/*jshint esversion: 6 */
const faviconHandler = require('./favicon-handler.js');
const homeHandler = require('./home-handler.js');
const staticFileHandler = require('./static-file-handler.js');

module.exports = [faviconHandler, homeHandler, staticFileHandler];
