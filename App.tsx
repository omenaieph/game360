import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PhoneMockup } from './components/PhoneMockup';
import { Ticker } from './components/Ticker';
import { GameGrid } from './components/GameGrid';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { AuthModal } from './components/AuthModal';
import { ChevronRight, Play, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

const App: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-void relative selection:bg-neonCyan selection:text-void">
      {/* Interactive Mouse Glow */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 255, 0.05), transparent 40%)`
        }}
      ></div>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-[20%] left-[20%] w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[120px]"
        ></motion.div>
        <div className="absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[100px]"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      <Navbar onOpenAuth={openAuth} user={user} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-44 lg:py-32 relative gap-12 lg:gap-24">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-3/5 text-center lg:text-left z-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
              <span className="text-gray-300 text-[10px] font-mono uppercase tracking-[0.3em]">50,000+ Active Players Online</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl xl:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.85] uppercase">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">Compete.</span> <br />
              <span className="text-neonCyan drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">Win Cash.</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">Instantly.</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed font-light">
              Turn your gaming skills into real income. Challenge players worldwide in Chess, Pool, and Arcade classics on the #1 ranked mobile esports platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
              <button className="group relative px-10 py-5 bg-white text-void font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Download App <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-neonCyan translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
              <button className="group px-10 py-5 bg-transparent border border-white/10 text-white font-bold text-lg rounded-full backdrop-blur-md transition-all hover:bg-white/5 hover:border-white/30 flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                   <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                View Demo
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
               <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-neonCyan" /> Secure Payments</span>
               <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
               <span>iOS & Android</span>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="w-full lg:w-2/5 flex justify-center lg:justify-end z-10 perspective-1000"
          >
             <PhoneMockup />
          </motion.div>
        </section>

        <Ticker />
        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Features />
        </motion.div>

        <GameGrid />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <HowItWorks />
        </motion.div>

        <FAQ />

        {/* CTA Section */}
        <section className="py-32 px-4 relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-white/10 p-12 md:p-24 text-center relative backdrop-blur-3xl overflow-hidden"
          >
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-neonCyan/10 rounded-full blur-[100px]"></div>
             <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-neonMagenta/10 rounded-full blur-[100px]"></div>
             
             <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 relative z-10 uppercase tracking-tighter">
               Ready to Claim <br /> <span className="text-neonCyan">Your Throne?</span>
             </h2>
             <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10 font-light">
               Join 50,000+ players earning daily. Sign up now and get a free entry into the Rookie Tournament.
             </p>
             <button 
               onClick={() => openAuth('signup')}
               className="relative z-10 px-12 py-5 bg-white text-void font-black text-xl rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all uppercase tracking-tight"
             >
               Start Playing Now
             </button>
          </motion.div>
        </section>

      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />

      {/* Footer */}
      <footer className="bg-black/60 border-t border-white/5 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <span className="font-display font-black text-2xl text-white tracking-tighter uppercase">
                GAME<span className="text-neonCyan">360</span>
              </span>
              <p className="text-gray-500 text-sm mt-4 font-mono uppercase tracking-widest">© 2024 GAME360 Inc. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-gray-500 text-xs font-mono uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-neonCyan transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neonCyan transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-neonCyan transition-colors">Support</a>
              <a href="#" className="hover:text-neonCyan transition-colors">Careers</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;