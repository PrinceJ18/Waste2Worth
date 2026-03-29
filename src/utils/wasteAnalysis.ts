/**
 * Waste Analysis Utility
 * Handles AI-powered waste identification and upcycling suggestions
 */

// Waste category mapping
const WASTE_CATEGORIES = {
  PLASTIC: "plastic",
  METAL: "metal",
  GLASS: "glass",
  PAPER: "paper",
  ORGANIC: "organic",
  ELECTRONICS: "electronics",
  FABRIC: "fabric",
  WOOD: "wood",
  OTHER: "other",
} as const;

type WasteCategory = typeof WASTE_CATEGORIES[keyof typeof WASTE_CATEGORIES];

export interface UpcyclingGuide {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeEstimate: string;
  materialsRequired: string[];
  steps: string[];
  tips?: string[];
}

export interface WasteAnalysisResult {
  objectName: string;
  category: WasteCategory;
  description: string;
  confidenceScore: number;
  alternativePredictions?: Array<{
    name: string;
    category: WasteCategory;
    confidence: number;
  }>;
  environmentalImpact: {
    wasteSaved: string;
    equivalentImpact: string;
    carbonFootprint?: string;
  };
  safetyWarning?: string;
  upcyclingGuides: UpcyclingGuide[];
  bestIdea?: UpcyclingGuide;
}

// Environmental impact data
const ENVIRONMENTAL_IMPACT: Record<WasteCategory, any> = {
  plastic: {
    wasteSaved: "120g of plastic",
    equivalentImpact: "≈ 3 bottles prevented from landfill",
    carbonFootprint: "~0.5 kg CO₂ savings",
  },
  metal: {
    wasteSaved: "300g of metal",
    equivalentImpact: "≈ reduced mining impact & energy consumption",
    carbonFootprint: "~2.1 kg CO₂ savings",
  },
  glass: {
    wasteSaved: "250g of glass",
    equivalentImpact: "≈ 1 container reused indefinitely",
    carbonFootprint: "~0.8 kg CO₂ savings",
  },
  paper: {
    wasteSaved: "50g of paper",
    equivalentImpact: "≈ protected tree resources",
    carbonFootprint: "~0.2 kg CO₂ savings",
  },
  organic: {
    wasteSaved: "200g of organic waste",
    equivalentImpact: "≈ compost for garden use",
    carbonFootprint: "~0.3 kg CO₂ savings",
  },
  electronics: {
    wasteSaved: "1 e-waste item prevented",
    equivalentImpact: "≈ prevents hazardous material contamination",
    carbonFootprint: "~5 kg CO₂ savings",
  },
  fabric: {
    wasteSaved: "150g of fabric",
    equivalentImpact: "≈ textile waste diverted",
    carbonFootprint: "~1 kg CO₂ savings",
  },
  wood: {
    wasteSaved: "200g of wood",
    equivalentImpact: "≈ forest protection",
    carbonFootprint: "~0.6 kg CO₂ savings",
  },
  other: {
    wasteSaved: "item reused",
    equivalentImpact: "≈ contribution to circular economy",
    carbonFootprint: "~0.5 kg CO₂ savings",
  },
};

// Safety warnings for different materials
const SAFETY_WARNINGS: Record<WasteCategory, string | null> = {
  plastic: "⚠️ Ensure plastic is food-grade if reusing for food storage",
  metal: "⚠️ Check for sharp edges and rust before handling",
  glass: "⚠️ Handle carefully to avoid cuts; inspect for cracks",
  paper: "⚠️ Keep away from moisture and direct sunlight for storage",
  organic: "⚠️ Ensure fully composted before using in gardens",
  electronics: "⚠️ Do NOT open or dispose of improperly; contains hazardous materials",
  fabric: "⚠️ Wash thoroughly before reuse",
  wood: "⚠️ Check for splinters and treat if planning for contact",
  other: null,
};

/**
 * Parse AI response and extract structured data
 */
