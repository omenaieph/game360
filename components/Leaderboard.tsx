import React from 'react';
import { Trophy, Medal, Star, Shield, Crown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Player {
  rank: number;
  name: string;
  avatar: string;
  earnings: string;
  winRate: string;
  badge: 'grandmaster' | 'diamond' | 'platinum' | 'gold';
}

const players: Player[] = [
  { rank: 1, name: "Alex 'The King' Chen", avatar: "https://i.pravatar.cc/150?u=1", earnings: "$12,450", winRate: "92%", badge: "grandmaster" },
  { rank: 2, name: "Sarah 'Sniper' Jenkins", avatar: "https://i.pravatar.cc/150?u=2", earnings: "$10,200", winRate: "89%", badge: "grandmaster" },
  { rank: 3, name: "Marcus 'Viper' Rodriguez", avatar: "https://i.pravatar.cc/150?u=3", earnings: "$9,850", winRate: "88%", badge: "diamond" },
  { rank: 4, name: "Emma 'Pixel' Watson", avatar: "https://i.pravatar.cc/150?u=4", earnings: "$8,120", winRate: "85%", badge: "diamond" },
  { rank: 5, name: "David 'Tank' Kim", avatar: "https://i.pravatar.cc/150?u=5", earnings: "$7,500", winRate: "82%", badge: "platinum" },
  { rank: 6, name: "Lisa 'Speed' Wang", avatar: "https://i.pravatar.cc/150?u=6", earnings: "$6,900", winRate: "80%", badge: "platinum" },
  { rank: 7, name: "James 'Ghost' Carter", avatar: "https://i.pravatar.cc/150?u=7", earnings: "$6,200", winRate: "78%", badge: "gold" },
];

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-300 fill-gray-300/20" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-600 fill-amber-600/20" />;
  return <span className="font-display font-bold text-gray-500 text-lg w-6 text-center">#{rank}</span>;
};

const BadgeIcon = ({ type }: { type: Player['badge'] }) => {
  switch (type) {
    case 'grandmaster': return <Shield className="w-4 h-4 text-neonMagenta fill-neonMagenta/20" />;
    case 'diamond': return <Star className="w-4 h-4 text-neonCyan fill-neonCyan/20" />;
    case 'platinum': return <Trophy className="w-4 h-4 text-purple-400 fill-purple-400/20" />;
    default: return <div className="w-4 h-4 rounded-full bg-yellow-500/20 border border-yellow-500/50" />;
  }
};

export const Leaderboard: React.FC = () => {
  return (
    <section id="leaderboard" className="py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-neonMagenta/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-neonCyan/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm font-medium tracking-wide">Weekly Top Earners</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4 text-white">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonMagenta">Fame</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Rise through the ranks, claim your glory, and earn real cash rewards. The competition never sleeps.
          </p>
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-void/50 border border-glassBorder rounded-3xl overflow-hidden backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.3)]"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 text-gray-500 text-sm font-medium tracking-wider uppercase">
            <div className="col-span-2 md:col-span-1 text-center">Rank</div>
            <div className="col-span-6 md:col-span-5">Player</div>
            <div className="col-span-4 md:col-span-3 text-right">Earnings</div>
            <div className="hidden md:block md:col-span-3 text-right">Win Rate</div>
          </div>

          {/* List */}
          <div className="divide-y divide-white/5">
            {players.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", scale: 1.01 }}
                className="grid grid-cols-12 gap-4 p-6 items-center transition-colors group cursor-default"
              >
                {/* Rank */}
                <div className="col-span-2 md:col-span-1 flex justify-center">
                  <RankIcon rank={player.rank} />
                </div>

                {/* Player */}
                <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 ${player.rank === 1 ? 'border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' :
                          player.rank === 2 ? 'border-gray-300' :
                            player.rank === 3 ? 'border-amber-600' :
                              'border-white/10'
                        }`}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-void rounded-full p-0.5">
                      <BadgeIcon type={player.badge} />
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm md:text-base ${player.rank <= 3 ? 'text-white' : 'text-gray-300'
                      } group-hover:text-neonCyan transition-colors`}>
                      {player.name}
                    </h3>
                    <span className="text-xs text-gray-500">{player.badge.charAt(0).toUpperCase() + player.badge.slice(1)} League</span>
                  </div>
                </div>

                {/* Earnings */}
                <div className="col-span-4 md:col-span-3 text-right">
                  <span className="font-display font-bold text-neonCyan">{player.earnings}</span>
                </div>

                {/* Win Rate */}
                <div className="hidden md:flex md:col-span-3 justify-end items-center gap-2 text-gray-400">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {player.winRate}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer/CTA */}
          <div className="p-6 bg-white/5 border-t border-white/5 flex justify-center">
            <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
              View Global Rankings <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-neonCyan transition-colors"></div> Top 100
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
