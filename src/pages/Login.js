import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, you would handle authentication here
    // For now, we'll just redirect to the home page
    navigate('/home');
  };

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />
      
      <div className="min-h-screen flex items-center justify-center pt-16 pb-16">
        <div className="max-w-md w-full p-8 bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)]">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-amber-300 bg-clip-text text-transparent">Welcome to Aiva</h2>
          <p className="text-center text-blue-100 mb-8">Sign in to continue to your account</p>
          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 font-bold rounded-full shadow-lg hover:translate-y-[-3px] hover:shadow-xl transition relative overflow-hidden"
          >
            <span className="absolute inset-0 left-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 hover:left-full" />
            <span className="relative z-10">Login</span>
          </button>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Login;
