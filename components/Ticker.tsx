import React from 'react';
import { Trophy } from 'lucide-react';

const wins = [
  { user: "AlexJ", amount: "$50", game: "Chess" },
  { user: "SarahK", amount: "$120", game: "Battle Royale" },
  { user: "Mike_88", amount: "$25", game: "Pool" },
  { user: "CryptoKing", amount: "$500", game: "Poker" },
  { user: "NinjaNavi", amount: "$75", game: "Arcade" },
  { user: "QueenBee", amount: "$200", game: "Strategy" },
];

export const Ticker: React.FC = () => {
  return (
    <div className="w-full bg-void/50 border-y border-glassBorder overflow-hidden relative z-20">
      <div className="max-w-[100vw] py-3 flex">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...wins, ...wins, ...wins, ...wins].map((win, idx) => (
            <div key={idx} className="flex items-center gap-2 mx-8 text-sm md:text-base">
              <Trophy className="w-4 h-4 text-neonMagenta" />
              <span className="text-gray-300 font-medium">{win.user}</span>
              <span className="text-gray-500">just won</span>
              <span className="text-neonCyan font-bold">{win.amount}</span>
              <span className="text-gray-500">in</span>
              <span className="text-white border border-glassBorder bg-glass px-2 py-0.5 rounded text-xs">{win.game}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};