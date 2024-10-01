import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "moby_EmWCjGDKP8Zp8WkkBolB5TI6ynj";

// Route to handle /api/games/random
app.get("/api/games/random", async (req, res) => {
  console.log("Received query:", req.query);
  try {
    // Serialize query parameters
    const queryString = new URLSearchParams(req.query).toString();
    // Construct the MobyGames API URL
    const apiUrl = `https://api.mobygames.com/v1/games/random?${queryString}&api_key=${API_KEY}`;

    // Fetch data from MobyGames API
    const response = await fetch(apiUrl);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Parse the JSON data
    const data = await response.json();

    // Send the data back to the frontend
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data from MobyGames API" });
  }
});

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
