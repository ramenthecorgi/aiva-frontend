import React from "react";

const Header = () => (
  <header className="fixed top-0 w-full z-50 bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 transition-all">
    <nav className="max-w-screen-xl mx-auto px-5 py-4 flex justify-between items-center">
      <div className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,110,0.5)]">
        Aiva
      </div>
      <ul className="hidden md:flex gap-8 text-white font-medium">
        <li><a href="#features" className="relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-pink-500 to-purple-500 hover:after:w-full after:transition-all">Features</a></li>
        <li><a href="#pricing" className="relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-pink-500 to-purple-500 hover:after:w-full after:transition-all">Pricing</a></li>
        <li><a href="#about" className="relative after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-pink-500 to-purple-500 hover:after:w-full after:transition-all">About</a></li>
      </ul>
      <a href="#signup" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:translate-y-[-3px] hover:shadow-xl transition relative overflow-hidden">
        <span className="absolute inset-0 left-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 hover:left-full" />
        <span className="relative z-10">Get Started</span>
      </a>
    </nav>
  </header>
);

export default Header;
