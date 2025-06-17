const { Schema, model } = require('mongoose');

const calculatorSchema = new Schema({
    name: {
        type: String,
        unique: true, 
        required: true,
    },
    rateYear: {
        type: Number,
        unique: false, 
        required: true,
    },
    status: {
        type: Boolean,
        unique: false, 
        required: false,
        default: false,
    },
})

const Calculator = model('Calculator', calculatorSchema);

module.exports = Calculator;