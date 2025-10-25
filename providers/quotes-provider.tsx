"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

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

type QuotesContextType = {
  savedQuotes: Quote[];
  quotesGeneratedToday: number;
  currentQuote: Quote | null;
  addSavedQuote: (quote: Quote) => void;
  removeSavedQuote: (id: string) => void;
  setCurrentQuote: (quote: Quote | null) => void;
  incrementGeneratedCount: () => void;
};

const QuotesContext = createContext<QuotesContextType | undefined>(undefined);

export function QuotesProvider({ children }: { children: ReactNode }) {
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [quotesGeneratedToday, setQuotesGeneratedToday] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("quotesDate");
    const storedCount = localStorage.getItem("quotesCount");

    if (storedDate === today && storedCount) {
      setQuotesGeneratedToday(parseInt(storedCount));
    } else {
      localStorage.setItem("quotesDate", today);
      localStorage.setItem("quotesCount", "0");
      setQuotesGeneratedToday(0);
    }

    const storedSavedQuotes = localStorage.getItem("savedQuotes");
    if (storedSavedQuotes) {
      setSavedQuotes(JSON.parse(storedSavedQuotes));
    }
  }, []);

  const addSavedQuote = (quote: Quote) => {
    if (!savedQuotes.find(sq => sq.id === quote.id)) {
      const newSavedQuotes = [...savedQuotes, quote];
      setSavedQuotes(newSavedQuotes);
      localStorage.setItem("savedQuotes", JSON.stringify(newSavedQuotes));
    }
  };

  const removeSavedQuote = (id: string) => {
    const newSavedQuotes = savedQuotes.filter(q => q.id !== id);
    setSavedQuotes(newSavedQuotes);
    localStorage.setItem("savedQuotes", JSON.stringify(newSavedQuotes));
  };

  const incrementGeneratedCount = () => {
    const newCount = quotesGeneratedToday + 1;
    setQuotesGeneratedToday(newCount);
    localStorage.setItem("quotesCount", newCount.toString());
  };

  return (
    <QuotesContext.Provider
      value={{
        savedQuotes,
        quotesGeneratedToday,
        currentQuote,
        addSavedQuote,
        removeSavedQuote,
        setCurrentQuote,
        incrementGeneratedCount,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (context === undefined) {
    throw new Error("useQuotes must be used within a QuotesProvider");
  }
  return context;
}

