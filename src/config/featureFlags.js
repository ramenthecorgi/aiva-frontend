// Feature flags configuration
const featureFlags = {
  // Set this to true to enable login functionality
  enableLogin: process.env.REACT_APP_ENABLE_LOGIN === 'true',
};

export default featureFlags;
