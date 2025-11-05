import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export default async function handler(req, res) {
  console.log("📸 GET /api/vault request");

  try {
    // 👉 use tag:aif2 or folder:aif based on your setup
    const result = await cloudinary.search
      .expression("folder:aif") 
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const images = result.resources.map(img => img.secure_url);
    res.status(200).json({ images });
  } catch (err) {
    console.error("🚨 Cloudinary fetch failed:", err.message);
    res.status(500).json({ error: "Failed to fetch images" });
  }
}