export const parseAIResponse = (response: string): Partial<WasteAnalysisResult> => {
  const lines = response.split("\n");
  const result: Partial<WasteAnalysisResult> = {
    upcyclingGuides: [],
  };

  // Helper functions
  const getLine = (key: string): string => {
    const line = lines.find(l => l.toLowerCase().includes(key.toLowerCase()));
    return line ? cleanText(line.split(":")[1] || "") : "";
  };

  const getSection = (startKey: string, limit: number = 5): string[] => {
    const index = lines.findIndex(l => l.toLowerCase().includes(startKey.toLowerCase()));
    if (index === -1) return [];

    return lines
      .slice(index + 1, index + 1 + limit)
      .map(l => cleanText(l.replace(/^\d+\.\s*/, "").replace(/^-\s*/, "")))
      .filter(l => l && l !== "Unknown" && !l.includes(":"));
  };

  // Extract data
  result.objectName = getLine("Object") || getLine("Item") || "Unknown Item";
  result.category = identifyCategory(result.objectName) as WasteCategory;

  // Parse ideas
  const ideas = getSection("Ideas");
  const steps = getSection("Steps");
  const bestIdea = getLine("BestIdea");

  // Build upcycling guides
  if (ideas.length > 0) {
    result.upcyclingGuides = ideas.map((idea, idx) => ({
      id: `guide-${idx}`,
      title: idea,
      description: idea,
      difficulty: idx === 0 ? "Easy" : idx === 1 ? "Medium" : "Hard",
      timeEstimate: idx === 0 ? "30 minutes" : idx === 1 ? "1-2 hours" : "2-4 hours",
      materialsRequired: ["Basic tools"],
      steps: steps.slice(Math.floor(steps.length / ideas.length) * idx, Math.floor(steps.length / ideas.length) * (idx + 1)) || [],
    }));
  }

  if (bestIdea) {
    result.bestIdea = {
      id: "best-idea",
      title: bestIdea,
      description: bestIdea,
      difficulty: "Medium",
      timeEstimate: "1-2 hours",
      materialsRequired: ["Basic tools"],
      steps: steps,
    };
  }

  result.description = getLine("Description") || `A ${result.category} waste item`;

  return result;
};

/**
 * Identify waste category from object name
 */
export const identifyCategory = (objectName: string): WasteCategory => {
  const name = objectName.toLowerCase();

  if (
    name.includes("plastic") ||
    name.includes("bottle") ||
    name.includes("cup") ||
    name.includes("bag") ||
    name.includes("container")
  ) return WASTE_CATEGORIES.PLASTIC;

  if (
    name.includes("metal") ||
    name.includes("aluminum") ||
    name.includes("can") ||
    name.includes("tin")
  ) return WASTE_CATEGORIES.METAL;

  if (
    name.includes("glass") ||
    name.includes("jar")
  ) return WASTE_CATEGORIES.GLASS;

  if (
    name.includes("paper") ||
    name.includes("cardboard") ||
    name.includes("box") ||
    name.includes("newspaper")
  ) return WASTE_CATEGORIES.PAPER;

  if (
    name.includes("organic") ||
    name.includes("food") ||
    name.includes("compost") ||
    name.includes("vegetable") ||
    name.includes("fruit")
  ) return WASTE_CATEGORIES.ORGANIC;

  if (
    name.includes("electronic") ||
    name.includes("phone") ||
    name.includes("computer") ||
    name.includes("tv") ||
    name.includes("battery") ||
    name.includes("cable")
  ) return WASTE_CATEGORIES.ELECTRONICS;

  if (
    name.includes("fabric") ||
    name.includes("cloth") ||
    name.includes("textile") ||
    name.includes("clothing")
  ) return WASTE_CATEGORIES.FABRIC;

  if (
    name.includes("wood") ||
    name.includes("wooden")
  ) return WASTE_CATEGORIES.WOOD;

  return WASTE_CATEGORIES.OTHER;
};

/**
 * Clean and normalize text
 */
export const cleanText = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/\*\*/g, "")
    .replace(/#{1,6}\s*/g, "")
    .replace(/[-•]/g, "")
    .trim();
};

/**
 * Main function to analyze waste from AI response
 */
export const analyzeWaste = (
  aiResponse: string,
  detectedLabel: string,
  confidence: number
): WasteAnalysisResult => {
  const parsed = parseAIResponse(aiResponse);

  const objectName = parsed.objectName || detectedLabel || "Unknown Item";
  const category = parsed.category || identifyCategory(objectName);

  const result: WasteAnalysisResult = {
    objectName,
    category,
    description: parsed.description || `A ${category} waste item suitable for recycling or upcycling`,
    confidenceScore: Math.min(confidence, 0.99),
    environmentalImpact: ENVIRONMENTAL_IMPACT[category],
    safetyWarning: SAFETY_WARNINGS[category] || undefined,
    upcyclingGuides: parsed.upcyclingGuides || [],
    bestIdea: parsed.bestIdea,
  };

  // Ensure we have valid upcycling guides
  if (!result.upcyclingGuides || result.upcyclingGuides.length === 0) {
    result.upcyclingGuides = generateDefaultGuides(category);
  }

  return result;
};

