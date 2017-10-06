/*jshint esversion: 6 */
const dbPath = require('./../config/dataBase.js');

let Reader = {

    readFile: (callback) => {

        fs.readFile(dbPath, 'utf8', (err, txt) => {

            if (err) {
                return;
            }

            return txt;
        });

    }

};

module.exports = Reader;