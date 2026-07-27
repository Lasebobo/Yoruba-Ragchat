"use client";

import type { UseChatHelpers } from "@ai-sdk/react";
import { motion } from "framer-motion";
import type { ChatMessage } from "@/lib/types";
import { FeaturedDishes } from "./featured-dishes";

type GreetingProps = {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>["sendMessage"];
};

const SUGGESTIONS = [
  { label: "How to make Àdàlú", tag: "Popular", icon: "🍲" },
  { label: "Show me bean recipes", tag: "Ingredients", icon: "🫘" },
  { label: "Breakfast options", tag: "Meal Type", icon: "🌅" },
  { label: "Soups and stews", tag: "Category", icon: "🥘" },
  { label: "Plantain recipes", tag: "Popular", icon: "🍌" },
  { label: "Quick and easy dishes", tag: "Time", icon: "⚡" },
];

const FEATURES = [
  { label: "Authentic Recipes", emoji: "🫙" },
  { label: "AI-Powered Search", emoji: "🤖" },
  { label: "Instant Results", emoji: "⚡" },
];


export const Greeting = ({ chatId, sendMessage }: GreetingProps) => {
  const handleSuggestion = (text: string) => {
    window.history.pushState(
      {},
      "",
      `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/chat/${chatId}`
    );
    sendMessage({
      role: "user",
      parts: [{ type: "text", text }],
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#8A4F1D] via-[#7C5432] to-[#4a2f0f] p-6 text-white shadow-lg"
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/5" />

        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Ẹ káàbọ̀! Welcome! 👋
        </h1>
        <p className="text-white/75 text-sm leading-relaxed max-w-lg">
          Discover the rich flavors of Yoruba cuisine with our AI-powered recipe
          assistant. I&apos;ll help you master traditional dishes.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {FEATURES.map((feat) => (
            <span
              key={feat.label}
              className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
            >
              <span>{feat.emoji}</span>
              {feat.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Featured Recipes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="flex items-center gap-2 font-semibold text-sm text-foreground mb-3">
          <span className="text-amber-500">★</span> Featured Recipes
        </h2>
        <FeaturedDishes onDishSelect={handleSuggestion} />
      </motion.div>

      {/* Try Asking About */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
      >
        <h2 className="flex items-center gap-2 font-semibold text-sm text-foreground mb-3">
          <span>✨</span> Try asking about...
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => handleSuggestion(s.label)}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5 text-left transition-all duration-150 hover:border-[#7C5432]/30 hover:bg-[#7C5432]/5 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0"
            >
              <span className="text-xl shrink-0">{s.icon}</span>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-foreground truncate">
                  {s.label}
                </p>
                <p className="text-[11px] text-[#7C5432]">{s.tag}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
