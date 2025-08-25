import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user, logout, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

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

    return (
        <>
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_20%_50%,#0a3d62_0%,transparent_50%),radial-gradient(circle_at_80%_20%,#0c2461_0%,transparent_50%),radial-gradient(circle_at_40%_80%,#1e3799_0%,transparent_50%)] animate-[bgShift_15s_ease-in-out_infinite]" />

            <div className="min-h-screen pb-16">
                <Sidebar />
                <div className="ml-64 max-w-4xl mx-auto px-4 pt-20">
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

                        <div className="flex flex-wrap gap-4">
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
