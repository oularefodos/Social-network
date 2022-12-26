const multer = require('multer');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

/* configuration */

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* FILE STORAGE */

const fileStorage = multer.diskStorage({
    destination: function(req, file, callBack) {
        callBack(null, "public/assets");
    },
    filename: function(req, file, callBack) {
        callBack(null, file.originalname);
    }
});

const upload = multer({ fileStorage });