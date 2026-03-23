import React from "react";
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import "./Overview.css";

function StatCard({ label, value, unit, sub, color = "blue", trend }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {value}<span className="stat-unit">{unit}</span>
      </div>
      {sub && <div className="stat-sub">{sub}</div>}
      {trend !== undefined && (
        <div className={`stat-trend ${trend >= 0 ? "up" : "down"}`}>
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}%
        </div>
      )}
      <div className="stat-glow" />
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: <b>{p.value}</b>
        </div>
      ))}
    </div>
  );
}

export default function Overview({ data, totalEvents, successRate, avgLatency, activeAgents, health }) {
  const latest = data[data.length - 1] || {};

  return (
    <div className="overview-page">
      {/* TOP STATS */}
      <div className="stats-row">
        <StatCard label="Total Events"    value={totalEvents.toLocaleString()} unit=""    sub="All time"         color="blue"   trend={2.4}  />
        <StatCard label="Success Rate"    value={successRate.toFixed(1)}       unit="%"   sub="Last 24h"         color="green"  trend={0.8}  />
        <StatCard label="Avg Latency"     value={(avgLatency/1000).toFixed(2)} unit="s"   sub="P95 response"     color="purple" trend={-1.2} />
        <StatCard label="Active Agents"   value={activeAgents}                 unit=""    sub={`of ${8} total`}  color="warn"              />
      </div>

      {/* CHARTS ROW */}
      <div className="charts-row">
        {/* Events per tick */}
        <div className="card chart-card">
          <div className="card-title"><span className="pulse blue"/>Events / Tick</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gEvents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="t" hide />
              <YAxis tick={{ fill: "#475569", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="events" name="Events" stroke="#3b82f6" strokeWidth={2} fill="url(#gEvents)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Latency */}
        <div className="card chart-card">
          <div className="card-title"><span className="pulse purple"/>Latency (ms)</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="t" hide />
              <YAxis tick={{ fill: "#475569", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="latency" name="Latency" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Success rate */}
        <div className="card chart-card">
          <div className="card-title"><span className="pulse"/>Success Rate (%)</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="t" hide />
              <YAxis domain={[60, 100]} tick={{ fill: "#475569", fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="success" name="Success %" stroke="#10b981" strokeWidth={2} fill="url(#gSuccess)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SYSTEM HEALTH */}
      <div className="card health-card">
        <div className="card-title"><span className="pulse warn"/>System Health</div>
        <div className="health-grid">
          <div className="health-item">
            <div className="hi-label">CPU Usage</div>
            <div className="hi-bar-wrap">
              <div className="hi-bar" style={{ width: `${health.cpu}%`, background: health.cpu > 80 ? "var(--danger)" : "var(--accent)" }} />
            </div>
            <div className="hi-val">{health.cpu}%</div>
          </div>
          <div className="health-item">
            <div className="hi-label">Memory</div>
            <div className="hi-bar-wrap">
              <div className="hi-bar" style={{ width: `${health.memory}%`, background: health.memory > 85 ? "var(--danger)" : "var(--accent2)" }} />
            </div>
            <div className="hi-val">{health.memory}%</div>
          </div>
          <div className="health-item service">
            <div className="hi-label">REST API</div>
            <div className={`service-badge ${health.apiUp ? "up" : "down"}`}>{health.apiUp ? "● Online" : "● Offline"}</div>
          </div>
          <div className="health-item service">
            <div className="hi-label">Database</div>
            <div className={`service-badge ${health.dbUp ? "up" : "down"}`}>{health.dbUp ? "● Online" : "● Offline"}</div>
          </div>
          <div className="health-item service">
            <div className="hi-label">Message Queue</div>
            <div className={`service-badge ${health.mqUp ? "up" : "down"}`}>{health.mqUp ? "● Online" : "● Offline"}</div>
          </div>
          <div className="health-item service">
            <div className="hi-label">Uptime</div>
            <div className="service-badge up">● {health.uptime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
