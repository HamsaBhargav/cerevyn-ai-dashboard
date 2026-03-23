import React from "react";
import "./Sidebar.css";

const NAV = [
  { id: "overview",      icon: "⬡", label: "Overview"    },
  { id: "agents",        icon: "◈", label: "AI Agents"   },
  { id: "workflows",     icon: "⬢", label: "Workflows"   },
  { id: "logs",          icon: "≡", label: "Activity Log" },
  { id: "architecture",  icon: "◉", label: "Architecture" },
];

export default function Sidebar({ active, onChange, liveMode, setLiveMode }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sb-logo-mark">C</span>
        <div>
          <div className="sb-logo-name">CerevynAI</div>
          <div className="sb-logo-sub">Monitor</div>
        </div>
      </div>

      <div className="sb-live-toggle">
        <span className="sb-live-label">Live Feed</span>
        <button
          className={`toggle-btn ${liveMode ? "on" : "off"}`}
          onClick={() => setLiveMode(v => !v)}
        >
          <span className="toggle-knob" />
        </button>
      </div>

      <nav className="sb-nav">
        {NAV.map(item => (
          <button
            key={item.id}
            className={`sb-item ${active === item.id ? "active" : ""}`}
            onClick={() => onChange(item.id)}
          >
            <span className="sb-icon">{item.icon}</span>
            <span className="sb-label">{item.label}</span>
            {active === item.id && <span className="sb-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sb-footer">
        <div className="sb-version">v2.4.1 · stable</div>
        <div className="sb-env">production</div>
      </div>
    </aside>
  );
}
