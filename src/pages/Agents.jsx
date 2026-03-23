import React from "react";
import "./Agents.css";

const STATUS_COLOR = { running: "green", idle: "blue", error: "red", restarting: "warn" };
const STATUS_LABEL = { running: "● Running", idle: "○ Idle", error: "✕ Error", restarting: "↻ Restarting" };

export default function Agents({ agents, restartAgent, toggleAgent }) {
  return (
    <div className="agents-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">AI Agents</h2>
          <p className="page-sub">Monitor and control all active AI agents in the system</p>
        </div>
        <div className="agent-summary">
          <span className="asm green">{agents.filter(a=>a.status==="running").length} Running</span>
          <span className="asm blue">{agents.filter(a=>a.status==="idle").length} Idle</span>
          <span className="asm red">{agents.filter(a=>a.status==="error").length} Error</span>
        </div>
      </div>

      <div className="agents-grid">
        {agents.map(agent => (
          <div key={agent.id} className={`agent-card status-${STATUS_COLOR[agent.status]}`}>
            <div className="agent-header">
              <div className="agent-icon">{agent.type[0]}</div>
              <div className="agent-info">
                <div className="agent-name">{agent.name}</div>
                <div className="agent-id">{agent.id}</div>
              </div>
              <div className={`agent-status ${STATUS_COLOR[agent.status]}`}>
                {STATUS_LABEL[agent.status]}
              </div>
            </div>

            <div className="agent-meta">
              <div className="agent-meta-item">
                <span className="meta-label">Type</span>
                <span className="meta-val">{agent.type}</span>
              </div>
              <div className="agent-meta-item">
                <span className="meta-label">Model</span>
                <span className="meta-val">{agent.model}</span>
              </div>
            </div>

            <div className="agent-actions">
              <button
                className="agent-btn restart"
                onClick={() => restartAgent(agent.id)}
                disabled={agent.status === "restarting"}
              >
                ↻ Restart
              </button>
              <button
                className={`agent-btn toggle ${agent.status === "running" ? "pause" : "start"}`}
                onClick={() => toggleAgent(agent.id)}
                disabled={agent.status === "restarting" || agent.status === "error"}
              >
                {agent.status === "running" ? "⏸ Pause" : "▶ Start"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
