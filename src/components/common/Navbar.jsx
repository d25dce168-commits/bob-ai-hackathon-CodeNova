import React from "react";
import { Bell, Menu, Search } from "lucide-react";

export default function Navbar({ onMenu }) {
  return (
    <header className="top-navbar">
      <button className="mobile-menu" onClick={onMenu}>
        <Menu size={22} />
      </button>

      <div className="navbar-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search vessels, berths, alerts..."
        />
      </div>

      <div className="navbar-actions">
        <button className="icon-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">BS</div>
          <div className="user-info">
            <strong>Port Operator</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}