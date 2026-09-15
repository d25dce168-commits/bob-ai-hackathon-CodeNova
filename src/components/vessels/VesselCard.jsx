import React from "react";
import { Ship } from "lucide-react";
export default function VesselCard({vessel}){return <div className="vessel-card card"><div className="ship-visual"><Ship size={32}/></div><div><b>{vessel.name}</b><span>{vessel.id} • {vessel.type}</span></div><strong>{vessel.eta}</strong></div>}