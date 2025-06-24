const mongoose = require("mongoose");

const careersApplicationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    experience: Number,
    cvUrl: String,
    jobId: String,
    jobName: String,
    salaryRange: String,
    postedDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareersApplication", careersApplicationSchema);
