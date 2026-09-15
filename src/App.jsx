import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vessels from "./pages/Vessels";
import VesselDetails from "./pages/VesselDetails";
import Berths from "./pages/Berths";
import Prediction from "./pages/Prediction";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function AppShell({ children, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
        onLogout={onLogout}
      />

      <div className="main-shell">
        <Navbar onMenu={() => setMobileOpen(true)} />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem("smartport-auth") === "true"
  );

  if (!authenticated) {
    return (
      <Login
        onLogin={() => {
          localStorage.setItem("smartport-auth", "true");
          setAuthenticated(true);
        }}
      />
    );
  }

  return (
    <AppShell
      onLogout={() => {
        localStorage.removeItem("smartport-auth");
        setAuthenticated(false);
      }}
    >
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/vessels"
          element={<Vessels />}
        />

        <Route
          path="/vessels/:id"
          element={<VesselDetails />}
        />

        <Route
          path="/berths"
          element={<Berths />}
        />

        <Route
          path="/prediction"
          element={<Prediction />}
        />

        <Route
          path="/alerts"
          element={<Alerts />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </AppShell>
  );
}