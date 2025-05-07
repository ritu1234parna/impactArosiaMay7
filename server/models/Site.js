const mongoose = require('mongoose');

// Define the Site Schema
const siteSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  dispenserType: String,
  locationCoordinates: [Number],  // [longitude, latitude]
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

// Create a Site model
module.exports = mongoose.model('Sites', siteSchema);

