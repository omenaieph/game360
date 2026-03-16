import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Chrome, ArrowRight, Loader2 } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          displayName: name,
          email: email,
          role: 'user',
          createdAt: serverTimestamp(),
          stats: { wins: 0, losses: 0, rank: 'Rookie' }
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user document exists
      const userDoc = await getDocFromServer(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName || 'Anonymous Pilot',
          email: user.email,
          photoURL: user.photoURL,
          role: 'user',
          createdAt: serverTimestamp(),
          stats: { wins: 0, losses: 0, rank: 'Rookie' }
        });
      }
      onClose();
    } catch (err: any) {
      console.error('Google Auth error:', err);
      setError(err.message || 'Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-void/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-void border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neonCyan to-transparent opacity-50"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-neonCyan/10 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-[80px]"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 sm:p-10 relative z-10">
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-2">
                  {mode === 'login' ? 'Welcome ' : 'Join the '}
                  <span className="text-neonCyan">{mode === 'login' ? 'Back' : 'Elite'}</span>
                </h2>
                <p className="text-gray-400 text-sm font-light">
                  {mode === 'login' 
                    ? 'Enter your credentials to access the grid.' 
                    : 'Create your pilot profile and start earning.'}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex bg-white/5 p-1 rounded-full mb-8 border border-white/5">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
                    mode === 'login' ? 'bg-white text-void font-black shadow-lg' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
                    mode === 'signup' ? 'bg-white text-void font-black shadow-lg' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono uppercase tracking-wider text-center"
                  >
                    {error}
                  </motion.div>
                )}
                {mode === 'signup' && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neonCyan transition-colors" />
                    <input
                      type="text"
                      placeholder="PILOT NAME"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-neonCyan/50 focus:bg-white/[0.08] transition-all font-mono text-sm tracking-wider"
                      required
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neonCyan transition-colors" />
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-neonCyan/50 focus:bg-white/[0.08] transition-all font-mono text-sm tracking-wider"
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neonCyan transition-colors" />
                  <input
                    type="password"
                    placeholder="ACCESS KEY"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-neonCyan/50 focus:bg-white/[0.08] transition-all font-mono text-sm tracking-wider"
                    required
                  />
                </div>

                {mode === 'login' && (
                  <div className="text-right">
                    <button type="button" className="text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-neonCyan transition-colors">
                      Forgot Access Key?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative py-4 bg-white text-void font-black uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {mode === 'login' ? 'Initialize Session' : 'Create Profile'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  {!loading && <div className="absolute inset-0 bg-neonCyan translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-mono uppercase tracking-[0.3em]">
                  <span className="bg-void px-4 text-gray-600">Secure Uplink</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-1 gap-4">
                <button 
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 py-3 rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all font-mono text-[10px] uppercase tracking-widest disabled:opacity-50"
                >
                  <Chrome className="w-4 h-4" />
                  Continue with Google
                </button>
              </div>

              {/* Footer */}
              <p className="mt-10 text-center text-[10px] font-mono uppercase tracking-widest text-gray-600">
                By connecting, you agree to our <br />
                <a href="#" className="text-gray-400 hover:text-neonCyan transition-colors">Terms of Engagement</a> & <a href="#" className="text-gray-400 hover:text-neonCyan transition-colors">Privacy Protocol</a>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
