import React from "react";
import {
  AlertTriangle,
  Anchor,
  BarChart3,
  BrainCircuit,
  LayoutDashboard,
  LogOut,
  Settings,
  Ship,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({
  mobileOpen,
  closeMobile,
  onLogout,
}) {
  const links = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/vessels",
      label: "Vessels",
      icon: Ship,
    },
    {
      path: "/berths",
      label: "Berths",
      icon: Anchor,
    },
    {
      path: "/prediction",
      label: "AI Prediction",
      icon: BrainCircuit,
    },
    {
      path: "/alerts",
      label: "Alerts",
      icon: AlertTriangle,
    },
    {
      path: "/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`sidebar ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-header">
          <div className="brand-icon">
            <Anchor size={25} />
          </div>

          <div className="brand-text">
            <strong>SmartPort</strong>
            <span>AI OPERATIONS</span>
          </div>

          <button
            className="sidebar-close"
            onClick={closeMobile}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon size={19} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot green"></span>
            <div>
              <strong>System Online</strong>
              <span>AI services operational</span>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}