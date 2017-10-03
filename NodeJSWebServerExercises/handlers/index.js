/*jshint esversion: 6 */

//const faviconHandler = require('./favicon-handler.js');
const homeHandler = require('./home-handler.js');
const staticFileHandler = require('./static-file-handler.js');
const addMovieHandler = require('./add-movie-handler.js');

module.exports = [homeHandler, staticFileHandler, addMovieHandler];