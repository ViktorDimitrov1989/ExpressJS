const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: { type: mongoose.Schema.Types.String, required: true},
    model: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String },
    productionYear: { type: mongoose.Schema.Types.Number },
    isRented: {type: Boolean, required: true, default: false},
    addedOn: {type: Date, required: true}
});


const Car = mongoose.model('Car', carSchema);

module.exports = Car;