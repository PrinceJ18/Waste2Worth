export interface DIYProject {
  id: string;
  title: string;
  category: "Home" | "Garden" | "Farming" | "Decor";
  materials: string[];
  steps: string[];
  time: string;
  difficulty: "Beginner" | "Medium" | "Advanced";
  overview: string;
  wasteType: string;
}

export const diyProjects: DIYProject[] = [
  {
    id: "bottle-planter",
    title: "Self-Watering Bottle Planter",
    category: "Garden",
    materials: ["1 PET bottle", "Cotton string", "Potting soil", "Small plant or seeds"],
    steps: ["Cut the bottle horizontally at the middle", "Poke a small hole in the bottle cap", "Thread a cotton wick through the cap", "Invert the top half into the bottom half", "Fill top with soil, bottom with water", "Plant your seeds or small plant"],
    time: "20 min",
    difficulty: "Beginner",
    overview: "Turn a plastic bottle into a low-maintenance planter that waters itself using capillary action.",
    wasteType: "Plastic Bottle",
  },
  {
    id: "cardboard-organizer",
    title: "Desk Organizer from Cardboard",
    category: "Home",
    materials: ["2 cardboard boxes", "Scissors or box cutter", "Glue or tape", "Wrapping paper (optional)"],
    steps: ["Cut boxes to desired compartment heights", "Arrange compartments in a larger base box", "Glue compartments in place", "Wrap with decorative paper if desired", "Let dry completely before use"],
    time: "30 min",
    difficulty: "Beginner",
    overview: "Create a custom desk organizer from cardboard boxes, keeping your workspace tidy and waste-free.",
    wasteType: "Cardboard",
  },
  {
    id: "tin-lantern",
    title: "Decorative Tin Can Lantern",
    category: "Decor",
    materials: ["1 tin can", "Hammer and nail", "Tea light candle", "Marker", "Water (for freezing)"],
    steps: ["Fill can with water and freeze overnight", "Draw your pattern on the frozen can", "Use hammer and nail to punch holes along the pattern", "Let ice melt and dry the can", "Sand sharp edges", "Place tea light inside and enjoy"],
    time: "24 hrs (mostly freezing)",
    difficulty: "Medium",
    overview: "Transform tin cans into beautiful lanterns that cast patterned light — perfect for patios and gardens.",
    wasteType: "Tin Can",
  },
  {
    id: "tshirt-bag",
    title: "No-Sew T-Shirt Bag",
    category: "Home",
    materials: ["1 old t-shirt", "Scissors"],
    steps: ["Lay t-shirt flat", "Cut off both sleeves along the seam", "Cut the neckline into a wider scoop", "Turn t-shirt inside out", "Cut 3-inch fringe strips along the bottom", "Tie each front strip to its back counterpart", "Turn right-side out — bag complete!"],
    time: "10 min",
    difficulty: "Beginner",
    overview: "Turn an old t-shirt into a durable, reusable shopping bag without any sewing.",
    wasteType: "Old Clothing",
  },
  {
    id: "compost-bin",
    title: "Kitchen Countertop Compost Bin",
    category: "Farming",
    materials: ["Small bucket with lid", "Drill or nail", "Carbon filter (optional)", "Newspaper"],
    steps: ["Clean bucket thoroughly", "Drill small ventilation holes in lid", "Line bottom with shredded newspaper", "Add food scraps daily (no meat/dairy)", "Empty to outdoor compost every 3-5 days", "Rinse and repeat"],
    time: "15 min setup",
    difficulty: "Beginner",
    overview: "Start composting kitchen scraps with a simple countertop bin — reduce landfill waste by up to 30%.",
    wasteType: "Organic Waste",
  },
  {
    id: "bottle-irrigation",
    title: "Drip Irrigation from Bottles",
    category: "Farming",
    materials: ["2-3 PET bottles", "Nail or pin", "Scissors", "Garden soil access"],
    steps: ["Poke 4-6 small holes near the bottom of each bottle", "Cut the bottom off each bottle", "Bury bottles neck-down next to plant roots", "Fill with water through the open top", "Water slowly seeps to roots over hours", "Refill as needed — great for vacations"],
    time: "15 min",
    difficulty: "Beginner",
    overview: "Build a zero-cost drip irrigation system using old plastic bottles — perfect for small gardens and balcony plants.",
    wasteType: "Plastic Bottle",
  },
  {
    id: "vertical-garden",
    title: "Vertical Pallet Garden",
    category: "Garden",
    materials: ["1 wooden pallet", "Landscape fabric", "Staple gun", "Potting soil", "Plants"],
    steps: ["Sand pallet and check for chemical treatments (avoid)", "Staple landscape fabric on back and sides", "Lay pallet flat and fill with soil through front slats", "Plant through the front openings", "Water thoroughly and let roots establish (2 weeks flat)", "Stand pallet upright against a wall"],
    time: "2 hours",
    difficulty: "Advanced",
    overview: "Repurpose a wooden pallet into a stunning vertical garden — ideal for small spaces and urban homes.",
    wasteType: "Wood Pallet",
  },
  {
    id: "glass-terrarium",
    title: "Mason Jar Terrarium",
    category: "Decor",
    materials: ["1 large glass jar", "Pebbles", "Activated charcoal", "Potting soil", "Small plants/moss"],
    steps: ["Layer 1 inch of pebbles in jar bottom", "Add thin layer of activated charcoal", "Add 2 inches of potting soil", "Create small holes and plant greenery", "Add decorative stones or figurines", "Mist lightly and place in indirect light"],
    time: "30 min",
    difficulty: "Medium",
    overview: "Create a self-sustaining mini ecosystem inside a glass jar — a living piece of decor from waste materials.",
    wasteType: "Glass Jar",
  },
];
