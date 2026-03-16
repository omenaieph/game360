import React from 'react';
import { StepProps } from '../types';
import { Gamepad2, Swords, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Step: React.FC<StepProps & { index: number }> = ({ number, title, description, icon, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="flex flex-col items-center text-center p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 relative group hover:bg-white/[0.05] transition-all duration-500"
  >
    <div className="w-24 h-24 rounded-3xl bg-void border border-white/10 flex items-center justify-center mb-8 shadow-2xl relative z-10 group-hover:scale-110 group-hover:border-neonCyan/50 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-neonCyan/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity"></div>
      <div className="text-white relative z-10 group-hover:text-neonCyan transition-colors">
        {icon}
      </div>
      <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-neonCyan text-void font-black flex items-center justify-center border-4 border-void text-sm">
        {number}
      </div>
    </div>
    <h3 className="text-2xl font-display font-black text-white mb-4 uppercase tracking-tighter">{title}</h3>
    <p className="text-gray-400 leading-relaxed font-light text-lg">{description}</p>
    
    {/* Decorative Arrow for Desktop */}
    {index < 2 && (
      <div className="hidden lg:block absolute top-1/2 -right-12 transform -translate-y-1/2 text-white/10 group-hover:text-neonCyan/30 transition-colors">
        <ArrowRight className="w-12 h-12" />
      </div>
    )}
  </motion.div>
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
    <section id="earn" className="py-32 relative overflow-hidden">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neonCyan/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter"
          >
            Master the <span className="text-neonCyan">Arena</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-xl font-light"
          >
            Three simple steps to start earning from your gaming passion.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, idx) => (
            <Step key={idx} {...step} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};