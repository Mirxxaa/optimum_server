const express = require("express");
const multer = require("multer");
const Application = require("../models/applicationModel");

const router = express.Router();

// Configure Multer to store file in memory (as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle form submission
router.post("/", upload.single("cv"), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const file = req.file; // File data from request

    if (!file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const application = new Application({
      name,
      email,
      phone,
      cv: {
        data: file.buffer, // Store the file data
        contentType: file.mimetype, // Store the file type
      },
    });

    await application.save();

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications); // Send the list of applications as JSON
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications", error });
  }
});

// Get a specific application by ID (for download)
router.get("/download/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.setHeader("Content-Type", application.cv.contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${application.name}"`
    );
    res.send(application.cv.data); // Send the file data as the response
  } catch (error) {
    console.error("Error serving CV PDF:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
