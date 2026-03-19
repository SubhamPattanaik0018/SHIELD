import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CloudRain,
  MapPin,
  Search,
  Shield,
  Star,
  Thermometer,
  TrendingUp,
  UserPlus,
  Wallet,
  Wind,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
}: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useIntersection();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const TRIGGERS = [
  {
    icon: CloudRain,
    label: "Heavy Rain",
    desc: "Rainfall exceeds 15mm/hr threshold",
    color: "#21C6B7",
    emoji: "🌧️",
  },
  {
    icon: Wind,
    label: "Severe Pollution",
    desc: "AQI crosses 300 dangerous level",
    color: "#3FE08E",
    emoji: "☁️",
  },
  {
    icon: Thermometer,
    label: "Extreme Heat",
    desc: "Temperature exceeds 45°C unsafe zone",
    color: "#FF9A4A",
    emoji: "🌡️",
  },
  {
    icon: AlertTriangle,
    label: "Curfew / Zone Lockdown",
    desc: "Government restriction zone detected",
    color: "#FF7E3D",
    emoji: "🚧",
  },
  {
    icon: Zap,
    label: "Platform Outage",
    desc: "Delivery platform downtime detected",
    color: "#21C6B7",
    emoji: "⚡",
  },
];

const AI_FEATURES = [
  {
    icon: Bot,
    label: "AI Risk Pricing",
    desc: "Predicts weekly premium using 10-year weather patterns",
    gradient: "from-[#21C6B7]/20 to-[#15B7A8]/5",
  },
  {
    icon: Search,
    label: "Fraud Detection",
    desc: "Uses GPS + sensor fusion to detect fake claims",
    gradient: "from-[#3FE08E]/20 to-[#35D87F]/5",
  },
  {
    icon: Zap,
    label: "Predictive Alerts",
    desc: "Forecast upcoming disruptions 6 hours in advance",
    gradient: "from-[#FF9A4A]/20 to-[#FF7E3D]/5",
  },
  {
    icon: MapPin,
    label: "Hyper-local Risk Grid",
    desc: "City divided into 500m risk zones",
    gradient: "from-[#21C6B7]/20 to-[#3FE08E]/5",
  },
];

const DEMO_STEPS = [
  {
    icon: UserPlus,
    label: "Register Rider",
    color: "#4A9EFF",
    desc: "Create account, add location & zone preference",
  },
  {
    icon: Shield,
    label: "Activate Policy",
    color: "#21C6B7",
    desc: "AI calculates premium, policy goes live instantly",
  },
  {
    icon: CloudRain,
    label: "Simulate Rain Event",
    color: "#7DD3FC",
    desc: "Weather API detects 18mm/hr rainfall in Zone B",
  },
  {
    icon: Check,
    label: "Automatic Claim",
    color: "#3FE08E",
    desc: "Smart contract triggers claim validation",
  },
  {
    icon: Wallet,
    label: "Wallet Payout",
    color: "#FF9A4A",
    desc: "₹360 credited instantly to rider wallet",
  },
];

const PRICING = [
  {
    label: "Low Risk Zone",
    price: "₹20",
    period: "/ week",
    color: "#3FE08E",
    border: "border-[#3FE08E]/40",
    features: ["Basic weather triggers", "Up to ₹800/week", "5 hr coverage"],
  },
  {
    label: "Medium Risk Zone",
    price: "₹30",
    period: "/ week",
    color: "#21C6B7",
    border: "border-[#21C6B7]/60",
    popular: true,
    features: ["All weather triggers", "Up to ₹1200/week", "10 hr coverage"],
  },
  {
    label: "High Risk Zone",
    price: "₹40",
    period: "/ week",
    color: "#FF9A4A",
    border: "border-[#FF9A4A]/40",
    features: ["Premium + outage", "Up to ₹1200/week", "Priority payouts"],
  },
];

const ZONE_GRID = [
  ["low", "low", "med", "med", "high", "high", "med"],
  ["low", "med", "med", "high", "high", "crit", "high"],
  ["med", "med", "high", "high", "crit", "high", "med"],
  ["low", "med", "med", "high", "high", "med", "low"],
  ["low", "low", "med", "med", "med", "low", "low"],
];

const ZONE_COLORS: Record<string, string> = {
  low: "#3FE08E",
  med: "#F6C842",
  high: "#FF9A4A",
  crit: "#FF4444",
};

