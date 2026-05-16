const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const createPostController = async (req, res)=>{
    console.log(req.body, req.file);
    
    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "InstaClone-Backend"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })
    res.send(file)
}

const getPostController = async (req, res)=>{
    const userId = req.user.id;

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Post Fetch Successfully",
        posts
    })
}

const getPostDetailsController = async (req, res)=>{

    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post Not Found"
        }) 
    }

    const isValidUser = userId === post.user.toString()

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    return res.status(200).json({
        message: "Post Fetched Successfully",
        post
    })

}

const likePostController = async (req, res)=>{
    const username = req.user.username
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "Post not Found."
        })
    }

    const existingLike = await likeModel.findOne({ post: postId, user: username });

    if (existingLike) {
        await likeModel.findByIdAndDelete(existingLike._id);
        return res.status(200).json({ message: "post unliked successfully", liked: false });
    } else {
        const like = await likeModel.create({
            post: postId,
            user: username 
        })
        return res.status(200).json({ message: "post liked successfully", liked: true, like });
    }
}

const feedPostController = async (req, res)=>{
    const user = req.user
    const posts = await Promise.all((await postModel.find().sort({ _id: -1 }).populate("user").lean())
    .map(async (post)=>{
        const isLiked = await likeModel.findOne({
            user: user.username,
            post: post._id
        })

        post.isLiked = Boolean(isLiked)
        return post
    }))

    res.status(200).json({
        message: "Posts Fetch Successfully",
        posts
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    feedPostController
}