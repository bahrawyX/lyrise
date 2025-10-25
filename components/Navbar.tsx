"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-background/40 backdrop-blur-xl rounded-full border border-border/50 shadow-2xl" />
        
        <div className="relative px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              QuoteFlow
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Button>
            <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Button>
            <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button className="rounded-full font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}