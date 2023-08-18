const connectToDB = require("./utils/database");
const express = require("express");
const cors = require('cors');

require("dotenv").config();

connectToDB();

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:3000', // Replace with your allowed origin(s)
//     methods: 'GET,POST', // Specify allowed HTTP methods
//     allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
// };

const corsOptions = {
    origin: '*', // Replace with your allowed origin(s)
    methods: '*', // Specify allowed HTTP methods
    allowedHeaders: '*', // Specify allowed headers
};

app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

app.get("/", (req, res)=>{
    res.send("This is backend for NGO site...");
})


// websitename.com/api/auth

app.use("/api/auth", require("./routes/auth"));

app.use('/api/post', require('./routes/post'));

app.use('/api/donate', require('./routes/donate'));


