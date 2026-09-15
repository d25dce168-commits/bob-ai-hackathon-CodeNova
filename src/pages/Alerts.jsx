import React, { useEffect, useState } from "react";
import { Check, CheckCircle2, Clock3, TriangleAlert, X, RefreshCw } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import StatusBadge from "../components/common/StatusBadge";
import { getAlerts, resolveAlert, deleteAlert } from "../services/api";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchAlertsList = () => {
    setLoading(true);
    getAlerts(activeTab)
      .then((data) => {
        if (Array.isArray(data)) setAlerts(data);
      })
      .catch((err) => console.error("Error fetching alerts:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlertsList();
  }, [activeTab]);

  const handleResolve = async (id) => {
    try {
      await resolveAlert(id);
      fetchAlertsList();
    } catch (err) {
      alert("Failed to resolve alert: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAlert(id);
      fetchAlertsList();
    } catch (err) {
      alert("Failed to dismiss alert: " + err.message);
    }
  };

  const activeCount = alerts.filter((a) => !a.resolved).length;

  return (
    <>
      <PageHeader
        eyebrow="OPERATIONAL ATTENTION"
        title="Alerts & Actions"
        description="Prioritized events generated from live port database and the AI engine."
        action={
          <div className="alert-count">
            <TriangleAlert size={16} /> {activeCount} active
          </div>
        }
      />

      <div className="alert-tabs">
        {["All", "High", "Medium", "Resolved"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="full-alert-list">
        {alerts.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "2rem", color: "#7890aa" }}>
            No alerts found in this category.
          </div>
        ) : (
          alerts.map((a) => (
            <div className={`full-alert ${a.type}`} key={a.id || a.title}>
              <div className={`alert-big-icon ${a.type}`}>
                {a.type === "success" || a.resolved ? <CheckCircle2 /> : <TriangleAlert />}
              </div>

              <div className="full-alert-body">
                <div>
                  <StatusBadge status={a.resolved ? "Resolved" : a.severity || (a.type === "high" ? "High" : "Medium")} />
                  <small>{a.time}</small>
                </div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                {!a.resolved && (
                  <button className="secondary-button" onClick={() => handleResolve(a.id)}>
                    {a.action} <Check size={15} />
                  </button>
                )}
              </div>

              <button className="icon-button" onClick={() => handleDelete(a.id)} title="Dismiss">
                <X size={17} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="card alert-footnote">
        <Clock3 size={17} />
        <span>Alerts are synced directly with the backend database. Resolving an alert updates the port event log.</span>
      </div>
    </>
  );
}