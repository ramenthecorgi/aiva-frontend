import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSection = () => {
  const navigate = useNavigate();
  
  const handleStartClick = (e) => {
    e.preventDefault();
    navigate('/onboarding');
  };
  
  return (
  <section id="signup" className="bg-gradient-to-b from-[#0a3d62] to-[#0c2461] py-24 text-center">
    <div className="max-w-screen-md mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent mb-6">Ready for Your AI Executive Assistant?</h2>
      <p className="text-lg text-white/90 font-light mb-10">Join thousands of professionals who've reclaimed their time and focus. Start your 14-day free trial - no credit card required.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <input type="email" placeholder="Enter your email" className="w-full sm:w-auto flex-1 px-6 py-3 rounded-full border-2 border-white/10 bg-[rgba(10,61,98,0.3)] text-blue-100 placeholder-blue-100/50 focus:border-amber-400 outline-none" />
        <button 
          onClick={handleStartClick}
          className="bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 font-bold py-3 px-8 rounded-full shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition"
        >
          Start Onboarding
        </button>
      </div>
      <p className="text-sm text-white/70 mt-6">✓ 14-day free trial • ✓ No credit card required • ✓ Cancel anytime</p>
    </div>
  </section>
  );
};

export default SignupSection;
