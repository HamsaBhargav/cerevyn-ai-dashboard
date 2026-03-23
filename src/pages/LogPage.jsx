import React from "react";
import "./LogPage.css";

const TYPE_COLOR = { success: "green", info: "blue", warn: "warn", error: "red" };
const TYPE_ICON  = { success: "✓", info: "i", warn: "!", error: "✕" };

export default function LogPage({ logs }) {
  return (
    <div className="log-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Activity Log</h2>
          <p className="page-sub">Real-time system events and agent activity</p>
        </div>
        <div className="log-count">
          <span className="lc-num">{logs.length}</span>
          <span className="lc-label">events</span>
        </div>
      </div>

      <div className="card log-card">
        <div className="card-title"><span className="pulse"/>Live Feed</div>
        {logs.length === 0 ? (
          <div className="log-empty">Waiting for events... Live feed will populate automatically.</div>
        ) : (
          <div className="log-list">
            {logs.map(entry => (
              <div key={entry.id} className={`log-entry type-${TYPE_COLOR[entry.type]}`}>
                <div className={`log-icon ${TYPE_COLOR[entry.type]}`}>{TYPE_ICON[entry.type]}</div>
                <div className="log-body">
                  <span className="log-msg">{entry.msg}</span>
                  <span className="log-agent">{entry.agent}</span>
                </div>
                <div className="log-right">
                  <span className="log-latency">{entry.latency}</span>
                  <span className="log-time">{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
