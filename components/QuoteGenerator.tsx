"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { QuoteCard } from "@/components/QuoteCard";
import { SavedQuotesFolder } from "./SavedQuotesFolder";
import { useQuotes } from "@/providers/quotes-provider";

type Quote = {
  id: string;
  text: string;
  author: string;
};

type Category = {
  id: string;
  name: string;
  color: string;
};

type SavedQuote = Quote & { category: Category };

const CATEGORIES: Category[] = [
  { id: "romantic", name: "Romantic", color: "rose" },
  { id: "inspirational", name: "Inspirational", color: "blue" },
  { id: "motivational", name: "Motivational", color: "orange" },
  { id: "wisdom", name: "Wisdom", color: "purple" },
  { id: "success", name: "Success", color: "emerald" },
  { id: "life", name: "Life", color: "cyan" },
];

export function QuoteGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    savedQuotes,
    currentQuote,
    setCurrentQuote,
    addSavedQuote,
    removeSavedQuote,
    incrementGeneratedCount,
    quotesGeneratedToday,
  } = useQuotes();

  const generateQuote = async (categoryId: string | null) => {
    setIsLoading(true);
    
    const loadingToast = toast.loading("Generating your perfect quote...", {
      description: "AI is crafting something special for you",
    });

    try {
      let categoryForAPI: string;
      let categoryName: string;

      if (categoryId === null) {
        const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        categoryForAPI = randomCategory.id;
        categoryName = randomCategory.name;
      } else {
        const selectedCat = CATEGORIES.find(cat => cat.id === categoryId)!;
        categoryForAPI = categoryId;
        categoryName = selectedCat.name;
      }

      const response = await fetch("/api/generate-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: categoryForAPI }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quote");
      }

      const quote = await response.json();

      setCurrentQuote(quote);
      incrementGeneratedCount();
      
      toast.success("Quote generated!", {
        id: loadingToast,
        description: `A ${categoryName.toLowerCase()} quote just for you`,
        duration: 2000,
      });
    } catch (error) {
      console.error("Error generating quote:", error);
      toast.error("Oops! Something went wrong", {
        id: loadingToast,
        description: "Please try again in a moment",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveQuote = (quote: SavedQuote) => {
    addSavedQuote(quote);
    setCurrentQuote(null);
  };

  const handleRejectQuote = () => {
    setCurrentQuote(null);
  };

  const categoryColors: Record<string, string> = {
    rose: "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20",
    cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20 hover:bg-cyan-500/20",
  };

  return (
    <section id="quote-generator" className="overflow-hidden  relative min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Quote Generator</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold space">
            Choose Your{" "}
            <span className="bg-linear-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Inspiration
            </span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select a category that resonates with you, or let fate decide with a random quote
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Button
                onClick={() => {
                  setSelectedCategory(category.id);
                  generateQuote(category.id);
                }}
                disabled={isLoading}
                className={`rounded-full border transition-all duration-300 ${
                  categoryColors[category.color]
                } ${
                  selectedCategory === category.id
                    ? "ring-2 ring-offset-2 ring-offset-background"
                    : ""
                }`}
                variant="outline"
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + CATEGORIES.length * 0.1 }}
          >
            <Button
              onClick={() => {
                setSelectedCategory(null);
                generateQuote(null);
              }}
              disabled={isLoading}
              className="rounded-full bg-linear-to-r from-primary via-purple-500 to-primary hover:opacity-90 transition-opacity"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Random Quote
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentQuote ? (
            <QuoteCard
              key={currentQuote.id}
              quote={currentQuote}
              onSave={handleSaveQuote as (quote: Quote) => void}
              onReject={handleRejectQuote}
            />
          ) : (
            quotesGeneratedToday > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <p className="text-3xl md:text-4xl font-medium text-muted-foreground space">
                  You have generated{" "}
                  <span className="text-primary font-bold">
                    {quotesGeneratedToday}
                  </span>{" "}
                  {quotesGeneratedToday === 1 ? "quote" : "quotes"} today
                </p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <SavedQuotesFolder
        savedQuotes={savedQuotes}
        onRemoveQuote={removeSavedQuote}
      />
    </section>
  );
}

