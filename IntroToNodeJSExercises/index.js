/*jshint esversion: 6 */
let storage = require('./storage.js');

let callback = (text) => {
    console.log(text);
};

storage.load(callback);
storage.put('first', 'firstValue', callback);
storage.put('second', 'secondValue', callback);
storage.put('third', 'thirdValue', callback);
storage.put('fouth', 'fourthValue', callback);
storage.get('first', callback);
storage.getAll(callback);
storage.del('second', callback);
storage.update('first', 'updatedFirst', callback);
storage.save(callback);
storage.clear(callback);
storage.getAll(callback);
storage.load(callback);
storage.getAll(callback);
storage.put('first', 'firstValue', callback);
storage.put('second', 'secondValue', callback);
storage.del('second', callback);
storage.del('second', callback);
storage.put(2, 'someValue', callback);
storage.put('cat', 'dog', callback);
storage.put('cat', 'anotherDog', callback);





