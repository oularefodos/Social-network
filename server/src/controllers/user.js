const User = require('../models/User');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await  User.findById(id);
        if (!user) return res.status(401).json({message: 'User not found'});
        res.status(201).json(user);
    }
    catch(error) {
        res.status(401).json({message: error.message});
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await  User.find();
        res.status(201).json(users);
    }
    catch(error) {
        res.status(401).json({message: error.message});
    }
}

const getUserFollowers = async(req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const user = await User.findById(id);
        if (!user) return res.status(401).json({message: 'User not found'});
        const followersId = user.followers;
        const followers = await Promise.all(followersId.map((id) => User.findById(id)));
        const Newfollowers = followers.map(user => {
            const {firstName, lastName, email, location, picturePath} = user;
            return {firstName, lastName, email, location, picturePath};
        })
        res.status(201).json(Newfollowers);
    }
    catch(error) {
        res.status(401).json({message: error.message});
    }
}

const getUserfollowing = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(401).json({message: 'User not found'});
        const followingId = user.following;
        const following = await Promise.all(followingId.map((id) => User.findById(id)));
        const Newfollowing = following.map(user => {
            const {firstName, lastName, email, location, picturePath} = user;
            return {firstName, lastName, email, location, picturePath};
        })
        res.status(201).json(Newfollowing);
    }
    catch(error) {
        res.status(401).json({message: error.message});
    }
}

const followOrUnfollow = async (req, res) => {
    try {
        const {id, friendsId} = req.params;
        if (id === friendsId) return res.status(401).json({message: 'You can not follow yourself'});
        const user = await User.findById(id);
        const friend = await User.findById(friendsId);
        if (!user || !friend) return res.status(401).json({message: 'User not found'});
        if (user.following.includes(friendsId)) {
            user.following = user.following.filter(_id => _id !== friendsId);
            friend.followers = friend.followers.filter(_id => _id !== id);
        }
        else {
            
            user.following.push(friendsId);
            friend.followers.push(id);
        }
        await user.save();
        await friend.save();
        const followingId = user.following;
        const following = await Promise.all(followingId.map((id) => User.findById(id)));
        const Newfollowing = following.map(user => {
            return user._id;
        })
        res.status(201).json({followed : Newfollowing, user : friend});
    }
    catch(error) {
        res.status(401).json({message: error.message});
    }
}

module.exports = {getUser, getUserFollowers, followOrUnfollow, getUserfollowing, getUsers};