/*jshint esversion: 6 */
let storage = require('./storage.js');

    storage.load();
    storage.put('first','firstValue');
    storage.put('second','secondValue');
    storage.put('third','thirdValue');
    storage.put('fouth','fourthValue');
    console.log(storage.get('first')); //firstValue
    console.log(storage.getAll()); //obj
    storage.del('second');
    storage.update('first','updatedFirst');
    storage.save();
    storage.clear();
    console.log(storage.getAll()); //empty msg
    storage.load();

    console.log(storage.getAll()); // not empty msg
    storage.put('first','firstValue');
    storage.put('second','secondValue');
    storage.del('second');
    storage.del('second'); // err msg
    storage.put(2,'someValue');	// err msg
    storage.put('cat','dog');
    storage.put('cat','anotherDog');
    




