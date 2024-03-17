const Message = require('../models/message.model.js');
const Conversation = require('../models/conversation.model.js');

const sendMessage = async (req, res) => {
    try{
        const { reciepientId } = req.params;
        const senderId = req.user._id;
        const { text } = req.body;
        if(!reciepientId || !text) return res.status(400).json({error: "ReciepientId or text not provided!"})

        let conversation = await Conversation.findOne({
            participants:{$all: [senderId, reciepientId]}
        })
        if(!conversation){
            conversation = new Conversation({
                participants:[senderId, reciepientId]
            })
        }
        const message = new Message({senderId, reciepientId, text});
        conversation.messages.push(message._id);

        await message.save();
        await conversation.save();
        
        const updatedConversation = await Conversation.findOne({
            participants:{$all: [senderId, reciepientId]}
        }).populate('messages');
        res.status(200).json(updatedConversation.messages);
    }
    catch (error){
        console.log("error in message controller send message", error.message);
        res.status(500).json({error: "something went wrong."});
    }
}

const getMessages = async (req, res) => {
    try {
        const { id:reciepientId } = req.params;
        const senderId = req.user._id;
    
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, reciepientId]}
        }).populate('messages');
        if(!conversation) return res.status(200).json([]);
        res.status(200).json(conversation.messages);
        
    } catch (error) {
        console.log("error in message controller get messages", error.message);
        res.status(500).json({error: "something went wrong."});
    }
}

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const message = await Message.findById(id);
        if(!message) return res.status(400).json({error: "Message doesn't exist."});

        if(message.senderId.toString() !== userId.toString()) return res.status(400).json({error: "Can't delete message that isn't yours."});
        const deletedMessage = await Message.findByIdAndDelete(id);
        console.log(deletedMessage);
        res.status(200).json(deletedMessage);
    } catch (error) {
        console.log("error in message controller delete messages", error.message);
        res.status(500).json({error:error.message});
    }
}

module.exports = { sendMessage, getMessages, deleteMessage };