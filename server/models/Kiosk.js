// models/Kiosk.js
const mongoose = require("mongoose");

const kioskSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  status: { type: String, enum: ["Operational", "Maintenance Required", "Non-Operational"] },
  ph: Number,
  tds: Number,
});

module.exports = mongoose.model("Kiosk", kioskSchema);

