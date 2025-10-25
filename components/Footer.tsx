"use client";

import { motion } from "framer-motion";
import { Github, Globe, Heart } from "lucide-react";

const socialLinks = [
  {
    name: "Portfolio",
    icon: Globe,
    href: "https://www.bahrawy.me/",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/bahrawyX",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 text-sm text-muted-foreground"
          >
            <span>© {currentYear}</span>
            <span className="font-bold text-primary space">QuoteFlow</span>
            <span>•</span>
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-current mx-1" />
            <span>by</span>
            <a
              href="https://www.bahrawy.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline space"
            >
              Bahrawy
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

