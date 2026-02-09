import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MapPin, Clock, Calendar, PartyPopper, Sparkles, Gift, ArrowLeft } from 'lucide-react';

interface InvitationRevealProps {
  guestName: string;
  onBack: () => void;
}

const InvitationReveal = ({ guestName, onBack }: InvitationRevealProps) => {
  useEffect(() => {
    // Initial burst
    const burst = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFD700', '#F4E4BC', '#C5A028', '#E91E63'],
      });
    };

    // Sides burst
    const sides = () => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D4AF37', '#FFD700', '#F4E4BC'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D4AF37', '#FFD700', '#F4E4BC'],
      });
    };

    burst();
    setTimeout(sides, 300);
    setTimeout(burst, 600);

    // Continuous celebration
    const interval = setInterval(() => {
      confetti({
        particleCount: 10,
        spread: 120,
        origin: { y: 0.1, x: Math.random() },
        colors: ['#D4AF37', '#FFD700', '#F4E4BC', '#E91E63'],
        gravity: 0.8,
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#FFD700', '#F4E4BC', '#E91E63', '#9C27B0'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 relative z-10"
    >
      {/* Back Button */}
      <motion.button
        variants={itemVariants}
        onClick={onBack}
        className="absolute top-6 left-6 p-3 bg-card/80 backdrop-blur-sm rounded-full border border-gold/20 text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-gold sparkle" />
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase">
            You're Invited
          </p>
          <Sparkles className="w-6 h-6 text-gold sparkle" />
        </div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        variants={itemVariants}
        className="relative w-full max-w-md"
      >
        <div className="absolute inset-0 bg-gradient-gold rounded-3xl blur-xl opacity-20" />
        <div className="relative bg-card/90 backdrop-blur-xl border border-gold/30 rounded-3xl p-8 md:p-10 shadow-card">
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/50 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/50 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/50 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/50 rounded-br-lg" />

          {/* Guest name */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-center mb-6"
          >
            <p className="text-muted-foreground font-body text-sm mb-1">Dear</p>
            <h2 className="font-display text-3xl text-gradient-gold">{guestName}</h2>
          </motion.div>

          {/* Birthday person */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-gold mb-4 shadow-glow">
              <PartyPopper className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
              Anoop Sharma
            </h1>
            <p className="text-gold font-body text-lg">turns fabulous!</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <Gift className="w-5 h-5 text-gold" />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </div>

          {/* Event details */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-gold/10"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-body">Date</p>
                <p className="text-foreground font-display text-xl">10th February</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-gold/10"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-body">Time</p>
                <p className="text-foreground font-display text-xl">9:00 PM</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl border border-gold/10"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-body">Venue</p>
                <p className="text-foreground font-display text-xl">Bellandur Social</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={triggerConfetti}
        className="mt-8 px-8 py-4 bg-gradient-gold text-primary-foreground font-body font-semibold text-lg rounded-full shadow-gold hover:shadow-glow transition-all duration-300 flex items-center gap-3"
      >
        <PartyPopper className="w-5 h-5" />
        <span>Celebrate!</span>
        <PartyPopper className="w-5 h-5" />
      </motion.button>

      {/* Footer message */}
      <motion.p
        variants={itemVariants}
        className="mt-8 text-center text-muted-foreground font-body text-sm max-w-sm"
      >
        Let's make this celebration unforgettable! 🥳
        <br />
        <span className="text-gold">See you there!</span>
      </motion.p>
    </motion.div>
  );
};

export default InvitationReveal;
