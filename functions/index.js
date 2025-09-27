const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Express app
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Configure Cloudinary using .env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ---------------------------
// Cloudinary Sign Route
// ---------------------------
app.post("/cloudinary-sign", (req, res) => {
  try {
    const body = req.body || {};
    const folder = body.folder || "vehicles";
    const timestamp = Math.floor(Date.now() / 1000);

    if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret) {
      return res.status(500).json({ error: "Missing Cloudinary environment variables" });
    }

    const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, cloudinary.config().api_secret);

    res.json({
      signature,
      timestamp,
      folder,
      cloudName: cloudinary.config().cloud_name,
      apiKey: cloudinary.config().api_key,
    });
  } catch (err) {
    console.error("Cloudinary signature error:", err);
    res.status(500).json({ error: err.message || "Signature generation failed" });
  }
});

// ---------------------------
// Cloudinary Delete Route
// ---------------------------
app.post("/delete-image", async (req, res) => {
  try {
    const body = req.body || {};
    const public_id = body.public_id;

    if (!public_id) {
      return res.status(400).json({ error: "Missing public_id in request body" });
    }

    const result = await cloudinary.uploader.destroy(public_id);
    res.json(result);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    res.status(500).json({ error: err.message || "Delete failed" });
  }
});

// ---------------------------
// Export as Firebase Function
// ---------------------------
exports.api = functions.https.onRequest(app);
