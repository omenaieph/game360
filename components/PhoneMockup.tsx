import React from 'react';
import { Wifi, Battery, Signal, User, Trophy, ShieldCheck } from 'lucide-react';

export const PhoneMockup: React.FC = () => {
  return (
    <div className="relative mx-auto perspective-1000">
      {/* Outer Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-neonCyan/20 blur-[80px] rounded-full animate-pulse-fast"></div>

      {/* Phone Chassis */}
      <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500 animate-float">
        
        {/* Screen */}
        <div className="w-full h-full bg-void relative overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="px-6 py-4 flex justify-between items-center text-white/80 z-20">
            <span className="text-xs font-medium">9:41</span>
            <div className="flex gap-1.5">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20"></div>

          {/* App UI: Match Found Screen */}
          <div className="flex-1 flex flex-col items-center pt-8 px-6 relative">
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-20"></div>
             
             <div className="text-center mb-8 z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-neonCyan/10 border border-neonCyan/20 text-neonCyan text-[10px] font-bold tracking-wider uppercase mb-2 animate-pulse">
                  Live Match Found
                </span>
                <h3 className="text-white font-display font-bold text-lg">Battle Arena</h3>
                <p className="text-gray-400 text-xs">Entry: $10.00</p>
             </div>

             {/* VS Area */}
             <div className="w-full flex justify-between items-center mb-8 relative z-10">
                {/* Player 1 */}
                <div className="flex flex-col items-center">
                   <div className="w-16 h-16 rounded-full border-2 border-neonCyan p-1 relative">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center border border-gray-700">
                        <ShieldCheck className="w-3 h-3 text-green-500" />
                      </div>
                   </div>
                   <span className="text-white font-bold text-sm mt-2">You</span>
                   <span className="text-gray-500 text-xs">Lvl 42</span>
                </div>

                {/* VS Badge */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neonCyan to-neonMagenta flex items-center justify-center font-black text-white italic text-xs shadow-[0_0_15px_rgba(217,0,197,0.5)] z-10">
                   VS
                </div>

                {/* Player 2 */}
                <div className="flex flex-col items-center">
                   <div className="w-16 h-16 rounded-full border-2 border-neonMagenta p-1 relative">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                   </div>
                   <span className="text-white font-bold text-sm mt-2">Alex_Pro</span>
                   <span className="text-gray-500 text-xs">Lvl 38</span>
                </div>
             </div>

             {/* Prize Pool Card */}
             <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-6 z-10 transform scale-100 animate-[pulse_3s_infinite]">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-gray-400 text-xs uppercase tracking-wider">Total Prize</span>
                   <Trophy className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="text-3xl font-display font-bold text-white text-center">
                   $18.00
                </div>
             </div>

             {/* Action Button */}
             <div className="w-full mt-auto mb-8 z-10">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-neonCyan to-blue-600 text-void font-bold shadow-lg shadow-neonCyan/20">
                   Ready to Play
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};