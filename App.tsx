import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { Ticker } from './components/Ticker';
import { GameGrid } from './components/GameGrid';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Leaderboard } from './components/Leaderboard';
import { FAQ } from './components/FAQ';
import { ChevronRight, Play, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2, // Enhance touch response for mobile
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans bg-void relative overflow-hidden [webkit-overflow-scrolling:touch] will-change-scroll">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] left-[20%] w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[50vw] h-[50vw] bg-indigo-900/20 rounded-full blur-[100px]"></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <Navbar />

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-80px)] min-h-[calc(100dvh-80px)] flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative">

          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left z-10 mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-gray-300 text-sm font-medium tracking-wide">50,000+ Active Players Online</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6 leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">Compete.</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neonCyan to-neonMagenta animate-pulse-fast">Win Cash.</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">Instantly.</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Turn your gaming skills into real income. Challenge players worldwide in Chess, Pool, and Arcade classics on the #1 ranked mobile esports platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-neonCyan to-neonMagenta text-white font-bold text-lg rounded-full overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,255,0.6)]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Download App <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <button className="group px-8 py-4 bg-transparent border border-glassBorder text-white font-bold text-lg rounded-full backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                View Demo
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-neonCyan" /> Secure Payments</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>iOS & Android</span>
            </div>
          </div>

          {/* Visual Content */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
            <Hero3D />
          </div>
        </section>

        <Ticker />
        <Features />
        <GameGrid />
        <Leaderboard />
        <HowItWorks />
        <FAQ />

        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-glassBorder p-10 md:p-16 text-center relative backdrop-blur-xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>

            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">
              Ready to Claim Your Throne?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join 50,000+ players earning daily. Sign up now and get a free entry into the Rookie Tournament.
            </p>
            <button className="relative z-10 px-10 py-4 bg-white text-void font-black text-xl rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all">
              Start Playing Now
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-glassBorder py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-display font-bold text-xl text-white">
              GAME<span className="text-neonCyan">360</span>
            </span>
            <p className="text-gray-500 text-sm mt-2">© 2024 GAME360 Inc. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-gray-400 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;