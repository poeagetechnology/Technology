import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPalette,
  FaCogs,
  FaRocket,
} from "react-icons/fa";

export default function Soft() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaLaptopCode />,
      title: "E-Commerce Platforms",
      desc: "High-conversion online stores with secure payments and lightning-fast performance.",
      img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=900&q=80",
    },
    {
      icon: <FaMobileAlt />,
      title: "Dynamic Web Apps",
      desc: "Real-time content, APIs, dashboards — built for scale and easy updates.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    },
    {
      icon: <FaPalette />,
      title: "Admin & Analytics",
      desc: "Powerful control panels with charts, insights, and workflow automation.",
      img: "https://images.unsplash.com/photo-1620885174261-16e2b0f6c0c9?auto=format&fit=crop&w=900&q=80",
    },
    {
      icon: <FaCogs />,
      title: "Creative Portfolios",
      desc: "Minimal, elegant, SEO-ready — tailored for brands, creators, and agencies.",
      img: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=900&q=80",
    },
    {
      icon: <FaRocket />,
      title: "Corporate Websites",
      desc: "Trust-driven designs, optimized for performance, security, and conversions.",
      img: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.6 },
    }),
  };

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white rounded-b-3xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center py-20 px-6 sm:px-12 lg:px-24"
        >
          <FaLaptopCode className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 drop-shadow" />

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Modern Web Development — Built for Results
          </h1>

          <p className="max-w-3xl mx-auto text-sm md:text-lg opacity-90">
            Faster. Smarter. Conversion-focused websites crafted to grow your business.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="mt-6 px-8 py-3 rounded-full font-semibold bg-white text-gray-900 hover:bg-gray-200 transition shadow-lg"
          >
            Talk With Our Team
          </button>
        </motion.div>

        {/* subtle gradient rings */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-black/10 blur-3xl" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-5 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition" />

            <img
              src={s.img}
              alt={s.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition"
            />

            <div className="p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 text-2xl mb-4">
                {s.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {s.title}
              </h3>

              <p className="text-sm text-gray-600 mb-5">{s.desc}</p>

              <button
                onClick={() => navigate("/quotes")}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center bg-gray-100 py-14 px-6">
        <h2 className="text-3xl font-bold mb-3">
          Ready to launch something powerful?
        </h2>
        <p className="text-gray-600 mb-6">
          We’ll help plan, design, develop — and scale.
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
        >
          Contact Us
        </button>
      </section>

      <Footer />
    </>
  );
}
