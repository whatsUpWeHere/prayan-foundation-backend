const User = require("../models/User");
// middelware code to authenticate admin
const authenticateAdmin = async (req, res, next) => {
    try {
        const { id } = req.headers;

        const creatorData = await User.findById(id);

        if (!creatorData || creatorData.role !== "admin") {
            return res
                .status(401)
                .json({ message: "Unauthorized: Admin access required" });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({
            message: "Error authenticating admin",
            error: error.message,
        });
    }
};

module.exports = authenticateAdmin;
