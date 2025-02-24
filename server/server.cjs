const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const API_KEY = "moby_EmWCjGDKP8Zp8WkkBolB5TI6ynj";

// API route for fetching random games
app.get("/api/games/random", async (req, res) => {
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
    res.status(500).json({ error: "Failed to fetch data from MobyGames API" });
  }
});

// API route for fetching games
app.get("/api/games", async (req, res) => {
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
    res.status(500).json({ error: "Failed to fetch data from MobyGames API" });
  }
});

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
