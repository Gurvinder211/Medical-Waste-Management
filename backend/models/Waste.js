const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema({
  type: String,
  weight: Number,
  location: {
    lat: Number,
    lon: Number
  },
  status: {
    type: String,
    default: "Pending"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Waste", WasteSchema);
