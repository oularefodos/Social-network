const express = require('express');
const { login,  register } = require('../controllers/Auth');
const router = express.Router();
const multer = require('../middlewares/multer');


router.post("/register", multer, register);
router.post('/login', login);

module.exports = router;