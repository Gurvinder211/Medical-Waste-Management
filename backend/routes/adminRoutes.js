const express = require("express");
const router = express.Router();
const Waste = require("../models/Waste");

// Get admin analytics (total waste, compliance rate)
router.get("/analytics", async (req, res) => {
  try {
    const totalWaste = await Waste.countDocuments();
    const disposedWaste = await Waste.countDocuments({ status: "Disposed" });
    const complianceRate = totalWaste ? ((disposedWaste / totalWaste) * 100).toFixed(2) : 0;

    res.json({
      totalWaste,
      disposedWaste,
      complianceRate: `${complianceRate}%`
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
