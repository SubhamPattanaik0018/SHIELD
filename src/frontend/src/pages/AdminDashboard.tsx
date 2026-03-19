import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  CloudRain,
  LogOut,
  MapPin,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAllDisruptions } from "../hooks/useQueries";

const CLAIMS_TREND = [
  { day: "Mar 11", claims: 14, payouts: 4200 },
  { day: "Mar 12", claims: 22, payouts: 6600 },
  { day: "Mar 13", claims: 18, payouts: 5400 },
  { day: "Mar 14", claims: 31, payouts: 9300 },
  { day: "Mar 15", claims: 27, payouts: 8100 },
  { day: "Mar 16", claims: 19, payouts: 5700 },
  { day: "Mar 17", claims: 24, payouts: 7200 },
];

const WEEKLY_PAYOUT_STATS = [
  { zone: "Zone A", amount: 42000 },
  { zone: "Zone B", amount: 67500 },
  { zone: "Zone C", amount: 31200 },
  { zone: "Zone D", amount: 54800 },
  { zone: "Zone E", amount: 25900 },
];

const RAINFALL_FORECAST = [
  { day: "Mon", risk: 30 },
  { day: "Tue", risk: 55 },
  { day: "Wed", risk: 85 },
  { day: "Thu", risk: 90 },
  { day: "Fri", risk: 70 },
  { day: "Sat", risk: 45 },
  { day: "Sun", risk: 20 },
];

const HEATMAP = [
  ["low", "med", "high", "crit", "high", "med", "low"],
  ["low", "med", "high", "high", "crit", "high", "med"],
  ["med", "high", "crit", "crit", "high", "high", "med"],
  ["low", "med", "high", "high", "high", "med", "low"],
  ["low", "low", "med", "med", "med", "low", "low"],
];

const ZONE_COLORS: Record<string, string> = {
  low: "#3FE08E",
  med: "#F6C842",
  high: "#FF9A4A",
  crit: "#FF4444",
};

const ACTIVE_DISRUPTIONS = [
  { zone: "Zone B", type: "Heavy Rain", riders: 124, color: "#FF9A4A" },
  { zone: "Zone A", type: "AQI Level 310", riders: 87, color: "#F6C842" },
  { zone: "Zone D", type: "Platform Outage", riders: 56, color: "#21C6B7" },
  { zone: "Zone C", type: "Heat Alert 46°C", riders: 43, color: "#FF7E3D" },
];

const FRAUD_ALERTS = [
  { rider: "Rider #4821", reason: "GPS spoofing detected", severity: "High" },
  {
    rider: "Rider #7203",
    reason: "Duplicate claim attempt",
    severity: "Medium",
  },
  {
    rider: "Rider #1956",
    reason: "Suspicious location pattern",
    severity: "Low",
  },
];

