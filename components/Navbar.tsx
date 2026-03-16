import React, { useState, useEffect } from 'react';
import { Menu, X, Gamepad2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink: React.FC<{ href: string; label: string; isActive?: boolean }> = ({ href, label, isActive }) => (
  <a
    href={href}
    className="relative px-2 lg:px-4 py-2 text-[11px] lg:text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 group"
  >
    <span className="relative z-10">{label}</span>
    {isActive && (
      <motion.span 
        layoutId="nav-pill"
        className="absolute inset-0 bg-white/5 rounded-full border border-white/10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-neonCyan transition-all duration-300 group-hover:w-1/2 opacity-0 group-hover:opacity-100"></span>
  </a>
);

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#games", label: "Games" },
    { href: "#leaderboard", label: "Leaderboard" },
    { href: "#earn", label: "How to Earn" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <div className="fixed top-0 w-full z-50 px-0 md:px-4 py-0 md:py-4 lg:py-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`mx-auto transition-all duration-500 pointer-events-auto ${
          isScrolled 
            ? 'max-w-4xl bg-void/60 backdrop-blur-2xl border-b md:border border-white/10 rounded-none md:rounded-full px-6 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
            : 'max-w-7xl bg-transparent border-transparent px-6 py-6'
        } ${isMobileMenuOpen ? 'bg-void/95 backdrop-blur-3xl border-b border-white/10' : ''}`}
      >
        <div className="flex justify-between items-center h-12 md:h-auto">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <div className="absolute inset-0 bg-neonCyan blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <Gamepad2 className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-display font-black text-lg md:text-xl tracking-tighter text-white uppercase">
              GAME<span className="text-neonCyan">360</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center bg-white/[0.03] border border-white/5 rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative"
              >
                <NavLink 
                  href={link.href} 
                  label={link.label} 
                  isActive={hoveredLink === link.label}
                />
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <button className="text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors px-2 lg:px-4">
              Login
            </button>
            <button className="group relative px-4 lg:px-6 py-2 lg:py-2.5 rounded-full bg-white text-void font-black text-[10px] uppercase tracking-widest overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-neonCyan translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-[64px] left-0 right-0 bg-void/95 backdrop-blur-3xl border-b border-white/10 p-8 shadow-2xl pointer-events-auto h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-display font-black text-white uppercase tracking-tighter hover:text-neonCyan transition-colors flex items-center justify-between group"
                >
                  {link.label}
                  <ChevronRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </motion.a>
              ))}
              <div className="pt-12 flex flex-col gap-4">
                <button className="w-full py-5 rounded-2xl border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                  Login
                </button>
                <button className="w-full py-5 rounded-2xl bg-white text-void font-black uppercase tracking-widest text-xs shadow-lg">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};