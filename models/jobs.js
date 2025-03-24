const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true }, // Add jobId to the schema
    jobName: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    salaryRange: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    postDate: { type: String, required: true },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
