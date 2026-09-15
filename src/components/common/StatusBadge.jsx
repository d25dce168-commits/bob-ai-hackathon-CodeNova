import React from "react";
export default function StatusBadge({ status }) {
  const key = String(status).toLowerCase().replace(/\s+/g, "-");
  return <span className={`status-badge ${key}`}><i/> {status}</span>;
}