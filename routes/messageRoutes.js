// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const Message = require("../models/Message"); // Make sure this path is correct

// POST Route to save a message
router.post("/add", async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    // Validation (if necessary)
    if (!name || !email || !subject || !message || !phone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      phone,
    });

    await newMessage.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save message", error });
  }
});

// GET Route to fetch all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find(); // Fetch all messages from DB
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages", error });
  }
});

// DELETE a specific message by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
