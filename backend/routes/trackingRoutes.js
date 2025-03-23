const express = require("express");
const Truck = require("../models/Truck");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get Truck Tracking Info
router.get("/:wasteId", authMiddleware, async (req, res) => {
    const truck = await Truck.findOne({ wasteId: req.params.wasteId });
    if (!truck) return res.status(404).json({ message: "No Truck Found" });

    res.json(truck);
});

module.exports = router;