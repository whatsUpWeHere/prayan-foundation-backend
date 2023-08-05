const mongoose = require('mongoose');
const  { Schema, model, models } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        match: [
            /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
        ],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"],
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Email invalid, it should be unique!",
        ],
    },
    role:{
        type: String,
    }
});

const User = models.User || model("User", userSchema);


module.exports = User;
