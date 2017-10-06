/*jshint esversion: 6 */

//const faviconHandler = require('./favicon-handler.js');
const homeHandler = require('./home-handler.js');
const staticFileHandler = require('./static-file-handler.js');
const addMovieHandler = require('./add-movie-handler.js');
const viewAllMoviesHandler = require('./display-movies-handler.js');
const movieDetailsHandler = require('./movie-details-handler.js');
const statusHandler = require('./status-handler.js');
module.exports = 
[homeHandler, staticFileHandler, addMovieHandler, viewAllMoviesHandler, movieDetailsHandler, statusHandler];