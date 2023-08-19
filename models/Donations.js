const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const donationSchema = new Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    amount: {
        type: Number,
        required: [true, "amount is required"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Donation = models.Donation || model("Donation", donationSchema);

module.exports = Donation;
