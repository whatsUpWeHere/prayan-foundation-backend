const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const authenticateUser = require("../middleware/authenticateUser");
const { mongo } = require("mongoose");

// get all posts of a user
router.get("/fetchUserPosts", async (req, res) => {
    try {
        const posts = await Post.find({ creator: req.user.id }).sort({
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
router.post("/createPost", authenticateUser, async (req, res) => {
    try {
        const creatorId  = req.user.id;
        const { title, content, tags } = req.body;

        const creator = await User.findById(creatorId);

        if (creator?.role !== "admin") {
            return res
                .status(401)
                .send({ message: "You are not authorized to create a post" });
        }

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
router.patch("/updatePost/:id", authenticateUser, async (req, res) => {
    try {
        const newPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
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
router.patch("/deletePost/:id", authenticateUser, async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).send({ message: "Post not found." });
        }

        res.status(201).json({
            message: "Post deleted successfully...",
            newPost,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error updating post...");
    }
});

module.exports = router;
