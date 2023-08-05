const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const postSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Post = models.Post || model("Post", postSchema);

module.exports = Post;
