import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence
} from 'framer-motion';
import {
  ShieldCheck,
  Video as VideoIcon,
  Activity,
  Server,
  Microscope,
  Stethoscope,
  Smartphone,
  CheckCircle2,
  Menu,
  X,
  BrainCircuit,
  Lock,
  Globe,
  Zap
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from 'recharts';
import pelliscopeLogo from '../assets/img/pelliscope.png';
import demoDesktop from '../assets/video/pelliscope_preview.mp4';
import demoMobile from '../assets/video/pelliscope-mobile-ad1.mp4';
import vatsalPhoto from '../assets/members/Vatsal_Patel.jpg';
import abhijeetPhoto from '../assets/members/Abhijeet_Patel.jpg';
import nishiPhoto from '../assets/members/dr.nishi_crop.png';
import sauravPhoto from '../assets/members/Saurav_Roy.jpeg';
import scanSample from '../assets/img/scan-sample.jpeg';

// --- Constants & Data ---

const PERFORMANCE_DATA = [
  { name: 'Grok-4', auc: 0.70, color: '#475569' },
  { name: 'GPT-5', auc: 0.81, color: '#3b82f6' },
  { name: 'Gemini 2.5', auc: 0.82, color: '#6366f1' },
  { name: 'PelliScope', auc: 0.86, color: '#10b981' }, // Emerald for PelliScope
];

const TEAM_MEMBERS = [
  { name: "Vatsal Patel", role: "Founder & Research Engineer", edu: "M.Sc AI (IU Berlin)", photo: vatsalPhoto },
  { name: "Dr. Abhijeet Patel", role: "Clinical Research Physician", edu: "MBBS", photo: abhijeetPhoto },
  { name: "Dr. Nishi Seth", role: "Consultant Dermatologist", edu: "M.D Dermatology", photo: nishiPhoto },
  { name: "Saurav Roy", role: "Operations Head", edu: "M.Tech Biotechnology", photo: sauravPhoto },
];

const PRICING_MODELS = [
  {
    title: "API Integration",
    price: "$4k",
    period: "license + $0.5/query",
    features: ["Self-screening at scale", "Headless AI Component", "RESTful API Access"],
    highlight: false
  },
  {
    title: "On-Prem Deployment",
    price: "$15k",
    period: "/mo per instance",
    features: ["Full Telemedicine UI", "Hospital Deployments", "Data Sovereignty", "White-label Option"],
    highlight: true
  }
];

const DEMO_VIDEOS = [
  {
    title: "Desktop Console Demo",
    description: "Live capture from the PelliScope clinician console showing multi-angle intake and triage ranking.",
    src: demoDesktop,
    badge: "PC Demo"
  },
  {
    title: "Mobile Capture Demo",
    description: "Mobile-first capture loop for kiosks and at-home screening, optimized for on-device inference.",
    src: demoMobile,
    badge: "Mobile Demo"
  }
];

// --- Sub-Components ---

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-emerald-500/40 overflow-hidden">
      <img src={pelliscopeLogo} alt="PelliScope logo" className="w-full h-full object-contain" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-lg font-bold text-white tracking-tight">PelliScope</span>
      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Clinical AI</span>
    </div>
  </div>
);

const HawkFranklinBadge = () => (
  <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
    <div className="flex flex-col items-end leading-none">
      <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Innovated by</span>
      <span className="text-sm font-bold text-white">HawkFranklin <span className="text-amber-400">Research</span></span>
    </div>
  </div>
);

