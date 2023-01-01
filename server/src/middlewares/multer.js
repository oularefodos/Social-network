const multer = require('multer');

const storage = multer.diskStorage({

    destination: function(req, file, callBack) {
        callBack(null, "public/assets");
    },
    filename: function(req, file, callBack) {
        const MINE_TYPES = {
            'image/jpg' : 'jpg',
            'image/jpeg' : 'jpeg',
            'image/png' : 'png'
        }
        const name = file.originalname.split(' ').join('_');
        const extension =  MINE_TYPES[file.mimetype];
        callBack(null, name + Date.now + extension);
    } 
});

module.exports = multer({ storage }).single('image');