const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        req.body.picturePath = "http://localhost:" + process.env.PORT + "/assets/" + name;
        cb(null, name);
    }
})

module.exports = multer({ storage: storage }).single('picture');