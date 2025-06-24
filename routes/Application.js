// models/Application.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  experience: Number,
  cvUrl: String, // Will store path or URL to the uploaded file
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
