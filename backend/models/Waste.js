const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: String,  // e.g., "Infectious Waste"
    weight: Number,
    location: String,
    status: { type: String, enum: ["pending", "picked", "disposed"], default: "pending" },
});

module.exports = mongoose.model("Waste", WasteSchema);