const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://MyCourse20:CsX20%402003@cluster01.xcrsvbs.mongodb.net/course_selling_app_02');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password : String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password : String,
    PurchasedCourses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Course'
        }
    ]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description : String,
    imageLink : String,
    price : Number,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}