import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "15mb" }));

// 🔐 Use ENV variable (IMPORTANT)
const API_KEY = process.env.ROBOFLOW_API_KEY;

// 🔥 Health check
app.get("/", (req, res) => {
  res.send("✅ Waste2Worth API running");
});

/**
 * Comprehensive waste/recyclable keywords for categorization
 */
const WASTE_KEYWORDS = {
  plastic: ["bottle", "cup", "container", "bag", "plastic", "plate", "fork", "straw", "packaging"],
  metal: ["can", "metal", "aluminum", "tin", "wire", "foil", "scrap", "steel"],
  glass: ["glass", "jar", "bottle", "window", "beaker"],
  paper: ["paper", "cardboard", "box", "newspaper", "magazine", "envelope", "book"],
  organic: ["food", "banana", "apple", "leaf", "leaves", "compost", "waste", "vegetable", "fruit"],
  electronics: ["phone", "computer", "tv", "monitor", "keyboard", "mouse", "battery", "cable", "electronic"],
  fabric: ["fabric", "cloth", "clothing", "shirt", "textile", "towel", "pillow"],
  wood: ["wood", "wooden", "stick", "log", "timber", "plank", "furniture"],
};

/**
 * Categorize detected object
 */
const categorizeObject = (label) => {
  const lower = label.toLowerCase();
  
  for (const [category, keywords] of Object.entries(WASTE_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return category;
    }
  }
  
  return "other";
};

/**
 * Enhanced detection endpoint with categorization
 */
app.post("/detect", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      console.error("❌ No image provided");
      return res.status(400).json({
        success: false,
        error: "No image provided",
      });
    }

    if (!API_KEY) {
      console.error("❌ Missing ROBOFLOW_API_KEY");
      return res.status(500).json({
        success: false,
        error: "API key not configured",
      });
    }

    // 📤 Ensure proper base64 format
    let imageData = image;
    
    // If it has the data URI prefix, just use the base64 part
    if (imageData.includes(",")) {
      imageData = imageData.split(",")[1];
    }

    console.log("📤 Sending image to Roboflow (size:", imageData.length, "chars)");

    // ⏱️ Timeout safety
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(
      `https://detect.roboflow.com/coco/3?api_key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `image=${encodeURIComponent(imageData)}`,
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Roboflow error:", response.status, errorText);
      return res.status(500).json({
        success: false,
        error: `Roboflow error: ${response.status}`,
      });
    }

    const data = await response.json();

    console.log("✅ Roboflow response:", JSON.stringify(data).substring(0, 200));

    // 🔍 Process predictions
    let predictions = data?.predictions || [];

    // Filter by confidence threshold
    predictions = predictions
      .filter((p) => p.confidence > 0.2)
      .sort((a, b) => b.confidence - a.confidence);

    // Categorize each prediction
    const categorizedPredictions = predictions.slice(0, 10).map(p => ({
      ...p,
      class: p.class || p.name || "Unknown",
      category: categorizeObject(p.class || p.name || "Unknown"),
      confidence: Math.round(p.confidence * 100) / 100,
    }));

    // Prioritize by waste category relevance
    const highConfidence = categorizedPredictions.filter(p => p.confidence > 0.5);
    const mediumConfidence = categorizedPredictions.filter(p => p.confidence > 0.3 && p.confidence <= 0.5);
    const lowConfidence = categorizedPredictions.filter(p => p.confidence <= 0.3);

    // Combine with strategic ordering
    const filtered = [
      ...highConfidence.slice(0, 3),
      ...mediumConfidence.slice(0, 2),
      ...lowConfidence.slice(0, 2),
    ];

    console.log("📊 Processed predictions:", {
      total: predictions.length,
      highConfidence: highConfidence.length,
      mediumConfidence: mediumConfidence.length,
      filtered: filtered.length,
    });

    // Return comprehensive response
    res.json({
      success: true,
      count: filtered.length,
      predictions: filtered,
      alternatives: categorizedPredictions.slice(filtered.length, filtered.length + 3),
      allPredictions: categorizedPredictions, // For debugging
    });

  } catch (err) {
    console.error("❌ Server error:", err.message);

    res.status(500).json({
      success: false,
      error: err.name === "AbortError"
        ? "Request timeout - try a clearer image"
        : err.message || "Detection failed",
      details: process.env.NODE_ENV === "development" ? err.toString() : undefined,
    });
  }
});

// 🔥 PORT fix for deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});