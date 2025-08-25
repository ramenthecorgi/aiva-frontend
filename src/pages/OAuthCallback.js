import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const OAuthCallback = () => {
    const { handleOAuthCallback } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('processing');
    const [error, setError] = useState(null);

    console.log('🔐 OAuthCallback component loaded');
    console.log('🔐 Current URL:', window.location.href);
    console.log('🔐 Search params:', Object.fromEntries(searchParams.entries()));

    useEffect(() => {
        console.log('🔐 OAuthCallback useEffect triggered');
        const processCallback = async () => {
            try {
                console.log('🔐 Starting processCallback');
                setStatus('processing');

                // Check for OAuth errors
                const error = searchParams.get('error');
                const errorMessage = searchParams.get('message');

                if (error) {
                    setError(errorMessage || 'Authentication failed');
                    setStatus('error');
                    return;
                }

                // Check for OAuth success parameters
                const user_id = searchParams.get('user_id');
                const email = searchParams.get('email');
                const isNewUser = searchParams.get('new_user') === 'true';

                console.log('🔐 OAuth callback page parameters:', {
                    user_id,
                    email,
                    isNewUser,
                    hasError: !!error
                });

                // If we have URL parameters, use them. Otherwise, let handleOAuthCallback handle it
                if (user_id && email) {
                    console.log('🔐 Found URL parameters, proceeding with callback');
                } else {
                    console.log('🔐 No URL parameters found, will try session-based auth');
                }

                // Process the OAuth callback
                await handleOAuthCallback();
                setStatus('success');

                // The redirect will be handled by handleOAuthCallback
                // This is just a fallback in case the redirect doesn't happen
                setTimeout(() => {
                    if (isNewUser) {
                        navigate('/onboarding');
                    } else {
                        navigate('/dashboard');
                    }
                }, 2000);

            } catch (error) {
                console.error('OAuth callback error:', error);
                setError('Failed to complete authentication. Please try again.');
                setStatus('error');
            }
        };

        processCallback();
    }, [handleOAuthCallback, navigate, searchParams]);

    const renderContent = () => {
        switch (status) {
            case 'processing':
                return (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
                        <h2 className="text-2xl font-bold text-blue-200 mb-4">Completing Authentication</h2>
                        <p className="text-blue-100">Please wait while we set up your account...</p>
                    </div>
                );

            case 'success':
                return (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-green-300 mb-4">Authentication Successful!</h2>
                        <p className="text-blue-100">Redirecting you to your dashboard...</p>
                    </div>
                );

            case 'error':
                return (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-red-300 mb-4">Authentication Failed</h2>
                        <p className="text-red-200 mb-6">{error}</p>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="block w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />

            <div className="min-h-screen flex items-center justify-center pt-16 pb-16">
                <div className="max-w-md w-full p-8 bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)]">
                    {renderContent()}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default OAuthCallback;
