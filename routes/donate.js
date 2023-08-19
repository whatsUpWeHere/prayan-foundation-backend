const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Donation = require("../models/donations.js");

// route to add donation to user database information

router.post("/adddonation", async (req, res) => {
    try {
        const { name, email, role, amount, phone } = req.body;
        

        // checking if user already exists
        const existingUser = await User.findOne({
            email: email,
        });

        if (existingUser) {
            existingUser.donations.push({ amount: amount, date: Date.now() });
            // updating role to memeber
            if (existingUser.role === "visitor") {
                existingUser.role = "member";
            }
            const result = await existingUser.save();

            // await Donation.create({
            //     donor: existingUser._id,
            //     amount: amount,
            // }) 
            return res
                .status(201)
                .json({ message: "donation added successfully...", result });

            
        } else {
            // if user does not exist, create a new user
            const newUser = await User.create({
                name,
                email,
                role: "member",
                phone: phone || null,
                donations: [{ amount: amount, date: Date.now() }],
            });

            // await Donation.create({
            //     donor: newUser._id,
            //     amount: amount,
            // }) 

            return res
                .status(201)
                .json({ message: "donation added successfully...", newUser });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error adding donation...");
    }
});

module.exports = router;
