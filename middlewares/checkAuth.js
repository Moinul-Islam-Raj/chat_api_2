const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js')
module.exports = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) return res.status(401).json({error: "Unauthorized. NO TOKEN PROVIED!"});

    const data = jwt.verify(token, process.env.JWT_SECREAT);
    const user = await User.findById(data.userId);
    if(!user) return res.status(401).json({error: "Unauthorized. INVALID TOKEN!"});

    req.user = user;
    next();
};