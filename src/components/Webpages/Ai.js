import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

// ─── Icons (inline SVG to avoid import errors) ───────────────────────────────
const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d={d} />
  </svg>
);
const ICONS = {
  robot:   "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.72A2 2 0 0 1 10 4a2 2 0 0 1 2-2M7 14v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2H7m-4 4v2h18v-2H3m6-8a1 1 0 1 0 0 2 1 1 0 0 0 0-2m6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2",
  brain:   "M13 3c3.9 0 7 3.1 7 7 0 2.8-1.6 5.2-4 6.4V20a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-3.6C5.6 15.2 4 12.8 4 10c0-3.9 3.1-7 7-7h2m-2 2C8.2 5 6 7.2 6 10c0 2.1 1.2 3.9 3 4.8V19h6v-4.2c1.8-.9 3-2.7 3-4.8 0-2.8-2.2-5-5-5h-2z",
  cogs:    "M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.3.07-.62.07-.93s-.03-.63-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.31-.09.63-.09.94s.04.64.09.94l-2.03 1.58c-.18.14-.24.4-.12.6l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.21.07-.47-.12-.61l-2.01-1.58z",
  chart:   "M16 11.78l4.24-7.33 1.73 1-5.23 9.05-6.69-3.88-4.23 7.32L4.08 17l5.23-9.05L16 11.78M5 21h14v-2H5v2z",
  cloud:   "M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z",
  chip:    "M9 3H7v2H5v2H3v2h2v2H3v2h2v2H3v2h2v2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v-2h2v-2h-2v-2h2v-2h-2V9h2V7h-2V5h-2V3h-2v2h-2V3H9m0 4h6v10H9V7M9 9v6h6V9H9",
  network: "M15 20a1 1 0 0 0 1-1v-1h1a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1v1a1 1 0 0 0 1 1h6M7 8h10v8H7V8m3 2v4h4v-4h-4m-7-6V2H1v2H0v2h1v2h2V6h1V4H3M23 4V2h-2v2h-1v2h1v2h2V6h1V4h-1",
  server:  "M4 1h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 8h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m0 8h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m1 2v2h2v-2H5m0-8v2h2v-2H5m0-8v2h2V3H5",
  globe:   "M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 4",
  send:    "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z",
  user:    "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4",
  mail:    "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5v2z",
  building:"M6 2v20h12V2H6m2 2h8v2H8V4m0 4h8v2H8V8m0 4h8v2H8v-2m0 4h8v2H8v-2",
  phone:   "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  check:   "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  close:   "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  sparkle: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.4 2.4-7.4L2 9.4h7.6z",
  chat:    "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2",
};

// ─── Data ────────────────────────────────────────────────────────────────────
const infrastructure = [
  { icon: "server",  title: "Enterprise GPU Clusters",     stat: "500+ TFLOPS",   desc: "NVIDIA H100 & A100 clusters powering next-gen model training with 99.99% uptime SLA." },
  { icon: "network", title: "Neural Network Backbone",     stat: "0.3ms Latency", desc: "Ultra-low latency fiber optic mesh connecting 40+ global data centers for distributed AI." },
  { icon: "cloud",   title: "Multi-Cloud Orchestration",   stat: "Auto-Scale",    desc: "Seamless workload distribution across AWS, Azure, GCP with intelligent auto-scaling." },
  { icon: "chip",    title: "Edge AI Processing",          stat: "10M+ Infer/s",  desc: "Real-time inference at the edge with dedicated TPU arrays for mission-critical applications." },
];

