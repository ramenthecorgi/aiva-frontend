import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import EmailLabelAnalysis from './EmailLabelAnalysis';

const Dashboard = () => {
    const { user, logout, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' or 'email-label-analysis'

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            console.log('🔐 Dashboard: User not authenticated, redirecting to login');
            navigate('/login');
        }
    }, [isLoading, isAuthenticated, navigate]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleViewChange = (view) => {
        setActiveView(view);
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

    // Don't render dashboard if not authenticated (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    const renderContent = () => {
        switch (activeView) {
            case 'email-label-analysis':
                return <EmailLabelAnalysis />;
            case 'dashboard':
            default:
                return (
                    <>
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-amber-300 bg-clip-text text-transparent mb-4">
                                Welcome to Your Dashboard
                            </h1>
                            <p className="text-blue-100 text-lg">
                                Manage your Aiva account and connected services
                            </p>
                        </div>

                        {/* User Profile Card */}
                        <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)] p-8 mb-8">
                            <h2 className="text-2xl font-bold text-blue-200 mb-6">Profile Information</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-blue-300 text-sm font-medium mb-1">Name</label>
                                        <p className="text-white text-lg">{user?.name || 'Not provided'}</p>
                                    </div>

                                    <div>
                                        <label className="block text-blue-300 text-sm font-medium mb-1">Email</label>
                                        <p className="text-white text-lg">{user?.email}</p>
                                    </div>

                                    <div>
                                        <label className="block text-blue-300 text-sm font-medium mb-1">Assistant Email</label>
                                        <p className="text-white text-lg">{user?.assistant_email}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-blue-300 text-sm font-medium mb-1">User ID</label>
                                        <p className="text-white text-sm font-mono">{user?.id}</p>
                                    </div>

                                    <div>
                                        <label className="block text-blue-300 text-sm font-medium mb-1">Account Created</label>
                                        <p className="text-white text-sm">
                                            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* OAuth Status */}
                        <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)] p-8 mb-8">
                            <h2 className="text-2xl font-bold text-blue-200 mb-6">Connected Services</h2>
                            <p className="text-blue-100 text-center py-8">
                                Service connection status will be displayed here once available.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)] p-8">
                            <h2 className="text-2xl font-bold text-blue-200 mb-6">Account Actions</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Email Label Analysis Card */}
                                <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-blue-600 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 20 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-blue-200">Email Label Analysis</h3>
                                            <p className="text-blue-100 text-sm">Analyze Gmail labels to create email triage categories</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleViewChange('email-label-analysis')}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        Get Started
                                    </button>
                                </div>

                                {/* Settings Card */}
                                <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-200">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="p-2 bg-gray-600 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-blue-200">Settings</h3>
                                            <p className="text-blue-100 text-sm">Manage your account preferences and email triage settings</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/settings')}
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        Manage Settings
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />

            <div className="min-h-screen pb-16">
                <Sidebar onViewChange={handleViewChange} />
                <div className="ml-64 max-w-7xl mx-auto px-4 pt-20">
                    {/* View Navigation */}
                    {activeView !== 'dashboard' && (
                        <div className="mb-6">
                            <button
                                onClick={() => handleViewChange('dashboard')}
                                className="text-blue-300 hover:text-blue-200 flex items-center space-x-2 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Back to Dashboard</span>
                            </button>
                        </div>
                    )}

                    {renderContent()}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Dashboard;
