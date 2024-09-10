const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const avatarSchema = new Schema({
    userName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    genderIndex: {
        type: String,
        required: false
    },
    hairIndex:{
        type: Number,
        required:true
    },
    shirtIndex: {
        type: String,
        required: true
    },
    topIndex: {
        type: String,
        required: true
    },
    bottomIndex: {
        type: String,
        required: true
    },
    shoeIndex: {
        type: String,
        required: true
    },
    tieIndex: {
        type: String,
        required: false
    },
    liskAddress: {
        type: String,
        required: true
    },
    accessories: {
        type: {},
        required: true
    },
});

module.exports = mongoose.model('Avatar', avatarSchema)