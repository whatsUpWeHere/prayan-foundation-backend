const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        match: [
            /^(?=.{4,50}$)[a-zA-Z]+(?: [a-zA-Z]+){0,2}$/,
            "Username invalid, it should contain 4-20 alphanumeric letters and be unique!",
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
    phone: {
        type: Number,
        default: null,
    },
    state: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "visitor", //visitor, admin, volunteer, donor
    },
    donations: {
        type: [
            {
                amount: Number,
                date: {
                    type: Date,
                    default: Date.now,
                },

            }
        ],
        default: [],
    },
    reason: {
        type: String,
        default: "",
    }
});

const User = models.User || model("User", userSchema);


module.exports = User;
