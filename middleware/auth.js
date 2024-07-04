//importing jwt
const jwt = require('jsonwebtoken');

//using middleware to authenticate tokens
module.exports = (req, res, next) => {
    //token from authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    //verifying token
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        //decoded user ID to request 
        req.user = decoded;
        // don't forget next so it doesn't get stuck.
        next();
    } catch (err) {
        //err message for incorrect tokens
        res.status(401).json({ message: 'Unauthorized' });
    }
};
