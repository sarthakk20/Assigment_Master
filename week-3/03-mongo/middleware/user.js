const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    const username = req.headers.username;
    const password = req.headers.password;
    
    // if(!user>0 && !password>0){
    //     alert("Enter your details")
    // }

    const FindUser = await User.findOne({
        username: username,
        password: password
    })
    if(!FindUser){
        res.status(403).json("User doesnt found!");
    }
    next();
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;