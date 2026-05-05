import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaBookOpen,
  FaUsers,
  FaFlask,
  FaLightbulb,
  FaChalkboardTeacher,
  FaBuilding,
} from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

const casePoints = [
  {
    icon: <FaSearch />,
    title: "Real-World Context",
    tag: "Research",
    desc: "Case studies examine real-world environments instead of labs.",
    details: "Focuses on complex, real-life engineering problems and environments.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    icon: <FaBookOpen />,
    title: "Empirical Inquiry",
    tag: "Data",
    desc: "Uses interviews, documents, and observations.",
    details: "Relies heavily on qualitative and quantitative data.",
    image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
  },
  {
    icon: <FaUsers />,
    title: "Focused Scope",
    tag: "Analysis",
    desc: "Deep focus on specific cases.",
    details: "Analyzes projects or organizations in depth.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
  {
    icon: <FaFlask />,
    title: "Exploratory",
    tag: "Insights",
    desc: "Explores complex issues.",
    details: "Explains why outcomes happen in context.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
  },
  {
    icon: <FaLightbulb />,
    title: "Flexibility",
    tag: "Adaptability",
    desc: "Adapts during research.",
    details: "Allows evolving research direction.",
    image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Education",
    tag: "Learning",
    desc: "Improves student learning.",
    details: "Provides real scenarios for education.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
  },
  {
    icon: <FaBuilding />,
    title: "Organizational Growth",
    tag: "Business",
    desc: "Improves company practices.",
    details: "Used for performance and process improvement.",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
  },
];

export default function Case() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);

  const filtered = casePoints.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20 px-6 md:px-12 lg:px-20">
        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block mb-4 text-sm px-4 py-1 bg-pink-100 text-pink-600 rounded-full">
            Software Engineering
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Case Study Explorer
          </h1>

          <p className="text-gray-600 text-lg">
            Search, explore, and interact with real-world engineering insights.
          </p>
        </div>

        {/* SEARCH */}
        <div className="max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search case studies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filtered.map((point, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition overflow-hidden cursor-pointer"
              onClick={() => setActive(point)}
            >
              <div className="relative h-52">
                <img
                  src={point.image}
                  alt={point.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full">
                  {point.tag}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-pink-600">
                  {point.icon}
                  <h3 className="font-semibold text-gray-900">
                    {point.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-md w-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold mb-4">{active.title}</h2>
                <p className="text-gray-600">{active.details}</p>
                <button
                  onClick={() => setActive(null)}
                  className="mt-6 text-pink-600"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
