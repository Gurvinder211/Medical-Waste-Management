const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["hospital", "collector"], required: true }, // Role-based Access

  // Fields specific to "providers" (Hospitals/Clinics)
  address: { type: String, required: function () { return this.role === "hospital"; } },

  // Fields specific to "takers" (Waste Collectors)
  companyName: { type: String, required: function () { return this.role === "collector"; } },
  licenseNumber: { type: String, required: function () { return this.role === "collector"; } },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
