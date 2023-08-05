const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateUser = require("../middleware/authenticateUser");

// route to get user details
router.get("/getuser", async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .send({ message: "User do not exists...", user });
        }
        res.status(200).send({ user });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error getting user...");
    }
});

// route to create user
router.post("/createuser", authenticateUser, async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({
                error: "Sorry! user with this email already exists...",
            });
        }

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role || "visitor",
        });

        res.status(201).json({ message: "User created successfully...", user });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error creating user...");
    }
});

// route to update user
router.patch("/update", authenticateUser, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({
                message: "User do not exists...",
                updatedUser,
            });
        }
        res.status(200).send({
            message: "user updated successfully...",
            updatedUser,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error updating user...");
    }
});

// route to delete user
router.put("/deleteuser", authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).send({ message: "User not found." });
        }

        res.status(200).send({
            message: "User deleted successfully.",
            deletedUser,
        });
    } catch (err) {
        console.error("Error deleting user:", err.message);
        res.status(500).send("Error deleting user...");
    }
});

module.exports = router;