export default function Landing() {
  const [activeDemo, setActiveDemo] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #05131F 0%, #071A2A 60%, #06101A 100%)",
      }}
    >
      <Navbar />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(33,198,183,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 30% 40%, rgba(63,224,142,0.05) 0%, transparent 70%), linear-gradient(135deg, #05131F 0%, #071A2A 100%)",
        }}
      >
        {/* Hex grid overlay */}
        <div className="absolute inset-0 hex-grid opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-xs text-[#21C6B7] font-medium mb-6">
                <Zap className="w-3 h-3" />
                AI-Powered Parametric Insurance
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6">
                Protect Your Delivery Income During{" "}
                <span className="gradient-hero-text">
                  Monsoon &amp; Disruptions
                </span>
              </h1>
              <p className="text-lg text-[#B9C7D6] leading-relaxed mb-8 max-w-xl">
                AI-powered parametric insurance that automatically pays delivery
                riders when rain, pollution, or outages stop them from earning.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="px-8 py-3 rounded-full gradient-teal text-[#06101A] font-semibold text-base hover:opacity-90 transition-all teal-glow inline-flex items-center gap-2"
                  data-ocid="hero.primary_button"
                >
                  Get Coverage <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="px-8 py-3 rounded-full border border-[#21C6B7]/50 text-[#21C6B7] font-semibold text-base hover:bg-[#21C6B7]/10 transition-all inline-flex items-center gap-2"
                  data-ocid="hero.secondary_button"
                >
                  See How It Works
                </a>
              </div>
              <div className="flex gap-6 mt-10">
                {[
                  ["2,400+", "Riders Protected"],
                  ["₹18L+", "Payouts Processed"],
                  ["99.2%", "Uptime"],
                ].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-bold text-white">{val}</div>
                    <div className="text-xs text-[#7E93A8]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hero Visual */}
            <div className="relative animate-slide-right flex justify-center">
              <div className="relative">
                {/* Glow behind */}
                <div
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle, #21C6B7 0%, transparent 70%)",
                  }}
                />
                <div
                  className="relative rounded-3xl overflow-hidden glass p-2"
                  style={{ maxWidth: 560 }}
                >
                  <img
                    src="/assets/generated/hero-rider-monsoon.dim_700x600.png"
                    alt="Delivery rider protected by AI shield in monsoon"
                    className="w-full rounded-2xl"
                  />
                  {/* Floating badges */}
                  <div className="absolute top-6 right-6 glass rounded-xl px-3 py-2 flex items-center gap-2 animate-float">
                    <div className="w-2 h-2 rounded-full bg-[#3FE08E] animate-pulse" />
                    <span className="text-xs text-white font-medium">
                      Live Protection Active
                    </span>
                  </div>
                  <div
                    className="absolute bottom-8 left-6 glass rounded-xl px-3 py-2 animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="text-xs text-[#7E93A8]">Auto Payout</div>
                    <div className="text-lg font-bold text-[#3FE08E]">
                      +₹360
                    </div>
                    <div className="text-xs text-[#7E93A8]">Just now</div>
                  </div>
                  <div
                    className="absolute top-1/2 left-6 glass rounded-xl px-3 py-2 animate-float"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div className="flex items-center gap-1">
                      <CloudRain className="w-4 h-4 text-[#21C6B7]" />
                      <span className="text-xs text-white">
                        Heavy Rain Alert
                      </span>
                    </div>
                    <div className="text-xs text-[#7E93A8]">
                      Zone B • 18mm/hr
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-4">
              How It Works
            </h2>
            <p className="text-[#B9C7D6] max-w-xl mx-auto">
              From registration to payout in under 60 seconds
            </p>
          </div>
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#21C6B7]/30 to-transparent" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: UserPlus,
                  n: 1,
                  title: "Register",
                  desc: "Riders create an account and enable location tracking",
                  color: "#4A9EFF",
                },
                {
                  icon: Shield,
                  n: 2,
                  title: "Buy Weekly Protection",
                  desc: "AI calculates weekly premium based on environmental risk",
                  color: "#21C6B7",
                },
                {
                  icon: CloudRain,
                  n: 3,
                  title: "Disruption Detected",
                  desc: "Weather APIs detect heavy rain, floods, or pollution",
                  color: "#7DD3FC",
                },
                {
                  icon: Wallet,
                  n: 4,
                  title: "Automatic Payout",
                  desc: "Compensation instantly sent to rider wallet",
                  color: "#3FE08E",
                },
              ].map((step, i) => (
                <div
                  key={step.n}
                  className="relative glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div
                    className="absolute -top-4 left-6 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#06101A]"
                    style={{ background: step.color }}
                  >
                    {step.n}
                  </div>
                  {i < 3 && (
                    <ChevronRight className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-[#21C6B7]/50 z-10" />
                  )}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mt-2"
                    style={{ background: `${step.color}20` }}
                  >
                    <step.icon
                      className="w-6 h-6"
                      style={{ color: step.color }}
                    />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#B9C7D6]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARAMETRIC TRIGGERS */}
      <section id="coverage" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-4">
              What Triggers Your Protection
            </h2>
            <p className="text-[#B9C7D6] max-w-xl mx-auto">
              Real-time environmental monitoring across 5 disruption types
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {TRIGGERS.map((t) => (
              <div
                key={t.label}
                className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-2xl"
                  style={{ background: `${t.color}20` }}
                >
                  {t.emoji}
                </div>
                <h3 className="font-semibold text-white mb-2">{t.label}</h3>
                <p className="text-sm text-[#B9C7D6] flex-1">{t.desc}</p>
                <div
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: `${t.color}15`, color: t.color }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  Active Monitoring
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISK PRICING */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-4">
              Smart Risk-Based Pricing
            </h2>
            <p className="text-[#B9C7D6] max-w-xl mx-auto">
              Weekly premiums calculated by AI using your zone's risk profile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PRICING.map((plan) => (
              <div
                key={plan.label}
                className={`relative glass rounded-2xl p-8 border-2 ${plan.border} hover:scale-105 transition-transform duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-[#06101A] gradient-teal">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: plan.color }}
                  />
                  <h3 className="font-semibold text-white">{plan.label}</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span
                    className="text-4xl font-extrabold"
                    style={{ color: plan.color }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[#7E93A8]">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-[#B9C7D6]"
                    >
                      <Check
                        className="w-4 h-4"
                        style={{ color: plan.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="w-full py-3 rounded-full font-semibold text-sm transition-all"
                  style={{
                    background: `${plan.color}20`,
                    color: plan.color,
                    border: `1px solid ${plan.color}40`,
                  }}
                  data-ocid="pricing.primary_button"
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          {/* Heatmap Grid */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-white mb-6 text-center">
              City Risk Zone Heatmap
            </h3>
            <div className="overflow-x-auto">
              <div
                className="grid gap-2 mx-auto"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, minmax(40px, 60px))",
                  maxWidth: 480,
                  margin: "0 auto",
                }}
              >
                {ZONE_GRID.flat().map((zone, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                    key={`k-${i}`}
                    className="aspect-square rounded-lg transition-transform hover:scale-110 cursor-pointer"
                    style={{ background: ZONE_COLORS[zone], opacity: 0.75 }}
                    title={`${zone.charAt(0).toUpperCase()}${zone.slice(1)} Risk`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-6">
                {Object.entries(ZONE_COLORS).map(([label, color]) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ background: color }}
                    />
                    <span className="text-xs text-[#B9C7D6] capitalize">
                      {label === "crit" ? "Critical" : label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE EXPLAINER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-4">
              What You're Covered For
            </h2>
            <p className="text-[#B9C7D6] max-w-xl mx-auto">
              Transparent, automatic payouts — no paperwork needed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                value: 120,
                prefix: "₹",
                suffix: "",
                label: "Per lost hour compensation",
                color: "#21C6B7",
                icon: TrendingUp,
              },
              {
                value: 10,
                prefix: "",
                suffix: " hrs",
                label: "Maximum hours covered per week",
                color: "#3FE08E",
                icon: Shield,
              },
              {
                value: 1200,
                prefix: "₹",
                suffix: "",
                label: "Maximum weekly payout",
                color: "#FF9A4A",
                icon: Wallet,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: `${stat.color}20` }}
                >
                  <stat.icon
                    className="w-8 h-8"
                    style={{ color: stat.color }}
                  />
                </div>
                <div
                  className="text-5xl font-extrabold mb-3"
                  style={{ color: stat.color }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-[#B9C7D6] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RIDER DASHBOARD PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-4">
              Rider Dashboard Preview
            </h2>
            <p className="text-[#B9C7D6] max-w-xl mx-auto">
              Real-time earnings protection at your fingertips
            </p>
          </div>
          <div className="glass rounded-3xl p-6 sm:p-8">
            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                {
                  label: "Protected Earnings",
                  value: "₹4,200",
                  sub: "This week",
                  color: "#21C6B7",
                },
                {
                  label: "Wallet Balance",
                  value: "₹1,850",
                  sub: "Available",
                  color: "#3FE08E",
                },
                {
                  label: "Active Policy",
                  value: "Weekly",
                  sub: "Expires Sun",
                  color: "#4A9EFF",
                },
                {
                  label: "Claims This Week",
                  value: "2",
                  sub: "Processed",
                  color: "#FF9A4A",
                },
              ].map((s) => (
                <div key={s.label} className="glass-light rounded-xl p-4">
                  <div className="text-xs text-[#7E93A8] mb-1">{s.label}</div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-[#7E93A8]">{s.sub}</div>
                </div>
              ))}
            </div>
            {/* Main grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="glass-light rounded-xl p-5">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#FF9A4A]" /> Active
                    Disruptions
                  </h4>
                  {[
                    {
                      zone: "Zone B",
                      type: "Heavy Rain",
                      sev: "High",
                      color: "#FF9A4A",
                    },
                    {
                      zone: "Zone A",
                      type: "AQI Alert",
                      sev: "Moderate",
                      color: "#F6C842",
                    },
                  ].map((d) => (
                    <div
                      key={d.zone}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <div>
                        <span className="text-sm text-white">{d.type}</span>
                        <span className="text-xs text-[#7E93A8] ml-2">
                          {d.zone}
                        </span>
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
                <div className="glass-light rounded-xl p-5">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#3FE08E]" /> Recent Payouts
                  </h4>
                  {[
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
                    {
                      date: "Mar 10",
                      event: "Rain",
                      amount: "₹480",
                      status: "Paid",
                    },
                  ].map((p) => (
                    <div
                      key={p.date}
                      className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                    >
                      <div>
                        <span className="text-sm text-white">{p.event}</span>
                        <span className="text-xs text-[#7E93A8] ml-2">
                          {p.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#3FE08E]">
                          {p.amount}
                        </span>
                        <span className="text-xs text-[#3FE08E]">
                          ✓ {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="glass-light rounded-xl p-5 flex flex-col items-center">
                  <h4 className="font-semibold text-white mb-4 self-start">
                    Coverage Status
                  </h4>
                  <div className="relative">
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(63,224,142,0.15) 0%, transparent 70%)",
                        border: "3px solid #3FE08E",
                        boxShadow: "0 0 30px rgba(63,224,142,0.4)",
                      }}
                    >
                      <Shield className="w-14 h-14 text-[#3FE08E]" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-[#06101A] gradient-green whitespace-nowrap">
                      PROTECTED
                    </div>
                  </div>
                  <p className="text-sm text-[#B9C7D6] mt-6">
                    Policy expires:{" "}
                    <span className="text-white">Sun, Mar 21</span>
                  </p>
                  <p className="text-xs text-[#7E93A8]">Zone B · Medium Risk</p>
                </div>
                <div className="glass-light rounded-xl p-5">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#21C6B7]" /> Weather Alert
                    Map
                  </h4>
                  <div
                    className="grid gap-1.5"
                    style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
                  >
                    {[
                      "med",
                      "high",
                      "high",
                      "crit",
                      "high",
                      "low",
                      "med",
                      "high",
                      "high",
                      "med",
                      "low",
                      "low",
                      "med",
                      "med",
                      "low",
                      "med",
                      "high",
                      "crit",
                      "high",
                      "med",
                    ].map((z, i) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                        key={`k-${i}`}
                        className="aspect-square rounded"
                        style={{ background: ZONE_COLORS[z], opacity: 0.7 }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-center gap-4 mt-3">
                    {Object.entries(ZONE_COLORS).map(([l, c]) => (
                      <div key={l} className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-sm"
                          style={{ background: c }}
                        />
                        <span className="text-xs text-[#7E93A8] capitalize">
                          {l === "crit" ? "Crit" : l}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-teal text-[#06101A] font-semibold hover:opacity-90 transition-all"
                data-ocid="dashboard_preview.primary_button"
              >
                Open Full Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-4">
              Powered by AI &amp; Real-Time Data
            </h2>
            <p className="text-[#B9C7D6] max-w-xl mx-auto">
              Cutting-edge technology protecting India's gig economy
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {AI_FEATURES.map((f) => (
              <div
                key={f.label}
                className={`glass rounded-2xl p-8 bg-gradient-to-br ${f.gradient} hover:scale-105 transition-transform duration-300`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(33,198,183,0.15)" }}
                >
                  <f.icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.label}</h3>
                <p className="text-[#B9C7D6]">{f.desc}</p>
                <div className="flex items-center gap-2 mt-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: static display list
                      key={`k-${i}`}
                      className="h-1 rounded-full"
                      style={{
                        width: i === 3 ? "30%" : "20%",
                        background: i < 3 ? "#21C6B7" : "rgba(33,198,183,0.3)",
                      }}
                    />
                  ))}
                  <span className="text-xs text-[#21C6B7] font-medium">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO FLOW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wider mb-4">
              See It In Action
            </h2>
            <p className="text-[#B9C7D6] max-w-xl mx-auto">
              Hackathon Demo Flow — end-to-end in 5 steps
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-6 bottom-6 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#21C6B7]/20 via-[#21C6B7]/40 to-[#FF9A4A]/20 hidden lg:block" />
            <div className="hidden lg:flex items-center justify-between mb-8 relative">
              {DEMO_STEPS.map((step, i) => (
                <button
                  type="button"
                  key={step.label}
                  className={`flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 ${activeDemo === i ? "scale-110" : "opacity-60 hover:opacity-80"}`}
                  onClick={() => setActiveDemo(i)}
                  data-ocid="demo.tab"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                    style={{
                      background:
                        activeDemo === i ? `${step.color}20` : "transparent",
                      borderColor: step.color,
                      boxShadow:
                        activeDemo === i ? `0 0 20px ${step.color}50` : "none",
                    }}
                  >
                    <step.icon
                      className="w-5 h-5"
                      style={{ color: step.color }}
                    />
                  </div>
                  <span className="text-xs font-medium text-white text-center whitespace-nowrap">
                    {step.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Active step detail */}
            <div className="glass rounded-2xl p-8 transition-all duration-300">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                <div
                  className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: `${DEMO_STEPS[activeDemo].color}20` }}
                >
                  {(() => {
                    const Icon = DEMO_STEPS[activeDemo].icon;
                    return (
                      <Icon
                        className="w-8 h-8"
                        style={{ color: DEMO_STEPS[activeDemo].color }}
                      />
                    );
                  })()}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{
                        background: `${DEMO_STEPS[activeDemo].color}20`,
                        color: DEMO_STEPS[activeDemo].color,
                      }}
                    >
                      Step {activeDemo + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {DEMO_STEPS[activeDemo].label}
                    </h3>
                  </div>
                  <p className="text-[#B9C7D6]">
                    {DEMO_STEPS[activeDemo].desc}
                  </p>
                </div>
              </div>
              {/* Mobile step nav */}
              <div className="flex gap-3 mt-6 lg:hidden flex-wrap">
                {DEMO_STEPS.map((step, i) => (
                  <button
                    type="button"
                    key={step.label}
                    onClick={() => setActiveDemo(i)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-xs transition-all"
                    style={{
                      background:
                        activeDemo === i ? `${step.color}20` : "transparent",
                      border: `1px solid ${step.color}40`,
                      color: step.color,
                    }}
                    data-ocid="demo.tab"
                  >
                    <step.icon className="w-3 h-3" />
                    {step.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-sm border border-[#21C6B7]/30 text-[#21C6B7] hover:bg-[#21C6B7]/10 transition-all disabled:opacity-30"
                  onClick={() => setActiveDemo((p) => Math.max(0, p - 1))}
                  disabled={activeDemo === 0}
                  data-ocid="demo.pagination_prev"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-sm gradient-teal text-[#06101A] font-semibold hover:opacity-90 transition-all disabled:opacity-30"
                  onClick={() =>
                    setActiveDemo((p) => Math.min(DEMO_STEPS.length - 1, p + 1))
                  }
                  disabled={activeDemo === DEMO_STEPS.length - 1}
                  data-ocid="demo.pagination_next"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / CTA BAND */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-4xl mx-auto glass rounded-3xl p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(33,198,183,0.1) 0%, rgba(63,224,142,0.05) 100%)",
          }}
        >
          <div className="flex justify-center gap-1 mb-4">
            {["s1", "s2", "s3", "s4", "s5"].map((id) => (
              <Star
                key={id}
                className="w-5 h-5 fill-[#F6C842] text-[#F6C842]"
              />
            ))}
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Protect Your Income?
          </h2>
          <p className="text-[#B9C7D6] mb-8 max-w-xl mx-auto">
            Join thousands of delivery riders who never worry about lost
            earnings during monsoon season.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-full gradient-teal text-[#06101A] font-bold text-base hover:opacity-90 transition-all teal-glow inline-flex items-center justify-center gap-2"
              data-ocid="cta.primary_button"
            >
              Get Coverage Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/admin"
              className="px-8 py-4 rounded-full border border-[#21C6B7]/40 text-[#21C6B7] font-semibold text-base hover:bg-[#21C6B7]/10 transition-all inline-flex items-center justify-center gap-2"
              data-ocid="cta.secondary_button"
            >
              View Admin Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
