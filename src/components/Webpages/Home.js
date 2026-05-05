import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight, FaRobot, FaGlobe, FaCloud, FaCode,
  FaCheck, FaTimes, FaStar, FaQuoteLeft, FaPhone,
  FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaBolt,
  FaShieldAlt, FaRocket, FaHeadset, FaChevronDown,
  FaChevronUp, FaTimes as FaClose, FaCalendarCheck,
  FaUsers, FaAward, FaClock
} from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

/* ── asset imports ── */
import coga from "../../assests/coga.svg";
import ase from "../../assests/ase.jpeg";
import vels from "../../assests/Vel 24.png";
import herito from "../../assests/herito.jpeg";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */
const SERVICES = [
  {
    num: "01",
    title: "Website Development",
    desc: "Stunning, responsive websites that convert visitors into customers. Starting at ₹5,999.",
    icon: FaGlobe,
    href: "/web",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "CMS Integration"],
  },
  {
    num: "02",
    title: "App Development",
    desc: "Native & cross-platform mobile apps that users love. iOS, Android & Flutter.",
    icon: FaCode,
    href: "/app",
    features: ["iOS & Android", "Flutter/React Native", "API Integration", "App Store Ready"],
  },
  {
    num: "03",
    title: "Digital Marketing",
    desc: "Data-driven strategies to grow your brand and drive qualified leads.",
    icon: FaRocket,
    href: "/marketing",
    features: ["SEO & SEM", "Social Media", "Content Strategy", "Analytics"],
  },
  {
    num: "04",
    title: "AI Automation",
    desc: "Intelligent automation solutions that streamline your business operations.",
    icon: FaRobot,
    href: "/ai",
    features: ["Chatbots", "Workflow Auto", "Data Analysis", "ML Models"],
  },
];

const COMPARISON = {
  others: [
    "3-6 month delivery timelines",
    "Slow & unclear communication",
    "Generic template-based designs",
    "Hidden costs & surprise bills",
    "No post-launch support",
    "Junior devs, senior-level prices",
    "You're just another invoice",
  ],
  poeage: [
    "2-4 week turnaround, guaranteed",
    "Daily updates via WhatsApp & email",
    "100% custom, conversion-first design",
    "Transparent fixed pricing — always",
    "30-day free post-launch support",
    "Senior engineers on every project",
    "You're our #1 priority, not a number",
  ],
};

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "CEO, TechStart India",
    text: "Poeage delivered our e-commerce site in just 3 weeks. The quality exceeded our expectations and sales jumped 40%.",
    rating: 5,
    avatar: "R",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Priya Sharma",
    role: "Founder, StyleHub",
    text: "Best decision ever! Got my business website for just ₹5,999. Professional, fast, and exactly what I envisioned.",
    rating: 5,
    avatar: "P",
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Arun Nair",
    role: "Director, CloudScale",
    text: "The mobile app they built for us has 50K+ downloads. Their team is incredibly talented and responsive.",
    rating: 5,
    avatar: "A",
    color: "bg-green-100 text-green-600",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discovery Call", desc: "Free 15-min call to understand your vision", icon: FaPhone },
  { num: "02", title: "Strategy", desc: "We craft a detailed plan with timelines", icon: FaCalendarCheck },
  { num: "03", title: "Design", desc: "Stunning mockups for your approval", icon: FaUsers },
  { num: "04", title: "Develop", desc: "Clean code with weekly demos", icon: FaCode },
  { num: "05", title: "Launch", desc: "Go live with 30-day free support", icon: FaRocket },
];

const WHY_FEATURES = [
  { title: "Lightning Fast", desc: "2-4 week delivery on most projects", icon: FaBolt, color: "text-amber-500 bg-amber-50" },
  { title: "Transparent Pricing", desc: "Fixed prices, no hidden costs ever", icon: FaShieldAlt, color: "text-emerald-500 bg-emerald-50" },
  { title: "Expert Team", desc: "Senior developers on every project", icon: FaAward, color: "text-blue-500 bg-blue-50" },
  { title: "Always Available", desc: "WhatsApp support 7 days a week", icon: FaHeadset, color: "text-purple-500 bg-purple-50" },
];

const CLIENTS = [
  {  src: coga },
  { src: herito },
  { src: ase },
  { src: vels },
];

