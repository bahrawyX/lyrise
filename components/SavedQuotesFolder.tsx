"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FolderOpen, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

type SavedQuote = {
  id: string;
  text: string;
  author: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
};

type SavedQuotesFolderProps = {
  savedQuotes: SavedQuote[];
  onRemoveQuote: (id: string) => void;
};

export function SavedQuotesFolder({ savedQuotes, onRemoveQuote }: SavedQuotesFolderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    rose: { bg: "bg-rose-500/10", text: "text-rose-500", border: "border-rose-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "border-cyan-500/20" },
  };

  const handleRemove = (id: string, text: string) => {
    onRemoveQuote(id);
    toast.success("Quote removed from saved", {
      description: text.slice(0, 50) + "...",
    });
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full h-16 w-16 shadow-2xl bg-linear-to-br from-primary to-purple-600 hover:scale-110 transition-transform relative group"
        >
          <motion.div
            animate={{ rotateY: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FolderOpen className="w-7 h-7" />
          </motion.div>
          
          {savedQuotes.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-background"
            >
              {savedQuotes.length}
            </motion.div>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-4 md:inset-10 z-50 bg-background/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-primary to-purple-600 flex items-center justify-center">
                      <FolderOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold space">Saved Quotes</h2>
                      <p className="text-sm text-muted-foreground">
                        {savedQuotes.length} {savedQuotes.length === 1 ? "quote" : "quotes"} saved
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {savedQuotes.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                        <FolderOpen className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">No saved quotes yet</h3>
                        <p className="text-muted-foreground">
                          Save quotes you love to access them anytime
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedQuotes.map((quote, index) => {
                        const colors = categoryColors[quote.category.color];
                        return (
                          <motion.div
                            key={quote.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative"
                          >
                            <div className={`p-4 rounded-2xl border ${colors.border} bg-card/50 backdrop-blur hover:bg-card/80 transition-all space-y-3`}>
                              <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                                <span className="text-xs font-medium">{quote.category.name}</span>
                              </div>
                              
                              <p className="text-sm leading-relaxed line-clamp-4">
                                {quote.text}
                              </p>
                              
                              <p className="text-xs text-muted-foreground font-medium">
                                — {quote.author}
                              </p>

                              <Button
                                onClick={() => handleRemove(quote.id, quote.text)}
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8 p-0 hover:bg-rose-500/10 hover:text-rose-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

