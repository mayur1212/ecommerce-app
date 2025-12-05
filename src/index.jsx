// src/index.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";   // 👈 ADD THIS
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>        {/* 👈 Wrap App */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
