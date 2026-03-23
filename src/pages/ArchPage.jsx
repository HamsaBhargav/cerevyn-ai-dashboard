import React from "react";
import { API_STRUCTURE } from "../services/mockApi";
import "./ArchPage.css";

const METHOD_COLOR = { GET: "blue", POST: "green", PUT: "warn", DELETE: "red" };

const SYSTEM_LAYERS = [
  { label: "Frontend Layer",    color: "#3b82f6", items: ["React Dashboard", "Recharts Graphs", "Control Panel UI", "Real-time Updates"] },
  { label: "API Gateway",       color: "#8b5cf6", items: ["REST Endpoints", "Auth Middleware", "Rate Limiting", "Request Routing"] },
  { label: "Processing Layer",  color: "#f59e0b", items: ["Orchestrator", "Event Queue", "Data Enricher", "Schema Validator"] },
  { label: "AI Layer",          color: "#10b981", items: ["LLM Agent", "Script Generator", "ML Models", "Inference Engine"] },
  { label: "Storage Layer",     color: "#ec4899", items: ["PostgreSQL", "Redis Cache", "S3 Storage", "Kafka Topics"] },
];

export default function ArchPage() {
  return (
    <div className="arch-page">
      <div className="arch-hero">
        <div className="arch-tag">SYSTEM DESIGN</div>
        <h2>Architecture & API</h2>
        <p>System design, component architecture, and API structure for the AI monitoring dashboard</p>
      </div>

      {/* SYSTEM LAYERS */}
      <section className="arch-section">
        <h3 className="arch-heading">System Architecture</h3>
        <div className="layers-row">
          {SYSTEM_LAYERS.map((layer, i) => (
            <div key={i} className="layer-col" style={{ "--lc": layer.color }}>
              <div className="layer-title">{layer.label}</div>
              {layer.items.map((item, j) => (
                <div className="layer-item" key={j}>{item}</div>
              ))}
              {i < SYSTEM_LAYERS.length - 1 && <div className="layer-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* WHAT IS BUILT */}
      <section className="arch-section">
        <h3 className="arch-heading">What Is Implemented</h3>
        <div className="impl-grid">
          {[
            { icon: "⬡", title: "React.js Frontend",      desc: "Full dashboard UI with routing, state management, and component architecture" },
            { icon: "◈", title: "Recharts Visualizations", desc: "Live area charts, line charts, and bar charts updating every 2 seconds" },
            { icon: "⬢", title: "Mock API Service",        desc: "Simulated backend responses that mirror a real production REST API" },
            { icon: "◉", title: "Control Panel",           desc: "Start, pause, stop workflows and restart agents with live state updates" },
            { icon: "≡", title: "Real-time Activity Log",  desc: "Live scrolling log of system events, auto-populated every 2-4 seconds" },
            { icon: "◍", title: "System Health Monitor",   desc: "CPU, memory, uptime and service status updated in real time" },
          ].map((item, i) => (
            <div className="impl-card" key={i}>
              <div className="impl-icon">{item.icon}</div>
              <div className="impl-title">{item.title}</div>
              <div className="impl-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* API STRUCTURE */}
      <section className="arch-section">
        <h3 className="arch-heading">API Structure</h3>
        <p className="arch-note">
          The following REST API endpoints define the communication contract between the frontend dashboard and the backend services.
        </p>
        <div className="api-table">
          <div className="api-row api-header">
            <span>Method</span><span>Endpoint</span><span>Description</span>
          </div>
          {API_STRUCTURE.map((row, i) => (
            <div className="api-row" key={i}>
              <span className={`api-method ${METHOD_COLOR[row.method]}`}>{row.method}</span>
              <span className="api-endpoint">{row.endpoint}</span>
              <span className="api-desc">{row.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
