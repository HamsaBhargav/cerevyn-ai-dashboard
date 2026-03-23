import React from "react";
import "./Workflows.css";

const STATUS_COLOR = { active: "green", paused: "warn", stopped: "red" };

export default function Workflows({ workflows, workflowAction }) {
  return (
    <div className="workflows-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Workflows</h2>
          <p className="page-sub">Manage and control all AI workflow pipelines</p>
        </div>
      </div>

      <div className="workflows-list">
        {workflows.map(wf => (
          <div key={wf.id} className={`wf-card status-${STATUS_COLOR[wf.status]}`}>
            <div className="wf-header">
              <div className="wf-info">
                <div className="wf-name">{wf.name}</div>
                <div className="wf-id">{wf.id}</div>
              </div>
              <div className={`wf-status ${STATUS_COLOR[wf.status]}`}>
                {wf.status === "active" ? "● Active" : wf.status === "paused" ? "⏸ Paused" : "■ Stopped"}
              </div>
            </div>

            {wf.status === "active" && (
              <div className="wf-progress-wrap">
                <div className="wf-progress-bar">
                  <div className="wf-progress-fill" style={{ width: `${wf.progress}%` }} />
                </div>
                <span className="wf-progress-label">{wf.progress}%</span>
              </div>
            )}

            <div className="wf-stats">
              <div className="wf-stat">
                <span className="wst-label">Total Runs</span>
                <span className="wst-val">{wf.runs}</span>
              </div>
              <div className="wf-stat">
                <span className="wst-label">Successful</span>
                <span className="wst-val green">{wf.success}</span>
              </div>
              <div className="wf-stat">
                <span className="wst-label">Failed</span>
                <span className="wst-val red">{wf.runs - wf.success}</span>
              </div>
              <div className="wf-stat">
                <span className="wst-label">Success Rate</span>
                <span className="wst-val">{((wf.success / wf.runs) * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="wf-actions">
              <button
                className="wf-btn start"
                onClick={() => workflowAction(wf.id, "start")}
                disabled={wf.status === "active"}
              >▶ Start</button>
              <button
                className="wf-btn pause"
                onClick={() => workflowAction(wf.id, "pause")}
                disabled={wf.status !== "active"}
              >⏸ Pause</button>
              <button
                className="wf-btn stop"
                onClick={() => workflowAction(wf.id, "stop")}
                disabled={wf.status === "stopped"}
              >■ Stop</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
