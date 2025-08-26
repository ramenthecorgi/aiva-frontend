import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const navItems = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
            )
        },
        {
            name: 'Settings',
            path: '/settings',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            subItems: [
                {
                    name: 'General',
                    path: '/settings/general',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )
                },
                {
                    name: 'Email Triage',
                    path: '/settings/email-triage',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    )
                }
            ]
        }
    ];

    return (
        <div className="w-64 bg-[rgba(10,61,98,0.6)] backdrop-blur-lg border-r border-white/10 h-screen fixed left-0 top-0 z-10">
            <div className="p-6 h-full flex flex-col pt-20">
                <h2 className="text-xl font-bold text-blue-200 mb-6">Navigation</h2>
                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => {
                        const isItemActive = location.pathname === item.path;
                        return (
                            <div key={item.path}>
                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${isItemActive
                                        ? 'bg-[rgba(255,255,255,0.15)] text-amber-100 shadow-lg'
                                        : 'text-white/80 hover:bg-[rgba(255,255,255,0.1)] hover:text-white'
                                        }`}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.name}</span>
                                </button>

                                {/* Render sub-items if they exist */}
                                {item.subItems && (
                                    <div className="ml-6 mt-2 space-y-1">
                                        {item.subItems.map((subItem) => {
                                            const isSubActive = location.pathname === subItem.path;
                                            return (
                                                <button
                                                    key={subItem.path}
                                                    onClick={() => navigate(subItem.path)}
                                                    className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 text-sm ${isSubActive
                                                        ? 'bg-[rgba(255,255,255,0.1)] text-amber-200'
                                                        : 'text-white/60 hover:bg-[rgba(255,255,255,0.05)] hover:text-white/80'
                                                        }`}
                                                >
                                                    {subItem.icon}
                                                    <span>{subItem.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="pt-6 border-t border-white/10">
                    <button
                        onClick={async () => {
                            await logout();
                            navigate('/');
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
