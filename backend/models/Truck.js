const mongoose = require("mongoose");

const TruckSchema = new mongoose.Schema({
    wasteId: { type: mongoose.Schema.Types.ObjectId, ref: "Waste" },
    driverName: String,
    location: String,
    status: { type: String, enum: ["en-route", "arrived", "completed"], default: "en-route" },
});

module.exports = mongoose.model("Truck", TruckSchema);