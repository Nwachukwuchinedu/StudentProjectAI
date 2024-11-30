import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";

const nodemonConfigPath = path.resolve("nodemon.json");
const nodemonConfig = JSON.parse(fs.readFileSync(nodemonConfigPath, "utf-8"));


const app = express();
const PORT = 5000;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

app.get("/", async (req, res) => {
  try {
    const aiResponse = await axios.get(`${AI_SERVICE_URL}/ai`);
    res.json({ message: "Hello from Node AI!", aiResponse: aiResponse.data });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to AI service" });
  }
});

app.listen(PORT, () => {
  console.log(`Node API is running on http://localhost:${PORT}`);
});
