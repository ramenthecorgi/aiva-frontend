import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
    const { user, logout, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            console.log('🔐 Settings: User not authenticated, redirecting to login');
            navigate('/login');
        }
    }, [isLoading, isAuthenticated, navigate]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
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

    // Don't render settings if not authenticated (will redirect)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />

            <div className="min-h-screen pb-16">
                <Sidebar />
                <div className="ml-64 max-w-7xl mx-auto px-4 pt-20">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-amber-300 bg-clip-text text-transparent mb-4">
                            Settings Hub
                        </h1>
                        <p className="text-blue-100 text-lg">
                            Choose a settings category to manage
                        </p>
                    </div>

                    {/* Settings Content */}
                    <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)] p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* General Settings Card */}
                            <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                                onClick={() => navigate('/settings/general')}>
                                <div className="text-center">
                                    <div className="text-4xl mb-3">⚙️</div>
                                    <h3 className="text-xl font-bold text-blue-200 mb-2">General Settings</h3>
                                    <p className="text-blue-100 text-sm">
                                        Account preferences and general configuration
                                    </p>
                                </div>
                            </div>

                            {/* Email Triage Card */}
                            <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                                onClick={() => navigate('/settings/email-triage')}>
                                <div className="text-center">
                                    <div className="text-4xl mb-3">📧</div>
                                    <h3 className="text-xl font-bold text-blue-200 mb-2">Email Triage</h3>
                                    <p className="text-blue-100 text-sm">
                                        Manage your email categorization and triage settings
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Settings;
