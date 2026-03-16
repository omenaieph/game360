import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-6 md:p-8 flex justify-between items-center text-left transition-all duration-500 rounded-[2rem] border ${
          isOpen 
            ? 'bg-white/[0.05] border-neonCyan/30 shadow-[0_0_30px_rgba(0,229,255,0.1)]' 
            : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
        }`}
      >
        <span className={`text-xl md:text-2xl font-display font-black uppercase tracking-tighter transition-colors ${isOpen ? 'text-neonCyan' : 'text-white'}`}>
          {question}
        </span>
        <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-neonCyan text-void rotate-180' : 'bg-white/5 text-gray-500'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-8 md:p-10 text-gray-400 text-lg leading-relaxed font-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Is GAME360 legal?",
      answer: "Yes. GAME360 operates as a skill-based gaming platform. In most jurisdictions, games of skill are legally distinct from gambling. We operate in full compliance with US and international laws."
    },
    {
      question: "How do I withdraw my winnings?",
      answer: "Withdrawals are simple. Go to your wallet, select 'Withdraw', and choose your preferred method (Bank Transfer, PayPal, or Crypto). Most requests are processed instantly."
    },
    {
      question: "Is there an entry fee for tournaments?",
      answer: "We offer both free practice matches and cash tournaments. Cash tournaments have varying entry fees starting as low as $0.50, with prize pools scaling accordingly."
    },
    {
      question: "What happens if my internet disconnects?",
      answer: "We have a reconnection policy that allows you a brief window to rejoin. However, to ensure fairness, if you cannot reconnect in time, the match may be forfeited."
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonMagenta/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter"
          >
            Intel <span className="text-neonMagenta">Briefing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl font-light"
          >
            Everything you need to know before entering the arena.
          </motion.p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} {...faq} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};