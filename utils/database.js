const mongoose = require("mongoose");
require("dotenv").config();
let isConnected = false;

const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected...");
        return;
    }

    try {
        console.log(process.env.MONGODB_URI, process.env.DB_NAME)
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log("Error connecting to database: ", error);
    }
};

module.exports = connectToDB;
