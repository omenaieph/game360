import React from 'react';
import { Zap, ShieldCheck, Scale, Headset } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neonCyan/30 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-lg bg-void border border-glassBorder flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all">
      <div className="text-neonCyan">
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Withdrawals",
      description: "No waiting days for your winnings. Transfer funds to your bank, PayPal, or crypto wallet instantly after every match."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Bank-Grade Security",
      description: "Your funds are protected by 256-bit encryption. We partner with top-tier payment processors to ensure your money is safe."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Fair Play Guarantee",
      description: "Our proprietary anti-cheat engine monitors gameplay in real-time. Skill-based matchmaking ensures you only play opponents at your level."
    },
    {
      icon: <Headset className="w-6 h-6" />,
      title: "24/7 Player Support",
      description: "Got an issue? Our dedicated support team is available round the clock to help you with disputes, deposits, or technical questions."
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
       {/* Background Elements */}
       <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-indigo-900/20 rounded-full blur-[100px] -z-10"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Why Players Trust <span className="text-neonCyan">GAME360</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We've built the safest, fastest, and most equitable skill-gaming platform on the market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
       </div>
    </section>
  );
};