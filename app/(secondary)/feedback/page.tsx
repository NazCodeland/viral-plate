"use client";
// app/(secondary)/feedback/page.tsx

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const CATEGORIES = [
  "Bug report",
  "Feature request",
  "General feedback",
  "Other",
];

export default function FeedbackPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!category || !message.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-8 text-center">
        <CheckCircle2 className="size-14 text-green-500 mb-4" />
        <h2 className="text-lg font-semibold text-foreground">
          Thanks for the feedback
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          We read everything and use it to improve.
        </p>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Feedback" />
      <div className="p-4 space-y-4">
        <div className="rounded-2xl border border-border shadow-sm p-4 bg-card">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  category === cat
                    ? "bg-green-500 text-white border-green-500"
                    : "text-foreground border-border hover:border-green-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border shadow-sm p-4 bg-card">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Message
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what's on your mind..."
            rows={5}
            className="w-full text-sm text-foreground bg-transparent placeholder:text-muted-foreground resize-none outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!category || !message.trim()}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all shadow-sm disabled:opacity-40 disabled:pointer-events-none"
        >
          Send Feedback
        </button>
      </div>
    </>
  );
}
