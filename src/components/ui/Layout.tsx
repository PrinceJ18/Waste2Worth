import Navbar from "../Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f5f1e6] text-gray-800">

      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🌿 Main Content Wrapper */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* 📦 Cardboard-style container */}
        <div className="bg-[#fff8e7] rounded-2xl shadow-md p-4 sm:p-6">

          {/* ✨ Page Transition */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>

        </div>

      </main>

      {/* 🌱 Footer (simple but professional) */}
      <footer className="text-center text-sm text-gray-500 py-4">
        ♻️ Waste2Worth — Turn Waste into Value
      </footer>

    </div>
  );
}