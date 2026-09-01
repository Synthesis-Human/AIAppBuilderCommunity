import { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles, Zap, Shield, Globe, Smartphone, Star, ArrowLeft,
  Plus, BarChart3, Settings, Crown, TrendingUp, Eye, Download,
  Share2, Edit3, User, Phone, Mail, CheckCircle, CreditCard,
  Infinity, RefreshCw, Wand2, Play, Code2, ExternalLink,
  Search, Command, X, ChevronRight, ChevronDown, ChevronUp,
  Rocket, Package, Cloud, Monitor, Terminal, FileCode2,
  AlertTriangle, Lightbulb, Target, ArrowRight, Activity,
  Users, Lock, Bell, Key, LogOut, Database, Cpu, Layers,
  BookOpen, Clock, Send, Bot, Loader2
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { toast, Toaster } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────

type AppState = "landing" | "onboarding" | "pricing" | "dashboard" | "ai-builder";
type CardType = "visa" | "mastercard" | "amex" | "discover" | "jcb" | "diners" | "unknown";
type PlanKey = "free" | "premium" | "plus";

interface Plan {
  name: string;
  price: string;
  priceNum: number;
  color: string;
  badgeColor: string;
  features: string[];
  appsPerMonth: number | "∞";
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PLANS: Record<PlanKey, Plan> = {
  free: {
    name: "Free",
    price: "$0",
    priceNum: 0,
    color: "#64748B",
    badgeColor: "bg-slate-800 text-slate-300 border-slate-700",
    features: ["3 AI apps per month", "Basic templates", "Community support", "Web deployment", "AppCraft branding"],
    appsPerMonth: 3,
  },
  premium: {
    name: "Premium",
    price: "$100",
    priceNum: 100,
    color: "#38BDF8",
    badgeColor: "bg-sky-900/50 text-sky-300 border-sky-700",
    features: ["20 AI apps per month", "Premium templates", "Priority support", "Advanced analytics", "Custom domains", "Team collaboration", "No branding"],
    appsPerMonth: 20,
  },
  plus: {
    name: "Plus",
    price: "$200",
    priceNum: 200,
    color: "#818CF8",
    badgeColor: "bg-indigo-900/50 text-indigo-300 border-indigo-700",
    features: ["Unlimited AI apps", "All premium features", "White-label solutions", "API access", "Advanced integrations", "24/7 dedicated support", "Custom AI models", "Marketplace access"],
    appsPerMonth: "∞",
  },
};

const SAMPLE_APPS = [
  { id: 1, name: "TaskMaster Pro", type: "Business", status: "Published", views: "2.3k", downloads: "450", img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=240&fit=crop&auto=format", desc: "AI-powered task & project manager" },
  { id: 2, name: "Social Connect", type: "Social", status: "Draft", views: "—", downloads: "—", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=240&fit=crop&auto=format", desc: "Share moments, connect with people" },
  { id: 3, name: "ShopEasy", type: "E-commerce", status: "In Review", views: "1.1k", downloads: "230", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop&auto=format", desc: "Frictionless mobile commerce" },
];

const TEMPLATES = [
  { id: 1, name: "Business Dashboard", category: "Business", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=220&fit=crop&auto=format", premium: false, uses: "4.2k" },
  { id: 2, name: "Social Media App", category: "Social", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=220&fit=crop&auto=format", premium: true, uses: "2.8k" },
  { id: 3, name: "E-commerce Store", category: "Shopping", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=220&fit=crop&auto=format", premium: true, uses: "3.5k" },
  { id: 4, name: "Portfolio Site", category: "Portfolio", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=220&fit=crop&auto=format", premium: false, uses: "5.1k" },
  { id: 5, name: "Fitness Tracker", category: "Health", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=220&fit=crop&auto=format", premium: true, uses: "1.9k" },
  { id: 6, name: "AI Chat App", category: "AI/ML", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=220&fit=crop&auto=format", premium: true, uses: "6.7k" },
];

const ANALYTICS_DATA = [
  { month: "Jan", views: 1200, downloads: 340, revenue: 0 },
  { month: "Feb", views: 1800, downloads: 420, revenue: 0 },
  { month: "Mar", views: 1450, downloads: 380, revenue: 100 },
  { month: "Apr", views: 2250, downloads: 560, revenue: 100 },
  { month: "May", views: 1900, downloads: 490, revenue: 200 },
  { month: "Jun", views: 2800, downloads: 680, revenue: 200 },
  { month: "Jul", views: 3100, downloads: 720, revenue: 200 },
  { month: "Aug", views: 3400, downloads: 810, revenue: 200 },
];

const PIE_DATA = [
  { name: "Business", value: 42 },
  { name: "Social", value: 23 },
  { name: "E-commerce", value: 19 },
  { name: "Health", value: 16 },
];
const PIE_COLORS = ["#38BDF8", "#34D399", "#818CF8", "#FB923C"];

const SAMPLE_PROMPTS = [
  "Build a todo app with dark mode, categories, due dates, and team sharing",
  "Create a weather dashboard with 7-day forecast, maps, and alerts",
  "Make a recipe social app with photo upload, ratings, and AI meal plans",
  "Design a fitness tracker with workout logs, progress charts, and coaching",
  "Build an AI customer support chat widget with knowledge base integration",
];

// ─── Card Detection ───────────────────────────────────────────────────────────

function detectCardType(raw: string): CardType {
  const n = raw.replace(/\D/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^(6011|622|64[4-9]|65)/.test(n)) return "discover";
  if (/^35(2[89]|[3-8])/.test(n)) return "jcb";
  if (/^(30[0-5]|36|38)/.test(n)) return "diners";
  return "unknown";
}

function formatCardNumber(raw: string, type: CardType): string {
  const n = raw.replace(/\D/g, "").slice(0, type === "amex" ? 15 : type === "diners" ? 14 : 16);
  if (type === "amex") return n.replace(/(\d{4})(\d{0,6})(\d{0,5})/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "));
  return n.replace(/(\d{4})/g, "$1 ").trim();
}

const CARD_LABELS: Record<CardType, string> = {
  visa: "VISA", mastercard: "Mastercard", amex: "AMEX",
  discover: "Discover", jcb: "JCB", diners: "Diners", unknown: "",
};

// ─── Version Hook ─────────────────────────────────────────────────────────────

function useVersion() {
  const [ver, setVer] = useState<number>(() => {
    const s = localStorage.getItem("ac_version");
    return s ? parseFloat(s) : 4.5;
  });
  useEffect(() => {
    const id = setInterval(() => {
      setVer(v => {
        const next = parseFloat((v + 0.001).toFixed(3));
        localStorage.setItem("ac_version", String(next));
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return ver;
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function SkeletonPulse({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded bg-white/5", className)} />;
}

// ─── Version Badge ────────────────────────────────────────────────────────────

function VersionBadge({ ver }: { ver: number }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-xs font-mono text-sky-400">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-400" />
      </span>
      v{ver.toFixed(3)} · 2X
    </div>
  );
}

// ─── Command Palette ──────────────────────────────────────────────────────────

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (state: AppState) => void;
}

function CommandPalette({ open, onClose, onNavigate }: CommandPaletteProps) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setQ(""); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const actions = [
    { label: "Go to Dashboard", icon: BarChart3, action: () => { onNavigate("dashboard"); onClose(); } },
    { label: "Open AI Builder", icon: Wand2, action: () => { onNavigate("ai-builder"); onClose(); } },
    { label: "View Pricing", icon: Crown, action: () => { onNavigate("pricing"); onClose(); } },
    { label: "Back to Landing", icon: Globe, action: () => { onNavigate("landing"); onClose(); } },
    { label: "Create New App", icon: Plus, action: () => { onNavigate("ai-builder"); onClose(); } },
    { label: "View Analytics", icon: TrendingUp, action: () => { onNavigate("dashboard"); onClose(); } },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(q.toLowerCase()));
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-4 rounded-xl border border-white/10 bg-[#080F1E] shadow-2xl shadow-sky-900/20 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search commands…"
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none"
          />
          <kbd className="text-xs text-slate-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">ESC</kbd>
        </div>
        <div className="py-2 max-h-72 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="text-sm text-slate-600 px-4 py-3">No results found.</p>
          )}
          {filtered.map((a, i) => (
            <button
              key={i}
              onClick={a.action}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-sky-500/10 hover:text-sky-300 transition-colors cursor-pointer text-left"
            >
              <a.icon className="w-4 h-4 text-slate-500 flex-shrink-0" />
              {a.label}
              <ChevronRight className="w-3 h-3 ml-auto text-slate-600" />
            </button>
          ))}
        </div>
        <div className="border-t border-white/5 px-4 py-2 flex items-center gap-4 text-xs text-slate-600">
          <span><kbd className="bg-white/5 px-1 rounded border border-white/10">↵</kbd> select</span>
          <span><kbd className="bg-white/5 px-1 rounded border border-white/10">ESC</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

// ─── Payment Modal ────────────────────────────────────────────────────────────

interface PaymentModalProps {
  open: boolean;
  plan: PlanKey;
  onClose: () => void;
  onSuccess: (plan: PlanKey) => void;
}

function PaymentModal({ open, plan, onClose, onSuccess }: PaymentModalProps) {
  const planData = PLANS[plan];
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const cardType = detectCardType(cardNum);

  const handleCardChange = (raw: string) => {
    const formatted = formatCardNumber(raw, cardType);
    setCardNum(formatted);
  };

  const handleExpiry = (raw: string) => {
    const n = raw.replace(/\D/g, "").slice(0, 4);
    setExpiry(n.length > 2 ? n.slice(0, 2) + "/" + n.slice(2) : n);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const rawCard = cardNum.replace(/\D/g, "");
    if (rawCard.length < 13) e.card = "Enter a valid card number";
    if (!expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Enter expiry as MM/YY";
    const cvvLen = cardType === "amex" ? 4 : 3;
    if (cvv.length < cvvLen) e.cvv = `CVV must be ${cvvLen} digits`;
    if (!name.trim()) e.name = "Cardholder name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess(plan);
      toast.success(`Upgraded to ${planData.name}! Welcome aboard.`);
    }, 2200);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[998] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#080F1E] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Upgrade to {planData.name}</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: planData.color + "22" }}>
              <Crown className="w-5 h-5" style={{ color: planData.color }} />
            </div>
            <div>
              <p className="font-medium text-white">{planData.name} Plan</p>
              <p className="text-sm text-slate-400">{planData.price}/month · Cancel anytime</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Card Number</label>
            <div className="relative">
              <input
                value={cardNum}
                onChange={e => handleCardChange(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className={cn(
                  "w-full bg-[#0B1628] border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-700 outline-none transition-colors font-mono",
                  errors.card ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-sky-500/50"
                )}
              />
              {cardType !== "unknown" && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-sky-400 font-mono">
                  {CARD_LABELS[cardType]}
                </span>
              )}
            </div>
            {errors.card && <p className="text-xs text-red-400 mt-1">{errors.card}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Expiry</label>
              <input
                value={expiry}
                onChange={e => handleExpiry(e.target.value)}
                placeholder="MM/YY"
                className={cn(
                  "w-full bg-[#0B1628] border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-700 outline-none transition-colors font-mono",
                  errors.expiry ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-sky-500/50"
                )}
              />
              {errors.expiry && <p className="text-xs text-red-400 mt-1">{errors.expiry}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">CVV</label>
              <input
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, cardType === "amex" ? 4 : 3))}
                placeholder={cardType === "amex" ? "1234" : "123"}
                className={cn(
                  "w-full bg-[#0B1628] border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-700 outline-none transition-colors font-mono",
                  errors.cvv ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-sky-500/50"
                )}
              />
              {errors.cvv && <p className="text-xs text-red-400 mt-1">{errors.cvv}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Cardholder Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Jane Doe"
              className={cn(
                "w-full bg-[#0B1628] border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-700 outline-none transition-colors",
                errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-sky-500/50"
              )}
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* Accepted cards */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Lock className="w-3 h-3" />
            <span>256-bit SSL · Accepts:</span>
            {(["VISA", "MC", "AMEX", "DISC", "JCB"] as const).map(c => (
              <span key={c} className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-mono text-[10px] text-slate-400">{c}</span>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={processing}
            className="w-full py-3 rounded-lg text-sm font-semibold text-[#020817] transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            style={{ background: processing ? "#94a3b8" : planData.color }}
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing payment…
              </span>
            ) : (
              `Pay ${planData.price}/month`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Deploy Modal ─────────────────────────────────────────────────────────────

function DeployModal({ open, onClose, appName }: { open: boolean; onClose: () => void; appName: string }) {
  const [deploying, setDeploying] = useState<string | null>(null);
  const [deployed, setDeployed] = useState<string | null>(null);

  const targets = [
    { id: "vercel", label: "Vercel", desc: "Edge network · Instant rollback", icon: Zap, color: "#fff" },
    { id: "netlify", label: "Netlify", desc: "Serverless functions · Forms", icon: Cloud, color: "#00C7B7" },
    { id: "cloudflare", label: "Cloudflare Pages", desc: "Global CDN · Workers support", icon: Globe, color: "#F6821F" },
    { id: "apk", label: "Android APK / AAB", desc: "Google Play · Sideload", icon: Smartphone, color: "#34D399" },
    { id: "ios", label: "iOS / TestFlight", desc: "App Store · Beta testing", icon: Monitor, color: "#818CF8" },
  ];

  const handleDeploy = (id: string) => {
    setDeploying(id);
    setTimeout(() => { setDeploying(null); setDeployed(id); toast.success(`Deployed to ${targets.find(t => t.id === id)?.label}!`); }, 2500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[998] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#080F1E] shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Deploy {appName}</h2>
            <p className="text-sm text-slate-500 mt-0.5">One-click deploy to any platform</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-2">
          {targets.map(t => (
            <button
              key={t.id}
              onClick={() => handleDeploy(t.id)}
              disabled={deploying === t.id}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <t.icon className="w-5 h-5" style={{ color: t.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">{t.label}</p>
                <p className="text-xs text-slate-500 truncate">{t.desc}</p>
              </div>
              {deployed === t.id ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              ) : deploying === t.id ? (
                <Loader2 className="w-5 h-5 text-sky-400 animate-spin flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Export Modal ─────────────────────────────────────────────────────────────

function ExportModal({ open, onClose, appName }: { open: boolean; onClose: () => void; appName: string }) {
  const [exporting, setExporting] = useState(false);

  const files = [
    "package.json", "next.config.ts", ".env.example", "README.md",
    "src/app/page.tsx", "src/app/layout.tsx", "src/components/ui/button.tsx",
    "src/lib/utils.ts", "public/manifest.json", "public/sw.js",
  ];

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => { setExporting(false); toast.success("Build plan exported as ZIP!"); onClose(); }, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[998] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#080F1E] shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Export {appName}</h2>
            <p className="text-sm text-slate-500 mt-0.5">Full source code + deploy kit</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">
          <div className="rounded-xl border border-white/5 bg-white/2 p-4 mb-4">
            <p className="text-xs font-mono text-sky-400 mb-3">📁 {appName.replace(/\s/g, "-").toLowerCase()}/</p>
            <div className="space-y-1">
              {files.map(f => (
                <div key={f} className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <FileCode2 className="w-3 h-3 text-slate-700 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-white/3 border border-white/5 text-center">
              <p className="text-lg font-bold text-white">{files.length}</p>
              <p className="text-xs text-slate-500">Files</p>
            </div>
            <div className="p-3 rounded-lg bg-white/3 border border-white/5 text-center">
              <p className="text-lg font-bold text-white">Next.js 14</p>
              <p className="text-xs text-slate-500">Framework</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className="w-full py-3 rounded-lg text-sm font-semibold text-[#020817] bg-sky-400 hover:bg-sky-300 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
          >
            {exporting ? (
              <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Packaging…</span>
            ) : (
              <span className="flex items-center justify-center gap-2"><Package className="w-4 h-4" /> Download ZIP</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Thinking Visualizer ──────────────────────────────────────────────────────

function ThinkingVisualizer({ active, step }: { active: boolean; step: number }) {
  const steps = [
    { label: "Analyzing intent", detail: "decomposing prompt into PRD, user stories, acceptance criteria" },
    { label: "NUG Track", detail: "extracting key constraints, goals, 10x leverage points" },
    { label: "Architecture", detail: "evaluating 5 paths — SaaS, mobile-first, serverless, edge, hybrid" },
    { label: "Generating code", detail: "writing components, routes, DB schema, API endpoints" },
  ];

  if (!active) return null;

  return (
    <div className="rounded-xl border border-white/5 bg-white/2 p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
        <Cpu className="w-3.5 h-3.5 animate-pulse" />
        <span>Matrix · 200 agents · latency 12ms</span>
      </div>
      {steps.map((s, i) => (
        <div key={i} className={cn("flex items-start gap-3 text-xs transition-all duration-500", i <= step ? "opacity-100" : "opacity-20")}>
          <div className={cn("mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0", i < step ? "bg-emerald-500/20" : i === step ? "bg-sky-500/20" : "bg-white/5")}>
            {i < step ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : i === step ? <Loader2 className="w-3 h-3 text-sky-400 animate-spin" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />}
          </div>
          <div>
            <p className={cn("font-medium", i <= step ? "text-white" : "text-slate-700")}>{s.label}</p>
            {i <= step && <p className="text-slate-500 mt-0.5">{s.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Advisory Card ────────────────────────────────────────────────────────────

function AdvisoryCard({ prompt }: { prompt: string }) {
  const [open, setOpen] = useState(true);
  const lc = prompt.toLowerCase();

  const advisory = {
    immediate: lc.includes("fitness") ? "Add user auth & onboarding flow first — retention depends on Day 1 UX" : "Ship MVP with core loop first, iterate based on real user feedback",
    leverage: lc.includes("social") ? "Add invite-a-friend referral to viral loop → 3x organic growth" : "Embed AI personalization — same effort, 10x engagement lift",
    risk: "Scope creep. Lock feature list for v1. Add a public changelog to build trust.",
    steps: ["Set up Supabase auth + DB schema today", "Deploy to Vercel with preview URLs", "Collect 10 beta users in 48h with a waitlist"],
    mrr: lc.includes("ai") ? "$5K MRR in 90 days with 50 paid users at $100/mo" : "Bootstrap to $2K MRR, then raise or double pricing",
  };

  return (
    <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-indigo-500/5 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-indigo-300">10x Advisory Plan</span>
          <span className="text-xs text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">AI generated</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4 text-indigo-500" />}
      </button>

      {open && (
        <div className="p-4 pt-0 space-y-3 text-sm">
          {[
            { icon: Zap, label: "Immediate Action", text: advisory.immediate, color: "text-yellow-400" },
            { icon: Target, label: "10x Leverage", text: advisory.leverage, color: "text-sky-400" },
            { icon: AlertTriangle, label: "Risk Mitigation", text: advisory.risk, color: "text-orange-400" },
            { icon: Activity, label: "MRR / Scale", text: advisory.mrr, color: "text-emerald-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <item.icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", item.color)} />
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                <p className="text-slate-300">{item.text}</p>
              </div>
            </div>
          ))}

          <div className="pt-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ArrowRight className="w-3 h-3" />Next 3 Steps
            </p>
            {advisory.steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300 mb-1">
                <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Shared Header ────────────────────────────────────────────────────────────

function AppHeader({
  ver, plan, onCmd, onShowPricing, onBack, showBack = false,
}: {
  ver: number;
  plan?: PlanKey;
  onCmd: () => void;
  onShowPricing?: () => void;
  onBack?: () => void;
  showBack?: boolean;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#04080F]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {showBack && onBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-white tracking-tight">AppCraft AI</span>
          </div>
          {plan && (
            <span className={cn("text-xs px-2.5 py-0.5 rounded-full border font-medium", PLANS[plan].badgeColor)}>
              {PLANS[plan].name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCmd}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/3 text-xs text-slate-500 hover:border-sky-500/30 hover:text-slate-300 transition-all cursor-pointer"
          >
            <Command className="w-3 h-3" />K
          </button>
          <VersionBadge ver={ver} />
          {onShowPricing && (
            <button
              onClick={onShowPricing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-sky-300 border border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10 transition-all cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5" /> Upgrade
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

function LandingPage({
  ver, onLogin, onStartAI, onShowPricing, onCmd,
}: {
  ver: number;
  onLogin: () => void;
  onStartAI: () => void;
  onShowPricing: () => void;
  onCmd: () => void;
}) {
  const [tab, setTab] = useState<"login" | "signup">("signup");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const features = [
    { icon: Wand2, title: "Describe → Deploy", desc: "Type what you want. AI writes, tests, and ships production code in minutes.", color: "from-sky-500 to-blue-600" },
    { icon: Zap, title: "Lightning Fast", desc: "From idea to deployed app in under 3 minutes. 200 AI agents working in parallel.", color: "from-amber-500 to-orange-600" },
    { icon: Shield, title: "Enterprise Grade", desc: "SOC 2, GDPR ready. Deploy to Vercel, Cloudflare, or export full source code.", color: "from-emerald-500 to-teal-600" },
  ];

  return (
    <div className="min-h-screen bg-[#04080F] text-white overflow-x-hidden">
      <AppHeader ver={ver} onCmd={onCmd} onShowPricing={onShowPricing} />

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 pt-20 pb-16">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/5 rounded-full blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-xs text-sky-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-400" />
                </span>
                200 AI agents · 12ms latency · PWA + App Store ready
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Build apps with AI<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">in minutes.</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                Describe your idea. Our 200-agent AI matrix architects, codes, and deploys full-stack apps — no code, no waiting.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onStartAI}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-sm hover:from-sky-400 hover:to-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-sky-500/25 cursor-pointer"
              >
                <Zap className="w-4 h-4" /> Start Building Free
              </button>
              <button
                onClick={onShowPricing}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-300 text-sm hover:border-white/20 hover:text-white active:scale-[0.98] transition-all cursor-pointer"
              >
                <Crown className="w-4 h-4" /> View Plans
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              <span>4.9/5 from 10,000+ builders</span>
            </div>
          </div>

          {/* Auth Card */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 blur-xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#080F1E] p-8 shadow-2xl">
              <div className="flex rounded-lg border border-white/5 bg-white/3 p-1 mb-6">
                {(["signup", "login"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "flex-1 py-2 rounded-md text-sm font-medium transition-all cursor-pointer capitalize",
                      tab === t ? "bg-sky-500/20 text-sky-300 shadow-sm" : "text-slate-500 hover:text-slate-300"
                    )}
                  >
                    {t === "signup" ? "Sign Up" : "Log In"}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {tab === "signup" && (
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Full name"
                    className="w-full bg-[#0B1628] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-700 outline-none focus:border-sky-500/40 transition-colors"
                  />
                )}
                <input
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-[#0B1628] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-700 outline-none focus:border-sky-500/40 transition-colors"
                />
                <input
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  type="password"
                  placeholder="Password"
                  className="w-full bg-[#0B1628] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-700 outline-none focus:border-sky-500/40 transition-colors"
                />
                <button
                  onClick={onLogin}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-semibold hover:from-sky-400 hover:to-indigo-500 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {tab === "signup" ? "Create Free Account" : "Log In"}
                </button>
              </div>

              <p className="text-xs text-center text-slate-600 mt-4">
                By continuing you agree to our Terms & Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 hover:scale-[1.02] transition-all duration-200 cursor-default"
            >
              <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg", f.color)}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Apps Built", value: "47,823" },
              { label: "Active Builders", value: "10,200+" },
              { label: "Avg Build Time", value: "2.8 min" },
              { label: "Uptime SLA", value: "99.99%" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Onboarding Flow ──────────────────────────────────────────────────────────

function OnboardingFlow({
  ver, onComplete, onShowPricing, onCmd,
}: {
  ver: number;
  onComplete: () => void;
  onShowPricing: () => void;
  onCmd: () => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "Alex", useCase: "", teamSize: "" });

  const useCases = ["Build SaaS products", "Internal business tools", "Mobile apps", "AI-powered apps", "E-commerce stores", "Portfolio / marketing"];
  const teamSizes = ["Just me", "2–5 people", "6–20 people", "20+ people"];

  const steps = [
    {
      title: "Welcome to AppCraft AI",
      sub: "Let's personalize your experience in 2 quick steps.",
      content: (
        <div className="space-y-4">
          <input
            value={data.name}
            onChange={e => setData(d => ({ ...d, name: e.target.value }))}
            placeholder="Your first name"
            className="w-full bg-[#0B1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 outline-none focus:border-sky-500/40 transition-colors"
          />
        </div>
      ),
    },
    {
      title: `Hey ${data.name}, what are you building?`,
      sub: "We'll tailor templates and AI suggestions to your goals.",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {useCases.map(uc => (
              <button
                key={uc}
                onClick={() => setData(d => ({ ...d, useCase: uc }))}
                className={cn(
                  "p-3 rounded-xl border text-sm text-left transition-all cursor-pointer",
                  data.useCase === uc
                    ? "border-sky-500/50 bg-sky-500/10 text-sky-300"
                    : "border-white/5 bg-white/2 text-slate-400 hover:border-white/10 hover:text-slate-200"
                )}
              >
                {uc}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Team size</p>
            <div className="flex gap-2 flex-wrap">
              {teamSizes.map(ts => (
                <button
                  key={ts}
                  onClick={() => setData(d => ({ ...d, teamSize: ts }))}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border text-sm transition-all cursor-pointer",
                    data.teamSize === ts
                      ? "border-sky-500/50 bg-sky-500/10 text-sky-300"
                      : "border-white/5 bg-white/2 text-slate-400 hover:border-white/10 hover:text-slate-200"
                  )}
                >
                  {ts}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const current = steps[step];
  const canNext = step === 0 ? data.name.trim() : (data.useCase && data.teamSize);

  return (
    <div className="min-h-screen bg-[#04080F] flex flex-col">
      <AppHeader ver={ver} onCmd={onCmd} />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 rounded-full flex-1 transition-all duration-500",
                  i <= step ? "bg-sky-500" : "bg-white/5"
                )}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#080F1E] p-8">
            <h2 className="text-2xl font-bold text-white mb-2">{current.title}</h2>
            <p className="text-slate-400 text-sm mb-8">{current.sub}</p>
            {current.content}

            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm hover:border-white/20 transition-all cursor-pointer"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (step < steps.length - 1) setStep(s => s + 1);
                  else onComplete();
                }}
                disabled={!canNext}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-semibold disabled:opacity-40 hover:from-sky-400 hover:to-indigo-500 active:scale-[0.98] transition-all cursor-pointer"
              >
                {step < steps.length - 1 ? "Continue" : "Go to Dashboard"}
              </button>
            </div>

            {step === steps.length - 1 && (
              <button
                onClick={onShowPricing}
                className="w-full mt-3 py-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-sm hover:bg-indigo-500/10 transition-all cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 inline mr-1.5" />
                See premium plans first
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Pricing Plans ────────────────────────────────────────────────────────────

function PricingPlans({
  ver, selectedPlan, onSelectPlan, onBack, onCmd,
}: {
  ver: number;
  selectedPlan: PlanKey;
  onSelectPlan: (p: PlanKey) => void;
  onBack: () => void;
  onCmd: () => void;
}) {
  const [pendingPlan, setPendingPlan] = useState<PlanKey | null>(null);

  const handleSelect = (p: PlanKey) => {
    if (p === "free") { onSelectPlan(p); return; }
    setPendingPlan(p);
  };

  return (
    <div className="min-h-screen bg-[#04080F]">
      <AppHeader ver={ver} onCmd={onCmd} onBack={onBack} showBack />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-slate-400 max-w-md mx-auto">Start free. Scale as you grow. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(Object.entries(PLANS) as [PlanKey, Plan][]).map(([key, p]) => {
            const isCurrent = selectedPlan === key;
            const isPopular = key === "premium";
            return (
              <div
                key={key}
                className={cn(
                  "relative rounded-2xl border p-8 transition-all duration-200",
                  isCurrent ? "border-sky-500/40 bg-sky-500/5 shadow-lg shadow-sky-500/10" :
                  isPopular ? "border-indigo-500/30 bg-indigo-500/5" :
                  "border-white/5 bg-white/2 hover:border-white/10"
                )}
              >
                {isPopular && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 text-xs text-white font-semibold shadow">
                    Most Popular
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-sky-500 text-xs text-[#020817] font-semibold shadow">
                    Current Plan
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-sm text-slate-400 font-medium mb-1">{p.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{p.price}</span>
                    {key !== "free" && <span className="text-slate-500 text-sm">/month</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(key)}
                  disabled={isCurrent}
                  className={cn(
                    "w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer",
                    isCurrent ? "bg-white/5 text-slate-500 cursor-not-allowed" :
                    key === "plus" ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white hover:from-indigo-400 hover:to-sky-400 shadow-lg shadow-indigo-500/20" :
                    key === "premium" ? "bg-sky-500 text-[#020817] hover:bg-sky-400 shadow-lg shadow-sky-500/20" :
                    "border border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                  )}
                >
                  {isCurrent ? "Current Plan" : key === "free" ? "Switch to Free" : `Choose ${p.name} →`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {pendingPlan && (
        <PaymentModal
          open={true}
          plan={pendingPlan}
          onClose={() => setPendingPlan(null)}
          onSuccess={p => { setPendingPlan(null); onSelectPlan(p); }}
        />
      )}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function AppDashboard({
  ver, selectedPlan, onShowPricing, onPlanChange, onCmd, onGoBuilder,
}: {
  ver: number;
  selectedPlan: PlanKey;
  onShowPricing: () => void;
  onPlanChange: (p: PlanKey) => void;
  onCmd: () => void;
  onGoBuilder: () => void;
}) {
  const [tab, setTab] = useState("apps");
  const [pendingPlan, setPendingPlan] = useState<PlanKey | null>(null);
  const [profile, setProfile] = useState({ firstName: "Alex", lastName: "Rivera", email: "alex.rivera@example.com", phone: "+1 (415) 555-0192", notifications: true, twoFactor: false });
  const [saved, setSaved] = useState(false);

  const plan = PLANS[selectedPlan];

  const stats = [
    { label: "Apps This Month", value: selectedPlan === "free" ? "0 / 3" : selectedPlan === "premium" ? "3 / 20" : "14", icon: Smartphone, color: "text-sky-400", bg: "bg-sky-400/10" },
    { label: "Total Views", value: "3.4k", icon: Eye, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Downloads", value: "680", icon: Download, color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { label: "Success Rate", value: "94%", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10" },
  ];

  const tabs = [
    { id: "apps", label: "My Apps", icon: Layers },
    { id: "templates", label: "Templates", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "project", label: "Project", icon: Settings },
    { id: "pricing", label: "Pricing", icon: Crown },
  ];

  const handlePlanSwitch = (p: PlanKey) => {
    if (p === "free") { onPlanChange(p); toast.success("Switched to Free plan."); }
    else setPendingPlan(p);
  };

  return (
    <div className="min-h-screen bg-[#04080F]">
      <AppHeader ver={ver} plan={selectedPlan} onCmd={onCmd} onShowPricing={onShowPricing} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-white/2 p-5 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", s.bg)}>
                  <s.icon className={cn("w-4 h-4", s.color)} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-white/5 overflow-x-auto scrollbar-none">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer",
                tab === t.id
                  ? "border-sky-400 text-sky-400"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}

        {/* ── Apps ── */}
        {tab === "apps" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">My Apps</h2>
              <button
                onClick={onGoBuilder}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-medium hover:from-sky-400 hover:to-indigo-500 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-sky-500/15"
              >
                <Plus className="w-4 h-4" /> Create New App
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SAMPLE_APPS.map(app => (
                <div key={app.id} className="group rounded-xl border border-white/5 bg-white/2 overflow-hidden hover:border-white/10 hover:shadow-lg hover:shadow-sky-500/5 hover:scale-[1.01] transition-all duration-200">
                  <div className="relative">
                    <img src={app.img} alt={app.name} className="w-full h-44 object-cover bg-slate-800" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className={cn(
                      "absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full border font-medium",
                      app.status === "Published" ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300" :
                      app.status === "In Review" ? "border-amber-500/40 bg-amber-500/20 text-amber-300" :
                      "border-slate-600 bg-slate-700/50 text-slate-400"
                    )}>
                      {app.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white">{app.name}</h3>
                      <span className="text-xs text-slate-600 border border-white/5 px-2 py-0.5 rounded-full">{app.type}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{app.desc}</p>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{app.views}</span>
                      <span className="flex items-center gap-1"><Download className="w-3 h-3" />{app.downloads}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/10 text-slate-300 text-xs hover:border-sky-500/30 hover:text-sky-300 active:scale-[0.98] transition-all cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button className="px-3 py-2 rounded-lg border border-white/10 text-slate-400 hover:border-white/20 hover:text-white active:scale-[0.98] transition-all cursor-pointer">
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Templates ── */}
        {tab === "templates" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">AI Templates</h2>
              <p className="text-sm text-slate-500">Curated starter apps · ready to customize</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TEMPLATES.map(t => {
                const locked = t.premium && selectedPlan === "free";
                return (
                  <div key={t.id} className="group rounded-xl border border-white/5 bg-white/2 overflow-hidden hover:border-white/10 hover:scale-[1.01] transition-all duration-200">
                    <div className="relative">
                      <img src={t.img} alt={t.name} className="w-full h-40 object-cover bg-slate-800" />
                      {locked && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"><Lock className="w-6 h-6 text-white/60" /></div>}
                      {t.premium && (
                        <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/40 bg-indigo-500/20 text-indigo-300 font-semibold">
                          <Crown className="w-3 h-3 inline mr-0.5" />PRO
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-white text-sm">{t.name}</h3>
                        <span className="text-xs text-slate-600">{t.uses} uses</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{t.category}</p>
                      <button
                        onClick={() => {
                          if (locked) { onShowPricing(); return; }
                          onGoBuilder();
                          toast.success(`Template "${t.name}" loaded!`);
                        }}
                        className={cn(
                          "w-full py-2 rounded-lg text-xs font-medium transition-all active:scale-[0.98] cursor-pointer",
                          locked
                            ? "border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10"
                            : "bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500/20"
                        )}
                      >
                        {locked ? "Upgrade to Unlock" : "Use Template →"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Analytics ── */}
        {tab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Analytics Dashboard</h2>
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="rounded-xl border border-white/5 bg-white/2 p-6">
                <p className="text-sm font-medium text-white mb-1">Views Over Time</p>
                <p className="text-xs text-slate-500 mb-5">Monthly unique page views</p>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={ANALYTICS_DATA}>
                    <defs>
                      <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#080F1E", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="views" stroke="#38BDF8" fill="url(#viewGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/2 p-6">
                <p className="text-sm font-medium text-white mb-1">Downloads by Month</p>
                <p className="text-xs text-slate-500 mb-5">App store + direct downloads</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={ANALYTICS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "#080F1E", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="downloads" fill="#34D399" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/2 p-6">
                <p className="text-sm font-medium text-white mb-1">App Category Mix</p>
                <p className="text-xs text-slate-500 mb-5">Distribution of your apps by category</p>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie data={PIE_DATA} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={70} strokeWidth={0}>
                        {PIE_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {PIE_DATA.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                        <span className="text-slate-400">{d.name}</span>
                        <span className="text-white font-medium ml-auto">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/2 p-6">
                <p className="text-sm font-medium text-white mb-5">Top Performing Apps</p>
                <div className="space-y-3">
                  {SAMPLE_APPS.map((a, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-xs text-slate-600 w-5 text-right">{i + 1}</span>
                      <img src={a.img} alt={a.name} className="w-8 h-8 rounded-md object-cover bg-slate-800 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{a.name}</p>
                        <div className="h-1.5 rounded-full bg-white/5 mt-1">
                          <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" style={{ width: `${[80, 35, 55][i]}%` }} />
                        </div>
                      </div>
                      <span className="text-sm text-slate-400 font-mono w-10 text-right">{a.views}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Project Settings ── */}
        {tab === "project" && (
          <div className="max-w-2xl space-y-6">
            <h2 className="text-xl font-semibold text-white">Project Settings</h2>

            <div className="rounded-xl border border-white/5 bg-white/2 p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {profile.firstName[0]}{profile.lastName[0]}
                </div>
                <div>
                  <p className="font-medium text-white">{profile.firstName} {profile.lastName}</p>
                  <p className="text-xs text-slate-500">{profile.email}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">First Name</label>
                  <input value={profile.firstName} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))} className="w-full bg-[#0B1628] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500/40 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Last Name</label>
                  <input value={profile.lastName} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))} className="w-full bg-[#0B1628] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500/40 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5"><Mail className="w-3 h-3 inline mr-1" />Email Address</label>
                <input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} type="email" className="w-full bg-[#0B1628] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500/40 transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5"><Phone className="w-3 h-3 inline mr-1" />Phone (for recovery)</label>
                <input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} type="tel" className="w-full bg-[#0B1628] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500/40 transition-colors" />
                <p className="text-xs text-slate-600 mt-1">Used for password recovery and 2FA verification</p>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-3">
                {[
                  { key: "notifications", label: "Email Notifications", desc: "Updates about apps, billing, and announcements" },
                  { key: "twoFactor", label: "Two-Factor Authentication", desc: "Add extra security with SMS or authenticator app" },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setProfile(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                      className={cn(
                        "relative w-10 h-5.5 rounded-full transition-colors cursor-pointer",
                        profile[item.key as keyof typeof profile] ? "bg-sky-500" : "bg-white/10"
                      )}
                      style={{ height: "22px" }}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 w-4.5 h-4 rounded-full bg-white shadow transition-all",
                          profile[item.key as keyof typeof profile] ? "left-[22px]" : "left-0.5"
                        )}
                        style={{ width: "18px", height: "18px" }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); toast.success("Profile saved!"); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 text-[#020817] text-sm font-semibold hover:bg-sky-400 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {saved ? <CheckCircle className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  {saved ? "Saved!" : "Save Changes"}
                </button>
                <button className="px-5 py-2.5 rounded-lg border border-white/10 text-slate-300 text-sm hover:border-white/20 transition-all cursor-pointer">
                  Reset Password
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/2 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-emerald-400" />
                <h3 className="font-medium text-white">Security & Recovery</h3>
              </div>
              <div className="p-4 rounded-lg border border-emerald-500/15 bg-emerald-500/5 mb-4">
                <p className="text-sm text-emerald-300 font-medium mb-0.5">Phone Recovery Active</p>
                <p className="text-xs text-emerald-600">{profile.phone} · verified · used for password reset</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Clock, label: "View Login History" },
                  { icon: Key, label: "Manage API Keys" },
                  { icon: Database, label: "Export My Data" },
                  { icon: LogOut, label: "Sign Out Everywhere" },
                ].map((a, i) => (
                  <button key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/5 text-slate-400 text-sm hover:border-white/10 hover:text-slate-200 active:scale-[0.98] transition-all cursor-pointer">
                    <a.icon className="w-4 h-4" />
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Pricing ── */}
        {tab === "pricing" && (
          <div className="space-y-8">
            <div className="text-center max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-white mb-2">Your Plan</h2>
              <p className="text-slate-400 text-sm">Upgrade or downgrade anytime. Billing is prorated.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {(Object.entries(PLANS) as [PlanKey, Plan][]).map(([key, p]) => {
                const isCurrent = selectedPlan === key;
                return (
                  <div
                    key={key}
                    className={cn(
                      "relative rounded-xl border p-6 transition-all",
                      isCurrent
                        ? "border-sky-500/40 bg-sky-500/5 shadow-lg shadow-sky-500/10"
                        : "border-white/5 bg-white/2 hover:border-white/10"
                    )}
                  >
                    {isCurrent && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-sky-500 text-xs text-[#020817] font-semibold shadow">
                        Current Plan
                      </div>
                    )}
                    <p className="text-sm text-slate-400 font-medium mb-1">{p.name}</p>
                    <p className="text-3xl font-bold text-white mb-4">{p.price}<span className="text-sm text-slate-500 font-normal">{key !== "free" ? "/mo" : ""}</span></p>
                    <ul className="space-y-2 mb-6">
                      {p.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <button
                      disabled={isCurrent}
                      onClick={() => handlePlanSwitch(key)}
                      className={cn(
                        "w-full py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98] cursor-pointer",
                        isCurrent ? "bg-white/5 text-slate-600 cursor-not-allowed" :
                        key === "plus" ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white hover:from-indigo-400 hover:to-sky-400" :
                        key === "premium" ? "bg-sky-500 text-[#020817] hover:bg-sky-400" :
                        "border border-white/10 text-slate-300 hover:border-white/20"
                      )}
                    >
                      {isCurrent ? "Current" : key === "free" ? "Switch to Free" : `Upgrade to ${p.name}`}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Comparison table */}
            <div className="rounded-xl border border-white/5 bg-white/2 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-6 py-4 text-slate-400 font-medium">Feature</th>
                      {(["free", "premium", "plus"] as PlanKey[]).map(k => (
                        <th key={k} className={cn("text-center px-6 py-4 font-medium", selectedPlan === k ? "text-sky-400" : "text-slate-400")}>
                          {PLANS[k].name}
                          {selectedPlan === k && <span className="ml-1 text-[10px] text-sky-500">●</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "AI Apps / month", vals: ["3", "20", "∞"] },
                      { label: "Premium Templates", vals: ["✗", "✓", "✓"] },
                      { label: "Custom Domains", vals: ["✗", "✓", "✓"] },
                      { label: "API Access", vals: ["✗", "✗", "✓"] },
                      { label: "White-label", vals: ["✗", "✗", "✓"] },
                      { label: "Support", vals: ["Community", "Priority", "24/7 Dedicated"] },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/3 hover:bg-white/2">
                        <td className="px-6 py-3.5 text-slate-400">{row.label}</td>
                        {row.vals.map((v, j) => (
                          <td key={j} className={cn("text-center px-6 py-3.5", v === "✓" ? "text-emerald-400" : v === "✗" ? "text-slate-700" : "text-slate-300")}>
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {pendingPlan && (
        <PaymentModal
          open
          plan={pendingPlan}
          onClose={() => setPendingPlan(null)}
          onSuccess={p => { setPendingPlan(null); onPlanChange(p); }}
        />
      )}
    </div>
  );
}

// ─── AI Builder ───────────────────────────────────────────────────────────────

function AIBuilder({
  ver, onBack, onCmd,
}: {
  ver: number;
  onBack: () => void;
  onCmd: () => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [thinkStep, setThinkStep] = useState(-1);
  const [generatedApp, setGeneratedApp] = useState<{ name: string; desc: string; icon: { emoji: string; bg: string; color: string }; features: string[]; preview: string } | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [showDeploy, setShowDeploy] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(`%c[Matrix] 200 agents orchestrated · latency 12ms · v${ver.toFixed(3)} · 2X ENHANCED`, "color:#38BDF8;font-weight:bold;font-family:monospace;");
  }, [ver]);

  const resolveApp = (p: string) => {
    const lc = p.toLowerCase();
    if (lc.includes("todo") || lc.includes("task")) return { name: "TaskFlow Pro", icon: { emoji: "✅", bg: "#052e16", color: "#34D399" }, features: ["Smart task management", "Team collaboration", "Due date tracking", "Priority tags", "Notifications", "Cloud sync"], preview: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=700&fit=crop&auto=format" };
    if (lc.includes("weather")) return { name: "SkyWatch", icon: { emoji: "☀️", bg: "#1c1917", color: "#FB923C" }, features: ["7-day forecast", "Location search", "Weather alerts", "Radar maps", "UV index", "Wind speed"], preview: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=700&fit=crop&auto=format" };
    if (lc.includes("recipe") || lc.includes("food")) return { name: "ChefShare", icon: { emoji: "👨‍🍳", bg: "#450a0a", color: "#F87171" }, features: ["Recipe library", "Photo upload", "AI meal planning", "Nutrition tracking", "Rating system", "Shopping list"], preview: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=700&fit=crop&auto=format" };
    if (lc.includes("fitness") || lc.includes("workout")) return { name: "FitTrack AI", icon: { emoji: "💪", bg: "#2e1065", color: "#818CF8" }, features: ["Workout logging", "AI coaching", "Progress charts", "Body metrics", "Streak tracking", "Community challenges"], preview: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=700&fit=crop&auto=format" };
    if (lc.includes("social") || lc.includes("photo")) return { name: "MomentShare", icon: { emoji: "📸", bg: "#082f49", color: "#38BDF8" }, features: ["Photo sharing", "Stories", "Comments", "AI captions", "Explore feed", "Direct messaging"], preview: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=700&fit=crop&auto=format" };
    if (lc.includes("ecommerce") || lc.includes("shop") || lc.includes("store")) return { name: "ShopLaunch", icon: { emoji: "🛒", bg: "#052e16", color: "#34D399" }, features: ["Product catalog", "Cart & checkout", "Payment gateway", "Order tracking", "Inventory management", "Analytics"], preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=700&fit=crop&auto=format" };
    return { name: "AppCraft Build", icon: { emoji: "🚀", bg: "#0c1a3a", color: "#38BDF8" }, features: ["User authentication", "Responsive design", "Cloud sync", "Push notifications", "Analytics", "API integration"], preview: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=700&fit=crop&auto=format" };
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    const userMsg = prompt;
    setPrompt("");
    setChatHistory(h => [...h, { role: "user", content: userMsg }]);
    setIsGenerating(true);
    setThinkStep(0);

    const ticks = [0, 800, 1600, 2400];
    ticks.forEach((t, i) => setTimeout(() => setThinkStep(i), t));

    setTimeout(() => {
      const app = resolveApp(userMsg);
      setGeneratedApp({ name: app.name, desc: `AI-crafted ${app.name} based on: "${userMsg}"`, icon: app.icon, features: app.features, preview: app.preview });
      setIsGenerating(false);
      setThinkStep(-1);
      setChatHistory(h => [...h, { role: "ai", content: `Built **${app.name}** with ${app.features.length} core features. Live preview ready. 12ms latency · v${ver.toFixed(3)}` }]);
    }, 3200);
  };

  const handleOpenPreview = () => {
    if (!generatedApp) return;
    const canvas = document.createElement("canvas");
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = generatedApp.icon.bg;
      ctx.fillRect(0, 0, 32, 32);
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(generatedApp.icon.emoji, 16, 16);
    }
    const favicon = canvas.toDataURL();
    const win = window.open("", "_blank", "width=390,height=780,scrollbars=yes");
    if (win) {
      win.document.write(`<!DOCTYPE html><html><head>
        <title>${generatedApp.name}</title>
        <link rel="icon" href="${favicon}">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>
          *{margin:0;padding:0;box-sizing:border-box}
          body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:${generatedApp.icon.bg};min-height:100vh;color:#fff}
          .header{padding:16px;background:rgba(0,0,0,0.4);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:10}
          .icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-center:center;font-size:22px;background:rgba(255,255,255,0.1)}
          h1{font-size:20px;font-weight:700}
          .live{position:fixed;top:12px;right:12px;background:#10b981;color:#fff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;display:flex;align-items:center;gap:5px;z-index:100}
          .dot{width:6px;height:6px;background:#34d399;border-radius:50%;animation:pulse 2s infinite}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
          .main{padding:20px;max-width:420px;margin:0 auto}
          .card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;margin-bottom:16px;backdrop-filter:blur(8px)}
          .badge{display:inline-block;background:${generatedApp.icon.color}22;color:${generatedApp.icon.color};border:1px solid ${generatedApp.icon.color}44;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:16px}
          .feat{list-style:none;margin:12px 0}
          .feat li{padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:14px;opacity:.85}
          .feat li:last-child{border-bottom:none}
          h2{font-size:18px;font-weight:700;margin-bottom:8px}
          h3{font-size:15px;font-weight:600;margin-bottom:8px;color:${generatedApp.icon.color}}
          p{font-size:14px;opacity:.7;line-height:1.6}
        </style>
      </head><body>
        <div class="live"><div class="dot"></div>LIVE PREVIEW</div>
        <div class="header"><div class="icon">${generatedApp.icon.emoji}</div><div><h1>${generatedApp.name}</h1><p style="font-size:11px;opacity:.6;margin-top:2px">AI Generated · AppCraft</p></div></div>
        <div class="main">
          <div class="card">
            <div class="badge">🤖 AI Built · 200 Agents · 12ms</div>
            <h2>${generatedApp.name}</h2>
            <p>${generatedApp.desc}</p>
            <h3 style="margin-top:20px">✨ Core Features</h3>
            <ul class="feat">${generatedApp.features.map(f => `<li>✅ ${f}</li>`).join("")}</ul>
          </div>
          <div class="card"><h3>🎉 Your app is live!</h3><p>This production-ready preview was built by 200 AI agents in under 3 seconds. Deploy to any platform or export full source code.</p></div>
          <div class="card"><h3>🚀 Next Steps</h3><ul class="feat"><li>🌐 Deploy to Vercel</li><li>📱 Publish to App Stores</li><li>🔧 Customize branding</li><li>👥 Invite collaborators</li></ul></div>
        </div>
      </body></html>`);
      win.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-[#04080F] flex flex-col">
      <AppHeader ver={ver} onCmd={onCmd} onBack={onBack} showBack />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 h-full">
          {/* Left: Chat + input */}
          <div className="flex flex-col space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-sky-400" /> AI App Builder
              </h1>
              <p className="text-sm text-slate-500">Describe your app → 200 agents build it → live preview in seconds</p>
            </div>

            {/* Chat history */}
            {chatHistory.length > 0 && (
              <div className="rounded-xl border border-white/5 bg-white/2 p-4 space-y-3 max-h-56 overflow-y-auto">
                {chatHistory.map((m, i) => (
                  <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
                    {m.role === "ai" && (
                      <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-sky-400" />
                      </div>
                    )}
                    <div className={cn(
                      "max-w-[80%] text-sm px-3.5 py-2.5 rounded-xl",
                      m.role === "user"
                        ? "bg-sky-500/15 text-sky-100 rounded-br-sm"
                        : "bg-white/5 text-slate-300 rounded-bl-sm"
                    )}>
                      {m.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Thinking */}
            {isGenerating && <ThinkingVisualizer active step={thinkStep} />}

            {/* Advisory card */}
            {generatedApp && chatHistory.length > 0 && (
              <AdvisoryCard prompt={chatHistory.find(m => m.role === "user")?.content || ""} />
            )}

            {/* Prompt input */}
            <div className="rounded-xl border border-white/5 bg-white/2 p-4">
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-sky-400" />
                Describe your app
              </h3>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
                placeholder="Example: Build a fitness tracker with AI coaching, workout logs, progress charts, and team challenges..."
                rows={4}
                className="w-full bg-[#0B1628] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-sky-500/30 resize-none transition-colors font-sans"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-slate-600 font-mono">⌘+Enter to generate</span>
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-semibold disabled:opacity-40 hover:from-sky-400 hover:to-indigo-500 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-sky-500/15"
                >
                  {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Sparkles className="w-4 h-4" /> Generate</>}
                </button>
              </div>
            </div>

            {/* Sample prompts */}
            <div className="space-y-2">
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wider">Quick Starts</p>
              {SAMPLE_PROMPTS.map((sp, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(sp)}
                  className="w-full text-left px-4 py-2.5 rounded-lg border border-white/5 bg-white/2 text-sm text-slate-400 hover:border-sky-500/20 hover:text-sky-300 hover:bg-sky-500/5 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Preview */}
          <div className="space-y-4">
            {!generatedApp && !isGenerating && (
              <div className="rounded-xl border border-white/5 bg-white/2 h-80 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/15 flex items-center justify-center mb-5">
                  <Sparkles className="w-8 h-8 text-sky-400/50" />
                </div>
                <p className="text-slate-500 text-sm">Your AI-generated app will preview here</p>
                <p className="text-slate-700 text-xs mt-1">Describe what you want and hit Generate</p>
              </div>
            )}

            {isGenerating && (
              <div className="rounded-xl border border-white/5 bg-white/2 p-6 space-y-4">
                <SkeletonPulse className="h-52 rounded-xl" />
                <SkeletonPulse className="h-5 w-3/4 rounded" />
                <SkeletonPulse className="h-4 w-1/2 rounded" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => <SkeletonPulse key={i} className="h-3 rounded" />)}
                </div>
              </div>
            )}

            {generatedApp && !isGenerating && (
              <div className="rounded-xl border border-white/5 bg-white/2 overflow-hidden">
                <div className="relative">
                  <img src={generatedApp.preview} alt={generatedApp.name} className="w-full h-56 object-cover bg-slate-800" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border border-white/20" style={{ background: generatedApp.icon.bg }}>
                      {generatedApp.icon.emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{generatedApp.name}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">Generated</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-500">{generatedApp.desc}</p>

                  <div className="space-y-1.5">
                    {generatedApp.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: generatedApp.icon.color }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={handleOpenPreview}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4" /> Live Preview
                    </button>
                    <button
                      onClick={() => setShowDeploy(true)}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium hover:bg-sky-500/20 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Rocket className="w-4 h-4" /> Deploy
                    </button>
                    <button
                      onClick={() => setShowExport(true)}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-white/10 text-slate-400 text-sm hover:border-white/20 hover:text-slate-200 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Package className="w-4 h-4" /> Export ZIP
                    </button>
                    <button
                      onClick={() => { toast.success("Share link copied!"); }}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-white/10 text-slate-400 text-sm hover:border-white/20 hover:text-slate-200 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DeployModal open={showDeploy} onClose={() => setShowDeploy(false)} appName={generatedApp?.name || "App"} />
      <ExportModal open={showExport} onClose={() => setShowExport(false)} appName={generatedApp?.name || "App"} />
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const ver = useVersion();
  const [state, setState] = useState<AppState>("landing");
  const [plan, setPlan] = useState<PlanKey>("free");
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(o => !o); }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get("action");
    if (action === "ai-builder") setState("ai-builder");
    else if (action === "dashboard") setState("dashboard");
  }, []);

  const nav = (s: AppState) => setState(s);

  return (
    <>
      {state === "landing" && (
        <LandingPage
          ver={ver}
          onLogin={() => nav("onboarding")}
          onStartAI={() => nav("ai-builder")}
          onShowPricing={() => nav("pricing")}
          onCmd={() => setCmdOpen(true)}
        />
      )}

      {state === "onboarding" && (
        <OnboardingFlow
          ver={ver}
          onComplete={() => nav("dashboard")}
          onShowPricing={() => nav("pricing")}
          onCmd={() => setCmdOpen(true)}
        />
      )}

      {state === "pricing" && (
        <PricingPlans
          ver={ver}
          selectedPlan={plan}
          onSelectPlan={p => { setPlan(p); nav("dashboard"); }}
          onBack={() => nav("onboarding")}
          onCmd={() => setCmdOpen(true)}
        />
      )}

      {state === "dashboard" && (
        <AppDashboard
          ver={ver}
          selectedPlan={plan}
          onShowPricing={() => nav("pricing")}
          onPlanChange={setPlan}
          onCmd={() => setCmdOpen(true)}
          onGoBuilder={() => nav("ai-builder")}
        />
      )}

      {state === "ai-builder" && (
        <AIBuilder
          ver={ver}
          onBack={() => nav("landing")}
          onCmd={() => setCmdOpen(true)}
        />
      )}

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={nav}
      />

      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: { background: "#080F1E", border: "1px solid rgba(56,189,248,0.15)", color: "#EEF2FF" },
        }}
      />
    </>
  );
}
