import React from "react";

export default function DateFilter({ range = "7d", onSelect }) {
  const options = [
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "90D", value: "90d" }
  ];

  return (
    <div className="date-filter">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={range === opt.value ? "active" : ""}
          onClick={() => onSelect && onSelect(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}