import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';
import NameEntryScreen from '@/components/NameEntryScreen';
import AvatarGreeting from '@/components/AvatarGreeting';
import InvitationReveal from '@/components/InvitationReveal';

type Screen = 'entry' | 'greeting' | 'invitation';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('entry');
  const [guestName, setGuestName] = useState('');

  const handleNameSubmit = (name: string) => {
    setGuestName(name);
    setCurrentScreen('greeting');
  };

  const handleGreetingComplete = () => {
    setCurrentScreen('invitation');
  };

  const handleBackToEntry = () => {
    setCurrentScreen('entry');
    setGuestName('');
  };

  return (
    <div className="min-h-screen bg-gradient-dark overflow-hidden relative">
      <ParticleBackground />
      
      {/* Radial glow effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, hsl(45 93% 58% / 0.08), transparent 60%)',
        }}
      />

      <AnimatePresence mode="wait">
        {currentScreen === 'entry' && (
          <NameEntryScreen key="entry" onSubmit={handleNameSubmit} />
        )}
        {currentScreen === 'greeting' && (
          <AvatarGreeting
            key="greeting"
            guestName={guestName}
            onComplete={handleGreetingComplete}
          />
        )}
        {currentScreen === 'invitation' && (
          <InvitationReveal key="invitation" guestName={guestName} onBack={handleBackToEntry} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
