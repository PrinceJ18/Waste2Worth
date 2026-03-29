/**
 * Scan History Management
 * Stores and retrieves waste scan records from localStorage
 */

export interface ScanRecord {
  id: string;
  image: string; // base64 encoded
  detectedItem: string;
  confidence: number;
  timestamp: number;
  category: string;
  matchType: "exact" | "phrase" | "keyword" | "partial" | "fuzzy" | "category";
  matchedKeyword: string;
  description: string;
}

const STORAGE_KEY = "waste2worth_scans";
const MAX_RECORDS = 100;

/**
 * Save a scan record to localStorage
 */
export const saveScanRecord = (record: Omit<ScanRecord, "id" | "timestamp">): ScanRecord => {
  const scanRecord: ScanRecord = {
    ...record,
    id: `scan_${Date.now()}`,
    timestamp: Date.now(),
  };

  try {
    const existing = getScanHistory();
    const updated = [scanRecord, ...existing].slice(0, MAX_RECORDS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return scanRecord;
  } catch (error) {
    console.error("Failed to save scan record:", error);
    return scanRecord;
  }
};

/**
 * Get all scan records from localStorage
 */
export const getScanHistory = (): ScanRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load scan history:", error);
    return [];
  }
};

/**
 * Delete a specific scan record
 */
export const deleteScanRecord = (id: string): void => {
  try {
    const history = getScanHistory();
    const filtered = history.filter((record) => record.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete scan record:", error);
  }
};

/**
 * Clear all scan history
 */
export const clearScanHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear scan history:", error);
  }
};

/**
 * Get statistics from scan history
 */
export const getScanStats = () => {
  const history = getScanHistory();
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const oneDayAgo = now - 24 * 60 * 60 * 1000;

  const totalScans = history.length;
  const weekScans = history.filter((r) => r.timestamp > oneWeekAgo).length;
  const todayScans = history.filter((r) => r.timestamp > oneDayAgo).length;

  const categories = history.reduce(
    (acc, record) => {
      acc[record.category] = (acc[record.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Calculate CO2 saved (rough estimate: 0.5kg per item)
  const co2Saved = totalScans * 0.5;

  // Calculate waste reused (count of scans)
  const wasteReused = totalScans;

  return {
    totalScans,
    weekScans,
    todayScans,
    categories,
    co2Saved: co2Saved.toFixed(1),
    wasteReused,
  };
};

/**
 * Get user level based on scan count
 */
export const getUserLevel = (): {
  name: string;
  level: number;
  scansRequired: number;
  progress: number;
} => {
  const levels = [
    { name: "Beginner Recycler", scans: 0 },
    { name: "Eco Starter", scans: 5 },
    { name: "Green Warrior", scans: 15 },
    { name: "Sustainability Hero", scans: 30 },
    { name: "Waste Master", scans: 50 },
  ];

  const stats = getScanStats();
  const totalScans = stats.totalScans;

  let currentLevel = 0;
  let nextLevelScans = levels[levels.length - 1].scans;

  for (let i = 0; i < levels.length; i++) {
    if (totalScans >= levels[i].scans) {
      currentLevel = i;
    }
    if (i < levels.length - 1 && totalScans < levels[i + 1].scans) {
      nextLevelScans = levels[i + 1].scans;
      break;
    }
  }

  const progress = Math.round(
    ((totalScans - levels[currentLevel].scans) /
      (nextLevelScans - levels[currentLevel].scans)) *
      100
  );

  return {
    name: levels[currentLevel].name,
    level: currentLevel + 1,
    scansRequired: nextLevelScans,
    progress: Math.min(progress, 100),
  };
};

/**
 * Get badges earned based on activity
 */
export const getBadges = (): {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
  description: string;
}[] => {
  const history = getScanHistory();
  const stats = getScanStats();

  const badges = [
    {
      id: "first_scan",
      name: "First Step",
      icon: "🌱",
      earned: stats.totalScans >= 1,
      description: "Complete your first scan",
    },
    {
      id: "plastic_hero",
      name: "Plastic Hero",
      icon: "🏆",
      earned: (stats.categories["plastic"] || 0) >= 5,
      description: "Scan 5 plastic items",
    },
    {
      id: "eco_warrior",
      name: "Eco Warrior",
      icon: "⚔️",
      earned: stats.totalScans >= 20,
      description: "Complete 20 scans",
    },
    {
      id: "metal_master",
      name: "Metal Master",
      icon: "🔩",
      earned: (stats.categories["metal"] || 0) >= 3,
      description: "Scan 3 metal items",
    },
    {
      id: "glass_expert",
      name: "Glass Expert",
      icon: "🎯",
      earned: (stats.categories["glass"] || 0) >= 3,
      description: "Scan 3 glass items",
    },
    {
      id: "sustainability_champion",
      name: "Sustainability Champion",
      icon: "👑",
      earned: stats.totalScans >= 50,
      description: "Become a Waste Master",
    },
  ];

  return badges;
};

/**
 * Generate AI insight based on scan history
 */
export const generateInsight = (): string => {
  const stats = getScanStats();
  const categories = Object.entries(stats.categories).sort((a, b) => b[1] - a[1]);

  if (categories.length === 0) {
    return "Start scanning waste items to get personalized insights!";
  }

  const [topCategory, topCount] = categories[0];
  const insights = [
    `You mostly scan ${topCategory} items (${topCount} scans). Keep it up!`,
    `Your top waste category is ${topCategory}. Consider reducing ${topCategory} usage.`,
    `Great job! You've scanned ${stats.totalScans} items this far.`,
    `You're making a difference! ${stats.co2Saved}kg CO2 saved so far.`,
    `Focus on ${topCategory} recycling to maximize your environmental impact.`,
  ];

  return insights[Math.floor(Math.random() * insights.length)];
};

/**
 * Get daily streak
 */
export const getDailyStreak = (): number => {
  const history = getScanHistory();
  if (history.length === 0) return 0;

  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Group scans by day
  const dayScans = new Map<string, boolean>();
  history.forEach((record) => {
    const date = new Date(record.timestamp).toDateString();
    dayScans.set(date, true);
  });

  // Check consecutive days
  let streak = 0;
  let checkDate = new Date();
  checkDate.setHours(0, 0, 0, 0);

  while (dayScans.has(checkDate.toDateString())) {
    streak++;
    checkDate.setTime(checkDate.getTime() - oneDayMs);
  }

  return streak;
};
