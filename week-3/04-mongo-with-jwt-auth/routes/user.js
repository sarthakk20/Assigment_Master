const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// User Routes
router.post('/signup',async (req, res) => {
    try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username:username})
    if(user){
        res.json("User already exist, Please signin with same credentials")
    }
    
    await User.create({
        username,
        password
    })

    res.json({
        msg: "User created successfully"
    })
    } catch (error) {
        console.error(error)
    }
});

router.post('/signin',async (req, res) => {
   try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username:username,
        password:password
    })
    if(!user){
        res.json("User doesnt exist, Please signup")
    }
    const signingUser = JWT.sign({username}, JWT_SECRET);
    
    res.json({
        msg: "User signin successfully",
        token : signingUser
    })
    } catch (error) {
        console.error(error)
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
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

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const username = req.username;
        // console.log(username);
        
        await User.updateOne({
            username
        },
        {
           "$push":{
            PurchasedCourses:courseId
           }
        })
        res.json({ 
            message: 'Course purchased successfully'
        })
    } catch (error) {
        res.json({
            error:"Error getting course"
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
    const user = await User.findOne({ username: req.username });
    // console.log(user.PurchasedCourses)
    const courses = await Course.find({
        _id: { 
            "$in": user.PurchasedCourses
         }
    });
    res.json({ PurchasedCourses: courses });
    } catch (error) {
        res.json({
            error:"Error getting course"
        })
    }
});

module.exports = router