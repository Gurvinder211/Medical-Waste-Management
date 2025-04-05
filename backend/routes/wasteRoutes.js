const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Waste = require("../models/Waste"); 

// POST: Hospital places a new waste request
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { location, type, weight } = req.body;

    const newWaste = new Waste({
      hospital: req.user.id,
      location,
      type,
      weight,
      status: "Pending"
    });

    await newWaste.save();
    res.status(201).json({ message: "Waste reported successfully", waste: newWaste });
  } catch (error) {
    console.error("Error reporting waste:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/waste/available
router.get("/available", authMiddleware, async (req, res) => {
  try {
    // Only allow collectors to access this
    if (req.user.role !== "collector") {
      return res.status(403).json({ message: "Access denied" });
    }

    const pendingWaste = await Waste.find({
      status: "Pending",
      assignedTo: null
    });

    res.json(pendingWaste);
  } catch (error) {
    console.error("Error fetching available waste:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
