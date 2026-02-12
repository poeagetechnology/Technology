import React from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import Builders from "../../assests/5.png";
import Hub from "../../assests/1.png";
import Web from "../../assests/3.png";

export default function OurCompany() {
  const companies = [
    {
      name: "Poeage Builders",
      img: Builders,
      link: "https://poeagebuilders.in",
      desc: "Premium construction, architecture, and infrastructure projects delivered with precision and trust.",
    },
    {
      name: "Poeage Hub",
      img: Hub,
      link: "https://poeage-hub.vercel.app/",
      desc: "A unified marketplace bridging businesses, services, and customers through smart digital experiences.",
    },
    {
      name: "Poeage Web Solutions",
      img: Web,
      link: "https://pws-rouge-five.vercel.app/",
      desc: "Enterprise-level web design, automation, and digital products engineered for performance and growth.",
    },
  ];

  return (
    <>
      <Header />

      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Our Corporate Network
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              A diverse ecosystem of brands built to innovate, scale, and create value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {companies.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 relative"
              >
                {/* Accent bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl" />

                <div className="flex flex-col gap-6">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center shadow-inner">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-contain" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>

                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-5 py-2 text-sm font-semibold rounded-full bg-gray-900 text-white hover:bg-blue-700 transition-all"
                  >
                    Visit Website →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
