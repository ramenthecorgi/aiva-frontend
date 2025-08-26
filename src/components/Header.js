import React from "react";
import { Link, useNavigate } from "react-router-dom";
import featureFlags from "../config/featureFlags";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[rgba(10,61,98,0.8)] backdrop-blur-lg border-b border-white/10 transition-all">
      <nav className="max-w-screen-xl mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-blue-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(10,61,98,0.5)]">
          Aiva
        </Link>

        <div className="flex items-center space-x-4">
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <>
                  <span className="text-blue-100 text-sm hidden md:block">
                    Welcome, {user?.name || user?.email}
                  </span>
                  <Link
                    to="/dashboard"
                    className="bg-transparent border border-blue-400 text-blue-100 font-medium py-2 px-4 rounded-full hover:bg-blue-500/10 transition-all text-sm"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-transparent border border-amber-400 text-blue-100 font-medium py-2 px-4 rounded-full hover:bg-amber-500/10 transition-all text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {featureFlags.enableLogin && (
                    <Link to="/login" className="bg-transparent border border-amber-400 text-blue-100 font-medium py-2 px-6 rounded-full hover:bg-amber-500/10 transition-all">
                      Login
                    </Link>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
