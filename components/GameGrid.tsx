import React, { useState, useEffect, useRef } from 'react';
import { GameCardProps, Game } from '../types';
import { Gamepad2, Brain, Swords, Puzzle, Play, Rocket, Globe, X, Trophy, Users, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameCard: React.FC<GameCardProps & { index: number }> = ({ title, category, players, icon, previewUrl, onClick, index }) => {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white/[0.02] backdrop-blur-md rounded-[2.5rem] p-8 border border-white/5 overflow-hidden transition-all duration-500 hover:border-neonCyan/50 cursor-pointer"
    >
      {/* Parallax Background Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-neonCyan/10 rounded-full blur-[40px] transition-transform duration-700 ease-out group-hover:translate-y-6 group-hover:-translate-x-6 group-hover:scale-150 z-0"></div>
      
      {/* Video Preview Layer */}
      <div className="absolute inset-0 z-0 bg-void">
        <video
          ref={videoRef}
          src={previewUrl}
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center transform transition-transform duration-500 group-hover:-translate-y-2">
        <div className="w-20 h-20 rounded-3xl bg-void/50 border border-white/5 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:border-neonCyan group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] text-neonCyan group-hover:rotate-6">
          {icon}
        </div>
        <h3 className="text-2xl font-display font-black text-white mb-2 group-hover:text-neonCyan transition-colors duration-300 uppercase tracking-tighter">{title}</h3>
        <p className="text-xs text-gray-400 mb-8 uppercase tracking-[0.3em] font-mono group-hover:text-gray-200 transition-colors duration-300">{category}</p>
        
        <div className="relative w-full h-12 flex items-center justify-center">
          <div className="absolute transition-all duration-500 opacity-100 transform group-hover:opacity-0 group-hover:translate-y-4 group-hover:scale-90 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-500 bg-white/5 border border-white/5 px-4 py-2 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            {players} Active
          </div>

          <button className="absolute transition-all duration-500 opacity-0 transform translate-y-8 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 bg-white text-void font-black text-xs uppercase tracking-widest px-8 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 group/btn overflow-hidden">
             <Play className="w-3 h-3 fill-current" /> Play Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const GameModal: React.FC<{ game: Game | null; onClose: () => void }> = ({ game, onClose }) => {
  useEffect(() => {
    if (game) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [game]);

  return (
    <AnimatePresence>
      {game && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-void/95 backdrop-blur-md" 
            onClick={onClose}
          ></motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl bg-void border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,229,255,0.1)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-64 overflow-hidden pointer-events-none">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void z-10"></div>
               <video 
                 src={game.previewUrl} 
                 autoPlay 
                 muted 
                 loop 
                 playsInline
                 className="w-full h-full object-cover opacity-50" 
               />
            </div>

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10 p-10 sm:p-16 mt-20">
              <div className="flex flex-col sm:flex-row gap-10 items-start">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] bg-gradient-to-br from-gray-900 to-black border border-neonCyan/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                    <div className="text-neonCyan transform scale-[2]">
                       {game.icon}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-neonCyan/10 border border-neonCyan/20 text-neonCyan text-[10px] font-mono font-bold tracking-[0.3em] uppercase mb-4">
                      {game.category}
                    </span>
                    <h3 className="text-4xl sm:text-6xl font-display font-black text-white mb-4 uppercase tracking-tighter">
                      {game.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-8 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-neonMagenta" />
                      <span>{game.players} Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span>$10k Prize Pool</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-lg leading-relaxed font-light border-t border-white/5 pt-6">
                    {game.description}
                  </p>

                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-white text-void font-black py-5 px-8 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group uppercase tracking-tight">
                      <Play className="w-5 h-5 fill-current" />
                      Play Now
                    </button>
                    <button className="flex-1 border border-white/10 bg-white/5 text-white font-bold py-5 px-8 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 uppercase tracking-tight text-sm">
                      <Shield className="w-4 h-4" />
                      Rules
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
      <section id="games" className="py-32 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neonMagenta/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter"
            >
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonMagenta">Battlefield</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto text-xl font-light"
            >
              Prove your skills in fair, skill-based matchmaking. Winner takes all.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {games.map((game, idx) => (
              <GameCard 
                key={idx} 
                {...game} 
                index={idx}
                onClick={() => setSelectedGame(game)}
              />
            ))}
          </div>
        </div>
      </section>

      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </>
  );
};