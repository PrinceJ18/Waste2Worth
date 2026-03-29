import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Layout from "./components/ui/Layout";

// 🔥 Lazy load pages (performance boost)
const Index = lazy(() => import("./pages/Index"));
const Scanner = lazy(() => import("./pages/Scanner"));
const DIY = lazy(() => import("./pages/DIY"));
const History = lazy(() => import("./pages/History"));
const WasteGuide = lazy(() => import("./pages/WasteGuide"));
const Community = lazy(() => import("./pages/Community"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

// 🔥 Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 🔥 Loader (clean UI)
function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f1e6]">
      <p className="text-xl animate-pulse">Loading...</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Suspense fallback={<Loader />}>
        <Routes>

          {/* Layout wrapper */}
          <Route element={<Layout />}>

            {/* Main routes */}
            <Route path="/" element={<Index />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/diy" element={<DIY />} />
            <Route path="/history" element={<History />} />
            <Route path="/community" element={<Community />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Guide routes */}
            <Route path="/waste-guide" element={<WasteGuide />} />

            {/* Redirects */}
            <Route path="/guide" element={<Navigate to="/waste-guide" replace />} />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;