"use client";
// app/(secondary)/payment-methods/page.tsx

import { Plus, MoreVertical, Check, Star, Trash2, X } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

const CARD_GRADIENTS: Record<string, string> = {
  visa: "from-[#1a1f71] to-[#1a1f71]/80",
  mastercard: "from-[#EB001B]/80 to-[#F79E1B]",
  amex: "from-[#007BC1] to-[#00529B]",
  apple: "from-[#1c1c1e] to-[#3a3a3c]",
};

const CARD_LOGOS: Record<string, React.ReactNode> = {
  visa: (
    <span className="font-bold text-white text-xl tracking-widest italic">
      VISA
    </span>
  ),
  mastercard: (
    <div className="flex">
      <div className="size-7 rounded-full bg-[#EB001B] opacity-90" />
      <div className="size-7 rounded-full bg-[#F79E1B] opacity-90 -ml-3" />
    </div>
  ),
  amex: (
    <span className="font-bold text-white text-sm tracking-widest">AMEX</span>
  ),
  apple: (
    <svg className="size-6 fill-white" viewBox="0 0 814 1000">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 520.8 0 405.6 0 297.4 0 141.9 90.1 59.8 178.3 59.8c56.2 0 102.7 35.8 138.5 35.8 34 0 87.5-37.8 152.5-37.8 24.6 0 109.3 2.6 167.5 98.7zm-180.3-71.9c-29.1 35.3-77.9 63.4-128.3 58.2-6.4-50.5 18.3-103.5 47.4-135.6 29.1-32.8 81.3-57.8 125.4-58.2 5.5 52.5-15.3 103.5-44.5 135.6z" />
    </svg>
  ),
};

const initialCards = [
  {
    id: 1,
    type: "visa",
    last4: "4242",
    expiry: "08 / 26",
    name: "ALEX CARTER",
    isDefault: true,
  },
  {
    id: 2,
    type: "mastercard",
    last4: "5555",
    expiry: "12 / 25",
    name: "ALEX CARTER",
    isDefault: false,
  },
  {
    id: 3,
    type: "apple",
    last4: "—",
    expiry: "—",
    name: "Apple Pay",
    isDefault: false,
  },
];

export default function PaymentMethodsPage() {
  const [cards, setCards] = useState(initialCards);
  const [selectedCard, setSelectedCard] = useState<
    (typeof initialCards)[0] | null
  >(null);

  const setDefault = (id: number) => {
    setCards((prev) =>
      prev.map((card) => ({ ...card, isDefault: card.id === id })),
    );
    setSelectedCard(null);
  };

  const deleteCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    setSelectedCard(null);
  };

  return (
    <>
      <PageHeader title="Payment Methods" />
      <div className="p-4 space-y-4">
        {cards.map((card, i) => (
          <CreditCardTile
            key={card.id}
            card={card}
            index={i}
            onMore={() => setSelectedCard(card)}
          />
        ))}

        <button className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-2 border-dashed border-border text-sm font-semibold text-muted-foreground hover:border-green-500 hover:text-green-600 hover:bg-green-500/5 transition-all">
          <Plus className="size-4" />
          Add Payment Method
        </button>
      </div>

      {selectedCard && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => setSelectedCard(null)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-popover rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>
            <div className="px-5 pt-2 pb-4">
              <div
                className={`h-16 rounded-2xl bg-linear-to-r ${CARD_GRADIENTS[selectedCard.type]} flex items-center px-5 gap-3`}
              >
                {CARD_LOGOS[selectedCard.type]}
                <span className="text-white/70 text-sm ml-auto">
                  {selectedCard.last4 !== "—"
                    ? `•••• ${selectedCard.last4}`
                    : "Apple Pay"}
                </span>
                {selectedCard.isDefault && (
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>
            </div>
            <div className="px-4 pb-8 space-y-1">
              {!selectedCard.isDefault && (
                <button
                  onClick={() => setDefault(selectedCard.id)}
                  className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium text-popover-foreground hover:bg-muted transition-colors"
                >
                  <div className="size-9 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Star className="size-4 text-green-600" />
                  </div>
                  Set as default
                </button>
              )}
              <button
                onClick={() => deleteCard(selectedCard.id)}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <div className="size-9 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="size-4 text-destructive" />
                </div>
                Remove card
              </button>
              <button
                onClick={() => setSelectedCard(null)}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                <div className="size-9 rounded-full bg-muted flex items-center justify-center">
                  <X className="size-4 text-muted-foreground" />
                </div>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function CreditCardTile({
  card,
  onMore,
}: {
  card: (typeof initialCards)[0];
  index: number;
  onMore: () => void;
}) {
  const isApple = card.type === "apple";

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg">
      <div
        className={`bg-linear-to-br ${CARD_GRADIENTS[card.type]} p-5 text-white`}
      >
        <div className="flex items-start justify-between mb-8">
          <div>
            {card.isDefault && (
              <span className="text-xs bg-white/20 backdrop-blur-sm text-white font-medium px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                <Check className="size-3" />
                Default
              </span>
            )}
          </div>
          <button
            onClick={onMore}
            className="size-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <MoreVertical className="size-4 text-white" />
          </button>
        </div>

        {!isApple && (
          <div className="w-10 h-7 rounded-md bg-linear-to-br from-yellow-300/80 to-yellow-500/60 mb-4 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5 w-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-1.5 bg-yellow-700/40 rounded-sm" />
              ))}
            </div>
          </div>
        )}

        <p className="text-lg font-mono tracking-[0.2em] text-white/90 mb-4">
          {isApple ? "Apple Pay" : `•••• •••• •••• ${card.last4}`}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-0.5">
              {isApple ? "Digital Wallet" : "Card Holder"}
            </p>
            <p className="text-sm font-medium tracking-wide">{card.name}</p>
          </div>
          <div className="flex flex-col items-end">
            {!isApple && (
              <>
                <p className="text-white/50 text-xs uppercase tracking-widest mb-0.5">
                  Expires
                </p>
                <p className="text-sm font-mono">{card.expiry}</p>
              </>
            )}
            <div className="mt-1">{CARD_LOGOS[card.type]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
