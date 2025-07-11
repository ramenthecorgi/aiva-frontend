import React from 'react';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#ff006e_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#8338ec_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#3a86ff_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />
      
      <HomeHeader />
      
      <div className="min-h-screen pt-24 pb-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,110,0.5)]">Welcome to Your Dashboard</h1>
          <p className="text-lg text-white/80 mb-8">
            This is a placeholder for the home page after successful login.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(131,56,236,0.2)]">
              <h2 className="text-xl font-semibold mb-3 text-white">Your Activity</h2>
              <p className="text-white/70">Activity stats will appear here.</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(131,56,236,0.2)]">
              <h2 className="text-xl font-semibold mb-3 text-white">Recent Messages</h2>
              <p className="text-white/70">Your messages will appear here.</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Home;
