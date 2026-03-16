import React from 'react';

export const Hero3D: React.FC = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000 mx-auto">
      {/* Glow Behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-neonCyan/20 blur-[80px] rounded-full animate-pulse-fast"></div>
      
      {/* Rotating Cube Container */}
      <div className="relative w-full h-full transform-style-3d animate-spin-slow">
        {/* Cube Faces */}
        {/* Front */}
        <div className="absolute w-full h-full border-2 border-neonCyan/50 bg-neonCyan/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.2)]"
             style={{ transform: 'rotateY(0deg) translateZ(8rem)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 rounded-full bg-neonCyan/20 blur-md"></div>
            </div>
        </div>
        {/* Back */}
        <div className="absolute w-full h-full border-2 border-neonMagenta/50 bg-neonMagenta/5 backdrop-blur-sm shadow-[0_0_15px_rgba(217,0,197,0.2)]"
             style={{ transform: 'rotateY(180deg) translateZ(8rem)' }}></div>
        {/* Right */}
        <div className="absolute w-full h-full border-2 border-purple-500/50 bg-purple-500/5 backdrop-blur-sm"
             style={{ transform: 'rotateY(90deg) translateZ(8rem)' }}></div>
        {/* Left */}
        <div className="absolute w-full h-full border-2 border-neonCyan/50 bg-neonCyan/5 backdrop-blur-sm"
             style={{ transform: 'rotateY(-90deg) translateZ(8rem)' }}></div>
        {/* Top */}
        <div className="absolute w-full h-full border-2 border-neonMagenta/50 bg-neonMagenta/5 backdrop-blur-sm"
             style={{ transform: 'rotateX(90deg) translateZ(8rem)' }}></div>
        {/* Bottom */}
        <div className="absolute w-full h-full border-2 border-purple-500/50 bg-purple-500/5 backdrop-blur-sm"
             style={{ transform: 'rotateX(-90deg) translateZ(8rem)' }}></div>
      </div>
      
      {/* Floating Particles (Simple dots) */}
      <div className="absolute -top-10 -right-10 w-4 h-4 bg-neonCyan rounded-full blur-[2px] animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-1/2 -left-20 w-3 h-3 bg-neonMagenta rounded-full blur-[2px] animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute -bottom-10 right-20 w-2 h-2 bg-white rounded-full blur-[1px] animate-float" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};