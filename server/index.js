const multer = require('multer');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const authRoutes = require('./src/routes/auth');
const {register} = require('./src/controllers/Auth');

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

/* Mongo db config */

const port = process.env.PORT;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("database connected");
    })
    .catch((error) => {
        console.log(error);
    })


/* Post -- Create User */
app.post("/auth/register", register);

/* Post -- Authentication */

app.use('/auth', authRoutes);

app.listen(port, (err)=>{
    if (err) console.log(err);
    else console.log(`server is connected on ${port}`);
})