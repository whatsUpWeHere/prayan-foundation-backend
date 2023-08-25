const express = require("express");
const router = express.Router();
const Event = require("../models/event.js");
const authenticateAdmin = require("../middleware/authenticateAdmin.js");




// fetch fall events
router.get("/fetchAllEvents", async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.status(200).json({ events });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error getting events..." });
    }
});


// create a event
router.post("/createEvent", authenticateAdmin, async (req, res) => {
    try {
        const { heading, content, date, time, venue } = req.body;
        const { id } = req.headers;

        const newEvent = await Event.create({
            heading, content, date, time, venue
        });

        res.status(201).json({
            message: "event created successfully...",
            newEvent,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating event...", error });
    }
});

// update a event
router.patch("/updateEvent/:eventId", authenticateAdmin, async (req, res) => {
    try {
        const { eventId } = req.params;

        const { _id, ...eventData } = req.body;

        const newEvent = await Event.findByIdAndUpdate(eventId, eventData, {
            new: true,
        });

        res.status(200).json({
            message: "event updated successfully...",
            newEvent,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error updating event...", error });
    }
});

// delete a event
router.delete("/deleteEvent/:eventId", authenticateAdmin, async (req, res) => {
    try {

        const { eventId } = req.params;

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).send({ message: "Event not found." });
        }

        res.status(200).json({
            message: "Event deleted successfully...",
            deletedEvent,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error deleting event...", error });
    }
});

module.exports = router;
