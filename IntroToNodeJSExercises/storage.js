/*jshint esversion: 6 */
let fs = require('fs');
let _map = {};

function IncorrectDataException(message) {
    this.message = message;
    this.name = 'IncorrectDataException';
}

let Storage = {
    put: (key, value) => {
        if (typeof key != 'string' || _map[key] != undefined) {
            console.log('Data is incorrect');
            return;
        }

        _map[key] = value;
    },

    get: (key) => {
        if (typeof key != 'string' || _map[key] == undefined) {
            console.log('Data is incorrect');
            return;
        }

        return _map[key];
    },

    getAll: () => {
        if (Object.keys(_map).length == 0) {
            return 'The collection is empty.';
        }

        return JSON.stringify(_map);

    },

    update: (key, newValue) => {
        if (typeof key != 'string' || _map[key] == undefined) {
            console.log('Data is incorrect');
            return;
        }

        _map[key] = newValue;
    },

    del: (key) => {
        if (typeof key != 'string' || _map[key] == undefined) {
            console.log('Data is incorrect');
            return;
        }

        delete _map[key];
    },

    clear: () => {
        _map = {};
    },

    save: () => {
        fs.writeFileSync('./storage.json', JSON.stringify(_map), 'utf8');
        // fs.writeFile("./storage.json", JSON.stringify(_map), 'utf8', ((err) => {
        //     if (err) {
        //         return;
        //     }

        //     callback();
        // }));

    },

    load: () => {
        _map = JSON.parse(fs.readFileSync('./storage.json'));
        // fs.readFile('./storage.json', 'utf8', (err, txt) => {

        //     if (err) {
        //         return;
        //     }

        //     _map = JSON.parse(txt);

        //     callback();
        // });
    }
};

module.exports = Storage;











