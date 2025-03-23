const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Waste = require("../models/Waste");

const router = express.Router();

// List Waste (Provider)
router.post("/add", authMiddleware, async (req, res) => {
    if (req.user.role !== "provider") return res.status(403).json({ message: "Access Denied" });

    const { type, weight, location } = req.body;
    const waste = new Waste({ providerId: req.user.id, type, weight, location });
    await waste.save();

    res.json({ message: "Waste Listed Successfully" });
});

// Get All Waste (Taker)
router.get("/", authMiddleware, async (req, res) => {
    if (req.user.role !== "taker") return res.status(403).json({ message: "Access Denied" });

    const waste = await Waste.find({ status: "pending" });
    res.json(waste);
});

module.exports = router;
