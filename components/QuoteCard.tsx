"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Heart, Share2, Check, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Quote = {
  id: string;
  text: string;
  author: string;
  category: {
    id: string;
    name: string;
    color: string;
  };
};

type QuoteCardProps = {
  quote: Quote;
  onSave?: (quote: Quote) => void;
  onReject?: () => void;
};

export function QuoteCard({ quote, onSave, onReject }: QuoteCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    rose: { bg: "bg-rose-500/10", text: "text-rose-500", border: "border-rose-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
    orange: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "border-cyan-500/20" },
  };

  const colors = categoryColors[quote.category.color];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    setIsCopied(true);
    toast.success("Copied to clipboard!", {
      description: "Quote copied successfully",
      duration: 2000,
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this quote!",
          text: `"${quote.text}" - ${quote.author}`,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          toast.error("Couldn't share", {
            description: "Try copying the quote instead",
          });
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success("Added to favorites!", {
        description: "You can find this in your saved quotes",
        duration: 2000,
      });
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(quote);
      toast.success("Quote saved!", {
        description: "Added to your collection",
        duration: 2000,
      });
    }
  };

  const handleReject = () => {
    setIsRejecting(true);
    setTimeout(() => {
      if (onReject) {
        onReject();
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ 
        opacity: isRejecting ? 0 : 1, 
        y: 0, 
        scale: 1,
        x: isRejecting ? 1000 : 0,
        rotate: isRejecting ? 45 : 0
      }}
      exit={{ opacity: 0, y: -40, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-3xl mx-auto overflow-hidden"
    >
      <div className="relative group">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`absolute -inset-1 ${colors.bg} rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}
        />
        
        <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-start justify-between gap-4"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                <span className="text-sm font-medium">{quote.category.name}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <svg className="w-12 h-12 text-primary/20" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.7-.5 3.7-1.3L11 24h4l2-6.1c.3-.9.5-1.9.5-2.9 0-3.3-2.7-6-6-6zm12 0c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.4 0 2.7-.5 3.7-1.3L23 24h4l2-6.1c.3-.9.5-1.9.5-2.9 0-3.3-2.7-6-6-6z" />
              </svg>

              <p className="text-2xl md:text-3xl font-medium leading-relaxed space">
                {quote.text}
              </p>

              <p className="text-lg text-muted-foreground font-medium">
                — {quote.author}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              {(onSave || onReject) && (
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    size="lg"
                    className="rounded-full gap-2 group/reject hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all"
                  >
                    <X className="w-5 h-5 group-hover/reject:rotate-90 transition-transform" />
                    Reject
                  </Button>
                  
                  <Button
                    onClick={handleSave}
                    size="lg"
                    className="rounded-full gap-2 bg-linear-to-r from-emerald-600 to-green-600 hover:opacity-90 transition-opacity group/save"
                  >
                    <Save className="w-5 h-5 group-hover/save:scale-110 transition-transform" />
                    Save Quote
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="rounded-full gap-2 group/btn"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Copy
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="rounded-full gap-2 group/btn"
                >
                  <Share2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  Share
                </Button>

                <Button
                  onClick={handleLike}
                  variant="outline"
                  size="sm"
                  className={`rounded-full gap-2 group/btn transition-colors ${
                    isLiked ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : ""
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 group-hover/btn:scale-110 transition-transform ${
                      isLiked ? "fill-current" : ""
                    }`}
                  />
                  {isLiked ? "Liked" : "Like"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

