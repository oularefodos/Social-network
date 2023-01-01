const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        if (!authorization) res.status(401).json({message: 'Permission denied'});
        const token = authorization.replace('Baerer ', '');
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedtoken;
        next();
    }
    catch(error) {
        res.status(401).json({message: error.message});
    }
}

module.exports = verify;