const FAQS = [
  {
    q: "How much does a website cost?",
    a: "Our websites start at just ₹5,999 for a professional business site. E-commerce and custom solutions are priced based on features. We provide transparent, fixed quotes with no hidden fees.",
  },
  {
    q: "How long does it take to build?",
    a: "Most websites are delivered within 2-4 weeks. Simple landing pages can be ready in 1 week. We provide a detailed timeline during our discovery call.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes! Every project includes 30 days of free post-launch support. After that, we offer affordable maintenance packages starting at ₹999/month.",
  },
  {
    q: "Can I see my project progress?",
    a: "Absolutely! We provide daily updates via WhatsApp and weekly demo calls. You'll have a dedicated project manager throughout the process.",
  },
  {
    q: "What technologies do you use?",
    a: "We use React, Next.js, Node.js, Flutter, and other modern technologies. We choose the best stack based on your specific requirements and budget.",
  },
];

const NOTIFICATIONS = [
  { name: "Rahul K.", action: "launched their mobile app", time: "2 min ago", avatar: "R", color: "bg-blue-500" },
  { name: "Meera J.", action: "requested a UI/UX design", time: "5 min ago", avatar: "M", color: "bg-pink-500" },
  { name: "Vikram S.", action: "got their website live", time: "12 min ago", avatar: "V", color: "bg-green-500" },
];

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [currentNotif, setCurrentNotif] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotif((prev) => (prev + 1) % NOTIFICATIONS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <HeroSection navigate={navigate} setShowQuoteModal={setShowQuoteModal} />
      <ClientsSection />
      <ServicesSection navigate={navigate} setShowQuoteModal={setShowQuoteModal} />
      <ComparisonSection setShowQuoteModal={setShowQuoteModal} />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection setShowQuoteModal={setShowQuoteModal} />
      <Footer />
      <QuoteModal show={showQuoteModal} onClose={() => setShowQuoteModal(false)} />
    </div>
  );
}


/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */
function HeroSection({ navigate, setShowQuoteModal }) {
  return (
    <section className="relative overflow-hidden bg-white px-5 pt-16 pb-20 md:px-12 md:pt-20 md:pb-28 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-50/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-50/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl text-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              We Build Websites, Apps & Brands
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            We Build{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Poeage
            </span>
            <br />
            Digital Solutions
          </motion.h1>

          <motion.p variants={fadeInUp} className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
            From concept to launch — we craft world-class websites, mobile apps,
            and digital marketing strategies that help ambitious businesses scale and succeed.
            <span className="mt-2 block font-semibold text-blue-600">
              Starting at just ₹5,999
            </span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowQuoteModal(true)}
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"
            >
              Start Your Project
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate("/work")}
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98]"
            >
              View Our Work
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><FaCheck className="text-green-500" /> 100% Satisfaction</span>
            <span className="flex items-center gap-1.5"><FaCheck className="text-green-500" /> 24h Response</span>
            <span className="flex items-center gap-1.5"><FaCheck className="text-green-500" /> 4+ Years Exp.</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════
   CLIENTS SECTION
   ═══════════════════════════════════════════════ */
