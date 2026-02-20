const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { User, Admin, Course } = require("../db");
const router = Router();
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config')

// Admin Routes
router.post('/signup',async (req, res) => {
    try {
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({username:username})
    if(admin){
        res.json("Admin already exist, Please signin with same credentials")
    }
    
    await Admin.create({
        username,
        password
    })

    res.json({
        msg: "Admin created successfully"
    })
    } catch (error) {
        console.error(error)
    }
});

router.post('/signin',async (req, res) => {
    try {
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({
        username:username,
        password:password
    })
    if(!admin){
        res.status(411).json("Admin doesnt exist, Please signup / Wrong username and pass")
    }
    const Token = JWT.sign({username}, JWT_SECRET);

    res.json({
        msg: "Admin signin successfully",
        token : Token
    })
    } catch (error) {
        console.error(error)
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    try {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const NewCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    return res.json({
        msg:"Course created successfully",
        course : NewCourse
    })
    } catch (error) {
        res.json({
            msg:"Problem creating course"
        })
    }

});

router.get('/courses', adminMiddleware, async (req, res) => {
    try {
        const myCourses = await Course.find({});
        return res.json({
            course : myCourses
        })
    } catch (error) {
        res.json({
            msg:"Problem fetching courses"
        })
    }
});

module.exports = router;