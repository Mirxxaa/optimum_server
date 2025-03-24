const express = require("express");
const router = express.Router();
const Job = require("../models/jobs");

// Route: POST a new job
router.post("/add-job", async (req, res) => {
  console.log(req.body); // Log the incoming job data for debugging
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully!", newJob });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error posting job", error });
  }
});

// Route: GET all jobs
router.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

// delete-job route in your backend (Express)
router.delete("/delete-job/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the job ID from the URL parameters
    const deletedJob = await Job.findByIdAndDelete(id); // Delete job using the job ID

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully", deletedJob });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
});

module.exports = router;
