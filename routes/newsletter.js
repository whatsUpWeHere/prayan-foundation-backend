const express = require("express");
const router = express.Router();
const Newsletter = require("../models/newsletter.js");

// create a event
router.post("/subscribe", async (req, res) => {
    try {

        const response = await Newsletter.create({
            email: req.body.email
        });



        res.status(201).json({
            message: '${req.body.email} added successfully...',
            response,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error adding email...", error });
    }
});

module.exports = router;
