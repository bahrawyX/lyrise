"use client";

import { motion } from "framer-motion";
import { Sparkles, Save, Shuffle, Zap, Database, Share2 } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Selection",
    description: "Smart category-based quote generation with intelligent recommendations",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Save,
    title: "Save Your Favorites",
    description: "Build your personal collection with persistent storage across sessions",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Shuffle,
    title: "Random Discovery",
    description: "Explore unexpected inspiration with our random quote generator",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Lightning-fast quote generation with smooth animations and transitions",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Database,
    title: "Rich Database",
    description: "Curated collection across 6 categories with more being added regularly",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share quotes instantly with built-in copy and native share functionality",
    color: "from-rose-500 to-pink-500",
  },
];

export function Features() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold space">
            Everything You Need for{" "}
            <span className="bg-linear-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Quote Generation
            </span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed to enhance your quote discovery experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                  <div className="space-y-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold">{feature.title}</h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

