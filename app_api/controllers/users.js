const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')

const postRegisterUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Please fill all fields'});
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        password: hashedPassword
    })

    if (user) {
        return res.status(201).json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id)
        })
    }
    else {
        return res.status(400).json({message: 'Invalid user data'})
    }
})

const loginUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
            _id: user.id,
            username: user.username,
            token: generateToken(user._id)
        })
    }
    else {
        return res.status(400).json({message: 'Invalid credentials'})
    }
})

const getMe = asyncHandler(async(req, res) => {
    return res.status(200).json(req.user);
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = {
    postRegisterUser,
    loginUser,
    getMe,
}