const connectToDB = require("./utils/database");
const express = require("express");
const cors = require('cors');

require("dotenv").config();

connectToDB();

const app = express();

// const corsOptions = {
//     origin: "https://your-frontend-domain.com", // Replace with your frontend's domain
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Allow cookies and credentials in cross-origin requests
//     exposedHeaders: ["Authorization"], // Expose specific headers to the frontend
// };

const corsOptions = {
    origin: ["http://localhost:3000", "www.prayanfoundation.in", "https://www.prayanfoundation.in", "prayanfoundation.in"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};


// app.use(cors());
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get("/", (req, res) => {
    res.send("This is backend for NGO site...");
})


// websitename.com/api/auth

app.use("/api/auth", require("./routes/auth"));

app.use('/api/post', require('./routes/post'));

app.use('/api/event', require('./routes/event'));

app.use('/api/donate', require('./routes/donate'));


