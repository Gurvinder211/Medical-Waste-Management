const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
    try {
        res.json({ message: "User authenticated", user: req.user });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Signup
router.post("/signup", async (req, res) => {
    const { name, email, password, role, address, companyName, licenseNumber } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            ...(role === "collector" ? { address } : { companyName, licenseNumber }),
        });

        await newUser.save();
        res.json({ message: "User Registered Successfully" });
    } catch (error) {
        res.status(500).json({ error: "Signup Failed" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: "Login Failed" });
    }
});

module.exports = router;
