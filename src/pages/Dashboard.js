import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user, logout, getSession } = useAuth();
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const data = await getSession();
                setSessionData(data);
            } catch (error) {
                console.error('Error fetching session data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSessionData();
    }, [getSession]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

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

            <div className="min-h-screen pt-16 pb-16">
                <div className="max-w-4xl mx-auto px-4">
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
                    {sessionData && (
                        <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)] p-8 mb-8">
                            <h2 className="text-2xl font-bold text-blue-200 mb-6">Connected Services</h2>

                            <div className="space-y-6">
                                {/* Google Services */}
                                <div className="border border-blue-500/30 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-8 h-8" viewBox="0 0 24 24">
                                                <path
                                                    fill="#4285F4"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                />
                                                <path
                                                    fill="#34A853"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                />
                                                <path
                                                    fill="#FBBC05"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                />
                                                <path
                                                    fill="#EA4335"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                />
                                            </svg>
                                            <h3 className="text-xl font-semibold text-white">Google Services</h3>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${sessionData.has_google_access
                                                ? 'bg-green-900/30 text-green-300 border border-green-500/30'
                                                : 'bg-red-900/30 text-red-300 border border-red-500/30'
                                            }`}>
                                            {sessionData.has_google_access ? 'Connected' : 'Not Connected'}
                                        </div>
                                    </div>

                                    {sessionData.has_google_access && sessionData.oauth_status?.google && (
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="bg-blue-900/20 rounded-lg p-4">
                                                <h4 className="text-blue-200 font-medium mb-2">Gmail</h4>
                                                <p className="text-blue-100 text-sm">Read, send, and manage emails</p>
                                            </div>
                                            <div className="bg-blue-900/20 rounded-lg p-4">
                                                <h4 className="text-blue-200 font-medium mb-2">Calendar</h4>
                                                <p className="text-blue-100 text-sm">Access and manage events</p>
                                            </div>
                                            <div className="bg-blue-900/20 rounded-lg p-4">
                                                <h4 className="text-blue-200 font-medium mb-2">Drive</h4>
                                                <p className="text-blue-100 text-sm">Access and manage files</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="bg-[rgba(10,61,98,0.4)] backdrop-blur-lg rounded-xl border border-white/10 shadow-[0_0_30px_rgba(10,61,98,0.4)] p-8">
                        <h2 className="text-2xl font-bold text-blue-200 mb-6">Account Actions</h2>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/settings')}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Settings
                            </button>

                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Dashboard;
