/*jshint esversion: 6 */
const fs = require('fs');
const publicHeader = `<li><a href="/addMovie">Add Movie</a></li>
<li><a href="/viewStatus">View Status</a></li>
<li><a href="/viewAllMovies">View All Movies</a></li>`;

let HeaderHandler = {

    handleHeader: (data) => {
        let str = data.toString().replace('{header}', publicHeader);
        return str;
    }

};


module.exports = HeaderHandler;



