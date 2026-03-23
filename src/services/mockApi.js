// ─── MOCK API SERVICE ───
// Simulates real backend API responses for the AI monitoring dashboard

export const AGENTS = [
  { id: "agt-001", name: "Script Generator",    type: "LLM",       model: "Claude Sonnet", status: "running" },
  { id: "agt-002", name: "Video Renderer",      type: "Renderer",  model: "Remotion v4",   status: "running" },
  { id: "agt-003", name: "Event Orchestrator",  type: "Pipeline",  model: "FastAPI",        status: "running" },
  { id: "agt-004", name: "Data Enricher",       type: "Processor", model: "Python 3.11",    status: "idle"    },
  { id: "agt-005", name: "CDN Uploader",        type: "Storage",   model: "AWS SDK",        status: "running" },
  { id: "agt-006", name: "Webhook Dispatcher",  type: "Notifier",  model: "Node.js",        status: "idle"    },
  { id: "agt-007", name: "Fraud Detector",      type: "ML Model",  model: "XGBoost",        status: "error"   },
  { id: "agt-008", name: "Analytics Collector", type: "Collector", model: "Kafka Consumer",  status: "running" },
];

export const WORKFLOWS = [
  { id: "wf-001", name: "Video Generation Pipeline", status: "active",  progress: 78, runs: 142, success: 138 },
  { id: "wf-002", name: "Lead Enrichment Flow",      status: "active",  progress: 45, runs: 89,  success: 86  },
  { id: "wf-003", name: "Email Notification Chain",  status: "paused",  progress: 0,  runs: 203, success: 199 },
  { id: "wf-004", name: "Document OCR Pipeline",     status: "active",  progress: 91, runs: 67,  success: 65  },
  { id: "wf-005", name: "Data Sync Workflow",        status: "stopped", progress: 0,  runs: 31,  success: 28  },
];

export const LOG_MESSAGES = [
  { type: "success", msg: "Video generation completed",       agent: "agt-002", latency: "4.2s"  },
  { type: "info",    msg: "New event received from chatbot",   agent: "agt-003", latency: "12ms"  },
  { type: "success", msg: "Script generated successfully",     agent: "agt-001", latency: "1.8s"  },
  { type: "info",    msg: "CDN upload initiated",              agent: "agt-005", latency: "340ms" },
  { type: "warn",    msg: "High latency detected on API call", agent: "agt-001", latency: "8.1s"  },
  { type: "success", msg: "Webhook delivered to client",       agent: "agt-006", latency: "98ms"  },
  { type: "error",   msg: "Fraud detection model timeout",     agent: "agt-007", latency: "30s"   },
  { type: "info",    msg: "Lead data enriched for 24 records", agent: "agt-004", latency: "2.1s"  },
  { type: "success", msg: "Analytics snapshot saved",          agent: "agt-008", latency: "220ms" },
  { type: "info",    msg: "Kafka topic consumed 18 messages",  agent: "agt-008", latency: "80ms"  },
  { type: "warn",    msg: "Agent agt-007 restarting...",       agent: "agt-007", latency: "—"     },
  { type: "success", msg: "Workflow wf-004 step 3 complete",   agent: "agt-003", latency: "670ms" },
];

// Generate initial chart data (last 20 ticks)
export function generateInitialChartData() {
  return Array.from({ length: 20 }, (_, i) => ({
    t: i,
    events:   Math.floor(Math.random() * 40 + 10),
    latency:  Math.floor(Math.random() * 3000 + 500),
    success:  Math.floor(Math.random() * 20 + 75),
    errors:   Math.floor(Math.random() * 5),
  }));
}

// Simulate a new live data tick
export function getNextTick(prev) {
  const last = prev[prev.length - 1];
  return {
    t:       last.t + 1,
    events:  Math.max(0,  Math.floor(last.events  + (Math.random() - 0.5) * 12)),
    latency: Math.max(200,Math.floor(last.latency + (Math.random() - 0.5) * 600)),
    success: Math.min(100,Math.max(60, last.success + (Math.random() - 0.5) * 4)),
    errors:  Math.max(0,  Math.floor(Math.random() * 4)),
  };
}

// Simulate system health metrics
export function getSystemHealth() {
  return {
    cpu:     Math.floor(Math.random() * 30 + 45),
    memory:  Math.floor(Math.random() * 20 + 55),
    apiUp:   Math.random() > 0.05,
    dbUp:    Math.random() > 0.02,
    mqUp:    Math.random() > 0.03,
    uptime:  "14d 06h 33m",
  };
}

// Mock API structure (for Architecture page)
export const API_STRUCTURE = [
  { method: "GET",    endpoint: "/api/v1/agents",              desc: "List all AI agents and their status"       },
  { method: "GET",    endpoint: "/api/v1/agents/:id/metrics",  desc: "Get metrics for a specific agent"          },
  { method: "POST",   endpoint: "/api/v1/agents/:id/restart",  desc: "Restart a specific agent"                  },
  { method: "GET",    endpoint: "/api/v1/workflows",           desc: "List all workflows and their status"       },
  { method: "POST",   endpoint: "/api/v1/workflows/:id/start", desc: "Start a workflow"                          },
  { method: "POST",   endpoint: "/api/v1/workflows/:id/pause", desc: "Pause a running workflow"                  },
  { method: "POST",   endpoint: "/api/v1/workflows/:id/stop",  desc: "Stop a workflow"                           },
  { method: "GET",    endpoint: "/api/v1/logs",                desc: "Fetch paginated activity logs"             },
  { method: "GET",    endpoint: "/api/v1/analytics/realtime",  desc: "Stream real-time analytics metrics"        },
  { method: "GET",    endpoint: "/api/v1/system/health",       desc: "Get system health (CPU, memory, uptime)"   },
];
