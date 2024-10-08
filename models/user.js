const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: false
    },
    walletAddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', userSchema)