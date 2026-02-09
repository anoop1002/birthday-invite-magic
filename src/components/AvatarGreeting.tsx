import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface AvatarGreetingProps {
  guestNames: string[];
  onComplete: () => void;
}

const formatName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

const AvatarGreeting = ({ guestNames, onComplete }: AvatarGreetingProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [muted, setMuted] = useState(false);

  const hasSpokenRef = useRef(false);

  // ✅ Safely format names
  const formattedNames =
    guestNames.length > 0
      ? guestNames.map(formatName).join(' & ')
      : 'Guest';

  const greetingMessage = `Hey ${formattedNames}! 
  It’s my birthday, and I’m really happy you’re here. I’d love for you to join me in celebrating this special day with lots of fun!`;

  /* ---------------- TEXT TYPING EFFECT ---------------- */
 useEffect(() => {
  let index = 0;

  const textInterval = setInterval(() => {
    if (index <= greetingMessage.length) {
      setDisplayText(greetingMessage.slice(0, index));
      index++;
    } else {
      clearInterval(textInterval);
      setTimeout(onComplete, 500); 
    }
  }, 40);

  return () => clearInterval(textInterval);
}, [greetingMessage, onComplete]);


  /* ---------------- SPEECH SYNTHESIS ---------------- */
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    if (muted) return;
    if (hasSpokenRef.current) return;

    hasSpokenRef.current = true;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(greetingMessage);
    utterance.rate = 0.65;
    utterance.pitch = 1;
    utterance.volume = 1;

    const speak = () => {
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        v =>
          v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('premium') ||
          v.lang === 'en-US'
      );

      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
        setTimeout(onComplete, 800);
      };

      speechSynthesis.speak(utterance);
    };

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = speak;
    } else {
      setTimeout(speak, 600);
    }

    return () => {
      speechSynthesis.onvoiceschanged = null;
      speechSynthesis.cancel();
    };
  }, [greetingMessage, muted, onComplete]);

  /* ---------------- UI ---------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 relative z-10"
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="relative mb-8"
      >
        <motion.div
          animate={{
            boxShadow: isSpeaking
              ? [
                  '0 0 0 0 hsl(45 93% 58% / 0.4)',
                  '0 0 0 20px hsl(45 93% 58% / 0)',
                ]
              : '0 0 30px hsl(45 93% 58% / 0.3)',
          }}
          transition={{
            repeat: isSpeaking ? Infinity : 0,
            duration: 1,
          }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold"
        >
          <span className="text-5xl md:text-6xl">🎉</span>
        </motion.div>

        {/* Speaking indicator */}
        <motion.div
          animate={{ scale: isSpeaking ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: isSpeaking ? Infinity : 0, duration: 0.5 }}
          className="absolute -bottom-2 -right-2 w-10 h-10 bg-card rounded-full flex items-center justify-center border-2 border-gold"
        >
          {isSpeaking ? (
            <Volume2 className="w-5 h-5 text-gold" />
          ) : (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.div>
      </motion.div>

      {/* Greeting text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-lg text-center"
      >
       <motion.p className="text-xl md:text-2xl font-body leading-relaxed text-champagne whitespace-pre-line">
          {displayText}
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="text-gold"
          >
            |
          </motion.span>
        </motion.p>
      </motion.div>

      {/* Mute toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setMuted(!muted)}
        className="mt-8 px-4 py-2 bg-secondary rounded-full flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        <span className="text-sm font-body">
          {muted ? 'Unmute' : 'Mute'}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default AvatarGreeting;
