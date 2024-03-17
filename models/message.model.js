const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    reciepientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    text:{
        type:String,
        required:true,
    }
}, { timestamps:true });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;