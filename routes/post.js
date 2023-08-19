const express = require("express");
const router = express.Router();
const Post = require("../models/post.js");
const authenticateAdmin = require("../middleware/authenticateAdmin");

// get all posts of a user
router.get("/fetchuserPosts", async (req, res) => {
    try {
        const { id } = req.headers;
        const creatorId = id;
        const posts = await Post.find({ creator: creatorId }).sort({
            date: -1,
        });
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error getting posts...");
    }
});

// fetch fall posts
router.get("/fetchAllPosts", async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error getting posts...");
    }
});

// create a post
router.post("/createPost", authenticateAdmin, async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const { id } = req.headers;
        const creatorId = id;

        const newPost = await Post.create({
            creator: creatorId,
            title,
            content,
            tags,
        });

        res.status(201).json({
            message: "Post created successfully...",
            newPost,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error creating post...");
    }
});

// update a post
router.patch("/updatePost/:postId", authenticateAdmin, async (req, res) => {
    try {
        const { postId } = req.params;

        const { _id, ...postData } = req.body;

        const newPost = await Post.findByIdAndUpdate(postId, postData, {
            new: true,
        });

        res.status(201).json({
            message: "Post updated successfully...",
            newPost,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error updating post...");
    }
});

// delete a post
router.delete("/deletePost/:postId", authenticateAdmin, async (req, res) => {
    try {
       
        const { postId } = req.params;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).send({ message: "Post not found." });
        }

        res.status(201).json({
            message: "Post deleted successfully...",
            deletedPost,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error deleting post...");
    }
});

module.exports = router;