export default function AdminDashboard() {
  const { data: disruptions } = useAllDisruptions();

  const disruptionCount = disruptions?.length ?? 4;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #05131F 0%, #071A2A 60%, #06101A 100%)",
      }}
    >
      {/* Navbar */}
      <header className="navbar-glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2"
                data-ocid="nav.link"
              >
                <Shield className="w-7 h-7 text-teal" />
                <span className="font-bold text-white hidden sm:block">
                  Monsoon <span className="text-teal">Warrior</span>
                </span>
              </Link>
              <span className="text-[#7E93A8] text-sm">/ Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 glass-light rounded-full px-3 py-1.5">
                <div
                  className="w-7 h-7 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #FF9A4A, #FF7E3D)",
                  }}
                />
                <span className="text-sm text-white hidden sm:block">
                  Admin
                </span>
              </div>
              <Link
                to="/"
                className="p-2 rounded-full glass-light hover:bg-white/10 transition-all"
                data-ocid="admin.link"
              >
                <LogOut className="w-4 h-4 text-[#7E93A8]" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Claims Processed",
              value: "127",
              sub: "This week",
              color: "#21C6B7",
              icon: Activity,
            },
            {
              label: "Active Riders",
              value: "1,842",
              sub: "Online now",
              color: "#3FE08E",
              icon: Users,
            },
            {
              label: "Total Payouts (Week)",
              value: "₹2,21,400",
              sub: "+18% vs last week",
              color: "#FF9A4A",
              icon: TrendingUp,
            },
            {
              label: "Fraud Alerts",
              value: "3",
              sub: "Needs review",
              color: "#FF4444",
              icon: AlertTriangle,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="glass rounded-xl p-5 hover:scale-105 transition-transform duration-300"
              data-ocid="admin.card"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#7E93A8]">{s.label}</span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${s.color}20` }}
                >
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-xs text-[#7E93A8] mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Claims Trend Line Chart */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#21C6B7]" /> Claims Trend (7
              Days)
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={CLAIMS_TREND}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(120,190,200,0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#7E93A8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#7E93A8", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(5,19,31,0.95)",
                    border: "1px solid rgba(120,190,200,0.2)",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#B9C7D6" }}
                />
                <Legend wrapperStyle={{ color: "#B9C7D6", fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="claims"
                  stroke="#21C6B7"
                  strokeWidth={2}
                  dot={{ fill: "#21C6B7", r: 4 }}
                  name="Claims"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Disruption Heatmap */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF9A4A]" /> Disruption Heatmap
            </h3>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
            >
              {HEATMAP.flat().map((z, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                  key={`k-${i}`}
                  className="aspect-square rounded-md transition-transform hover:scale-110 cursor-pointer"
                  style={{ background: ZONE_COLORS[z], opacity: 0.75 }}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              {Object.entries(ZONE_COLORS).map(([l, c]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded" style={{ background: c }} />
                  <span className="text-xs text-[#B9C7D6] capitalize">
                    {l === "crit" ? "Critical" : l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Payout Stats */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#3FE08E]" /> Payouts by Zone
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_PAYOUT_STATS} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(120,190,200,0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="zone"
                  tick={{ fill: "#7E93A8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#7E93A8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(5,19,31,0.95)",
                    border: "1px solid rgba(120,190,200,0.2)",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#B9C7D6" }}
                  formatter={(v: number) => [
                    `₹${v.toLocaleString("en-IN")}`,
                    "Payout",
                  ]}
                />
                <Bar dataKey="amount" fill="#3FE08E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Active Disruptions */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-[#FF9A4A]" /> Active
                Disruptions
              </h3>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{ background: "rgba(255,154,74,0.2)", color: "#FF9A4A" }}
              >
                {disruptionCount} Live
              </span>
            </div>
            {ACTIVE_DISRUPTIONS.map((d, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                key={`k-${i}`}
                className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                data-ocid={`disruption.item.${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: d.color }}
                  />
                  <div>
                    <div className="text-sm text-white">{d.type}</div>
                    <div className="text-xs text-[#7E93A8]">{d.zone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-sm font-semibold"
                    style={{ color: d.color }}
                  >
                    {d.riders}
                  </div>
                  <div className="text-xs text-[#7E93A8]">riders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Rainfall Forecast */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-[#21C6B7]" /> Predicted
              Rainfall Risk (7 Days)
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={RAINFALL_FORECAST} barSize={24}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(120,190,200,0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#7E93A8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#7E93A8", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(5,19,31,0.95)",
                    border: "1px solid rgba(120,190,200,0.2)",
                    borderRadius: 8,
                  }}
                  formatter={(v: number) => [`${v}%`, "Rain Risk"]}
                />
                <Bar dataKey="risk" radius={[4, 4, 0, 0]} fill="#21C6B7" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Fraud Alerts */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FF4444]" /> Fraud
                Alerts
              </h3>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{ background: "rgba(255,68,68,0.2)", color: "#FF4444" }}
              >
                3 Active
              </span>
            </div>
            {FRAUD_ALERTS.map((f, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                key={`k-${i}`}
                className="flex items-start justify-between py-3 border-b border-white/5 last:border-0"
                data-ocid={`fraud.item.${i + 1}`}
              >
                <div>
                  <div className="text-sm text-white font-medium">
                    {f.rider}
                  </div>
                  <div className="text-xs text-[#7E93A8]">{f.reason}</div>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full flex-shrink-0 ml-3"
                  style={{
                    background:
                      f.severity === "High"
                        ? "rgba(255,68,68,0.2)"
                        : f.severity === "Medium"
                          ? "rgba(255,154,74,0.2)"
                          : "rgba(246,200,66,0.2)",
                    color:
                      f.severity === "High"
                        ? "#FF4444"
                        : f.severity === "Medium"
                          ? "#FF9A4A"
                          : "#F6C842",
                  }}
                >
                  {f.severity}
                </span>
              </div>
            ))}
            <button
              type="button"
              className="w-full mt-4 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,68,68,0.1)",
                color: "#FF4444",
                border: "1px solid rgba(255,68,68,0.3)",
              }}
              data-ocid="fraud.primary_button"
            >
              Review All Alerts
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
