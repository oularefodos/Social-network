const express = require('express');
const {getUser, getUserFollowers, followOrUnfollow, getUserfollowing, getUsers} = require('../controllers/user');
const verify = require('../middlewares/AuthAutorization');
const router = express.Router();
const m = () => console.log("fode");
router.get('/:id', verify, getUser);
router.get('/:id/followers', verify, getUserFollowers);
router.get('/:id/following',  m,verify, getUserfollowing);
router.patch('/:id/:friendsId', verify, followOrUnfollow);
router.get('/', verify, getUsers);

module.exports = router;


