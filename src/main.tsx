import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ✅ Safe root check (prevents crash)
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// ✅ Wait for DOM (extra safety for Puter)
window.addEventListener("DOMContentLoaded", () => {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});