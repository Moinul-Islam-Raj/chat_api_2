const User = require('../models/user.model.js');

const getUsers = async (req, res) => {
    try {
        const id = req.user._id;
        const users = await User.find({_id: {$ne: id}}).select('-password');

        res.status(200).json(users);
    } catch (error) {
        console.log("Error in user controller get users", error.message);
        res.status(500).json({error: "something went wrong."});
    }
}

const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password');
        if(!user) return res.status(400).json({error: "No user found"});

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in user controller get user", error.message);
        res.status(500).json({error: "something went wrong."});
    }
}

module.exports = { getUser, getUsers }