const services = [
  { icon: "robot",   title: "Conversational AI",   tag: "GPT-4 / Claude",   desc: "Human-like dialogue systems with emotional intelligence, multilingual support, and contextual memory.", color: "#6366f1" },
  { icon: "brain",   title: "Cognitive Intelligence", tag: "Deep Learning",  desc: "Self-learning neural architectures that adapt to your business logic for autonomous decision-making.", color: "#0ea5e9" },
  { icon: "cogs",    title: "Hyper-Automation",    tag: "RPA / IPA / BPM",  desc: "End-to-end process automation combining RPA, AI, and IoT to eliminate operational bottlenecks.", color: "#10b981" },
  { icon: "chart",   title: "Predictive Analytics", tag: "Big Data / BI",   desc: "Real-time data pipelines transforming raw information into strategic foresight and anomaly detection.", color: "#f59e0b" },
  { icon: "globe",   title: "AI Infrastructure",   tag: "MLOps / DevOps",   desc: "World-class MLOps platforms with model versioning, A/B testing, and continuous deployment.", color: "#8b5cf6" },
  { icon: "sparkle", title: "Generative AI",        tag: "LLMs / Diffusion", desc: "Custom foundation models for content generation, code synthesis, design creation, and data augmentation.", color: "#ec4899" },
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "40+",   label: "Global Nodes" },
  { value: "10M+",  label: "Daily Inferences" },
  { value: "500+",  label: "AI Models Deployed" },
];

const aiServices = ["AI Chatbots","Machine Learning","Process Automation","Data Analytics","Computer Vision","NLP Solutions","Predictive Modeling","AI Infrastructure"];