// --- The "Phone Kiosk" Simulation Component ---
// This loops through the app states automatically to demonstrate the workflow
const PhoneSimulation = () => {
  const [screen, setScreen] = useState(0);

  // Simulation Steps
  const SCREENS = ['welcome', 'scan', 'analyzing', 'binary', 'premium'];

  useEffect(() => {
    const timers = [
      3000, // welcome
      3000, // scan
      2000, // analyzing
      4000, // binary result
      5000  // premium result
    ];

    const timer = setTimeout(() => {
      setScreen((prev) => (prev + 1) % SCREENS.length);
    }, timers[screen]);

    return () => clearTimeout(timer);
  }, [screen]);

  const currentStep = SCREENS[screen];

  return (
    <div className="relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
      {/* Notch/Status Bar */}
      <div className="h-8 bg-gray-800 w-full absolute top-0 left-0 z-20 flex justify-center">
        <div className="h-4 w-32 bg-black rounded-b-xl"></div>
      </div>
      <div className="w-full pt-2 px-5 flex justify-between items-center z-20 absolute top-2">
        <span className="text-[10px] text-white font-medium">9:41</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="flex-1 bg-slate-950 relative overflow-hidden font-sans text-white">
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col items-center justify-center p-6 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center ring-1 ring-emerald-500/30">
                <Activity className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">PelliScope</h3>
                <p className="text-xs text-slate-400 mt-2">AI-Powered Dermatology Triage</p>
              </div>
              <button className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm mt-8">Begin Screening</button>
            </motion.div>
          )}

          {currentStep === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full bg-black relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-slate-800 animate-pulse opacity-50"></div> {/* Mock camera feed */}
                <div className="absolute w-48 h-48 rounded-2xl border-2 border-emerald-400 opacity-90 overflow-hidden shadow-[0_0_0_6px_rgba(16,185,129,0.12)]">
                  <motion.img
                    src={scanSample}
                    alt="Live capture preview"
                    className="w-full h-full object-cover"
                    animate={{ scale: [1, 1.05, 1], x: [-4, 4, -4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="absolute bottom-10 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="absolute top-12 left-0 w-full text-center">
                <span className="bg-black/50 px-3 py-1 rounded-full text-xs backdrop-blur-md">Align lesion in frame</span>
              </div>
            </motion.div>
          )}

          {currentStep === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <Microscope className="absolute inset-0 m-auto w-8 h-8 text-emerald-400 opacity-50" />
              </div>
              <p className="mt-6 text-sm font-medium animate-pulse">Analyzing tissue patterns...</p>
              <p className="text-[10px] text-slate-500 mt-1">Running CPU-Optimized Model</p>
            </motion.div>
          )}

          {currentStep === 'binary' && (
            <motion.div
              key="binary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -50 }}
              className="h-full p-5 flex flex-col"
            >
              <div className="mt-8 mb-4">
                <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Triage Result</p>
                <h3 className="text-lg font-bold">Screening Complete</h3>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl mb-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 blur-2xl rounded-full"></div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-semibold text-red-200">Infectious</span>
                  <span className="text-2xl font-bold text-red-400">78%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[78%]"></div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Non-infectious</span>
                  <span>22%</span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-[22%]"></div>
                </div>
              </div>

              <div className="mt-auto">
                <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3" /> Unlock Differential ($1)
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'premium' && (
            <motion.div
              key="premium"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="h-full p-5 flex flex-col overflow-hidden"
            >
              <div className="mt-8 mb-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Analysis</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Premium</span>
              </div>

              <div className="bg-slate-800/80 rounded-2xl p-4 border border-white/10 flex-1 space-y-3">
                {[
                  { label: "Tinea Corporis", val: 82, color: "bg-emerald-500" },
                  { label: "Eczema", val: 12, color: "bg-slate-600" },
                  { label: "Psoriasis", val: 4, color: "bg-slate-600" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.val}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-[10px] text-blue-200 leading-tight">
                  <strong>Recommendation:</strong> Use antifungal cream. Keep area dry. Consult doctor if spreading.
                </p>
              </div>

              <button className="w-full mt-4 py-3 border border-white/20 text-white rounded-xl font-bold text-xs">
                Connect to Specialist
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home Indicator */}
      <div className="h-1 w-20 bg-white/20 rounded-full mx-auto mb-2 absolute bottom-2 left-0 right-0 z-20"></div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">

      {/* --- Header --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#product" className="hover:text-emerald-400 transition-colors">Product</a>
            <a href="#workflow" className="hover:text-emerald-400 transition-colors">Workflow</a>
            <a href="#technology" className="hover:text-emerald-400 transition-colors">Technology</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <a href="#team" className="hover:text-emerald-400 transition-colors">Team</a>
            <a href="#demos" className="hover:text-emerald-400 transition-colors">Demos</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <HawkFranklinBadge />
            <button className="px-5 py-2.5 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-emerald-50 transition-colors shadow-lg shadow-white/5">
              Schedule Demo
            </button>
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
            >
              <nav className="flex flex-col p-4 space-y-4 text-sm font-medium">
                <a href="#product" onClick={() => setMobileMenuOpen(false)}>Product</a>
                <a href="#workflow" onClick={() => setMobileMenuOpen(false)}>Workflow</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <a href="#team" onClick={() => setMobileMenuOpen(false)}>Team</a>
                <a href="#demos" onClick={() => setMobileMenuOpen(false)}>Demos</a>
                <div className="pt-2 border-t border-white/10">
                  <HawkFranklinBadge />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* --- Hero Section --- */}
      <section id="product" className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Hero Left: Text & Value Prop */}
            <div className="lg:w-1/2 space-y-8 z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Zap className="w-3 h-3" /> CPU-Optimized AI
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                PelliScope <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Clinical Vision
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Clinically validated dermatology workflow ready for deployment.
                Triage patients, detect infectious risks, and support diagnosis
                with our on-device AI kiosk.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#demos" className="px-8 py-4 rounded-2xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                  <VideoIcon className="w-5 h-5" /> Watch Demo
                </a>
                <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Server className="w-5 h-5" /> View Docs
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 text-left">
                {[
                  { label: "Free Check-up", desc: "Infectious screen" },
                  { label: "Paid Pathway", desc: "Differential diagnosis" },
                  { label: "No GPU Needed", desc: "Runs on generic hardware" },
                  { label: "99.9% Uptime", desc: "Offline-capable mode" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold text-sm">{item.label}</p>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Right: Phone Simulation */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
              <div className="relative z-10">
                <PhoneSimulation />

                {/* Floating Elements around phone */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 -left-40 lg:-left-48 bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl max-w-[180px] hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Validated</span>
                  </div>
                  <p className="text-[10px] text-slate-300">80.2% Balanced Accuracy on technical validation set.</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-8 -right-40 lg:-right-48 bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl max-w-[180px] hidden md:block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="w-5 h-5 text-blue-400" />
                    <span className="text-xs font-bold text-white">Clinician Mode</span>
                  </div>
                  <p className="text-[10px] text-slate-300">Seamless hand-off to tele-medicine dashboard.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Demo Videos --- */}
      <section id="demos" className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold uppercase text-emerald-400 tracking-[0.2em]">Live Product Footage</p>
              <h2 className="text-3xl font-bold text-white mt-2">See PelliScope in Action</h2>
              <p className="text-slate-400 mt-2 max-w-2xl">Desktop console and mobile intake flows captured from the current build.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {DEMO_VIDEOS.map((demo, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-video bg-black">
                  <video src={demo.src} controls muted playsInline className="w-full h-full object-cover">
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-4 left-4 bg-black/60 text-xs text-white px-3 py-1 rounded-full border border-white/10">
                    {demo.badge}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <VideoIcon className="w-5 h-5 text-emerald-400" /> {demo.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2">{demo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Tech Specs & Features --- */}
      <section id="technology" className="py-20 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Chart */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-white/10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6">Zero-Shot Performance (AUC)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PERFORMANCE_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                    <XAxis type="number" domain={[0.6, 0.9]} hide />
                    <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                    />
                    <Bar dataKey="auc" radius={[0, 4, 4, 0]} barSize={24}>
                      {PERFORMANCE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center">
                PelliScope outperforms standard general-purpose models on dermatology benchmarks.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Technical Superiority</h2>
                <p className="text-slate-400">
                  Built on a hybrid CNN/Transformer pipeline trained on diverse datasets including ISIC and proprietary dermoscopy images.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Multi-Label Predictions</h4>
                    <p className="text-sm text-slate-400 mt-1">Simultaneously screens for 10+ conditions including Eczema, Psoriasis, Tinea, and infectious diseases.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Server className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Privacy-First Architecture</h4>
                    <p className="text-sm text-slate-400 mt-1">Can be deployed on-premise. Patient data never leaves your secure infrastructure if required.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Global Scalability</h4>
                    <p className="text-sm text-slate-400 mt-1">Operational in UAE and USA. Adaptable to regional skin tone variations (Fitzpatrick scales).</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Workflow / Use Cases --- */}
      <section id="workflow" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Unified Clinical Workflow</h2>
            <p className="text-slate-400 mt-2">Connecting patients, kiosks, and clinicians in one loop.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-slate-900 rounded-3xl p-8 border border-white/5 hover:border-emerald-500/30 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">1. Patient Kiosk</h3>
                <p className="text-sm text-slate-400">Patient interacts with the tablet/phone. AI performs instant triage (Infectious vs Non-Infectious) and offers differential diagnosis for a micro-fee.</p>
              </div>
            </div>

            <div className="group bg-slate-900 rounded-3xl p-8 border border-white/5 hover:border-blue-500/30 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                  <Server className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">2. Processing Core</h3>
                <p className="text-sm text-slate-400">Images are processed via our Derm Foundation Encoder. Probability scores are generated, and cases are flagged by urgency level.</p>
              </div>
            </div>

            <div className="group bg-slate-900 rounded-3xl p-8 border border-white/5 hover:border-purple-500/30 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">3. Clinician Dashboard</h3>
                <p className="text-sm text-slate-400">Doctors review pre-analyzed cases. High-risk patients are prioritized. Tele-consultations can be initiated instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Pricing --- */}
      <section id="pricing" className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Deployment Models</h2>
            <p className="text-slate-400 mt-2">Flexible licensing for clinics, hospitals, and telemedicine startups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PRICING_MODELS.map((plan, i) => (
              <div key={i} className={`rounded-3xl p-8 border ${plan.highlight ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500/50' : 'bg-slate-900/50 border-white/10'} relative overflow-hidden`}>
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-slate-400">{plan.period}</span>
                </div>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-sm text-slate-300">{feat}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-8 py-3 rounded-xl font-bold text-sm transition-colors ${plan.highlight ? 'bg-emerald-500 hover:bg-emerald-400 text-white' : 'bg-white text-slate-900 hover:bg-slate-200'}`}>
                  Contact Sales
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Team --- */}
      <section id="team" className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-10">Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                <div className="w-32 h-32 bg-slate-800 rounded-full mb-4 flex items-center justify-center text-slate-500 font-bold text-xl overflow-hidden border border-white/10">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <h4 className="text-white font-bold">{member.name}</h4>
                <p className="text-emerald-400 text-xs font-medium uppercase tracking-wide mt-1">{member.role}</p>
                <p className="text-slate-500 text-xs mt-2">{member.edu}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo />
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
              Advancing science through deep‑tech AI research and clinical‑grade product engineering.
            </p>
          </div>

          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Research</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white/5 text-center md:text-left text-xs text-slate-600">
          © {new Date().getFullYear()} HawkFranklin Research. All rights reserved. PelliScope is a research tool, not a diagnostic device.
        </div>
      </footer>

    </div>
  );
}
