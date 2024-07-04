//encryptions and jwts

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


//new user
exports.register = async (req, res) => {
    //get user details from body
    const { username, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    //hash password
    
    const user = await User.create({ username, email, password: hashedPassword });
    //save user to database
    
    res.status(201).json({ message: 'User registered successfully' });
};
    //Success response. 


    //existing user login
exports.login = async (req, res) => {
    //extract login details from body
    
    const { email, password } = req.body;
    //find user with email.

    const user = await User.findOne({ where: { email } });
    //verify existing user and pw match
    
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    //generate jwt token
    
    res.json({ token });
    //send token to client.
};


    //access user profile
exports.getProfile = async (req, res) => {
    //look up user by ID
    const user = await User.findByPk(req.user.id);
    
    res.json(user);
    //send user details to user
};
