import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧾 Check environment variables
console.log("🧭 Environment variables loaded:");
console.log("CLOUD_NAME:", process.env.CLOUD_NAME || "❌ Missing");
console.log("API_KEY:", process.env.API_KEY ? "✅ Loaded" : "❌ Missing");
console.log("API_SECRET:", process.env.API_SECRET ? "✅ Loaded" : "❌ Missing");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Serve static files (index.html, CSS, JS)
app.use(express.static(__dirname));

// Cloudinary API route
app.get("/api/vault", async (req, res) => {
  console.log("📸 Incoming request → /api/vault");

  try {
    console.log("🔍 Searching Cloudinary folder: 'aif'");
    const result = await cloudinary.search
      .expression("folder:aif")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    console.log(`✅ Found ${result.resources.length} images in 'aif'`);

    const images = result.resources.map((img) => img.secure_url);
    res.json({ images });
  } catch (err) {
    console.error("🚨 Error during Cloudinary fetch:");
    console.error("Message:", err.message);
    if (err.response && err.response.body) {
      console.error("Cloudinary response:", err.response.body);
    }
    res.status(500).json({ error: "Failed to fetch images from Cloudinary" });
  }
});

// Main route
app.get("/", (req, res) => {
  console.log("🌐 Serving index.html");
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
