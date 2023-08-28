const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const postSchema = new Schema({
    heading: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://github.com/whatsUpWeHere/prayanFoundationwebsiteImages/blob/main/donate.jpg?raw=true",
    },
    
});

const Event = models.Event || model("Event", postSchema);

module.exports = Event;
