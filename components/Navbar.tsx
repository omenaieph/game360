import React, { useState, useEffect } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { NavLinkProps } from '../types';

const NavLink: React.FC<NavLinkProps> = ({ href, label, isMobile, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`${isMobile
      ? 'block w-full py-4 text-center text-lg border-b border-glassBorder hover:bg-glass hover:text-neonCyan'
      : 'text-sm font-medium hover:text-neonCyan transition-colors duration-300 relative group'
      } text-gray-300`}
  >
    {label}
    {!isMobile && (
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neonCyan transition-all duration-300 group-hover:w-full"></span>
    )}
  </a>
);

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 will-change-transform ${isScrolled || isMobileMenuOpen
        ? 'bg-void/70 backdrop-blur-lg border-b border-glassBorder shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
        : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <div className="absolute inset-0 bg-neonCyan blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Gamepad2 className="w-8 h-8 text-white relative z-10" />
            </div>
            <span className="font-display font-bold text-2xl tracking-wider text-white">
              GAME<span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonMagenta">360</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#games" label="Games" />
            <NavLink href="#leaderboard" label="Leaderboard" />
            <NavLink href="#earn" label="How to Earn" />
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-white hover:text-neonCyan transition-colors px-4 py-2 shrink-0">
              Login
            </button>
            <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-neonMagenta to-purple-600 text-white font-bold text-sm shadow-[0_0_15px_rgba(217,0,197,0.4)] hover:shadow-[0_0_25px_rgba(217,0,197,0.6)] hover:scale-105 transition-all duration-300 shrink-0 whitespace-nowrap">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-void/90 backdrop-blur-lg border-b border-glassBorder transition-all duration-300 overflow-hidden will-change-[max-height,opacity] ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="flex flex-col px-4 pt-2 pb-6 space-y-2">
          <NavLink href="#games" label="Games" isMobile onClick={() => setIsMobileMenuOpen(false)} />
          <NavLink href="#leaderboard" label="Leaderboard" isMobile onClick={() => setIsMobileMenuOpen(false)} />
          <NavLink href="#earn" label="How to Earn" isMobile onClick={() => setIsMobileMenuOpen(false)} />
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full py-3 rounded-lg border border-glassBorder text-white font-medium hover:bg-glass hover:border-neonCyan/50 transition-all">
              Login
            </button>
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-neonMagenta to-purple-600 text-white font-bold shadow-lg">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};