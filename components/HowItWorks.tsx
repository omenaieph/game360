import React from 'react';
import { StepProps } from '../types';
import { Gamepad2, Swords, DollarSign } from 'lucide-react';

const Step: React.FC<StepProps> = ({ number, title, description, icon }) => (
  <div className="flex flex-col items-center text-center p-6 relative">
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-glassBorder flex items-center justify-center mb-6 shadow-lg relative z-10 group transition-transform hover:-translate-y-2 duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-neonCyan to-neonMagenta opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
      <div className="text-white group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-neonCyan text-black font-bold flex items-center justify-center border-2 border-void">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export const HowItWorks: React.FC = () => {
  const steps = [
    { 
      number: "1", 
      title: "Select a Game", 
      description: "Browse our arcade or strategy collection. Choose the game that matches your skill set.",
      icon: <Gamepad2 className="w-10 h-10" />
    },
    { 
      number: "2", 
      title: "Compete 1v1", 
      description: "Get matched with a real player of similar skill level. Play fair, play hard.",
      icon: <Swords className="w-10 h-10" />
    },
    { 
      number: "3", 
      title: "Withdraw Instantly", 
      description: "Win the match and the pot is yours. Withdraw your earnings securely to your bank or crypto wallet.",
      icon: <DollarSign className="w-10 h-10" />
    },
  ];

  return (
    <section id="earn" className="py-24 bg-black/20 relative border-t border-glassBorder">
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neonCyan/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">How It Works</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neonCyan to-neonMagenta mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-800 via-neonCyan/50 to-gray-800 z-0 border-t border-dashed border-gray-700"></div>
          
          {steps.map((step, idx) => (
            <Step key={idx} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};