import React from "react";
import { motion } from "framer-motion";
import Builders from "../../assests/5.png";
import Hub from "../../assests/1.png";
import Nexus from "../../assests/NEXUS.png";
import Header from "./Header";
import Footer from "./Footer";

export default function OurCompany() {
  const companies = [
    {
      name: "Poeage Builders",
      img: Builders,
      link: "https://poeagebuilders.in",
      desc: "Construction & infrastructure built on innovation, safety, and reliability.",
      color: "from-amber-400 to-red-500",
    },
    {
      name: "Poeage Hub",
      img: Hub,
      link: "https://poeagehub.in",
      desc: "A digital marketplace connecting services, ideas, and opportunities.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      name: "Poeage Nexus",
      img: Nexus,
      link: "https://poeagenexus.com",
      desc: "Poeage Manpower Supply & Consultancy.",
      color: "from-fuchsia-500 to-indigo-500",
    },
  ];

  return (
    <>
      <Header />

      <section className="relative min-h-screen px-6 py-24 bg-white overflow-hidden">
      
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-indigo-600 font-semibold tracking-wide uppercase">
            Poeage Ecosystem
          </span>

          <h2 className="mt-2 text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-700">
            Our Companies
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mt-4 mb-16">
            A journey of brands — aligned to one vision, growing together.
          </p>
        </motion.div>

        {/* central line */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[3px] bg-gradient-to-b from-indigo-500 via-blue-500 to-cyan-400 rounded-full" />

          <div className="space-y-24">
            {companies.map((c, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* connector dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-indigo-500 shadow" />

                  {/* card */}
                  <div
                    className={`w-full md:w-[46%] ${
                      isLeft ? "md:mr-10" : "md:ml-10"
                    } relative bg-white border rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300`}
                  >
                    {/* glow */}
                    <div
                      className={`absolute inset-0 -z-10 opacity-25 blur-2xl rounded-2xl bg-gradient-to-r ${c.color}`}
                    />

                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-16 h-16 rounded-xl bg-white border flex items-center justify-center shadow-inner">
                        <img src={c.img} alt={c.name} className="w-11" />
                      </div>

                      <h3 className="font-bold text-xl">{c.name}</h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{c.desc}</p>

                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-full text-white bg-gradient-to-r ${c.color} hover:opacity-95 hover:scale-[1.02] transition`}
                    >
                      Visit Website →
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
