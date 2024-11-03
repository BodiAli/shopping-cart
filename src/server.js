import express from "express";
import cors from "cors";
import path from "path"; // Needed to work with file paths
import { fileURLToPath } from "url"; // Needed for module resolution

// Get __dirname when using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const API_KEY = "moby_EmWCjGDKP8Zp8WkkBolB5TI6ynj";

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "..", "dist")));

// API route for fetching random games
app.get("/api/games/random", async (req, res) => {
  console.log("Received query:", req.query);
  try {
    const queryString = new URLSearchParams(req.query).toString();
    const apiUrl = `https://api.mobygames.com/v1/games/random?${queryString}&api_key=${API_KEY}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data from MobyGames API" });
  }
});

// API route for fetching games
app.get("/api/games", async (req, res) => {
  console.log("Received query:", req.query);
  try {
    const queryString = new URLSearchParams(req.query).toString();
    const apiUrl = `https://api.mobygames.com/v1/games?${queryString}&api_key=${API_KEY}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data from MobyGames API" });
  }
});

// Fallback to serve index.html for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
