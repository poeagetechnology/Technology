import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMoon, FaSun, FaHeart } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

// ✅ FULL BLOG DATA (merged)
const blogPosts = [
  {
    id: 1,
    title: "How to Build a Scalable Application up to 1 Million Users on AWS",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    content:
      "Scaling to a million users requires a robust architecture using AWS services like EC2, S3, and load balancers.",
    category: "Cloud",
  },
  {
    id: 2,
    title: "5 Key Tech Practices for Modern Startups",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    content:
      "CI/CD pipelines, AI tools, and cloud-native infrastructure help startups scale faster.",
    category: "Startup",
  },
  {
    id: 3,
    title: "Why Code Reviews Improve Team Productivity",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    content:
      "Code reviews improve collaboration, reduce bugs, and enhance team productivity.",
    category: "Engineering",
  },
  {
    id: 4,
    title: "The Importance of Weekly Demos in Agile Teams",
    image: "https://tryscrumlive.vervebot.io/wp-content/uploads/2022/03/sprint-reviews-01.png",
    content:
      "Weekly demos align teams with business goals and provide early feedback.",
    category: "Agile",
  },
  {
    id: 5,
    title: "Trends in Cloud Computing for 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    content:
      "Serverless, AI scaling, and multi-cloud strategies dominate cloud trends.",
    category: "Cloud",
  },
  {
    id: 6,
    title: "AI Integration for Competitive Advantage",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    content:
      "AI helps automate workflows, improve decisions, and boost efficiency.",
    category: "AI",
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={dark ? "dark bg-black text-white" : "bg-[#f9fbff] text-black"}>
      <Header />

      <div className="min-h-screen px-6 py-16">

        {/* 🔥 TOP BAR */}
        <div className="flex justify-between items-center max-w-6xl mx-auto mb-10">
          <h1 className="text-3xl font-bold">🚀 Poeage Tech Blog</h1>
          <button onClick={() => setDark(!dark)} className="text-xl">
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* 🔍 SEARCH */}
        {!selectedPost && (
          <div className="max-w-xl mx-auto mb-12">
            <div className="flex items-center border rounded-xl px-4 py-3 shadow-sm">
              <FaSearch />
              <input
                className="ml-3 w-full outline-none bg-transparent"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* 🎯 CONTENT */}
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
            >
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="rounded-xl mb-6 w-full h-72 object-cover"
              />

              <h2 className="text-3xl font-bold mb-4">
                {selectedPost.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                {selectedPost.content}
              </p>

              <button
                onClick={() => setSelectedPost(null)}
                className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700"
              >
                ← Back to Blog
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {filtered.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-2xl transition overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedPost(post)}
                >
                  {/* IMAGE */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      whileHover={{ scale: 1.1 }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold group-hover:text-pink-600 transition">
                        {post.title}
                      </h3>

                      <FaHeart
                        className={likes[post.id] ? "text-red-500" : ""}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(post.id);
                        }}
                      />
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.content}
                    </p>

                    <span className="text-pink-600 text-sm font-medium">
                      Read More →
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}