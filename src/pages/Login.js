import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, error, clearError } = useAuth();

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log('🔐 User already authenticated, redirecting to:', from);
      console.log('🔐 Full redirect URL:', window.location.origin + from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);

  // Clear any previous errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleLoginSuccess = () => {
    // The redirect will be handled by the OAuth callback
    console.log('🔐 Login initiated successfully, OAuth flow started');
    console.log('🔐 Return URL will be:', from);
  };

  const handleLoginError = (error) => {
    console.error('Login failed:', error);
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />

        <div className="min-h-screen flex items-center justify-center pt-16 pb-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />

      <div className="min-h-screen flex items-center justify-center pt-16 pb-16">
        <div className="max-w-md w-full p-8 bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)]">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-amber-300 bg-clip-text text-transparent">
            Welcome to Aiva
          </h2>
          <p className="text-center text-blue-100 mb-8">
            Sign in with your Google account to continue
          </p>

          <div className="space-y-6">
            <GoogleLoginButton
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              returnUrl={from}
              className="mb-6"
            >
              Continue with Google
            </GoogleLoginButton>

            <div className="text-center">
              <p className="text-blue-200 text-sm mb-4">
                By signing in, you agree to our{' '}
                <a href="/terms" className="text-amber-300 hover:text-amber-200 underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-amber-300 hover:text-amber-200 underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
