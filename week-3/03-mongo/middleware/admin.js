const { Admin } = require("../db");

// Middleware for handling auth
async function  adminMiddleware(req, res, next) {
    // Implement admin auth logic
    const username = req.headers.username;
    const password = req.headers.password;
    
    // if(!user>0 && !password>0){
    //     alert("Enter your details")
    // }

   await Admin.findOne({
        username: username,
        password: password
    }).then(function(value){
        if(!value){
            res.status(403).json("Admin doesnt found!")
        }else{
            next();
        }
    })
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;