/**
 * Generate default upcycling guides for a category
 */
const generateDefaultGuides = (category: WasteCategory): UpcyclingGuide[] => {
  const guides: Record<WasteCategory, UpcyclingGuide[]> = {
    plastic: [
      {
        id: "plastic-1",
        title: "DIY Plant Pot",
        description: "Transform plastic bottles into hanging plant pots",
        difficulty: "Easy",
        timeEstimate: "15 minutes",
        materialsRequired: ["Knife", "Soil", "Seeds or plant"],
        steps: [
          "Cut plastic bottle in half horizontally",
          "Poke drainage holes in the bottom",
          "Add soil and plant your favorite plant",
          "Hang using recycled rope or string",
          "Water regularly",
        ],
      },
      {
        id: "plastic-2",
        title: "Organizer Box",
        description: "Create storage containers from plastic containers",
        difficulty: "Easy",
        timeEstimate: "20 minutes",
        materialsRequired: ["Marker", "Labels", "Scissors"],
        steps: [
          "Clean and dry the plastic container",
          "Label the outside with contents",
          "Stack and organize in your home",
        ],
      },
    ],
    metal: [
      {
        id: "metal-1",
        title: "Candle Holder",
        description: "Transform aluminum cans into decorative candle holders",
        difficulty: "Medium",
        timeEstimate: "45 minutes",
        materialsRequired: ["Sandpaper", "Paint", "Drill", "Candle"],
        steps: [
          "Clean and remove label from can",
          "Sand the surface smooth",
          "Drill small holes for decorative pattern",
          "Paint with eco-friendly paint",
          "Place candle inside",
        ],
      },
    ],
    glass: [
      {
        id: "glass-1",
        title: "Vase or Decoration",
        description: "Upcycle glass bottles into beautiful vases",
        difficulty: "Easy",
        timeEstimate: "30 minutes",
        materialsRequired: ["Flowers", "Paint", "Brush"],
        steps: [
          "Clean glass bottle thoroughly",
          "Remove label and glue residue",
          "Paint with non-toxic paint if desired",
          "Fill with water and arrange flowers",
        ],
      },
    ],
    paper: [
      {
        id: "paper-1",
        title: "Seedling Starter Pots",
        description: "Make biodegradable pots for plant seedlings",
        difficulty: "Easy",
        timeEstimate: "20 minutes",
        materialsRequired: ["Cardboard tube", "Soil", "Seeds"],
        steps: [
          "Cut cardboard into pot-sized pieces",
          "Line with newspaper",
          "Fill with seed-starting soil",
          "Plant seeds and water gently",
        ],
      },
    ],
    organic: [
      {
        id: "organic-1",
        title: "Home Compost",
        description: "Create nutrient-rich compost for gardening",
        difficulty: "Easy",
        timeEstimate: "Ongoing (2-3 months)",
        materialsRequired: ["Compost bin", "Brown matter", "Green matter"],
        steps: [
          "Layer brown matter (dry leaves, paper)",
          "Add green matter (food scraps, grass)",
          "Keep moist and turn occasionally",
          "Wait for decomposition (2-3 months)",
          "Use rich compost in garden",
        ],
      },
    ],
    electronics: [
      {
        id: "electronics-1",
        title: "Safe Disposal",
        description: "Properly recycle electronic waste",
        difficulty: "Easy",
        timeEstimate: "1 hour (includes delivery)",
        materialsRequired: ["Transportation", "E-waste facility contact"],
        steps: [
          "Find local e-waste recycling facility",
          "Pack item safely for transport",
          "Drop off at recycling center",
          "Request certification of recycling",
        ],
      },
    ],
    fabric: [
      {
        id: "fabric-1",
        title: "Patchwork Blanket",
        description: "Sew fabric scraps into a beautiful blanket",
        difficulty: "Medium",
        timeEstimate: "4-6 hours",
        materialsRequired: ["Needle", "Thread", "Scissors", "Sewing machine (optional)"],
        steps: [
          "Cut fabric into uniform squares",
          "Arrange in desired pattern",
          "Sew pieces together in rows",
          "Connect rows to form full blanket",
          "Add border if desired",
        ],
      },
    ],
    wood: [
      {
        id: "wood-1",
        title: "Wooden Shelf",
        description: "Build a rustic shelf from reclaimed wood",
        difficulty: "Medium",
        timeEstimate: "2-3 hours",
        materialsRequired: ["Wood board", "Brackets", "Drill", "Screws", "Sandpaper"],
        steps: [
          "Sand wood smooth to remove splinters",
          "Measure and mark mounting points",
          "Install brackets securely",
          "Mount wood board on brackets",
          "Seal with wood finish if desired",
        ],
      },
    ],
    other: [
      {
        id: "other-1",
        title: "Donate to Community",
        description: "Give your item to someone who needs it",
        difficulty: "Easy",
        timeEstimate: "1-2 hours",
        materialsRequired: ["Transportation"],
        steps: [
          "Clean and check item condition",
          "Find local charity or community group",
          "Contact them about acceptance",
          "Arrange pickup or drop-off",
          "Complete donation paperwork",
        ],
      },
    ],
  };

  return guides[category] || guides.other;
};

