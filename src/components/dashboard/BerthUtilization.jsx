import React from "react";
const berths = [
  ["B01","Maersk Orion",91,"Occupied"],["B02","Ever Ocean",68,"Occupied"],["B03","MSC Aurora",83,"Occupied"],["B04","—",0,"Available"],["B05","—",0,"Maintenance"]
];
export default function BerthUtilization() {
  return <div className="card berth-util"><div className="card-heading"><div><span className="eyebrow">INFRASTRUCTURE</span><h3>Berth Utilization</h3></div><span className="mini-stat">82% total</span></div>
    <div className="berth-bars">{berths.map(([id,vessel,pct,status]) => <div className="berth-line" key={id}><div className="berth-label"><b>{id}</b><span>{vessel}</span><small>{status}</small></div><div className="bar"><i style={{width:`${pct}%`}}/></div><strong>{pct}%</strong></div>)}</div>
  </div>;
}