import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-600 mb-8">
          This is a placeholder for the home page after successful login.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Your Activity</h2>
            <p className="text-gray-600">Activity stats will appear here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Recent Messages</h2>
            <p className="text-gray-600">Your messages will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
