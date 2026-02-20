const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

async function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const word = token.split(" ");
    const jwtToken = word[1];

    const verfifyToken =await JWT.verify(jwtToken, JWT_SECRET);
    //Also checks : username , type = "admin" || "user"
    if(verfifyToken.username){
        next()
    }else{
        res.json({
            msg : "You are not authenticated"       
        })
    }

}

module.exports = adminMiddleware;