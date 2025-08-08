// Fully Tailwind CSS converted version of the InboxAI landing page
// You should have Tailwind CSS configured in your project for these classes to work

import React from 'react';
import { AuthProvider } from './contexts/AuthContext';

// Components
import DemoSection from './components/DemoSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import IntegrationsSection from './components/IntegrationsSection';
import PainpointsSection from './components/PainpointsSection';
import ValuePropositionSection from './components/ValuePropositionSection';

// Landing page component
const LandingPage = () => {
  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />
      <Header />
      <HeroSection />
      <PainpointsSection />
      <IntegrationsSection />
      <ValuePropositionSection />
      <DemoSection />
      <FAQSection />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
};

export default App;

// You will also need to define @keyframes like bgShift, float, shimmer, titleGlow, etc. in your Tailwind config under extend.animation and extend.keyframes.
