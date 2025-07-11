import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, you would handle authentication here
    // For now, we'll just redirect to the home page
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to Aiva</h2>
        <p className="text-center text-gray-600 mb-8">Sign in to continue to your account</p>
        <button
          onClick={handleLogin}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
