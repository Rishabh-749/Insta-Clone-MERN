const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "Image url is required for creating a post"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User Id is required for creating a post"],
         ref: "users"
    }
})

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;