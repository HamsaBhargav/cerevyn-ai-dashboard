import { useState, useEffect, useRef, useCallback } from "react";
import {
  AGENTS, WORKFLOWS, LOG_MESSAGES,
  generateInitialChartData, getNextTick, getSystemHealth
} from "../services/mockApi";

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

export function useDashboard() {
  const [agents, setAgents]           = useState(AGENTS);
  const [workflows, setWorkflows]     = useState(WORKFLOWS);
  const [chartData, setChartData]     = useState(generateInitialChartData);
  const [logs, setLogs]               = useState([]);
  const [health, setHealth]           = useState(getSystemHealth);
  const [totalEvents, setTotalEvents] = useState(1482);
  const [successRate, setSuccessRate] = useState(96.4);
  const [avgLatency, setAvgLatency]   = useState(1840);
  const [activeAgents, setActiveAgents] = useState(5);
  const [liveMode, setLiveMode]       = useState(true);
  const tickRef = useRef(null);
  const logRef  = useRef(null);

  function addLog(entry) {
    const time = new Date().toTimeString().split(" ")[0];
    setLogs(prev => [{ ...entry, time, id: Date.now() + Math.random() }, ...prev].slice(0, 80));
  }

  // ── Live tick every 2s ──
  useEffect(() => {
    if (!liveMode) return;
    tickRef.current = setInterval(() => {
      setChartData(prev => {
        const next = getNextTick(prev);
        return [...prev.slice(-29), next];
      });
      setTotalEvents(prev => prev + Math.floor(Math.random() * 5 + 1));
      setSuccessRate(prev => Math.min(100, Math.max(88, prev + (Math.random() - 0.5) * 0.6)));
      setAvgLatency(prev => Math.max(400, Math.floor(prev + (Math.random() - 0.5) * 200)));
      setHealth(getSystemHealth());
    }, 2000);
    return () => clearInterval(tickRef.current);
  }, [liveMode]);

  // ── Random log every 3-5s ──
  useEffect(() => {
    if (!liveMode) return;
    function scheduleLog() {
      const delay = Math.random() * 2000 + 2000;
      logRef.current = setTimeout(() => {
        const entry = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        addLog(entry);
        scheduleLog();
      }, delay);
    }
    scheduleLog();
    return () => clearTimeout(logRef.current);
  }, [liveMode]);

  // ── Agent actions ──
  const restartAgent = useCallback(async (id) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, status: "restarting" } : a));
    addLog({ type: "warn", msg: `Agent ${id} restarting...`, agent: id, latency: "—" });
    await sleep(2000);
    setAgents(prev => prev.map(a => a.id === id ? { ...a, status: "running" } : a));
    addLog({ type: "success", msg: `Agent ${id} back online`, agent: id, latency: "—" });
  }, []);

  const toggleAgent = useCallback((id) => {
    setAgents(prev => prev.map(a => {
      if (a.id !== id) return a;
      const next = a.status === "running" ? "idle" : "running";
      addLog({ type: "info", msg: `Agent ${id} set to ${next}`, agent: id, latency: "—" });
      return { ...a, status: next };
    }));
  }, []);

  // ── Workflow actions ──
  const workflowAction = useCallback((id, action) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id !== id) return w;
      const statusMap = { start: "active", pause: "paused", stop: "stopped" };
      const newStatus = statusMap[action];
      addLog({ type: "info", msg: `Workflow ${w.name} → ${action}ed`, agent: "agt-003", latency: "—" });
      return { ...w, status: newStatus, progress: action === "stop" ? 0 : w.progress };
    }));
  }, []);

  // ── Compute active agents ──
  useEffect(() => {
    setActiveAgents(agents.filter(a => a.status === "running").length);
  }, [agents]);

  return {
    agents, workflows, chartData, logs, health,
    totalEvents, successRate, avgLatency, activeAgents,
    liveMode, setLiveMode,
    restartAgent, toggleAgent, workflowAction,
  };
}
