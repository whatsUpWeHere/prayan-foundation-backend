// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET;

// // middelware code to authenticate admin
// const authenticateAdmin= async (req, res, next) => {
//     // userData is a cookie (objec having auth-token and creatorId(mongoDB id))

//     const token = req.header("auth-token");
//     if (!token){
//         return res.status(401).send({ message: "Please authenticate using a valid token" });
//     }

//     const data = jwt.verify(token, JWT_SECRET);
//     req.user = data.user;
//     const { creatorId } = req.header("userData");
//     const creator = await User.findById(creatorId);
   

//     if (creator?.role !== "admin") {
//         return res
//             .status(401)
//             .send({ message: "You are not authorized to create a post" });
//     }

//     next();
// };

// module.exports = authenticateAdmin;
