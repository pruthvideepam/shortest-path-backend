const express = require("express");
const axios = require("axios");
const cors = require("cors");  // ✅ Import CORS
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Proper CORS Configuration
app.use(cors({
  origin: ["https://your-frontend.vercel.app", "http://localhost:3000"],  // Allow frontend & local dev
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

app.get("/api/route", async (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.query;
  const API_KEY = process.env.BHUVAN_API_KEY;

  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const apiUrl = `https://bhuvan-app1.nrsc.gov.in/api/routing/curl_routing_state.php?lat1=${lat1}&lon1=${lon1}&lat2=${lat2}&lon2=${lon2}&token=${API_KEY}`;
    
    const response = await axios.get(apiUrl, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching route data:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch route data" });
  }
});

// ✅ Start the server on the correct port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
