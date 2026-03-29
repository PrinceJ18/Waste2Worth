import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/scanner", label: "AI Scanner" },
  { path: "/diy", label: "DIY Upcycling" },
  { path: "/waste-guide", label: "Waste Guide" },
  { path: "/community", label: "Community" },
  { path: "/dashboard", label: "Dashboard" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#fff8e7]/80 border-b border-[#e5dcc8] shadow-sm">

      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* 🌿 Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-800 hover:opacity-80 transition"
        >
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="tracking-tight">Waste2Worth</span>
        </Link>

        {/* 🖥 Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 bg-[#f5f1e6] p-1 rounded-xl">

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-3 py-2 text-sm font-medium rounded-lg transition"
              >
                {/* Active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <span
                  className={`relative z-10 ${
                    isActive
                      ? "text-green-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* 📱 Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-[#f5f1e6] transition"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t bg-[#fff8e7]"
          >
            <div className="flex flex-col px-4 py-3 space-y-2">

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-[#f5f1e6]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;