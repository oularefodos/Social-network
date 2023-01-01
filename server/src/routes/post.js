const express = require('express');
const { getPosts, getUserPost, likeOrDislike, createPost} = require('../controllers/post');
const verify = require('../middlewares/AuthAutorization');
const router = express.Router();

router.get('/', verify, getPosts);
router.get('/:userId', verify, getUserPost);
router.patch('/like/:userId/:postId', verify, likeOrDislike);
router.post("/:userId/createPost", verify, createPost);

module.exports = router;