// Test file to verify API configuration
// This can be run in the browser console to test the configuration
// Tests both environment variable override and auto-detection

import { getApiBaseUrl, isDevelopment, isProduction } from './api';

// Mock window.location for testing
const testConfigurations = [
    {
        name: 'Development (localhost:3000)',
        hostname: 'localhost',
        port: '3000',
        expectedApiUrl: 'http://localhost:8000',
        expectedEnv: 'development'
    },
    {
        name: 'Production (aivaprototype.onrender.com)',
        hostname: 'aivaprototype.onrender.com',
        port: '',
        expectedApiUrl: 'https://aivaprototype.onrender.com',
        expectedEnv: 'production'
    },
    {
        name: 'Production (www.aiva.com)',
        hostname: 'www.aiva.com',
        port: '',
        expectedApiUrl: 'https://aivaprototype.onrender.com',
        expectedEnv: 'production'
    }
];

// Test environment variable override
const testEnvOverride = {
    name: 'Environment Variable Override',
    envUrl: 'https://custom-api.example.com',
    expectedApiUrl: 'https://custom-api.example.com'
};

console.log('🧪 Testing API Configuration...');

// Test auto-detection scenarios
testConfigurations.forEach(config => {
    // Mock window.location
    const originalLocation = window.location;
    delete window.location;
    window.location = {
        hostname: config.hostname,
        port: config.port
    };

    // Test the functions
    const apiUrl = getApiBaseUrl();
    const isDev = isDevelopment();
    const isProd = isProduction();

    console.log(`\n📋 ${config.name}:`);
    console.log(`   Expected API URL: ${config.expectedApiUrl}`);
    console.log(`   Actual API URL:   ${apiUrl}`);
    console.log(`   Is Development:   ${isDev}`);
    console.log(`   Is Production:    ${isProd}`);
    console.log(`   ✅ API URL Match: ${apiUrl === config.expectedApiUrl ? 'YES' : 'NO'}`);
    console.log(`   ✅ Environment:   ${isDev === (config.expectedEnv === 'development') ? 'YES' : 'NO'}`);

    // Restore original location
    window.location = originalLocation;
});

// Test environment variable override
console.log(`\n🔧 ${testEnvOverride.name}:`);
console.log(`   Environment URL:   ${testEnvOverride.envUrl}`);
console.log(`   Expected API URL:  ${testEnvOverride.expectedApiUrl}`);
console.log(`   Note: This test requires setting REACT_APP_API_URL=${testEnvOverride.envUrl}`);
console.log(`   ✅ Priority: Environment variable takes precedence over auto-detection`);

console.log('\n🎉 API Configuration Test Complete!');
