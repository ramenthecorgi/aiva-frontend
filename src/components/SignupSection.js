import React from "react";

const SignupSection = () => (
  <section id="signup" className="bg-gradient-to-b from-neutral-900 to-black py-24 text-center">
    <div className="max-w-screen-md mx-auto px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">Ready to Dominate Your Inbox?</h2>
      <p className="text-lg text-white/90 font-light mb-10">Join the elite circle of professionals who've already transformed their email game. Your productivity revolution starts now.</p>
      <form
        action="https://formspree.io/f/mpwrvavb"
        method="POST"
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <input type="email" name="email" placeholder="Enter your email" className="w-full sm:w-auto flex-1 px-6 py-3 rounded-full border-2 border-white/10 bg-white/5 text-white placeholder-white/50 focus:border-pink-500 outline-none" required />
        <button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition">
          Start Revolution
        </button>
      </form>
      <p className="text-sm text-white/70 mt-6">No credit card required • Transform in minutes</p>
    </div>
  </section>
);

export default SignupSection;
