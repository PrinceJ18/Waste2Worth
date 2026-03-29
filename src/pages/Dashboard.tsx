import { useState, useEffect } from "react";
import {
  getScanStats,
  getUserLevel,
  getBadges,
  getScanHistory,
  generateInsight,
  getDailyStreak,
  deleteScanRecord,
} from "../utils/scanHistory";
import type { ScanRecord } from "../utils/scanHistory";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [level, setLevel] = useState<any>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [insight, setInsight] = useState("");
  const [streak, setStreak] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    setStats(getScanStats());
    setLevel(getUserLevel());
    setBadges(getBadges());
    setHistory(getScanHistory());
    setInsight(generateInsight());
    setStreak(getDailyStreak());
  }, []);

  const filteredHistory = selectedFilter
    ? history.filter((item) => item.category === selectedFilter)
    : history;

  const handleDeleteRecord = (id: string) => {
    deleteScanRecord(id);
    setHistory(getScanHistory());
    setStats(getScanStats());
    setLevel(getUserLevel());
    setBadges(getBadges());
  };

  if (!stats || !level) {
    return (
      <div className="min-h-screen p-6 bg-[#f5f1e6] flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#f5f1e6]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🌍 Your Waste2Worth Journey
          </h1>
          <p className="text-gray-600">Track your environmental impact and gamified progress</p>
        </div>

        {/* Level Progress */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90">Your Level</p>
              <h2 className="text-2xl font-bold">{level.name}</h2>
              <p className="text-sm opacity-80 mt-1">Level {level.level} of 5</p>
            </div>
            <div className="text-5xl">
              {level.level === 1 && "🌱"}
              {level.level === 2 && "🌿"}
              {level.level === 3 && "🌳"}
              {level.level === 4 && "🏆"}
              {level.level === 5 && "👑"}
            </div>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${level.progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 opacity-90">
            {stats.totalScans} / {level.scansRequired} scans
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500">
            <p className="text-gray-600 text-sm mb-1">Total Scans</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalScans}</p>
            <p className="text-xs text-gray-500 mt-2">
              {stats.weekScans} this week
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm mb-1">CO2 Saved</p>
            <p className="text-3xl font-bold text-gray-800">{stats.co2Saved} kg</p>
            <p className="text-xs text-gray-500 mt-2">
              ~{Math.round(parseFloat(stats.co2Saved) / 5)} trees worth
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-orange-500">
            <p className="text-gray-600 text-sm mb-1">Daily Streak</p>
            <p className="text-3xl font-bold text-gray-800">{streak} days 🔥</p>
            <p className="text-xs text-gray-500 mt-2">Keep it going!</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm mb-1">Items Recycled</p>
            <p className="text-3xl font-bold text-gray-800">{stats.wasteReused}</p>
            <p className="text-xs text-gray-500 mt-2">Great job!</p>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-5 rounded-lg border-l-4 border-purple-500 mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-1">💡 AI Insight</p>
          <p className="text-gray-800">{insight}</p>
        </div>

        {/* Daily Mission */}
        <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500 mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">📋 Today's Mission</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3 cursor-pointer" />
              <div>
                <p className="font-semibold text-gray-800">Scan 1 waste item</p>
                <p className="text-xs text-gray-600">+10 XP</p>
              </div>
            </div>
            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3 cursor-pointer" />
              <div>
                <p className="font-semibold text-gray-800">Complete 1 upcycling idea</p>
                <p className="text-xs text-gray-600">+20 XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-lg text-center transition ${
                  badge.earned
                    ? "bg-white shadow-md border-2 border-yellow-400"
                    : "bg-gray-200 opacity-50"
                }`}
              >
                <p className="text-3xl mb-1">{badge.icon}</p>
                <p className="text-xs font-semibold text-gray-800">{badge.name}</p>
                <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Waste Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(stats.categories).map(([category, count]: any) => (
              <div
                key={category}
                className={`p-4 rounded-lg text-center cursor-pointer transition ${
                  selectedFilter === category
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-white shadow-md hover:shadow-lg"
                }`}
                onClick={() =>
                  setSelectedFilter(
                    selectedFilter === category ? null : category
                  )
                }
              >
                <p className="text-2xl mb-1">
                  {category === "plastic" && "🍾"}
                  {category === "glass" && "🥃"}
                  {category === "metal" && "🔩"}
                  {category === "paper" && "📰"}
                  {category === "organic" && "🌱"}
                  {category === "electronics" && "⚡"}
                  {category === "other" && "📦"}
                </p>
                <p className="text-xs font-semibold text-gray-800 capitalize">
                  {category}
                </p>
                <p className="text-lg font-bold text-green-600">{count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scan History */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">📜 Scan History</h2>
            <p className="text-sm text-gray-600">
              {selectedFilter ? `Showing ${selectedFilter}` : "All scans"}
            </p>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="bg-white p-8 rounded-lg text-center text-gray-600 shadow-md">
              <p className="text-lg font-semibold">No scans yet</p>
              <p className="text-sm mt-2">Start scanning to see your history here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHistory.map((record) => (
                <div key={record.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                  {record.image && (
                    <img
                      src={record.image}
                      alt={record.detectedItem}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="mb-3">
                    <p className="font-bold text-gray-800">{record.detectedItem}</p>
                    <p className="text-xs text-gray-600 capitalize">{record.category}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      {(record.confidence * 100).toFixed(0)}% confidence
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-600">
                      {new Date(record.timestamp).toLocaleDateString()} at{" "}
                      {new Date(record.timestamp).toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Match: <span className="capitalize font-semibold">{record.matchType}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="w-full bg-red-100 text-red-700 py-2 rounded-lg text-sm font-semibold hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;