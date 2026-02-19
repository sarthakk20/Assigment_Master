const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// app.use(userMiddleware);

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    // if(!user>0 && !password>0){
    //     alert("Enter your details")
    // }

    // const FindUser = User.findOne({
    //     username: username
    // })

    // if(FindUser){
    //     res.send("User already exists!")
    // }

    await User.create({
        username:username,
        password:password
    })

    res.json({ 
        message: 'User created successfully'
    })
});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
        const getCourses = await Course.find({});
        res.json({
            courses : getCourses
        })
    
    
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    try {
        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchasedCourses: courseId
            }
        });
        res.json({ 
            message: 'Course purchased successfully'
        })
    } catch (error) {
      console.error("Error finding course",error)  
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({ username: req.headers.username });
    console.log(user.purchasedCourses)
    const courses = await Course.find({
        _id: { 
            "$in": user.purchasedCourses
         }
    });
    res.json({ purchasedCourses: courses });
});

module.exports = router