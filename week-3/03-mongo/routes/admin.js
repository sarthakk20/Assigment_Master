const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try {
    const username = req.body.username;
    const password = req.body.password;

    const findAdmin = await Admin.findOne({
        username:username,
        password:password
    })
    if(findAdmin){
        res.status(403).json({
            msg: "Admin already signed up"
        })
    }

    await Admin.create({
        username,
        password
    })
    res.json({
        msg: "Admin created successfully!!!"
    })
    } catch (error) {
        res.json({
            msg: "Problem signup route"
        })
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
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
    res.json({
        message: 'Course created successfully', courseId: NewCourse._id
    })
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const getCourse = await Course.find({});

    return res.json({
        courses: getCourse
    })
});

module.exports = router;