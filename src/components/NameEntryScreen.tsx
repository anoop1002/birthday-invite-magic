import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface NameEntryScreenProps {
  onSubmit: (names: string[]) => void;
}

/**
 * Map any entered name to an invite pair
 */
const invitePairs: Record<string, string[]> = {
  jay: ['Jay', 'Yash'],
  khushi: ['Khushi', 'Nikki'],
 
};

/**
 * Format name nicely (Jay, Khushi etc.)
 */
const formatName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

const NameEntryScreen = ({ onSubmit }: NameEntryScreenProps) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredName = name.trim().toLowerCase();
    if (!enteredName) return;

    const matchedPair = invitePairs[enteredName];

    if (matchedPair) {
      onSubmit(matchedPair);
    } else {
      // fallback → single name
      onSubmit([formatName(name.trim())]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10"
    >
      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="absolute top-20 left-10 text-gold opacity-30"
      >
        <Sparkles size={40} />
      </motion.div>

      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        className="absolute top-32 right-16 text-gold opacity-20"
      >
        <Sparkles size={30} />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mb-12"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4"
        >
          You're Invited
        </motion.p>

        <h1 className="font-display text-5xl md:text-7xl text-gradient-gold leading-tight">
          Anoop&apos;s Birthday
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="h-[2px] w-32 bg-gradient-gold mx-auto mt-6"
        />
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md"
      >
        <div className="relative mb-8">
          <motion.div
            animate={{
              boxShadow: isFocused
                ? '0 0 40px hsl(45 93% 58% / 0.4)'
                : '0 0 20px hsl(45 93% 58% / 0.2)',
            }}
            className="relative rounded-xl overflow-hidden"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your name..."
              className="w-full px-6 py-5 bg-secondary/80 backdrop-blur-sm border-2 border-gold/30 rounded-xl text-foreground text-lg font-body placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-all duration-300"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isFocused ? 1 : 0 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-gold origin-left"
            />
          </motion.div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!name.trim()}
          className="w-full py-4 px-8 bg-gradient-gold text-primary-foreground font-body font-semibold text-lg rounded-xl shadow-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow relative overflow-hidden group"
        >
          <span className="relative z-10">Enter the Celebration</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          />
        </motion.button>
      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-muted-foreground text-sm mt-8 font-body"
      >
        ✨ A special invitation awaits you ✨
      </motion.p>
    </motion.div>
  );
};

export default NameEntryScreen;
