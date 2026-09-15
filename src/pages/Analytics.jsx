import React, { useEffect, useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import KPIGrid from "../components/analytics/KPIGrid";
import AnalyticsChart from "../components/analytics/AnalyticsChart";
import DateFilter from "../components/analytics/DateFilter";
import { getAnalyticsKPIs, getAnalyticsHistory, exportReportUrl } from "../services/api";

export default function Analytics() {
  const [range, setRange] = useState("7d");
  const [kpis, setKpis] = useState(null);
  const [chartSeries, setChartSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAnalyticsKPIs()
      .then((data) => setKpis(data))
      .catch((err) => console.error("Error fetching KPIs:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    getAnalyticsHistory(range)
      .then((res) => {
        if (res && res.data) setChartSeries(res.data);
      })
      .catch((err) => console.error("Error fetching analytics history:", err))
      .finally(() => setLoading(false));
  }, [range]);

  const handleExport = () => {
    window.open(exportReportUrl(), "_blank");
  };

  return (
    <>
      <PageHeader
        eyebrow="PERFORMANCE INTELLIGENCE"
        title="Port Analytics"
        description="Track operational performance and identify bottlenecks connected to database records."
        action={
          <button className="secondary-button" onClick={handleExport}>
            <Download size={16} /> Export CSV Report
          </button>
        }
      />

      <div className="analytics-toolbar">
        <DateFilter range={range} onSelect={setRange} />
        <span>Connected to Live Metrics Engine</span>
      </div>

      <KPIGrid stats={kpis} />

      <AnalyticsChart data={chartSeries} range={range} />

      <div className="analytics-bottom">
        <div className="card">
          <span className="eyebrow">TOP BOTTLENECK</span>
          <h3>{kpis?.bottleneckBerth || "Berth B03"}</h3>
          <p>Average utilization is {kpis?.bottleneckUtilization || "91%"} during peak arrival windows.</p>
          <div className="progress-stat">
            <span>Peak utilization</span>
            <b>{kpis?.bottleneckUtilization || "91%"}</b>
          </div>
          <div className="bar">
            <i style={{ width: kpis?.bottleneckUtilization || "91%" }} />
          </div>
        </div>

        <div className="card">
          <span className="eyebrow">AI PERFORMANCE</span>
          <h3>Prediction lead time</h3>
          <p>Operators are receiving actionable congestion signals well before terminal arrival peaks.</p>
          <div className="big-number">
            {kpis?.predictionLeadTime?.split(" ")[0] || "41"}
            <span> {kpis?.predictionLeadTime?.split(" ")[1] || "hours"}</span>
          </div>
        </div>
      </div>
    </>
  );
}