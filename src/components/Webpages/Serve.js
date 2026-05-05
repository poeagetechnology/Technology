import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

import Builders from "../../assests/3.png";
import Nexus from "../../assests/5.png";
import Hub from "../../assests/6.png";
import Web from "../../assests/7.png";
import Digital from "../../assests/8.png";
import It from "../../assests/4.png";
const companies = [
  { name: "Poeage Builders", img: Builders, link: "https://poeagebuilders.in", desc: "Premium construction, architecture, and infrastructure delivered with precision and trust." },
  { name: "Poeage Nexus", img: Nexus, link: "https://poeagenexus.com/", desc: "A unified marketplace bridging businesses, services, and customers through smart digital experiences." },
  { name: "Poeage Hub", img: Hub, link: "https://poeagehub.in/", desc: "A unified marketplace bridging businesses, services, and customers through smart digital experiences." },
  { name: "Poeage Digital", img: Digital, link: "https://poeagedigitalmarketing.com/", desc: "Enterprise-level web design, automation, and digital products engineered for performance and growth." },
  { name: "Poeage Web Server", img: Web, link: "https://pws-tawny.vercel.app/", desc: "Enterprise-level web design, automation, and digital products engineered for performance and growth." },
  { name: "Poeage IT Solution", img: It, link: "https://pws-tawny.vercel.app/", desc: "Enterprise-level web design, automation, and digital products engineered for performance and growth." },
];

export default function Serve() {
  return (
    <>
      <Header />

      {/* WHITE + BLUE THEME */}
      <main className="bg-white min-h-screen pt-24 sm:pt-28">

        {/* HERO */}
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-10 mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-xs uppercase tracking-widest text-blue-600 border border-blue-200 px-4 py-1 rounded-full mb-6"
          >
            Corporate Network
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-black"
          >
            Our Corporate <br />
            <span className="text-blue-600">Network</span>
          </motion.h1>
        </div>

        {/* GRID */}
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* TOP BAR */}
              <div className="h-1 w-full bg-blue-600 rounded-full mb-6 group-hover:bg-black transition" />

              {/* ICON */}
              <div className="w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center mb-5 bg-gray-50 group-hover:bg-blue-50 transition">
                <img src={item.img} alt={item.name} className="w-8 object-contain" />
              </div>

              {/* NAME */}
              <h3 className="text-lg font-bold text-black mb-2 group-hover:text-blue-600 transition">
                {item.name}
              </h3>

              {/* DESC */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {item.desc}
              </p>

              {/* CTA */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide uppercase text-blue-600 group-hover:gap-2 transition-all"
              >
                Visit Website →
              </a>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
