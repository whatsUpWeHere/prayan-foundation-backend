const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const newsletterSchema = new Schema({

    email: {
        type: String,
        required: true,
    }

});

const Newsletter = models.Newsletter || model("Newsletter", newsletterSchema);

module.exports = Newsletter;
