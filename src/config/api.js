// API Configuration
// Uses REACT_APP_API_URL environment variable if set, otherwise auto-detects

export const getApiBaseUrl = () => {
    // Priority: Use REACT_APP_API_URL if explicitly set
    if (process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
    } else {
        console.error('REACT_APP_API_URL is not set in environment variables');
    }

    // Fallback: Auto-detect based on current location
    const isProduction = window.location.hostname !== 'localhost';

    if (isProduction) {
        return 'https://aivaprototype.onrender.com';
    } else {
        return 'http://localhost:8000';
    }
};

export const isDevelopment = () => {
    return window.location.hostname === 'localhost';
};

export const isProduction = () => {
    return window.location.hostname !== 'localhost';
};

// Export the resolved API base URL
export const API_BASE_URL = getApiBaseUrl();

console.log(`🔧 API Configuration:`, {
    hostname: window.location.hostname,
    port: window.location.port,
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    apiUrl: API_BASE_URL,
    envOverride: process.env.REACT_APP_API_URL ? 'Yes' : 'No'
});
