const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request body
app.use(cors());

// Import Routes
const messageRoutes = require("./routes/messageRoutes");
app.use("/messages", messageRoutes);

// Import Routes
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/applications", applicationRoutes);

// Import and use jobRoutes
const jobRoutes = require("./routes/jobRoutes");
app.use("/jobs", jobRoutes);

const careersApplicationRoutes = require("./routes/careersApplicationRoutes");
app.use("/careers-applications", careersApplicationRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start the server
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
