const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const CareersApplication = require("../models/CareersApplication");

const router = express.Router();

// Uploads folder
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Setup Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

// POST application
router.post("/", upload.single("cv"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      experience,
      jobId,
      jobName,
      salaryRange,
      postedDate,
    } = req.body;

    const cvUrl = `/uploads/${req.file.filename}`;

    const newApp = new CareersApplication({
      name,
      email,
      phone,
      experience,
      cvUrl,
      jobId,
      jobName,
      salaryRange,
      postedDate,
    });

    await newApp.save();
    res.status(201).json({ message: "Application received", application: newApp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error submitting application" });
  }
});

// GET all applications
router.get("/", async (req, res) => {
  const apps = await CareersApplication.find().sort({ createdAt: -1 });
  res.json(apps);
});

// DELETE application
router.delete("/:id", async (req, res) => {
  await CareersApplication.findByIdAndDelete(req.params.id);
  res.json({ message: "Application deleted" });
});

module.exports = router;
