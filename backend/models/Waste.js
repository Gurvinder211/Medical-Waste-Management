const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema({
  location: String,
  type: String,
  weight: Number,
  status: { type: String, default: "Pending" }, // Pending, Accepted, Collected, In Transit, Disposed
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Waste", WasteSchema);
