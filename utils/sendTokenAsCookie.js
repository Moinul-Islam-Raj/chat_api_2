const jwt = require('jsonwebtoken');

module.exports = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECREAT, {
        expiresIn: '15d'
    });
    res.cookie('token', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:'strict',
        secure:false,
    })
}