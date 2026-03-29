import { useState } from "react";
import { wasteDB } from "../data/wasteDB";
import { matchKeywordsToDatabase } from "../utils/wasteAnalysis";
import { saveScanRecord } from "../utils/scanHistory";
import type { WasteAnalysisResult, UpcyclingGuide } from "../utils/wasteAnalysis";

interface ScanResult extends Omit<WasteAnalysisResult, "upcyclingGuides"> {
  upcyclingGuides: UpcyclingGuide[];
  alternativeIdeas?: string[];
  userDescription?: string;
  matchType?: "exact" | "phrase" | "keyword" | "partial" | "fuzzy" | "category";
  matchedKeyword?: string;
}

const Scanner = () => {
  const [stage, setStage] = useState<"idle" | "analyzing" | "result">("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const buildResultFromDatabase = (
    itemName: string,
    itemData: any,
    confidence: number,
    userDescription: string,
    matchType: "exact" | "phrase" | "keyword" | "partial" | "fuzzy" | "category" = "keyword",
    matchedKeyword: string = ""
  ): ScanResult => {
    const alternatives = itemData.alternatives || [];

    return {
      objectName: itemName,
      category: inferCategory(itemName),
      description: itemData.description,
      confidenceScore: confidence,
      environmentalImpact: {
        wasteSaved: itemData.impact || "Unknown impact",
        equivalentImpact: `Proper handling of ${itemName}`,
        carbonFootprint: "See environmental impact section",
      },
      safetyWarning: itemData.warning,
      upcyclingGuides: itemData.bestIdea
        ? [
            {
              id: "guide-1",
              title: itemData.bestIdea.title,
              description: `${itemData.bestIdea.title} - Complete guide to transform your waste`,
              difficulty: (itemData.bestIdea.difficulty || "Medium") as any,
              timeEstimate: itemData.bestIdea.time,
              materialsRequired: itemData.bestIdea.materials || [],
              steps: itemData.bestIdea.steps || [],
            },
          ]
        : [],
      bestIdea: itemData.bestIdea
        ? {
            id: "best-idea",
            title: itemData.bestIdea.title,
            description: `A creative way to reuse or properly handle your ${itemName}`,
            difficulty: (itemData.bestIdea.difficulty || "Medium") as any,
            timeEstimate: itemData.bestIdea.time,
            materialsRequired: itemData.bestIdea.materials || [],
            steps: itemData.bestIdea.steps || [],
          }
        : undefined,
      alternativeIdeas: alternatives,
      userDescription,
      matchType,
      matchedKeyword,
    };
  };

  const inferCategory = (itemName: string): any => {
    const name = itemName.toLowerCase();
    if (
      name.includes("plastic") ||
      name.includes("bottle") ||
      name.includes("bag") ||
      name.includes("container")
    )
      return "plastic";
    if (name.includes("cardboard") || name.includes("paper") || name.includes("box"))
      return "paper";
    if (name.includes("organic") || name.includes("food") || name.includes("waste"))
      return "organic";
    if (
      name.includes("metal") ||
      name.includes("aluminum") ||
      name.includes("can") ||
      name.includes("foil")
    )
      return "metal";
    if (name.includes("glass") || name.includes("jar")) return "glass";
    if (
      name.includes("battery") ||
      name.includes("hazardous") ||
      name.includes("light bulb") ||
      name.includes("e-waste")
    )
      return "electronics";
    return "other";
  };

  const analyzeImage = async () => {
    // Reset errors
    setError("");

    // Validation: ensure description is provided
    const trimmedDescription = description.trim();
    if (!trimmedDescription) {
      setError("Please describe the waste item clearly");
      return;
    }

    if (!file) {
      setError("Please upload an image first");
      return;
    }

    setStage("analyzing");

    // Simulate a brief analysis delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Match keywords from description to database
      const match = matchKeywordsToDatabase(trimmedDescription, wasteDB);

      if (match) {
        // Found a match - build result from database
        const analysisResult = buildResultFromDatabase(
          match.itemName,
          match.itemData,
          match.confidence,
          trimmedDescription,
          match.matchType,
          match.matchedKeyword
        );

        // Convert image to base64 and save scan record
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          saveScanRecord({
            image: base64Image,
            detectedItem: match.itemName,
            confidence: match.confidence,
            category: analysisResult.category,
            matchType: match.matchType,
            matchedKeyword: match.matchedKeyword,
            description: trimmedDescription,
          });
        };
        reader.readAsDataURL(file);

        setResult(analysisResult);
        setStage("result");
      } else {
        // No match found - show helpful fallback
        const fallbackResult: ScanResult = {
          objectName: "Unknown Item",
          category: "other",
          description: "We couldn't clearly identify the waste item from your description.",
          confidenceScore: 0,
          environmentalImpact: {
            wasteSaved: "unknown",
            equivalentImpact: "Please provide a more specific description",
          },
          safetyWarning:
            "Please describe the waste item more specifically (example: plastic bottle, cardboard box, glass jar, metal can).",
          upcyclingGuides: [],
          userDescription: trimmedDescription,
        };

        setResult(fallbackResult);
        setStage("result");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setError("An error occurred during analysis. Please try again.");
      setStage("idle");
    }
  };

  // Drag drop handler
  const handleDrop = (e: any) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setImagePreview(URL.createObjectURL(f));
      setError("");
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto bg-[#f5f1e6]">
      <h1 className="text-3xl font-bold text-center mb-6">♻️ AI Waste Scanner</h1>

      {stage === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-4 border-dashed border-green-400 p-8 rounded-xl bg-gradient-to-br from-[#fff8e7] to-[#f0fdf4] text-center shadow-md"
        >
          <p className="text-2xl font-bold mb-2">📂 Upload Waste Image</p>
          <p className="text-gray-600 mb-4">Drag & drop or click to select</p>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f);
                setImagePreview(URL.createObjectURL(f));
                setError("");
              }
            }}
            className="hidden"
          />

          <label htmlFor="fileInput" className="inline-block cursor-pointer">
            <button
              type="button"
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              Choose Image
            </button>
          </label>

          {/* Image Preview - Always visible */}
          {imagePreview && (
            <div className="flex justify-center mt-6">
              <div
                className="border-4 border-green-400 rounded-xl overflow-hidden shadow-md bg-gray-100 p-2"
                style={{ width: "100%", maxWidth: "400px" }}
              >
                <img
                  src={imagePreview}
                  className="w-full h-80 object-cover rounded-lg"
                  alt="Selected item"
                  style={{ aspectRatio: "1" }}
                />
              </div>
            </div>
          )}

          {/* Description Input - REQUIRED */}
          <div className="mt-6">
            <label className="block text-left text-gray-700 font-semibold mb-2">
              Describe your waste item
            </label>
            <input
              type="text"
              placeholder="Example: plastic bottle, cardboard box, food scraps, battery, glass jar"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError("");
              }}
              className="p-3 border-2 border-gray-300 rounded-lg w-full focus:border-green-500 focus:outline-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-100 border-l-4 border-red-600 p-3 rounded text-red-800 text-sm">
              ⚠️ {error}
            </div>
          )}

          <button
            disabled={!file || !description.trim()}
            onClick={analyzeImage}
            className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg w-full hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition shadow-md"
          >
            🔍 Scan & Analyze
          </button>
        </div>
      )}

      {stage === "analyzing" && (
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-2xl font-bold mb-4">🔍 Analyzing image and description...</p>
          <div className="flex justify-center mb-4">
            <div className="animate-spin">
              <div className="text-4xl">♻️</div>
            </div>
          </div>
          <p className="text-gray-600 mb-6">Matching your description to our waste database...</p>

          {/* Image Preview - Keep visible during analysis */}
          {imagePreview && (
            <div className="flex justify-center">
              <div
                className="border-4 border-blue-400 rounded-xl overflow-hidden shadow-md bg-gray-100 p-2"
                style={{ width: "100%", maxWidth: "400px" }}
              >
                <img
                  src={imagePreview}
                  className="w-full h-80 object-cover rounded-lg"
                  alt="Scanned item"
                  style={{ aspectRatio: "1" }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {stage === "result" && result && (
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
          {/* Image Preview - Keep visible in result */}
          {imagePreview && (
            <div className="flex justify-center mb-6">
              <div
                className="border-4 border-green-500 rounded-xl overflow-hidden shadow-md bg-gray-100 p-2"
                style={{ width: "100%", maxWidth: "400px" }}
              >
                <img
                  src={imagePreview}
                  className="w-full h-80 object-cover rounded-lg"
                  alt="Scanned waste item"
                  style={{ aspectRatio: "1" }}
                />
              </div>
            </div>
          )}

          {/* Result: No Match Found */}
          {result.confidenceScore === 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
              <h2 className="text-xl font-bold text-yellow-800 mb-2">
                ⚠️ No Match Found
              </h2>
              <p className="text-gray-700 mb-3">
                We couldn't confidently match your description to our database.
              </p>
              <p className="text-gray-600 mb-3">
                <strong>Your description:</strong> "{result.userDescription}"
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>How to improve:</strong>
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>
                  • Use specific names like: <strong>plastic bottle</strong>, <strong>cardboard box</strong>, <strong>food
                  scraps</strong>, <strong>battery</strong>, <strong>glass jar</strong>
                </li>
                <li>• Describe the material: plastic, metal, glass, paper, ceramic</li>
                <li>• Upload a clearer image with better lighting</li>
                <li>
                  • Try again with a more detailed description (e.g., "aluminum soda can"
                  instead of just "can")
                </li>
              </ul>
            </div>
          )}

          {/* Result: Match Found */}
          {result.confidenceScore > 0 && (
            <>
              {/* Header */}
              <div className="text-center border-b-2 border-green-200 pb-4">
                <h2 className="text-3xl font-bold text-green-700">♻️ {result.objectName}</h2>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold text-lg">
                    {(result.confidenceScore * 100).toFixed(0)}%
                  </span>{" "}
                  match
                </p>
                <div className="mt-3 text-green-700 font-semibold text-lg">
                  Category: <span className="text-green-600 capitalize">{result.category}</span>
                </div>
                <p className="mt-3 text-gray-700 text-sm">{result.description}</p>
              </div>

              {/* Environmental Impact */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-5 rounded-lg border-l-4 border-green-600">
                <p className="text-lg">
                  🌍 <span className="font-bold">Environmental Impact</span>
                </p>
                <p className="text-xl font-bold text-green-700 mt-2">
                  {result.environmentalImpact.wasteSaved}
                </p>
                <div className="text-sm text-gray-700 mt-1">
                  {result.environmentalImpact.equivalentImpact}
                </div>
              </div>

              {/* Safety Warning */}
              {result.safetyWarning && (
                <div className="bg-yellow-100 border-l-4 border-yellow-600 p-4 rounded-lg">
                  <p className="text-gray-800 font-semibold">{result.safetyWarning}</p>
                </div>
              )}

              {/* Best Upcycling Idea */}
              {result.bestIdea && (
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-5 rounded-lg border-l-4 border-yellow-500">
                  <h3 className="font-bold text-lg">🌟 {result.bestIdea.title}</h3>
                  <p className="mt-2 text-gray-800">{result.bestIdea.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white bg-opacity-50 p-2 rounded">
                      <p className="text-gray-600">Difficulty</p>
                      <p className="font-semibold text-gray-800">
                        {result.bestIdea.difficulty}
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-50 p-2 rounded">
                      <p className="text-gray-600">Time</p>
                      <p className="font-semibold text-gray-800">
                        {result.bestIdea.timeEstimate}
                      </p>
                    </div>
                  </div>

                  {result.bestIdea.materialsRequired &&
                    result.bestIdea.materialsRequired.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold text-gray-700">📦 Materials Needed:</p>
                        <ul className="mt-2 text-sm text-gray-700 space-y-1">
                          {result.bestIdea.materialsRequired.map((mat, i) => (
                            <li key={i}>• {mat}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {result.bestIdea.steps && result.bestIdea.steps.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-gray-700">📋 Steps:</p>
                      <div className="mt-2 space-y-2">
                        {result.bestIdea.steps.map((step, i) => (
                          <div key={i} className="flex items-start text-sm">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500 text-white text-xs font-bold mr-2 flex-shrink-0">
                              {i + 1}
                            </span>
                            <span className="text-gray-700 pt-0.5">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Alternative Ideas */}
              {result.alternativeIdeas && result.alternativeIdeas.length > 0 && (
                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-lg">💡 More Reuse Ideas</h3>
                  <div className="mt-4 space-y-2">
                    {result.alternativeIdeas.map((idea, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded border border-blue-200 text-sm text-gray-700"
                      >
                        ✓ {idea}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Details */}
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                <h3 className="font-bold text-lg">📌 Analysis Details</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="text-gray-700 flex items-center">
                    <span className="text-gray-400 mr-2">✓</span> Detected as:{" "}
                    <strong className="ml-1">{result.objectName}</strong>
                  </li>
                  <li className="text-gray-700 flex items-center">
                    <span className="text-gray-400 mr-2">✓</span> Category:{" "}
                    <strong className="ml-1 capitalize">{result.category}</strong>
                  </li>
                  <li className="text-gray-700 flex items-center">
                    <span className="text-gray-400 mr-2">✓</span> Confidence:{" "}
                    <strong className="ml-1">
                      {(result.confidenceScore * 100).toFixed(0)}%
                    </strong>
                  </li>
                  {result.matchType && (
                    <li className="text-gray-700 flex items-center">
                      <span className="text-gray-400 mr-2">✓</span> Match Type:{" "}
                      <strong className="ml-1 capitalize">{result.matchType}</strong>
                    </li>
                  )}
                  {result.matchedKeyword && (
                    <li className="text-gray-700 flex items-center">
                      <span className="text-gray-400 mr-2">✓</span> Matched Keyword:{" "}
                      <strong className="ml-1">"{result.matchedKeyword}"</strong>
                    </li>
                  )}
                  {result.userDescription && (
                    <li className="text-gray-700 flex items-center">
                      <span className="text-gray-400 mr-2">✓</span> Your input:{" "}
                      <strong className="ml-1">"{result.userDescription}"</strong>
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}

          {/* Reset Button */}
          <button
            onClick={() => {
              setStage("idle");
              setResult(null);
              setFile(null);
              setImagePreview(null);
              setDescription("");
              setError("");
            }}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition shadow-md"
          >
            🔄 Scan Another Item
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;