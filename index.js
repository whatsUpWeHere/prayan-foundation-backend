const connectToDB = require("./utils/database");
const express = require("express");

require("dotenv").config();

connectToDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

app.get("/", (req, res)=>{
    res.send("Hello World");
})

app.use("/api/auth", require("./routes/auth"));

app.use('/api/post', require('./routes/post'));


