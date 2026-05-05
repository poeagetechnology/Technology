import React from "react";
import { motion } from "framer-motion";
import Home from "./Home";

/* Navbar.js is the root page that renders the full home layout.
   Header + Footer are now included inside Home.js so this is a
   thin wrapper kept for routing compatibility. */

export const Navbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .5 }}
      style={{ background: "var(--black)", minHeight: "100vh" }}
    >
      <Home />
    </motion.div>
  );
};