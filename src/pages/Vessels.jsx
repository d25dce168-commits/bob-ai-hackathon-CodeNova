import React, { useEffect, useMemo, useState } from "react";
import { Plus, Ship, Upload, X, Check, RefreshCw } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import VesselFilters from "../components/vessels/VesselFilters";
import VesselTable from "../components/vessels/VesselTable";
import { getVessels, createVessel } from "../services/api";

export default function Vessels() {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [showModal, setShowModal] = useState(false);

  // New vessel form state
  const [formData, setFormData] = useState({
    name: "",
    type: "Container",
    eta: "14:30",
    berth: "B02",
    wait: "1.5",
    status: "Approaching",
    length: "350 m",
    cargo: "8,000 TEU",
    destination: "Port Alpha Terminal 2"
  });

  const fetchVesselsList = () => {
    setLoading(true);
    getVessels({ q: search, status })
      .then((data) => {
        if (Array.isArray(data)) setVessels(data);
      })
      .catch((err) => console.error("Error fetching vessels:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchVesselsList();
  }, [search, status]);

  const handleAddVessel = async (e) => {
    e.preventDefault();
    if (!formData.name) return;
    try {
      await createVessel(formData);
      setShowModal(false);
      setFormData({
        name: "",
        type: "Container",
        eta: "14:30",
        berth: "B02",
        wait: "1.5",
        status: "Approaching",
        length: "350 m",
        cargo: "8,000 TEU",
        destination: "Port Alpha Terminal 2"
      });
      fetchVesselsList();
    } catch (err) {
      alert("Failed to add vessel: " + err.message);
    }
  };

  const approachingCount = vessels.filter((v) => v.status === "Approaching").length;
  const waitingCount = vessels.filter((v) => v.status === "Waiting").length;

  return (
    <>
      <PageHeader
        eyebrow="FLEET OPERATIONS"
        title="Vessel Management"
        description="Monitor incoming vessels, schedules and waiting time connected to the database."
        action={
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="primary-button" onClick={() => setShowModal(true)}>
              <Plus size={16} /> Add Vessel
            </button>
          </div>
        }
      />

      <div className="quick-strip">
        <div>
          <Ship /> <b>{vessels.length}</b>
          <span>Tracked vessels</span>
        </div>
        <div>
          <span className="status-dot green" />
          <b>{approachingCount}</b>
          <span>Approaching</span>
        </div>
        <div>
          <span className="status-dot yellow" />
          <b>{waitingCount}</b>
          <span>Waiting</span>
        </div>
        <div>
          <Upload />
          <b>LIVE API</b>
          <span>Connected</span>
        </div>
      </div>

      <VesselFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <VesselTable vessels={vessels} />

      {/* Add Vessel Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(5, 12, 22, 0.8)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: "520px",
              width: "90%",
              padding: "1.5rem",
              borderRadius: "16px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.2rem"
              }}
            >
              <div>
                <span className="eyebrow">REGISTRATION</span>
                <h3 style={{ margin: "4px 0" }}>Register New Vessel</h3>
              </div>
              <button
                className="icon-button"
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddVessel}>
              <div className="settings-form" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label>
                  Vessel Name
                  <input
                    type="text"
                    required
                    placeholder="e.g. MSC Horizon"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <label>
                    Type
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option>Container</option>
                      <option>Bulk</option>
                      <option>Tanker</option>
                      <option>RoRo</option>
                    </select>
                  </label>

                  <label>
                    Status
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option>Approaching</option>
                      <option>Waiting</option>
                      <option>Scheduled</option>
                      <option>Docked</option>
                    </select>
                  </label>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  <label>
                    ETA
                    <input
                      type="text"
                      placeholder="14:30"
                      value={formData.eta}
                      onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                    />
                  </label>

                  <label>
                    Berth
                    <select
                      value={formData.berth}
                      onChange={(e) => setFormData({ ...formData, berth: e.target.value })}
                    >
                      <option>B01</option>
                      <option>B02</option>
                      <option>B03</option>
                      <option>B04</option>
                      <option>B05</option>
                      <option>B06</option>
                    </select>
                  </label>

                  <label>
                    Est. Wait (h)
                    <input
                      type="number"
                      step="0.1"
                      value={formData.wait}
                      onChange={(e) => setFormData({ ...formData, wait: e.target.value })}
                    />
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "1.5rem" }}>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <Check size={16} /> Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}