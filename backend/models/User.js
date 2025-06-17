const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    login: {
        type: String,
        unique: true, 
        required: true,
    },
    password: {
        type: String,
        unique: false, 
        required: true,
    },
    email: {
        type: String,
        unique: true, 
        required: false,
    },
    role: {
        type: String,
        unique: false, 
        required: true,
    },
})

const User = model('User', userSchema);

module.exports = User;