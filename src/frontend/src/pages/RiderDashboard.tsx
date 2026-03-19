import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Check,
  ChevronRight,
  CloudRain,
  LogOut,
  MapPin,
  Plus,
  Shield,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  useAllDisruptions,
  usePayoutHistory,
  useWalletBalance,
} from "../hooks/useQueries";

const ZONE_COLORS: Record<string, string> = {
  low: "#3FE08E",
  med: "#F6C842",
  high: "#FF9A4A",
  crit: "#FF4444",
};

const MOCK_PAYOUT_CHART = [
  { week: "Feb 3", amount: 240 },
  { week: "Feb 10", amount: 480 },
  { week: "Feb 17", amount: 0 },
  { week: "Feb 24", amount: 360 },
  { week: "Mar 3", amount: 720 },
  { week: "Mar 10", amount: 600 },
];

const ZONE_MAP = [
  ["med", "high", "high", "crit", "high"],
  ["low", "med", "high", "high", "med"],
  ["low", "low", "med", "med", "low"],
  ["med", "high", "crit", "high", "med"],
];

export default function RiderDashboard() {
  const [notifOpen, setNotifOpen] = useState(false);
  const { data: walletBalance } = useWalletBalance();
  const { data: payoutHistory } = usePayoutHistory();
  const { data: disruptions } = useAllDisruptions();

  const walletFormatted =
    walletBalance !== undefined
      ? `₹${Number(walletBalance).toLocaleString("en-IN")}`
      : "₹1,850";

  const recentPayouts =
    payoutHistory && payoutHistory.length > 0
      ? payoutHistory.slice(0, 5).map((p) => ({
          date: new Date(Number(p.timestamp) / 1_000_000).toLocaleDateString(
            "en-IN",
            { month: "short", day: "numeric" },
          ),
          event: p.eventType,
          amount: `₹${Number(p.amount).toLocaleString("en-IN")}`,
          status: "Paid",
        }))
      : [
          {
            date: "Mar 14",
            event: "Heavy Rain",
            amount: "₹360",
            status: "Paid",
          },
          {
            date: "Mar 12",
            event: "AQI Alert",
            amount: "₹240",
            status: "Paid",
          },
          { date: "Mar 10", event: "Rain", amount: "₹480", status: "Paid" },
          { date: "Mar 7", event: "Curfew", amount: "₹600", status: "Paid" },
          {
            date: "Mar 5",
            event: "Platform Outage",
            amount: "₹120",
            status: "Paid",
          },
        ];

  const activeDisruptions =
    disruptions && disruptions.length > 0
      ? disruptions.slice(0, 3).map((d) => ({
          zone: d.affectedZones[0] || "Zone B",
          type: d.eventType,
          sev: "High",
          color: "#FF9A4A",
        }))
      : [
          { zone: "Zone B", type: "Heavy Rain", sev: "High", color: "#FF9A4A" },
          {
            zone: "Zone A",
            type: "AQI Alert",
            sev: "Moderate",
            color: "#F6C842",
          },
          {
            zone: "Zone C",
            type: "Platform Outage",
            sev: "Low",
            color: "#21C6B7",
          },
        ];

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
              <span className="text-[#7E93A8] text-sm">/ Rider Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative p-2 rounded-full glass-light hover:bg-white/10 transition-all"
                onClick={() => setNotifOpen(!notifOpen)}
                data-ocid="dashboard.toggle"
              >
                <Bell className="w-5 h-5 text-[#B9C7D6]" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF9A4A]" />
              </button>
              <div className="flex items-center gap-2 glass-light rounded-full px-3 py-1.5">
                <div className="w-7 h-7 rounded-full gradient-teal flex items-center justify-center text-xs font-bold text-[#06101A]">
                  RK
                </div>
                <span className="text-sm text-white hidden sm:block">
                  Rahul K.
                </span>
              </div>
              <Link
                to="/"
                className="p-2 rounded-full glass-light hover:bg-white/10 transition-all"
                data-ocid="dashboard.link"
              >
                <LogOut className="w-4 h-4 text-[#7E93A8]" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          data-ocid="dashboard.panel"
        >
          {[
            {
              label: "Protected Earnings",
              value: "₹4,200",
              sub: "This week",
              color: "#21C6B7",
              icon: TrendingUp,
            },
            {
              label: "Wallet Balance",
              value: walletFormatted,
              sub: "Available",
              color: "#3FE08E",
              icon: Wallet,
            },
            {
              label: "Active Policy",
              value: "Weekly",
              sub: "Expires Sun, Mar 21",
              color: "#4A9EFF",
              icon: Shield,
            },
            {
              label: "Claims This Week",
              value: "2",
              sub: "₹600 processed",
              color: "#FF9A4A",
              icon: Check,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="glass rounded-xl p-5 hover:scale-105 transition-transform duration-300"
              data-ocid="dashboard.card"
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

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payout History Chart */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white">Payout History</h3>
                <span className="text-xs text-[#7E93A8]">Last 6 weeks</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={MOCK_PAYOUT_CHART} barSize={32}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(120,190,200,0.1)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "#7E93A8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#7E93A8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(5,19,31,0.95)",
                      border: "1px solid rgba(120,190,200,0.2)",
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: "#B9C7D6" }}
                    formatter={(v: number) => [`₹${v}`, "Payout"]}
                  />
                  <Bar dataKey="amount" fill="#21C6B7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Payouts Table */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-[#3FE08E]" /> Recent Payouts
                </h3>
                <button
                  type="button"
                  className="text-xs text-[#21C6B7] flex items-center gap-1 hover:underline"
                  data-ocid="payouts.link"
                >
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-0">
                {recentPayouts.map((p, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                    key={`k-${i}`}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                    data-ocid={`payout.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(63,224,142,0.15)" }}
                      >
                        <Wallet className="w-4 h-4 text-[#3FE08E]" />
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">
                          {p.event}
                        </div>
                        <div className="text-xs text-[#7E93A8]">{p.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-[#3FE08E]">
                        {p.amount}
                      </span>
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: "rgba(63,224,142,0.15)",
                          color: "#3FE08E",
                        }}
                      >
                        ✓ {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">
            {/* Coverage Status */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-5">Coverage Status</h3>
              <div className="flex flex-col items-center py-4">
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(63,224,142,0.15) 0%, transparent 70%)",
                    border: "3px solid #3FE08E",
                    boxShadow: "0 0 30px rgba(63,224,142,0.4)",
                  }}
                >
                  <Shield className="w-12 h-12 text-[#3FE08E]" />
                </div>
                <div className="px-4 py-1.5 rounded-full text-sm font-bold text-[#06101A] gradient-green mb-3">
                  PROTECTED
                </div>
                <p className="text-sm text-[#B9C7D6]">
                  Expires{" "}
                  <span className="text-white font-medium">Sun, Mar 21</span>
                </p>
                <p className="text-xs text-[#7E93A8] mt-1">
                  Zone B · Medium Risk · ₹30/week
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#7E93A8]">Coverage Used</span>
                  <span className="text-white">5/10 hrs</span>
                </div>
                <div
                  className="w-full h-2 rounded-full"
                  style={{ background: "rgba(33,198,183,0.2)" }}
                >
                  <div
                    className="h-2 rounded-full gradient-teal"
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            </div>

            {/* Active Disruptions */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FF9A4A]" /> Active
                Disruptions
              </h3>
              {activeDisruptions.map((d, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                  key={`k-${i}`}
                  className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
                  data-ocid={`disruption.item.${i + 1}`}
                >
                  <div>
                    <div className="text-sm text-white">{d.type}</div>
                    <div className="text-xs text-[#7E93A8]">{d.zone}</div>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ background: `${d.color}20`, color: d.color }}
                  >
                    {d.sev}
                  </span>
                </div>
              ))}
            </div>

            {/* Weather Map */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#21C6B7]" /> Zone Map
              </h3>
              <div
                className="grid gap-1.5"
                style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
              >
                {ZONE_MAP.flat().map((z, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                    key={`k-${i}`}
                    className="aspect-square rounded"
                    style={{ background: ZONE_COLORS[z], opacity: 0.7 }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1 mt-3">
                {Object.entries(ZONE_COLORS).map(([l, c]) => (
                  <div key={l} className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-sm"
                      style={{ background: c }}
                    />
                    <span className="text-xs text-[#7E93A8] capitalize">
                      {l === "crit" ? "Critical" : l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-5">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Buy Coverage",
                icon: Shield,
                color: "#21C6B7",
                ocid: "dashboard.primary_button",
              },
              {
                label: "View Policy",
                icon: CloudRain,
                color: "#3FE08E",
                ocid: "dashboard.secondary_button",
              },
              {
                label: "Withdraw Funds",
                icon: ArrowUpRight,
                color: "#FF9A4A",
                ocid: "dashboard.button",
              },
            ].map((action) => (
              <button
                type="button"
                key={action.label}
                className="flex items-center justify-center gap-3 py-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: `${action.color}15`,
                  border: `1px solid ${action.color}30`,
                  color: action.color,
                }}
                data-ocid={action.ocid}
              >
                <action.icon className="w-5 h-5" />
                <span className="font-semibold">{action.label}</span>
                <Plus className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
