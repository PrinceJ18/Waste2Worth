export const wasteDB: Record<string, any> = {
  "plastic bottle": {
    id: "plastic_bottle",
    name: "Plastic Bottle",
    category: "plastic",
    keywords: ["bottle", "water bottle", "plastic bottle", "pet", "beverage bottle", "drink bottle", "soda bottle", "coke", "sprite", "water"],
    confidence: 95,
    description: "Used plastic bottle (PET) - common beverage container",
    impact: "Takes 450+ years to decompose",
    warning: "⚠️ Avoid reuse for hot liquids; ensure food-grade before reusing",
    bestIdea: {
      title: "Self Watering Plant Pot",
      difficulty: "Medium",
      time: "1-2 hours",
      materials: ["Bottle", "Scissors", "String or thread", "Soil", "Plant"],
      steps: [
        "Cut plastic bottle in half",
        "Make a small hole in the cap",
        "Insert a piece of string through the hole",
        "Fill the bottom half with water, sit top half on it",
        "Add soil and plant, water will wick up through string"
      ]
    },
    alternatives: ["Bird feeder", "Storage container", "Drip irrigation system"]
  },

  "plastic container": {
    id: "plastic_container",
    name: "Plastic Container",
    category: "plastic",
    keywords: ["container", "plastic container", "takeout container", "food container", "storage box", "tupperware", "plastic box"],
    confidence: 90,
    description: "Reusable plastic container - used for food or storage",
    impact: "Non-biodegradable plastic waste; persists in environment",
    warning: "⚠️ Avoid microwaving if not explicitly food-safe marked",
    bestIdea: {
      title: "Desk Organizer",
      difficulty: "Easy",
      time: "20 minutes",
      materials: ["Container", "Scissors", "Markers"],
      steps: [
        "Clean container thoroughly",
        "Cut dividers from plastic sheets or cardboard",
        "Decorate with markers if desired",
        "Use to organize pens, clips, or small items"
      ]
    },
    alternatives: ["Pen holder", "Tool organizer", "Craft supply box"]
  },

  "milk jug": {
    id: "milk_jug",
    name: "Milk Jug",
    category: "plastic",
    keywords: ["milk jug", "detergent container", "plastic jug", "jug", "milk", "gallon", "hdpe"],
    confidence: 88,
    description: "Large plastic jug - typically HDPE #2",
    impact: "Durable plastic, recyclable if clean",
    warning: "⚠️ Ensure completely rinsed before reuse",
    bestIdea: {
      title: "Watering Can",
      difficulty: "Easy",
      time: "15 minutes",
      materials: ["Jug", "Knife"],
      steps: [
        "Clean jug thoroughly",
        "Poke holes in the cap",
        "Fill with water",
        "Use to water plants"
      ]
    },
    alternatives: ["Storage container", "Pet food scoop"]
  },

  "cardboard box": {
    id: "cardboard_box",
    name: "Cardboard Box",
    category: "cardboard",
    keywords: ["cardboard box", "cardboard", "shipping box", "cereal box", "carton", "box", "packaging", "parcel", "corrugated"],
    confidence: 92,
    description: "Used corrugated cardboard packaging",
    impact: "Biodegradable but contributes to deforestation",
    warning: "⚠️ Keep away from moisture",
    bestIdea: {
      title: "Storage Organizer",
      difficulty: "Easy",
      time: "30 minutes",
      materials: ["Box", "Tape", "Scissors"],
      steps: [
        "Clean and flatten the box",
        "Cut to desired size",
        "Reinforce edges",
        "Use for organizing"
      ]
    },
    alternatives: ["Drawer divider", "Gift box", "Pet bed"]
  },

  "paper waste": {
    id: "paper",
    name: "Paper Waste",
    category: "paper",
    keywords: ["paper", "newspaper", "magazine", "office paper", "mail", "sheet", "document", "article", "leaflet"],
    confidence: 85,
    description: "Used paper materials",
    impact: "Recyclable but consumes trees and water",
    warning: "⚠️ Avoid mixing coated paper in compost",
    bestIdea: {
      title: "Seed Pots",
      difficulty: "Easy",
      time: "15 minutes",
      materials: ["Paper", "Soil", "Seeds"],
      steps: [
        "Roll paper into cups",
        "Fill with soil",
        "Plant seeds"
      ]
    },
    alternatives: ["Crafts", "Mulch", "Shredding"]
  },

  "organic waste": {
    id: "organic_waste",
    name: "Organic Waste",
    category: "organic",
    keywords: ["food", "peel", "fruit", "vegetable", "organic", "leftover", "scrap", "compost", "leaf", "grass", "yard"],
    confidence: 87,
    description: "Organic waste from kitchen or garden",
    impact: "Produces methane if unmanaged; good compost material",
    warning: "⚠️ Do not mix with plastic or contaminated materials",
    bestIdea: {
      title: "Composting",
      difficulty: "Easy",
      time: "Varies",
      materials: ["Waste", "Soil", "Container"],
      steps: [
        "Collect food scraps and yard waste",
        "Layer with soil and carbon materials",
        "Keep moist and turn regularly",
        "Allow 2-6 months for decomposition"
      ]
    },
    alternatives: ["Animal feed", "Mulch", "Biogas"]
  },

  "metal can": {
    id: "metal_can",
    name: "Metal Can",
    category: "metal",
    keywords: ["can", "aluminum", "tin", "soda can", "foil", "aluminum can", "beer can", "beverage can", "metal"],
    confidence: 93,
    description: "Aluminum or tin can - typical beverage container",
    impact: "Highly recyclable; saves 95% energy vs. new aluminum",
    warning: "⚠️ Watch for sharp edges; rinse before recycling",
    bestIdea: {
      title: "Pen Holder",
      difficulty: "Easy",
      time: "20 minutes",
      materials: ["Can", "Paint", "Brush"],
      steps: [
        "Clean and smooth can edges",
        "Paint with acrylic paint",
        "Let dry completely",
        "Use as desk organizer"
      ]
    },
    alternatives: ["Mini plant pot", "Pencil holder", "Desk organizer"]
  },

  "glass bottle": {
    id: "glass_bottle",
    name: "Glass Bottle",
    category: "glass",
    keywords: ["glass", "jar", "glass jar", "glass bottle", "bottle", "wine bottle", "beer bottle", "glass container"],
    confidence: 94,
    description: "Glass container for beverages or storage",
    impact: "Recyclable indefinitely without quality loss",
    warning: "⚠️ Handle carefully to avoid cuts; inspect for cracks",
    bestIdea: {
      title: "Decor Lamp",
      difficulty: "Medium",
      time: "1 hour",
      materials: ["Bottle", "Lights", "Cork", "Wire"],
      steps: [
        "Clean bottle thoroughly",
        "Insert LED string lights",
        "Add cork stopper if desired",
        "Use as ambient lighting"
      ]
    },
    alternatives: ["Vase", "Storage jar", "Plant propagation", "Decorative holder"]
  },

  "plastic bag": {
    id: "plastic_bag",
    name: "Plastic Bag",
    category: "plastic",
    keywords: ["plastic bag", "grocery bag", "polythene", "shopping bag", "bag", "zip lock", "poly bag"],
    confidence: 85,
    description: "Thin plastic waste - major pollution source",
    impact: "Highly polluting; breaks into microplastics",
    warning: "⚠️ Do not burn or mix with recyclables; suffocation hazard",
    bestIdea: {
      title: "Eco Brick",
      difficulty: "Medium",
      time: "1-2 hours",
      materials: ["Plastic items", "Bottle", "Stick"],
      steps: [
        "Collect clean plastic bags and scraps",
        "Stuff tightly into plastic bottle",
        "Compress with stick after each addition",
        "Use compressed eco-brick in building projects"
      ]
    },
    alternatives: ["Plant pot liner", "Trash liner", "Packing material"]
  },

  "battery": {
    id: "battery",
    name: "Battery",
    category: "electronics",
    keywords: ["battery", "cell", "lithium", "alkaline", "rechargeable", "aaa", "aa", "d", "c"],
    confidence: 96,
    description: "Hazardous battery waste containing toxic chemicals",
    impact: "Highly toxic; can contaminate soil and water",
    warning: "⚠️ CRITICAL: Do NOT dispose in regular waste; severe environmental hazard",
    bestIdea: {
      title: "Safe Disposal",
      difficulty: "Easy",
      time: "10 minutes",
      materials: ["Battery", "Storage container"],
      steps: [
        "Store batteries in non-metal container",
        "Keep in cool, dry place",
        "Take to certified recycling center",
        "Check local e-waste collection programs"
      ]
    },
    alternatives: ["E-waste recycling center", "Hazardous waste facility"]
  },

  "wood waste": {
    id: "wood_waste",
    name: "Wood Waste",
    category: "wood",
    keywords: ["wood", "wooden", "timber", "plank", "stick", "branch", "log", "sawdust"],
    confidence: 88,
    description: "Untreated wood waste from construction or garden",
    impact: "Biodegradable; can be composted or reused",
    warning: "⚠️ Avoid treated wood (contains toxic chemicals); watch for splinters",
    bestIdea: {
      title: "Raised Garden Bed",
      difficulty: "Medium",
      time: "2-3 hours",
      materials: ["Wood boards", "Nails", "Soil", "Seeds"],
      steps: [
        "Arrange wood into rectangle frame",
        "Secure corners with nails or screws",
        "Line bottom with cardboard",
        "Fill with soil and plant vegetables"
      ]
    },
    alternatives: ["Mulch", "Compost", "Firewood (untreated only)"]
  },

  "textile waste": {
    id: "textile_waste",
    name: "Textile Waste",
    category: "fabric",
    keywords: ["fabric", "cloth", "textile", "clothing", "shirt", "pants", "dress", "sweater", "cotton"],
    confidence: 82,
    description: "Used textiles and clothing waste",
    impact: "Can be reused, recycled, or composted",
    warning: "⚠️ Wash thoroughly; remove buttons and zippers before disposal",
    bestIdea: {
      title: "Fabric Scrap Art",
      difficulty: "Easy",
      time: "30 minutes",
      materials: ["Fabric scraps", "Glue", "Canvas", "Scissors"],
      steps: [
        "Cut fabric into artistic shapes",
        "Arrange on canvas",
        "Glue down securely",
        "Hang as wall decoration"
      ]
    },
    alternatives: ["Donation", "Cleaning rags", "Upholstery stuffing"]
  },

  "plastic toy": {
    id: "plastic_toy",
    name: "Plastic Toy",
    category: "plastic",
    keywords: ["toy", "plastic toy", "broken toy"],
    confidence: 80,
    description: "Old or broken plastic toys",
    impact: "Plastic waste that persists for years",
    warning: "⚠️ Check for sharp edges or small parts",
    bestIdea: {
      title: "Decorative Showpiece",
      difficulty: "Easy",
      time: "20 minutes",
      materials: ["Toy", "Paint"],
      steps: [
        "Clean the toy",
        "Paint creatively",
        "Use as decoration"
      ]
    },
    alternatives: ["Donate usable toys", "Reuse for kids crafts"]
  },

  "plastic cup": {
  id: "plastic_cup",
  name: "Plastic Cup",
  category: "plastic",
  keywords: ["cup", "plastic cup", "disposable cup", "tea cup", "coffee cup"],
  confidence: 85,
  description: "Disposable plastic cup used for beverages",
  impact: "Single-use plastic contributes to pollution",
  warning: "⚠️ Avoid reuse for hot liquids",
  bestIdea: {
    title: "Mini Plant Pot",
    difficulty: "Easy",
    time: "20 minutes",
    materials: ["Plastic cup", "Soil", "Small plant"],
    steps: [
      "Make small holes at the bottom",
      "Fill with soil",
      "Plant small plant or seeds",
      "Water regularly"
    ]
  },
  alternatives: ["Pen holder", "Paint mixing cup"]
},

"cardboard": {
  id: "cardboard",
  name: "Cardboard",
  category: "cardboard",
  keywords: ["cardboard", "box", "carton", "packaging", "paperboard"],
  confidence: 88,
  description: "Thick paper-based material used in packaging",
  impact: "Biodegradable but contributes to deforestation",
  warning: "⚠️ Keep away from water",
  bestIdea: {
    title: "DIY Storage Box",
    difficulty: "Easy",
    time: "30 minutes",
    materials: ["Cardboard", "Tape", "Scissors"],
    steps: [
      "Cut cardboard into desired shape",
      "Fold into box structure",
      "Secure with tape",
      "Use for storage"
    ]
  },
  alternatives: ["Drawer organizer", "Craft project"]
},

"newspaper": {
  id: "newspaper",
  name: "Newspaper",
  category: "paper",
  keywords: ["newspaper", "news paper", "old paper", "paper"],
  confidence: 85,
  description: "Printed paper used for news and information",
  impact: "Recyclable but consumes natural resources",
  warning: "⚠️ Avoid burning as it causes pollution",
  bestIdea: {
    title: "Paper Bag",
    difficulty: "Easy",
    time: "15 minutes",
    materials: ["Newspaper", "Glue", "Scissors"],
    steps: [
      "Fold newspaper into bag shape",
      "Glue edges securely",
      "Add handle if needed",
      "Use as eco-friendly bag"
    ]
  },
  alternatives: ["Craft art", "Packing material"]
},

"leftover food": {
  id: "leftover_food",
  name: "Leftover Food",
  category: "organic",
  keywords: ["food", "leftover", "stale food", "food waste"],
  confidence: 87,
  description: "Unused or leftover food waste",
  impact: "Produces methane if not managed properly",
  warning: "⚠️ Do not mix with plastic waste",
  bestIdea: {
    title: "Composting",
    difficulty: "Easy",
    time: "Few weeks",
    materials: ["Food waste", "Soil", "Container"],
    steps: [
      "Collect leftover food",
      "Add to compost bin",
      "Mix with soil",
      "Allow decomposition"
    ]
  },
  alternatives: ["Animal feed (safe items)", "Biogas production"]
},

"charger cable": {
  id: "charger_cable",
  name: "Charger / Cable",
  category: "e-waste",
  keywords: ["charger", "cable", "usb", "wire", "adapter"],
  confidence: 90,
  description: "Electronic cable or charger",
  impact: "E-waste contains hazardous and valuable materials",
  warning: "⚠️ Do not dispose in regular waste",
  bestIdea: {
    title: "Cable Organizer",
    difficulty: "Easy",
    time: "10 minutes",
    materials: ["Cable", "Clip or tie"],
    steps: [
      "Coil the cable neatly",
      "Secure with clip or tie",
      "Store properly to reuse"
    ]
  },
  alternatives: ["E-waste recycling", "Repair and reuse"]
}
};