const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    gender:{
        type:String,
        required:true,
        enum: ["male", "female", "other"],
    },
    profilePicture:{
        type:String,
        default:"",
    }
}, { timestamps:true });

const User = mongoose.model("User", userSchema);

module.exports = User;