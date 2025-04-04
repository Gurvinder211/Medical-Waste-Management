const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: String,
  type: String,
  weight: Number,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Waste", wasteSchema);
