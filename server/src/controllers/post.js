const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            picturePath,
            description
        } = req.body;
        const user = await User.findById(userId);

        const post = new Post({
            userId,
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            userPicturePath: user.picturePath,
            picturePath,
            description,
            likes : {}
        });
        await post.save();
        const posts = await Post.find();
        res.status(201).json(posts);
    }
    catch (error) {
        res.status(501).json({message: error.message});
    }
}

const getPosts = async (req, res) => {
    try
    {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch(error) {
        res.status(401).json({message: error.message});
    }
}

const getUserPost = async(req, res) => {
    try {
        const id = req.user.id;
        const { userId } = req.params;
        if (id != userId) return res.status(501).json({message : "permission denied"});
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    }
    catch(error) {
        res.status(401).json({message : error.message});
    }
}

const likeOrDislike = async(req, res) => {
    try {
        const id = req.user.id;
        const { userId, postId } = req.params;
        if (id != userId) return res.status(501).json({message : "permission denied"});
        const post = await Post.findById(postId);
        if (post.likes.get(userId)) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }
        await post.save();
        res.status(201).json(post);
    }
    catch(error) {
        res.status(501).json({message : error.message});
    }
}

const addComment = async(req, res) => {
    try {
        const id = req.user.id;
        const { userId, postId } = req.params;
        if (id != userId) return res.status(501).json({message : "permission denied"});
        const { message } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(501).json({message : "No such User in our database"});
        const {picturePath, firstName, lastName} = user;
        console.log(picturePath, firstName, lastName);
        const post = await Post.findById(postId);
        if (!post) return res.status(501).json({message : "No such post in our database"});
        post.comments.push({picturePath, firstName, lastName, message});
        await post.save();
        res.status(201).json(post);
    }
    catch(error) {
        res.status(501).json({message : error.message});
    }
}

module.exports = {
    createPost,
    getPosts,
    getUserPost,
    likeOrDislike,
    addComment
};