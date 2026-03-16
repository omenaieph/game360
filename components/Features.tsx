import React from 'react';
import { Zap, ShieldCheck, Scale, Headset } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; index: number }> = ({ icon, title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-neonCyan/30 transition-all duration-500 group relative overflow-hidden backdrop-blur-sm"
  >
    {/* Card Glow Effect */}
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-neonCyan/5 rounded-full blur-[60px] group-hover:bg-neonCyan/10 transition-colors duration-500"></div>
    
    <div className="w-14 h-14 rounded-2xl bg-void border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-neonCyan/50 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-500">
      <div className="text-neonCyan">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed font-light">{description}</p>
  </motion.div>
);

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Instant Withdrawals",
      description: "No waiting days for your winnings. Transfer funds to your bank, PayPal, or crypto wallet instantly after every match."
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Bank-Grade Security",
      description: "Your funds are protected by 256-bit encryption. We partner with top-tier payment processors to ensure your money is safe."
    },
    {
      icon: <Scale className="w-7 h-7" />,
      title: "Fair Play Guarantee",
      description: "Our proprietary anti-cheat engine monitors gameplay in real-time. Skill-based matchmaking ensures you only play opponents at your level."
    },
    {
      icon: <Headset className="w-7 h-7" />,
      title: "24/7 Player Support",
      description: "Got an issue? Our dedicated support team is available round the clock to help you with disputes, deposits, or technical questions."
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[120px] -z-10"></div>
       <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] -z-10"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-black text-white mb-6 uppercase tracking-tighter"
            >
              Why Players Trust <span className="text-neonCyan">GAME360</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-2xl mx-auto text-lg font-light"
            >
              We've built the safest, fastest, and most equitable skill-gaming platform on the market.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} index={idx} />
            ))}
          </div>
       </div>
    </section>
  );
};