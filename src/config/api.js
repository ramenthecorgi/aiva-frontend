// API Configuration
// Uses REACT_APP_API_URL environment variable if set, otherwise auto-detects

export const getApiBaseUrl = () => {
    // Priority: Use REACT_APP_API_URL if explicitly set
    if (process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
    }

    // Check if we should use production backend even in development
    if (process.env.REACT_APP_USE_PRODUCTION_API === 'true') {
        return 'https://aivaprototype.onrender.com';
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
    envOverride: process.env.REACT_APP_API_URL ? 'Yes' : 'No',
    useProductionApi: process.env.REACT_APP_USE_PRODUCTION_API === 'true' ? 'Yes' : 'No'
});
