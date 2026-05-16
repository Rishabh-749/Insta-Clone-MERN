const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username is already exists"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/Rishi749/InstaClone-Backend/profile.jpg"    
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;