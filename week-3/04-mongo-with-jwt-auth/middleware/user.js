const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

async function userMiddleware(req, res, next) {
        try {
        const token = req.headers.authorization;
        const word = token.split(" ");
        const jwtToken = word[1];
        const verifyToken = await JWT.verify(jwtToken, JWT_SECRET);
        //Also checks : username , type = "admin" || "user"
        if(verifyToken.username){
            req.username = verifyToken.username;
            next()
        }else{
            res.json({
                msg : "You are not authenticated"       
            })
        }
        } catch (error) {
            res.json({
                msg:"Incorrect inputs"
            })
        }
    
    }

module.exports = userMiddleware;