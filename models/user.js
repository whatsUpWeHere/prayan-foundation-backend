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

    // for volunteers
    volunteer: {
        type:
        {
            volunteerImage: {
                type: String,
                default: "",
            },
            name: {
                type: String,
                required: [true, "volunteer name is required"],
                match: [
                    /^(?=.{4,50}$)[a-zA-Z]+(?: [a-zA-Z]+){0,2}$/,
                    "Volunteer name invalid, it should contain 4-20 alphanumeric letters and be unique!",
                ],
            },
            parentName: {
                type: String,
                required: [true, "parent name is required"],
            },
            bloodGroup: {
                type: String,
                default: "",
            },
            rh: {
                type: String,
                default: "",
            },
            email: {
                type: String,
                required: [true, "volunteer email is required"],
                unique: [true, "volunteer email already exists"],
                match: [
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    " volunteer email invalid, it should be unique!",
                ],
            },
            phoneNumber: {
                type: String,
                required: [true, "phone number is required"],
            },
            profession: {
                type: String,
                default: "",
            },
            instituteName: {
                type: String,
                default: "",
            },
            class: {
                type: String,
                default: "",
            },
            collegeYear: {
                type: String,
                default: "",
            },
            professionalName: {
                type: String,
                default: "",
            }, socialOther: {
                type: String,
                default: "",
            }, socialSocial: {
                type: String,
                default: "",
            }, address: {
                type: String,
                default: "",
            },
            address2: {
                type: String,
                default: "",
            }, city: {
                type: String,
                default: "",
            }, state: {
                type: String,
                default: "",
            }, pin: {
                type: Number,
                default: "",
            }, dob: {
                type: Date,
                default: Date.now,
            },
            gender: {
                type: String,
                default: "",
            }, whyJoin: {
                type: String,
                default: "",
            }, workPreference: {
                type: String,
                default: "",
            }, findAboutUs: {
                type: String,
                default: "",
            }
        }
        ,
        default: {},
    }


});

const User = models.User || model("User", userSchema);


module.exports = User;
