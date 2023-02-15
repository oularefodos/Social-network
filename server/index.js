const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const authRoutes = require('./src/routes/auth');
const postRoutes = require('./src/routes/post');
const userRoutes = require('./src/routes/user');
const {register} = require('./src/controllers/Auth');
const { createPost } = require('./src/controllers/post');
const verify = require('./src/middlewares/AuthAutorization');

/* configuration */

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

/* Post -- Authentication */

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);

app.listen(port, (err)=>{
    if (err) console.log(err);
    else console.log(`server is connected on ${port}`);
})