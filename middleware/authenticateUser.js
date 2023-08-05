const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// middelware code to authenticate user
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header("auth-token");
        if (!token) {
            return res
                .status(401)
                .send({ message: "Please authenticate using a valid token" });
        }

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        
        next();
    } catch (error) {
        res.status(401).send({
            error: "Please authenticate using a valid token",
        });
    }
};

module.exports = authenticateUser;