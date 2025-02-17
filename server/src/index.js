// server/src/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const { initScheduledTasks } = require("./tasks/scheduledTasks");

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 5000;

  const isConnected = await connectDB();
  if (!isConnected) {
    console.error("Failed to connect to MongoDB. Exiting...");
    process.exit(1);
  }

  // Initialiser les tâches planifiées
  initScheduledTasks();

  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", authRoutes);
  app.use("/api/todos", require("./routes/todos"));

  if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  return app;
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = startServer;
