const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["provider", "taker"], required: true }, // Role-based access
});

module.exports = mongoose.model("User", UserSchema);