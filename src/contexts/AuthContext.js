import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { API_BASE_URL, isDevelopment } from '../config/api';

// Action types
const AUTH_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_USER: 'SET_USER',
    SET_ERROR: 'SET_ERROR',
    CLEAR_USER: 'CLEAR_USER',
    SET_AUTHENTICATED: 'SET_AUTHENTICATED'
};

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
};

// Reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case AUTH_ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null
            };
        case AUTH_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case AUTH_ACTIONS.CLEAR_USER:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            };
        case AUTH_ACTIONS.SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload
            };
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check if user is authenticated
    const checkAuthStatus = useCallback(async () => {
        try {
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

            // Check for stored token
            const storedToken = localStorage.getItem('aiva_token');
            const storedUser = localStorage.getItem('aiva_user');

            if (storedToken && storedUser) {
                try {
                    const userData = JSON.parse(storedUser);
                    dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userData });
                } catch (e) {
                    console.error('Invalid stored user data:', e);
                    localStorage.removeItem('aiva_user');
                    localStorage.removeItem('aiva_token');
                    dispatch({ type: AUTH_ACTIONS.CLEAR_USER });
                }
            } else {
                dispatch({ type: AUTH_ACTIONS.CLEAR_USER });
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            dispatch({ type: AUTH_ACTIONS.CLEAR_USER });
        }
    }, []);

    // Check authentication status on app load
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    // Start Google OAuth flow
    const loginWithGoogle = useCallback(async (returnUrl = '/dashboard') => {
        try {
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
            dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });

            const oauthUrl = `${API_BASE_URL}/oauth/google/authorize?return_url=${encodeURIComponent(returnUrl)}&response_type=json`;
            console.log('🔐 Starting OAuth flow with URL:', oauthUrl);

            const response = await fetch(oauthUrl);

            if (!response.ok) {
                throw new Error('Failed to start OAuth flow');
            }

            const data = await response.json();
            console.log('🔐 Received OAuth URL from backend:', data.oauth_url);

            // Redirect to Google OAuth
            console.log('🔐 Redirecting to Google OAuth URL:', data.oauth_url);
            window.location.href = data.oauth_url;
        } catch (error) {
            console.error('Error starting OAuth flow:', error);
            dispatch({
                type: AUTH_ACTIONS.SET_ERROR,
                payload: 'Failed to start authentication. Please try again.'
            });
        }
    }, []);

    // Get user session
    const getSession = useCallback(async () => {
        try {
            console.log('🔐 Getting session from:', `${API_BASE_URL}/oauth/session`);
            
            // Get token from localStorage
            const token = localStorage.getItem('aiva_token');
            
            if (!token) {
                throw new Error('No token found');
            }
            
            console.log('🔐 Making session request with Authorization header');
            const response = await fetch(`${API_BASE_URL}/oauth/session`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('🔐 Session response status:', response.status);

            if (!response.ok) {
                console.error('🔐 Session request failed with status:', response.status);
                const errorText = await response.text();
                console.error('🔐 Session error response:', errorText);
                throw new Error('Not authenticated');
            }

            const data = await response.json();
            console.log('🔐 Session data received:', data);
            dispatch({ type: AUTH_ACTIONS.SET_USER, payload: data.user });
            return data;
        } catch (error) {
            console.error('Error getting session:', error);
            // Clear invalid tokens
            localStorage.removeItem('aiva_token');
            localStorage.removeItem('aiva_user');
            dispatch({ type: AUTH_ACTIONS.CLEAR_USER });
            throw error;
        }
    }, []);

    // Logout user
    const logout = useCallback(async () => {
        try {
            const token = localStorage.getItem('aiva_token');
            if (token) {
                await fetch(`${API_BASE_URL}/oauth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }

            // Clear localStorage
            localStorage.removeItem('aiva_user');
            localStorage.removeItem('aiva_token');
            dispatch({ type: AUTH_ACTIONS.CLEAR_USER });

            // Redirect to home page
            const logoutRedirectUrl = '/';
            console.log('🔐 Logging out, redirecting to:', logoutRedirectUrl);
            window.location.href = logoutRedirectUrl;
        } catch (error) {
            console.error('Error during logout:', error);
            // Even if logout fails, clear local state
            localStorage.removeItem('aiva_user');
            localStorage.removeItem('aiva_token');
            dispatch({ type: AUTH_ACTIONS.CLEAR_USER });
            const fallbackLogoutUrl = '/';
            console.log('🔐 Logout failed, fallback redirect to:', fallbackLogoutUrl);
            window.location.href = fallbackLogoutUrl;
        }
    }, []);

    // Refresh session
    const refreshSession = useCallback(async () => {
        try {
            const token = localStorage.getItem('aiva_token');
            if (!token) {
                throw new Error('No token to refresh');
            }

            const response = await fetch(`${API_BASE_URL}/oauth/refresh`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error('Error refreshing session:', error);
            // If refresh fails, user might need to login again
            throw error;
        }
    }, []);

    // Handle OAuth callback (called when user returns from Google OAuth)
    const handleOAuthCallback = useCallback(async () => {
        try {
            console.log('🔐 handleOAuthCallback started');
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

            // Get URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const isNewUser = urlParams.get('new_user') === 'true';
            const user_id = urlParams.get('user_id');
            const email = urlParams.get('email');
            const token = urlParams.get('token');
            const returnUrl = urlParams.get('return_url');

            console.log('🔐 OAuth callback parameters:', {
                isNewUser,
                user_id,
                email,
                hasToken: !!token,
                returnUrl
            });

            // Check if we have the required parameters
            if (!user_id || !email || !token) {
                console.error('🔐 Missing required OAuth parameters');
                throw new Error('Missing authentication parameters');
            }

            console.log('🔐 Using token-based authentication');
            // Store user data and token in localStorage
            const userData = {
                id: user_id,
                email: email,
                name: email.split('@')[0] // Simple name extraction
            };
            
            console.log('🔐 Storing user data in localStorage:', userData);
            localStorage.setItem('aiva_user', JSON.stringify(userData));
            localStorage.setItem('aiva_token', token);
            dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userData });
            console.log('🔐 User data stored and state updated');

            // Clean up URL parameters
            console.log('🔐 Cleaning up URL parameters');
            const newUrl = new URL(window.location);
            newUrl.searchParams.delete('user_id');
            newUrl.searchParams.delete('email');
            newUrl.searchParams.delete('token');
            newUrl.searchParams.delete('new_user');
            newUrl.searchParams.delete('return_url');
            window.history.replaceState({}, '', newUrl.pathname);
            console.log('🔐 URL cleaned up');

            // Determine redirect destination
            let redirectDestination;
            if (isNewUser) {
                console.log('🔐 Redirecting new user to onboarding');
                redirectDestination = '/onboarding';
            } else {
                redirectDestination = returnUrl || '/dashboard';
                console.log('🔐 Redirecting existing user to:', redirectDestination);
            }

            // Use a small delay to ensure state is updated before redirect
            console.log('🔐 Setting up redirect to:', redirectDestination);
            setTimeout(() => {
                console.log('🔐 Executing redirect to:', redirectDestination);
                console.log('🔐 Full redirect URL:', window.location.origin + redirectDestination);
                window.location.href = redirectDestination;
            }, 100);

        } catch (error) {
            console.error('🔐 Error handling OAuth callback:', error);
            dispatch({
                type: AUTH_ACTIONS.SET_ERROR,
                payload: 'Authentication failed. Please try again.'
            });
            // Redirect to login on error
            const errorRedirectUrl = '/login';
            console.log('🔐 Redirecting to login on error:', errorRedirectUrl);
            setTimeout(() => {
                console.log('🔐 Executing error redirect to:', errorRedirectUrl);
                console.log('🔐 Full error redirect URL:', window.location.origin + errorRedirectUrl);
                window.location.href = errorRedirectUrl;
            }, 2000);
        }
    }, []);

    // Clear error
    const clearError = useCallback(() => {
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: null });
    }, []);

    const value = {
        ...state,
        loginWithGoogle,
        logout,
        getSession,
        refreshSession,
        handleOAuthCallback,
        checkAuthStatus,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Hook for session management
export const useSession = () => {
    const { user, isAuthenticated, isLoading, getSession, refreshSession } = useAuth();

    return {
        user,
        isAuthenticated,
        isLoading,
        getSession,
        refreshSession
    };
};
