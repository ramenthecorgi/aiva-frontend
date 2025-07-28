import React from "react";
import { Link } from "react-router-dom";
import featureFlags from "../config/featureFlags";

const Header = () => {
  return (
  <header className="fixed top-0 w-full z-50 bg-[rgba(10,61,98,0.8)] backdrop-blur-lg border-b border-white/10 transition-all">
    <nav className="max-w-screen-xl mx-auto px-5 py-4 flex justify-between items-center">
      <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(10,61,98,0.5)]">
        Aiva
      </div>

      <div className="flex space-x-4">
        {featureFlags.enableLogin && (
          <Link to="/login" className="bg-transparent border border-amber-400 text-blue-100 font-medium py-2 px-6 rounded-full hover:bg-amber-500/10 transition-all">
            Login
          </Link>
        )}
        {featureFlags.enableOnboarding && (
          <Link to="/onboarding" className="bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 font-bold py-2 px-6 rounded-full shadow-lg hover:translate-y-[-3px] hover:shadow-xl transition relative overflow-hidden">
            <span className="absolute inset-0 left-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 hover:left-full" />
            <span className="relative z-10">Sign Up</span>
          </Link>
        )}
      </div>
    </nav>
  </header>
  );
};

export default Header;
