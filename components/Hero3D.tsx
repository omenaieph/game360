import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Hero3D: React.FC = () => {
     const ref = useRef<HTMLDivElement>(null);

     // Mouse position state
     const x = useMotionValue(0);
     const y = useMotionValue(0);

     // Smooth springs for rotation
     const rotateX = useSpring(useTransform(y, [-300, 300], [20, -20]), { stiffness: 150, damping: 20 });
     const rotateY = useSpring(useTransform(x, [-300, 300], [-20, 20]), { stiffness: 150, damping: 20 });

     const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
          const rect = ref.current?.getBoundingClientRect();
          if (rect) {
               const centerX = rect.left + rect.width / 2;
               const centerY = rect.top + rect.height / 2;
               x.set(e.clientX - centerX);
               y.set(e.clientY - centerY);
          }
     };

     const handleMouseLeave = () => {
          x.set(0);
          y.set(0);
     };

     return (
          <motion.div
               ref={ref}
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000 mx-auto cursor-grab active:cursor-grabbing will-change-transform"
          >
               {/* Glow Behind */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-neonCyan/20 blur-[80px] rounded-full animate-pulse-fast pointer-events-none"></div>

               {/* Rotating Cube Container */}
               <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative w-full h-full"
               >
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
               </motion.div>

               {/* Floating Particles - now with Framer Motion floating animation */}
               <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 w-4 h-4 bg-neonCyan rounded-full blur-[2px]"
               />
               <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/2 -left-20 w-3 h-3 bg-neonMagenta rounded-full blur-[2px]"
               />
               <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-10 right-20 w-2 h-2 bg-white rounded-full blur-[1px]"
               />
          </motion.div>
     );
};