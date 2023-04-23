const express = require('express');
const { getPosts, getUserPost, likeOrDislike, createPost, addComment} = require('../controllers/post');
const verify = require('../middlewares/AuthAutorization');
const router = express.Router();
const multer = require('../middlewares/multer');

router.get('/', verify, getPosts);
router.get('/:userId', verify, getUserPost);
router.patch('/like/:userId/:postId', verify, likeOrDislike);
router.patch('/comment/:userId/:postId', verify, addComment);
router.post("/create", verify, multer, createPost);

module.exports = router;