import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const Onboarding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />

            <div className="min-h-screen pt-16 pb-16">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Welcome Header */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-amber-300 bg-clip-text text-transparent mb-4">
                            Welcome to Aiva, {user?.name || 'there'}!
                        </h1>
                        <p className="text-blue-100 text-lg">
                            Your account has been successfully created and your Google account is connected.
                        </p>
                    </div>

                    {/* What's Next */}
                    <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)] p-8 mb-8">
                        <h2 className="text-2xl font-bold text-blue-200 mb-6">What's Next?</h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Email Management</h3>
                                <p className="text-blue-100 text-sm">
                                    Aiva can now read and manage your emails through Gmail
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Calendar Integration</h3>
                                <p className="text-blue-100 text-sm">
                                    Access and manage your Google Calendar events
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">File Access</h3>
                                <p className="text-blue-100 text-sm">
                                    Access and manage files in your Google Drive
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)] p-8 mb-8">
                        <h2 className="text-2xl font-bold text-blue-200 mb-6">Your Account</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-blue-300 text-sm font-medium mb-1">Email</label>
                                <p className="text-white text-lg">{user?.email}</p>
                            </div>

                            <div>
                                <label className="block text-blue-300 text-sm font-medium mb-1">Assistant Email</label>
                                <p className="text-white text-lg">{user?.assistant_email}</p>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg">
                            <p className="text-blue-100 text-sm">
                                <strong>Note:</strong> Your assistant email ({user?.assistant_email}) is where you can send emails
                                to interact with Aiva. You can forward emails to this address or send new emails directly.
                            </p>
                        </div>
                    </div>

                    {/* Get Started Button */}
                    <div className="text-center">
                        <button
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 font-bold py-4 px-8 rounded-full shadow-lg hover:translate-y-[-3px] hover:shadow-xl transition relative overflow-hidden text-lg"
                        >
                            <span className="absolute inset-0 left-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-500 hover:left-full" />
                            <span className="relative z-10">Get Started with Aiva</span>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Onboarding;
