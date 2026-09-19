import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/message.route.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

// Get the directory of this server.js file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Frontend production build
const frontendPath = path.join(__dirname, "../../frontend/dist");


// Middleware
app.use(express.json());


// API routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messagesRoutes);


// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendPath));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


// Start server
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

