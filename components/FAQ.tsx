import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-glassBorder last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-neonCyan' : 'text-white group-hover:text-gray-200'}`}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-neonCyan" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-white" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
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
    <section className="py-24 bg-black/30 border-t border-glassBorder relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Frequently Asked Questions</h2>
        </div>
        
        <div className="bg-glass backdrop-blur-md rounded-2xl border border-glassBorder px-6 md:px-10">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};