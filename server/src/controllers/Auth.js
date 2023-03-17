const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    console.log(req.body)
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            followers,
            following,
            location,
            impressions,
            viewProfile
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            picturePath,
            followers,
            following,
            location,
            impressions,
            viewProfile
        });
        const user = await newUser.save();
        res.status(201).json(user._id);
    }
    catch(error) {
        res.status(500).json(error);
    }
}
/* Login */

const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email : email});
        if (!user) return res.status(400).json({message: "bad Email or bad password"});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "bad Email or bad password"});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        user.password = undefined;
        res.status(201).json({token, user});
    }
    catch(error) {
        res.status(500).json(error);
    }
}

module.exports = { register, login }