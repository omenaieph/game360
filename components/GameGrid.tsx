import React, { useState, useEffect, useRef } from 'react';
import { GameCardProps, Game } from '../types';
import { Gamepad2, Brain, Swords, Puzzle, Play, Rocket, Globe, X, Trophy, Users, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameCard: React.FC<GameCardProps> = ({ title, category, players, icon, previewUrl, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((error) => {
        console.log("Video play failed", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
      }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-glass backdrop-blur-md rounded-2xl p-6 border border-glassBorder overflow-hidden cursor-pointer"
    >
      {/* Parallax Background Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-neonCyan/10 rounded-full blur-[40px] transition-transform duration-700 ease-out group-hover:translate-y-6 group-hover:-translate-x-6 group-hover:scale-150 z-0"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-neonMagenta/10 rounded-full blur-[40px] transition-transform duration-700 ease-out group-hover:-translate-y-6 group-hover:translate-x-6 group-hover:scale-150 z-0"></div>

      {/* Video Preview Layer */}
      <div className="absolute inset-0 z-0 bg-void">
        <video
          ref={videoRef}
          src={previewUrl}
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-in-out"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Grid/Noise Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay z-0"></div>

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neonCyan/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-void/50 border border-glassBorder flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:border-neonCyan group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] text-neonCyan group-hover:rotate-6">
          {icon}
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-neonCyan transition-colors duration-300 drop-shadow-md">{title}</h3>
        <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider group-hover:text-gray-200 transition-colors duration-300">{category}</p>

        {/* Dynamic Footer */}
        <div className="relative w-full h-10 flex items-center justify-center">
          {/* Players Count (Default) */}
          <div className="absolute transition-all duration-300 opacity-100 transform group-hover:opacity-0 group-hover:translate-y-2 group-hover:scale-90 flex items-center gap-2 text-xs font-mono text-gray-400 bg-black/40 border border-white/5 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            {players} Active
          </div>

          {/* Play Button (Hover) */}
          <button className="absolute transition-all duration-300 opacity-0 transform translate-y-4 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 bg-gradient-to-r from-neonCyan to-blue-500 text-void font-bold text-xs uppercase tracking-wide px-6 py-2 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] flex items-center gap-1 group/btn overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full -translate-x-full group-hover/btn:animate-shine bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 z-0 pointer-events-none"></div>
            <span className="relative z-10 flex items-center gap-1">
              <Play className="w-3 h-3 fill-current group-hover/btn:scale-125 transition-transform duration-300" /> Play Now
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const GameModal: React.FC<{ game: Game | null; onClose: () => void }> = ({ game, onClose }) => {
  useEffect(() => {
    if (game) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [game]);

  return (
    <AnimatePresence>
      {game && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-void/90 backdrop-blur-sm"
            onClick={onClose}
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-void border border-glassBorder rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.15)] overflow-hidden"
          >
            {/* Header Background with Preview */}
            <div className="absolute top-0 left-0 w-full h-48 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void z-10"></div>
              <video
                src={game.previewUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-40"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10 p-8 sm:p-10 mt-12">
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-neonCyan/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                    <div className="text-neonCyan transform scale-150">
                      {game.icon}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-neonCyan/10 border border-neonCyan/20 text-neonCyan text-xs font-bold tracking-wider uppercase mb-2">
                      {game.category}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                      {game.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-neonMagenta" />
                      <span>{game.players} Playing Now</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span>$10k Prize Pool</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed border-t border-glassBorder pt-4">
                    {game.description}
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-neonCyan to-blue-600 text-void font-bold py-3.5 px-6 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group">
                      <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                      Play {game.title}
                    </button>
                    <button className="flex-1 border border-glassBorder bg-white/5 text-white font-medium py-3.5 px-6 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4" />
                      View Rules
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const GameGrid: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const games: Game[] = [
    {
      title: "Grandmaster Chess",
      category: "Strategy",
      players: "12.5k",
      icon: <Brain className="w-8 h-8" />,
      description: "Test your strategic thinking against global opponents. Featuring Blitz, Bullet, and Rapid time controls with Elo-based matchmaking. Solve daily puzzles to earn bonus credits.",
      previewUrl: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.mp4"
    },
    {
      title: "Neon Pool",
      category: "Arcade",
      players: "8.2k",
      icon: <Gamepad2 className="w-8 h-8" />,
      description: "Experience the ultimate 8-ball and 9-ball pool simulator. Realistic physics, trick shot challenges, and high-stakes tournament brackets await.",
      previewUrl: "https://media.giphy.com/media/l0HlHJGHe3yAMhdQY/giphy.mp4"
    },
    {
      title: "Cyber Puzzle",
      category: "Logic",
      players: "5.4k",
      icon: <Puzzle className="w-8 h-8" />,
      description: "Race against the clock to solve complex logic grids and pattern matching puzzles. The faster you solve, the higher your multiplier.",
      previewUrl: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.mp4"
    },
    {
      title: "Arena Battler",
      category: "Action",
      players: "22k",
      icon: <Swords className="w-8 h-8" />,
      description: "Enter the cyber-arena in intense 1v1 combat. Customize your loadout with unique abilities and outplay your opponent to claim the bounty.",
      previewUrl: "https://media.giphy.com/media/cF7QqO5DYdft6/giphy.mp4"
    },
    {
      title: "Turbo Drift",
      category: "Racing",
      players: "15.3k",
      icon: <Rocket className="w-8 h-8" />,
      description: "High-octane synthwave racing. Master the art of drifting on neon-soaked tracks. Challenge ghosts or race live opponents for pink slips.",
      previewUrl: "https://media.giphy.com/media/rO709u7CgI8W4/giphy.mp4"
    },
    {
      title: "Void Legends",
      category: "MMO",
      players: "45k",
      icon: <Globe className="w-8 h-8" />,
      description: "Explore a massive procedural universe. Form guilds, hunt world bosses, and trade rare NFT artifacts in a player-driven economy.",
      previewUrl: "https://media.giphy.com/media/UYBDCJjwOd9Re/giphy.mp4"
    },
  ];

  return (
    <>
      <section id="games" className="py-24 relative">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonMagenta/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonMagenta">Battlefield</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Prove your skills in fair, skill-based matchmaking. Winner takes all.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {games.map((game, idx) => (
              <GameCard
                key={idx}
                {...game}
                onClick={() => setSelectedGame(game)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Game Detail Modal */}
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </>
  );
};