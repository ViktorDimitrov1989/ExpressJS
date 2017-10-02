/*jshint esversion: 6 */
let fs = require('fs');
let _map = {};

function IncorrectDataException(message) {
    this.message = message;
    this.name = 'IncorrectDataException';
}

let Storage = {
    put: (key, value, callback) => {
        if (typeof key != 'string' || _map[key] != undefined) {
            console.log('Data is incorrect');
            return;
        }

        _map[key] = value;
        callback('Added ' + key + ' on position ' + value);
    },

    get: (key, callback) => {
        if (typeof key != 'string' || _map[key] == undefined) {
            console.log('Data is incorrect');
            return;
        }

        return callback('Returned value: ' + _map[key]);
    },

    getAll: (callback) => {
        if (Object.keys(_map).length == 0) {
            return 'The collection is empty.';
        }

        return callback('The map values are: ' + JSON.stringify(_map));
    },

    update: (key, newValue, callback) => {
        if (typeof key != 'string' || _map[key] == undefined) {
            console.log('Data is incorrect');
            return;
        }

        _map[key] = newValue;
        callback('Key ' + key + ' was updated');
    },

    del: (key, callback) => {
        if (typeof key != 'string' || _map[key] == undefined) {
            console.log('Data is incorrect');
            return;
        }

        delete _map[key];
        callback('Key' + key + ' was deleted.');
    },

    clear: (callback) => {
        _map = {};
        return callback('The storage was cleared.');
    },

    save: (callback) => {
        fs.writeFile("./storage.json", JSON.stringify(_map), 'utf8', (err) => {
            if (err) {
                return;
            }

            callback("Data was saved in storage.json");
        });

    },

    load: (callback) => {
        fs.readFile('./storage.json', 'utf8', (err, txt) => {

            if (err) {
                return;
            }

            _map = JSON.parse(txt);

            callback("The storage was updated from 'storage.json' file");
        });
    }
};

module.exports = Storage;