function ClientsSection() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/50 py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-12 lg:px-20">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-slate-400">
          Trusted by innovative brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-center gap-3 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
            >
              <img src={client.src} alt={client.name} className="h-8 w-auto object-contain md:h-10" />
              <span className="text-lg font-bold text-slate-700">{client.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════════ */
function ServicesSection({ navigate, setShowQuoteModal }) {
  return (
    <section className="bg-white px-5 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeInUp} className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            Our Services
          </motion.span>
          <motion.h2 variants={fadeInUp} className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Everything You Need to{" "}
            <span className="text-blue-600">Grow Online</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto max-w-2xl text-lg text-slate-500">
            Professional digital solutions tailored for Indian businesses. Quality work at unbeatable prices.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon />
                  </div>
                  <span className="text-sm font-bold text-slate-300">{service.num}</span>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-slate-900">{service.title}</h3>
                <p className="mb-6 text-slate-500">{service.desc}</p>

                <div className="mb-6 grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <FaCheck className="text-xs text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Get Quote
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   COMPARISON SECTION
   ═══════════════════════════════════════════════ */
function ComparisonSection({ setShowQuoteModal }) {
  return (
    <section className="bg-slate-50 px-5 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeInUp} className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            Why Poeage?
          </motion.span>
          <motion.h2 variants={fadeInUp} className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Not All Agencies Are{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Created Equal
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto max-w-2xl text-lg text-slate-500">
            Most agencies overpromise and underdeliver. Here's how we're genuinely different — backed by results.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-red-100 bg-white p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                <FaTimes />
              </div>
              <h3 className="text-xl font-bold text-slate-400">Other Agencies</h3>
            </div>
            <ul className="space-y-4">
              {COMPARISON.others.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-400">
                  <FaTimes className="mt-1 text-xs text-red-300" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border-2 border-blue-200 bg-white p-8 shadow-lg"
          >
            <div className="absolute -top-3 right-6 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
              BEST CHOICE
            </div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaCheck />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Poeage Technology</h3>
            </div>
            <ul className="space-y-4">
              {COMPARISON.poeage.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <FaCheck className="mt-1 text-xs text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => setShowQuoteModal(true)}
            className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98]"
          >
            Start Working with the Best
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROCESS SECTION
   ═══════════════════════════════════════════════ */
function ProcessSection() {
  return (
    <section className="bg-white px-5 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeInUp} className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            How It Works
          </motion.span>
          <motion.h2 variants={fadeInUp} className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Simple Process,{" "}
            <span className="text-blue-600">Stunning Results</span>
          </motion.h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative text-center"
              >
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600 shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg">
                  <Icon />
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-blue-200 lg:block" />
                  )}
                </div>
                <span className="mb-2 block text-xs font-bold text-blue-600">Step {step.num}</span>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════ */
function TestimonialsSection() {
  return (
    <section className="bg-slate-50 px-5 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeInUp} className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            Testimonials
          </motion.span>
          <motion.h2 variants={fadeInUp} className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Loved by <span className="text-blue-600">Clients</span> Across India
          </motion.h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <FaStar key={j} className="text-yellow-400" />
                ))}
              </div>
              <p className="mb-6 text-slate-600">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${testimonial.color}`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FAQ SECTION
   ═══════════════════════════════════════════════ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white px-5 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.span variants={fadeInUp} className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            FAQ
          </motion.span>
          <motion.h2 variants={fadeInUp} className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked{" "}
            <span className="text-blue-600">Questions</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-slate-900">{faq.q}</span>
                {openIndex === i ? (
                  <FaChevronUp className="text-blue-600" />
                ) : (
                  <FaChevronDown className="text-slate-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-slate-500">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════════ */
function CTASection({ setShowQuoteModal }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-5 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Ready to Build Something{" "}
            <span className="text-blue-200">Amazing?</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="mb-10 text-lg text-blue-100 md:text-xl">
            Get your professional website starting at just{" "}
            <span className="font-bold text-white">₹5,999</span>.
            Free consultation call — no obligations, zero strings attached.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowQuoteModal(true)}
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
            >
              Get Free Consultation
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="https://wa.me/91735809616"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.98]"
            >
              <FaWhatsapp className="text-lg" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════
   QUOTE MODAL
   ═══════════════════════════════════════════════ */
function QuoteModal({ show, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
          >
            <FaClose className="text-sm" />
          </button>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Only 5 consultation spots left this month
          </div>

          <h2 className="mb-2 text-2xl font-extrabold text-slate-900">
            Get Your <span className="text-blue-600">Free</span> Project Consultation
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Tell us what you're building. We'll respond within{" "}
            <span className="font-bold text-slate-700">24 hours</span> with a tailored strategy —{" "}
            <span className="italic">zero obligations, zero strings attached.</span>
          </p>

          <div className="mb-6 flex flex-wrap gap-3 rounded-xl bg-slate-50 p-3">
            {["100% Satisfaction", "24h Response", "4+ Years Exp."].map((badge) => (
              <span key={badge} className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                <FaCheck className="text-green-500" /> {badge}
              </span>
            ))}
          </div>

          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name *"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="tel"
                placeholder="Phone (optional)"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <select
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="">Service needed...</option>
                <option value="website">Website Development</option>
                <option value="app">App Development</option>
                <option value="marketing">Digital Marketing</option>
                <option value="ai">AI Automation</option>
                <option value="other">Other</option>
              </select>
            </div>
            <textarea
              placeholder="Briefly describe your project (optional)"
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <button
              type="button"
              onClick={() => {
                alert("Thank you! We'll contact you within 24 hours.");
                onClose();
              }}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
            >
              Get My Free Consultation →
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-400">
            We respect your privacy. No spam, ever.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}