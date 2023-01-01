const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    firstName : {
        type: String,
        required: true
    },

    lastName : {
        type: String,
        required: true
    },
    location : {
        type: String,
    },
    userPicturePath : {
        type: String,
    },
    picturePath : {
        type: String,
        required: true
    },
    description : {
        type: String,
        default: ""
    },
    likes : {
        type: Map,
        default: {}
    },
    comments : {
        type: Array,
        default: []
    }
},
{ timestamps: true }    
);

module.exports = mongoose.model('OurPost', postSchema);
