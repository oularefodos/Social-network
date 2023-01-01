const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        min: 2,
        max: 10,
    },
    lastName : {
        type: String,
        required: true,
        min: 2,
        max: 10,
    },
    email : {
        type: String,
        required: [true, "User alredy registered"],
        max: 50,
        unique: true
    },
    password : {
        type: String,
        required: true,
        min: 8,
    },
    picturePath : {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    location: String,
    impressions: Number,
    viemProfil: Number
},
{ timestamps: true }
);

module.exports = mongoose.model("RsUser", UserSchema);