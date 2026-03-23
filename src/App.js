import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Agents from "./pages/Agents";
import Workflows from "./pages/Workflows";
import LogPage from "./pages/LogPage";
import ArchPage from "./pages/ArchPage";
import { useDashboard } from "./hooks/useDashboard";
import "./styles/globals.css";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("overview");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const db = useDashboard();

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  const PAGE_TITLES = {
    overview: "Overview",
    agents: "AI Agents",
    workflows: "Workflows",
    logs: "Activity Log",
    architecture: "Architecture",
  };

  const renderPage = () => {
    switch (page) {
      case "overview":     return <Overview data={db.chartData} totalEvents={db.totalEvents} successRate={db.successRate} avgLatency={db.avgLatency} activeAgents={db.activeAgents} health={db.health} />;
      case "agents":       return <Agents agents={db.agents} restartAgent={db.restartAgent} toggleAgent={db.toggleAgent} />;
      case "workflows":    return <Workflows workflows={db.workflows} workflowAction={db.workflowAction} />;
      case "logs":         return <LogPage logs={db.logs} />;
      case "architecture": return <ArchPage />;
      default:             return null;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar active={page} onChange={setPage} liveMode={db.liveMode} setLiveMode={db.setLiveMode} />
      <div className="app-content">
        <div className="app-topbar">
          <div className="topbar-left">
            <div className="topbar-title">{PAGE_TITLES[page]}</div>
            <div className="topbar-breadcrumb">CerevynAI Monitor / {PAGE_TITLES[page]}</div>
          </div>
          <div className="topbar-right">
            <div className={`live-indicator ${db.liveMode ? "on" : "off"}`}>
              <span className="li-dot" />
              {db.liveMode ? "Live Feed" : "Paused"}
            </div>
            <div className="topbar-time">{time}</div>
          </div>
        </div>
        <div className="app-main">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
