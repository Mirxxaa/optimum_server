const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  cv: {
    data: Buffer, // Store the file as binary
    contentType: String, // Store the file type
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