/**
 * Match user description to database items using keywords
 * Returns the best matching database item or null if no match
 */
/**
 * Levenshtein distance for fuzzy matching
 * Calculates similarity between two strings
 */
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
};

/**
 * Calculate similarity score (0-100) between two strings
 */
const stringSimilarity = (str1: string, str2: string): number => {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 100;
  const distance = levenshteinDistance(str1, str2);
  return Math.round(((maxLen - distance) / maxLen) * 100);
};

/**
 * Match user description to database items using a scoring system
 * Checks ALL items and returns the one with the HIGHEST score
 * Filters out generic words and prevents wrong matches
 */
export const matchKeywordsToDatabase = (
  description: string,
  wasteDB: Record<string, any>
): {
  itemName: string;
  itemData: any;
  confidence: number;
  matchType: "exact" | "phrase" | "keyword" | "partial" | "fuzzy" | "category";
  matchedKeyword: string;
} | null => {
  if (!description || description.trim().length === 0) {
    return null;
  }

  // ===== STEP 1: IGNORE GENERIC WORDS =====
  // Words that don't help identify waste type
  const ignoreWords = new Set([
    "disposal",
    "waste",
    "trash",
    "garbage",
    "throw",
    "item",
    "thing",
    "stuff",
    "object",
    "material",
    "something",
    "junk"
  ]);

  // Normalize input: lowercase, remove extra spaces
  let userInput = description.toLowerCase().trim().replace(/\s+/g, " ");
  let userWords = userInput.split(/\s+/);

  // Filter out ignored words
  const meaningfulWords = userWords.filter(word => !ignoreWords.has(word));

  // If only generic words (like "disposal"), can't match properly
  if (meaningfulWords.length === 0) {
    return null;
  }

  // Use only meaningful words for matching
  const filteredInput = meaningfulWords.join(" ");
  userWords = meaningfulWords;

  let bestMatch: any = null;
  let bestScore = 0;

  // ===== STEP 2: SCORE EACH ITEM =====
  for (const [itemName, itemData] of Object.entries(wasteDB)) {
    if (!itemData.keywords || !Array.isArray(itemData.keywords)) continue;

    let itemScore = 0;
    let matchedKeyword = "";
    let matchType: "exact" | "phrase" | "keyword" | "partial" | "fuzzy" | "category" = "keyword";

    const keywords = itemData.keywords as string[];
    const category = itemData.category as string;

    // ===== BLOCK HAZARDOUS ITEMS =====
    // Battery/hazardous items only match if specific keywords present
    if (category === "electronics" || itemData.id === "battery") {
      const hazardousKeywords = ["battery", "cell", "lithium", "alkaline", "bulb", "chemical", "electronic", "cable"];
      const hasHazardousKeyword = hazardousKeywords.some(kw => filteredInput.includes(kw));
      
      if (!hasHazardousKeyword) {
        // Skip this item - don't match hazardous items with vague input
        continue;
      }
    }

    // ===== RULE 1: STRONG MATCH (Exact keyword match) =====
    for (const keyword of keywords) {
      const normalizedKeyword = keyword.toLowerCase();
      
      // Check exact match
      if (normalizedKeyword === filteredInput) {
        itemScore += 50;
        matchedKeyword = keyword;
        matchType = "exact";
        break;
      }
    }

    // ===== RULE 2: PARTIAL MATCH (Description includes keyword) =====
    if (itemScore < 50) {
      for (const keyword of keywords) {
        const normalizedKeyword = keyword.toLowerCase();
        
        // Check if keyword is whole phrase in description
        if (filteredInput.includes(normalizedKeyword)) {
          itemScore += 30;
          if (!matchedKeyword) matchedKeyword = keyword;
          if (matchType !== "exact") matchType = "partial";
          break;
        }
      }
    }

    // ===== RULE 3: KEYWORD MATCH (Word-by-word matching) =====
    if (itemScore < 30) {
      let keywordMatches = 0;
      for (const keyword of keywords) {
        const keywordWords = keyword.toLowerCase().split(/\s+/);
        
        const matchCount = keywordWords.filter(kw =>
          userWords.some(uw => uw === kw)
        ).length;
        
        if (matchCount > 0) {
          keywordMatches = Math.max(keywordMatches, matchCount);
          if (!matchedKeyword) matchedKeyword = keyword;
        }
      }
      
      if (keywordMatches > 0) {
        itemScore += 20 + (keywordMatches * 5);
        if (matchType !== "exact" && matchType !== "partial") matchType = "keyword";
      }
    }

    // ===== RULE 4: CATEGORY MATCH =====
    if (itemScore < 20) {
      const categoryMap: Record<string, string[]> = {
        plastic: ["plastic", "bottle", "bag", "container"],
        cardboard: ["cardboard", "box", "carton"],
        paper: ["paper", "newspaper"],
        metal: ["metal", "can", "aluminum"],
        glass: ["glass", "jar"],
        organic: ["food", "organic", "compost"],
        electronics: ["battery", "electronic"],
        wood: ["wood", "wooden", "timber"],
        fabric: ["fabric", "cloth", "textile"]
      };
      
      const categoryKeywords = categoryMap[category] || [];
      if (categoryKeywords.some(kw => filteredInput.includes(kw))) {
        itemScore += 20;
        if (!matchedKeyword) matchedKeyword = category;
        if (matchType !== "exact" && matchType !== "partial" && matchType !== "keyword") {
          matchType = "category";
        }
      }
    }

    // ===== RULE 5: FUZZY MATCH =====
    if (itemScore < 20) {
      for (const keyword of keywords) {
        const keywordWords = keyword.toLowerCase().split(/\s+/);
        
        for (const userWord of userWords) {
          for (const keywordWord of keywordWords) {
            const similarity = stringSimilarity(userWord, keywordWord);
            
            if (similarity >= 70) {
              itemScore += 10;
              if (!matchedKeyword) matchedKeyword = keyword;
              if (matchType !== "exact" && matchType !== "partial" && matchType !== "keyword") {
                matchType = "fuzzy";
              }
              break;
            }
          }
          if (itemScore >= 10) break;
        }
        if (itemScore >= 10) break;
      }
    }

    // ===== TRACK BEST MATCH =====
    if (itemScore > bestScore) {
      bestScore = itemScore;
      bestMatch = {
        itemName,
        itemData,
        confidence: Math.min((itemData.confidence || 85) / 100, 0.95),
        matchType,
        matchedKeyword: matchedKeyword || keywords[0],
      };
    }
  }

  // ===== STEP 3: MINIMUM SCORE THRESHOLD =====
  // Only return match if score is strong enough (>= 20)
  // This prevents weak matches like "disposal" → "battery"
  if (bestScore === 0 || bestScore < 15) {
    return null;
  }

  return bestMatch;
};

/**
 * Detect waste category from user input
 */
const detectCategory = (input: string): string | null => {
  const categoryKeywords: Record<string, string[]> = {
    plastic: ["plastic", "bottle", "bag", "container", "jug", "pet", "polythene", "poly"],
    cardboard: ["cardboard", "box", "carton", "packaging", "package", "parcel"],
    paper: ["paper", "newspaper", "magazine", "sheet", "pages", "mail", "tissue"],
    metal: ["metal", "can", "aluminum", "tin", "foil", "steel"],
    glass: ["glass", "jar", "bottle", "container"],
    organic: ["food", "peel", "fruit", "vegetable", "organic", "leaf", "grass", "compost"],
    electronics: ["battery", "electronic", "phone", "computer", "cable", "charger"],
    wood: ["wood", "wooden", "timber", "stick", "branch", "plank"],
    fabric: ["fabric", "cloth", "textile", "clothing", "shirt", "cotton"],
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => input.includes(kw))) {
      return category;
    }
  }

  return null;
}
