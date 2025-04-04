const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure you have a User model if needed
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = async (req, res, next) => {

  console.log("Auth Header:", req.header("Authorization"));  
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // don't include password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name
    };
    next(); // Proceed to the next middleware
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
