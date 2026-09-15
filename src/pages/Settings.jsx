import React, { useEffect, useState } from "react";
import { Bell, BrainCircuit, Moon, Save, ShieldCheck, User, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import { getSettings, updateSettings } from "../services/api";

export default function Settings() {
  const [profile, setProfile] = useState({
    fullName: "Port Operator",
    email: "operator@smartport.ai",
    role: "Operations Manager"
  });

  const [notifications, setNotifications] = useState({
    highRiskCongestion: true,
    aiRecommendations: true,
    quietHours: false
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings()
      .then((data) => {
        if (data.profile) setProfile(data.profile);
        if (data.notifications) setNotifications(data.notifications);
      })
      .catch((err) => console.error("Error loading settings:", err));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings({ profile, notifications });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert("Failed to save settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="SYSTEM CONFIGURATION"
        title="Settings"
        description="Manage your operator workspace and alert preferences saved in the database."
      />

      <div className="settings-grid">
        <div className="card settings-nav">
          <div
            className={`settings-nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <User size={17} /> Profile
          </div>
          <div
            className={`settings-nav-item ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={17} /> Notifications
          </div>
          <div
            className={`settings-nav-item ${activeTab === "ai" ? "active" : ""}`}
            onClick={() => setActiveTab("ai")}
          >
            <BrainCircuit size={17} /> AI Model
          </div>
          <div
            className={`settings-nav-item ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <ShieldCheck size={17} /> Security
          </div>
        </div>

        <div className="settings-main">
          {activeTab === "profile" && (
            <div className="card settings-section">
              <div className="settings-title">
                <div>
                  <h3>Operator Profile</h3>
                  <p>Basic account information saved to backend.</p>
                </div>
              </div>

              <div className="settings-form">
                <label>
                  Full name
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </label>

                <label>
                  Work email
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </label>

                <label>
                  Role
                  <select
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  >
                    <option>Operations Manager</option>
                    <option>Port Supervisor</option>
                    <option>Terminal Analyst</option>
                    <option>Berth Master</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="card settings-section">
              <div className="settings-title">
                <div>
                  <h3>Notifications</h3>
                  <p>Choose when SmartPort triggers real-time alerts.</p>
                </div>
              </div>

              <Toggle
                icon={<Bell />}
                title="High-risk congestion"
                text="Alert me when predicted risk exceeds 70%"
                on={notifications.highRiskCongestion}
                onToggle={(val) => setNotifications({ ...notifications, highRiskCongestion: val })}
              />
              <Toggle
                icon={<BrainCircuit />}
                title="AI recommendations"
                text="Show recommended actions on the dashboard"
                on={notifications.aiRecommendations}
                onToggle={(val) => setNotifications({ ...notifications, aiRecommendations: val })}
              />
              <Toggle
                icon={<Moon />}
                title="Quiet hours"
                text="Reduce non-critical alerts after 11 PM"
                on={notifications.quietHours}
                onToggle={(val) => setNotifications({ ...notifications, quietHours: val })}
              />
            </div>
          )}

          {activeTab === "ai" && (
            <div className="card settings-section">
              <div className="settings-title">
                <div>
                  <h3>AI Engine Configuration</h3>
                  <p>Model parameters and automated congestion sensitivity.</p>
                </div>
              </div>
              <p style={{ color: "#7890aa", fontSize: "0.9rem", lineHeight: "1.6" }}>
                The backend heuristic AI engine continuously processes vessel arrival schedules, crane telemetry, and berth queue factors. Sensitivity threshold is currently calibrated to <b>70% Congestion Index</b>.
              </p>
            </div>
          )}

          {activeTab === "security" && (
            <div className="card settings-section">
              <div className="settings-title">
                <div>
                  <h3>Security & Sessions</h3>
                  <p>Active port operator session tokens.</p>
                </div>
              </div>
              <p style={{ color: "#7890aa", fontSize: "0.9rem" }}>
                Authentication token is active. Connected to local REST API with role-based access validation.
              </p>
            </div>
          )}

          <button className="primary-button" onClick={handleSave} disabled={saving}>
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saved ? "Settings saved to DB" : saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </>
  );
}

function Toggle({ icon, title, text, on, onToggle }) {
  return (
    <div className="toggle-row">
      <div className="toggle-icon">{icon}</div>
      <div>
        <b>{title}</b>
        <span>{text}</span>
      </div>
      <button
        type="button"
        className={`toggle ${on ? "on" : ""}`}
        onClick={() => onToggle(!on)}
      >
        <i />
      </button>
    </div>
  );
}