// ─── Component ───────────────────────────────────────────────────────────────
export default function AIML() {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", company:"", phone:"", serviceType:"", budget:"", message:"", aiInterest:[] });

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const toggleService = s => setForm(p => ({ ...p, aiInterest: p.aiInterest.includes(s) ? p.aiInterest.filter(x=>x!==s) : [...p.aiInterest, s] }));
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setShowEnquiry(false); setSubmitted(false); setStep(1); setForm({ name:"",email:"",company:"",phone:"",serviceType:"",budget:"",message:"",aiInterest:[] }); }, 3000);
  };

  const inputCls = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all text-gray-800 placeholder-gray-400 text-sm";
  const selectCls = inputCls + " cursor-pointer";

  return (

    
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }} className="bg-white text-gray-900 overflow-x-hidden">
<Header />
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center" style={{ background: "linear-gradient(135deg, #f8faff 0%, #eef2ff 50%, #faf5ff 100%)" }}>
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div style={{ position:"absolute", top:-100, right:-100, width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
          <div style={{ position:"absolute", bottom:-150, left:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)" }} />
          {/* Grid overlay */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)", backgroundSize:"48px 48px" }} />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
                style={{ background:"rgba(99,102,241,0.08)", color:"#6366f1", border:"1px solid rgba(99,102,241,0.2)" }}>
                <Icon d={ICONS.sparkle} size={14}/> Next-Gen AI Infrastructure
              </div>

              <h1 style={{ fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:800, lineHeight:1.1, letterSpacing:"-0.03em" }} className="mb-6">
                Where{" "}
                <span style={{ background:"linear-gradient(135deg,#6366f1,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  Human Intelligence
                </span>
                <br/>Meets AI Evolution
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-lg">
                Pioneering the convergence of human creativity and artificial intelligence through world-class infrastructure that amplifies human potential across every industry.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <button onClick={() => setShowEnquiry(true)}
                  className="flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-white transition-all duration-300"
                  style={{ background:"linear-gradient(135deg,#6366f1,#0ea5e9)", boxShadow:"0 8px 32px rgba(99,102,241,0.3)" }}
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
                  <Icon d={ICONS.chat} size={18}/> AI Enquiry
                </button>
                <button className="flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:border-indigo-300 text-gray-700 transition-all duration-300"
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
                  Schedule Demo
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.4 + i*0.1 }}
                    className="text-center p-4 rounded-2xl" style={{ background:"white", boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize:"1.5rem", fontWeight:800, background:"linear-gradient(135deg,#6366f1,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{s.value}</div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right – visual card stack */}
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.8 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ boxShadow:"0 32px 80px rgba(99,102,241,0.2)" }}>
                <div style={{ height:420, background:"linear-gradient(135deg,#1e1b4b,#312e81,#0c4a6e)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                  {/* Animated circles */}
                  {[...Array(3)].map((_,i) => (
                    <motion.div key={i} animate={{ scale:[1,1.2,1], opacity:[0.15,0.3,0.15] }} transition={{ repeat:Infinity, duration:3+i, delay:i*0.8 }}
                      style={{ position:"absolute", width:150+i*120, height:150+i*120, borderRadius:"50%", border:`1px solid rgba(99,102,241,${0.4-i*0.1})` }} />
                  ))}
                  <div style={{ textAlign:"center", color:"white", position:"relative", zIndex:2 }}>
                    <motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity, duration:20, ease:"linear" }}
                      style={{ width:80, height:80, margin:"0 auto 16px", borderRadius:"50%", background:"linear-gradient(135deg,rgba(99,102,241,0.8),rgba(14,165,233,0.8))", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Icon d={ICONS.brain} size={36}/>
                    </motion.div>
                    <p style={{ fontSize:"1.5rem", fontWeight:700 }}>Neural Processing</p>
                    <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.875rem", marginTop:4 }}>Active Learning Mode</p>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity, duration:3 }}
                style={{ position:"absolute", bottom:24, left:-24, background:"white", borderRadius:16, padding:"12px 16px", boxShadow:"0 8px 32px rgba(0,0,0,0.12)", minWidth:180 }}>
                <div className="flex items-center gap-2 mb-1">
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"#10b981" }} className="animate-pulse"/>
                  <span style={{ fontSize:"0.75rem", fontWeight:600, color:"#1f2937" }}>Live Model Training</span>
                </div>
                <p style={{ fontSize:"0.7rem", color:"#6b7280" }}>GPT-4 Fine-tuning · 78%</p>
                <div style={{ marginTop:8, height:4, borderRadius:2, background:"#f3f4f6", overflow:"hidden" }}>
                  <motion.div style={{ height:"100%", background:"linear-gradient(90deg,#6366f1,#0ea5e9)", borderRadius:2 }} initial={{ width:0 }} animate={{ width:"78%" }} transition={{ duration:2, delay:1 }}/>
                </div>
              </motion.div>

              <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:4, delay:1 }}
                style={{ position:"absolute", top:24, right:-20, background:"white", borderRadius:16, padding:"12px 16px", boxShadow:"0 8px 32px rgba(0,0,0,0.12)" }}>
                <div style={{ fontSize:"1.25rem", fontWeight:800, color:"#6366f1" }}>500+</div>
                <div style={{ fontSize:"0.7rem", color:"#6b7280", fontWeight:500 }}>Models Deployed</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE ── */}
      <section className="py-24" style={{ background:"#f9fafb" }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <h2 style={{ fontSize:"2.5rem", fontWeight:800, letterSpacing:"-0.02em" }} className="mb-4">
              World-Class <span style={{ color:"#6366f1" }}>Infrastructure</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Enterprise-grade compute, storage, and networking built specifically for AI workloads at planetary scale.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructure.map((item, i) => (
              <motion.div key={i} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="group p-8 bg-white rounded-3xl transition-all duration-300 cursor-default"
                style={{ boxShadow:"0 2px 20px rgba(0,0,0,0.06)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow="0 12px 40px rgba(99,102,241,0.15)"; e.currentTarget.style.transform="translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow="0 2px 20px rgba(0,0,0,0.06)"; e.currentTarget.style.transform="translateY(0)"; }}>
                <div className="mb-5 p-3 inline-flex rounded-2xl" style={{ background:"rgba(99,102,241,0.08)", color:"#6366f1" }}>
                  <Icon d={ICONS[item.icon]} size={28}/>
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background:"rgba(99,102,241,0.08)", color:"#6366f1" }}>{item.stat}</div>
                <h3 style={{ fontWeight:700, fontSize:"1rem" }} className="mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <h2 style={{ fontSize:"2.5rem", fontWeight:800, letterSpacing:"-0.02em" }} className="mb-4">
              AI <span style={{ background:"linear-gradient(135deg,#6366f1,#0ea5e9)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Capabilities</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Comprehensive AI solutions engineered for enterprise transformation and human-AI collaboration.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div key={i} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="group p-8 rounded-3xl border-2 border-gray-100 transition-all duration-300 cursor-default relative overflow-hidden"
                onMouseEnter={e => { e.currentTarget.style.borderColor=svc.color+"40"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 16px 48px ${svc.color}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=""; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=""; }}>
                {/* Top accent */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${svc.color},${svc.color}80)`, borderRadius:"0 0 2px 2px", opacity:0, transition:"opacity 0.3s" }}
                  className="group-hover:opacity-100"/>

                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-2xl" style={{ background:`${svc.color}12`, color:svc.color }}>
                    <Icon d={ICONS[svc.icon]} size={24}/>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background:"#f3f4f6", color:"#6b7280" }}>{svc.tag}</span>
                </div>

                <h3 style={{ fontWeight:700, fontSize:"1.125rem" }} className="mb-3">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{svc.desc}</p>

                <button onClick={() => setShowEnquiry(true)} className="flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color:svc.color }}
                  onMouseEnter={e => e.currentTarget.style.gap="10px"} onMouseLeave={e => e.currentTarget.style.gap="8px"}>
                  Enquire Now <Icon d={ICONS.send} size={14}/>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24" style={{ background:"linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#0c4a6e 100%)" }}>
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:800, color:"white", letterSpacing:"-0.02em" }} className="mb-5">
              Ready to Build the <span style={{ color:"#93c5fd" }}>Future?</span>
            </h2>
            <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"1.125rem", maxWidth:520, margin:"0 auto 40px" }}>
              Join 500+ enterprises already leveraging our AI infrastructure to redefine what is possible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setShowEnquiry(true)}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300"
                style={{ background:"linear-gradient(135deg,#6366f1,#0ea5e9)", boxShadow:"0 8px 32px rgba(99,102,241,0.4)" }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                <Icon d={ICONS.chat} size={20}/> Start AI Enquiry
              </button>
              <button className="px-8 py-4 rounded-2xl font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300">
                Talk to Expert
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ENQUIRY MODAL ── */}
      <AnimatePresence>
        {showEnquiry && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background:"rgba(15,23,42,0.6)", backdropFilter:"blur(8px)" }}
            onClick={() => !submitted && setShowEnquiry(false)}>
            <motion.div initial={{ scale:0.92, opacity:0, y:24 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:0.92, opacity:0, y:24 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-3xl overflow-hidden"
              style={{ maxHeight:"90vh", overflowY:"auto", boxShadow:"0 32px 80px rgba(0,0,0,0.25)" }}>

              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background:"linear-gradient(135deg,#6366f1,#0ea5e9)" }}>
                    <Icon d={ICONS.robot} size={20}/>
                  </div>
                  <div>
                    <h3 style={{ fontWeight:700, fontSize:"1.125rem" }}>AI Project Enquiry</h3>
                    <p className="text-xs text-gray-400">{submitted ? "Complete" : `Step ${step} of 3`}</p>
                  </div>
                </div>
                {!submitted && (
                  <button onClick={() => setShowEnquiry(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                    <Icon d={ICONS.close} size={18}/>
                  </button>
                )}
              </div>

              {/* Progress */}
              {!submitted && (
                <div className="px-6 pt-4">
                  <div style={{ height:4, borderRadius:2, background:"#f3f4f6", overflow:"hidden" }}>
                    <motion.div style={{ height:"100%", borderRadius:2, background:"linear-gradient(90deg,#6366f1,#0ea5e9)" }} animate={{ width:`${(step/3)*100}%` }} transition={{ duration:0.3 }}/>
                  </div>
                </div>
              )}

              {/* Body */}
              <div className="p-6">
                {submitted ? (
                  <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="text-center py-10">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background:"rgba(16,185,129,0.1)" }}>
                      <Icon d={ICONS.check} size={36}/>
                    </div>
                    <h3 style={{ fontWeight:800, fontSize:"1.5rem" }} className="mb-2">Enquiry Submitted!</h3>
                    <p className="text-gray-500 mb-1">Thank you, {form.name}!</p>
                    <p className="text-gray-400 text-sm">Our AI specialists will reach out within 24 hours.</p>
                    <div className="mt-6 p-4 rounded-2xl text-sm text-gray-500" style={{ background:"#f9fafb" }}>
                      Reference ID: <span style={{ color:"#6366f1", fontFamily:"monospace", fontWeight:600 }}>AI-{Date.now().toString(36).toUpperCase()}</span>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Step 1 */}
                    {step === 1 && (
                      <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} className="space-y-4">
                        <h4 style={{ fontWeight:700, color:"#6366f1" }} className="mb-5">Your Information</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">Full Name *</label>
                            <input type="text" name="name" required value={form.name} onChange={handleChange} className={inputCls} placeholder="John Doe"/>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">Email *</label>
                            <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputCls} placeholder="john@company.com"/>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">Company</label>
                            <input type="text" name="company" value={form.company} onChange={handleChange} className={inputCls} placeholder="Acme Inc."/>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone</label>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputCls} placeholder="+1 (555) 000-0000"/>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                      <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} className="space-y-5">
                        <h4 style={{ fontWeight:700, color:"#6366f1" }} className="mb-5">AI Requirements</h4>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-2">Services of Interest</label>
                          <div className="grid grid-cols-2 gap-2">
                            {aiServices.map(s => (
                              <button key={s} type="button" onClick={() => toggleService(s)}
                                className="flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200"
                                style={form.aiInterest.includes(s) ? { borderColor:"#6366f1", background:"rgba(99,102,241,0.06)", color:"#6366f1" } : { borderColor:"#e5e7eb", background:"white", color:"#6b7280" }}>
                                {form.aiInterest.includes(s) && <Icon d={ICONS.check} size={14}/>}
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">Project Type</label>
                            <select name="serviceType" value={form.serviceType} onChange={handleChange} className={selectCls}>
                              <option value="">Select type...</option>
                              <option value="new">New AI Implementation</option>
                              <option value="upgrade">Upgrade Existing System</option>
                              <option value="consulting">AI Consulting</option>
                              <option value="research">R&D Partnership</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">Budget Range</label>
                            <select name="budget" value={form.budget} onChange={handleChange} className={selectCls}>
                              <option value="">Select budget...</option>
                              <option value="5k-25k">$5,000 – $25,000</option>
                              <option value="25k-100k">$25,000 – $100,000</option>
                              <option value="100k-500k">$100,000 – $500,000</option>
                              <option value="500k+">$500,000+</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                      <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} className="space-y-5">
                        <h4 style={{ fontWeight:700, color:"#6366f1" }} className="mb-5">Project Details</h4>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1.5">Describe Your AI Vision *</label>
                          <textarea name="message" required rows={5} value={form.message} onChange={handleChange} className={inputCls + " resize-none"} placeholder="Tell us about your project goals, challenges, and expected outcomes..."/>
                        </div>
                        <div className="p-4 rounded-2xl flex gap-3" style={{ background:"rgba(99,102,241,0.05)", border:"1px solid rgba(99,102,241,0.15)" }}>
                          <Icon d={ICONS.sparkle} size={16}/>
                          <div>
                            <p style={{ fontSize:"0.8rem", fontWeight:600, color:"#6366f1" }} className="mb-0.5">AI-Powered Analysis</p>
                            <p className="text-xs text-gray-500">Our system will match you with the optimal AI architecture and specialist team automatically.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Nav */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                      {step > 1 ? (
                        <button type="button" onClick={() => setStep(p=>p-1)} className="px-6 py-3 rounded-xl border-2 border-gray-200 font-medium text-gray-600 hover:border-gray-300 transition-colors">
                          Back
                        </button>
                      ) : <div/>}
                      {step < 3 ? (
                        <button type="button" onClick={() => setStep(p=>p+1)}
                          className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white transition-all"
                          style={{ background:"linear-gradient(135deg,#6366f1,#0ea5e9)" }}>
                          Next Step <Icon d={ICONS.send} size={14}/>
                        </button>
                      ) : (
                        <button type="submit"
                          className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white transition-all"
                          style={{ background:"linear-gradient(135deg,#6366f1,#0ea5e9)" }}>
                          <Icon d={ICONS.send} size={14}/> Submit Enquiry
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button initial={{ scale:0 }} animate={{ scale:1 }} whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
        onClick={() => setShowEnquiry(true)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white"
        style={{ background:"linear-gradient(135deg,#6366f1,#0ea5e9)", boxShadow:"0 8px 32px rgba(99,102,241,0.4)" }}>
        <Icon d={ICONS.chat} size={22}/>

    
      </motion.button>
      <Footer />
    </div>
  );
}