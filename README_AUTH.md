# Frontend Authentication Setup

This document explains how to set up and use the new Google OAuth authentication system in the Aiva frontend.

## Overview

The frontend now includes a complete authentication system that integrates with the AivaPrototype backend using Google OAuth. The system provides:

- **Unified Login/Signup**: Single Google OAuth flow for both new and existing users
- **JWT Session Management**: Secure session handling with HTTP-only cookies
- **Protected Routes**: Route guards for authenticated-only pages
- **User Dashboard**: Profile management and OAuth status display
- **Modern UI**: Beautiful, responsive authentication components

## Setup Instructions

### 1. Environment Configuration

The frontend uses the `REACT_APP_API_URL` environment variable to configure the API URL:

#### Primary Configuration (Recommended)

Set the `REACT_APP_API_URL` environment variable:

```bash
# Development
REACT_APP_API_URL=http://localhost:8000

# Production
REACT_APP_API_URL=https://aivaprototype.onrender.com
```

#### Fallback Auto-Detection

If `REACT_APP_API_URL` is not set, the system automatically detects the environment:

- **Development** (`localhost`): `http://localhost:8000`
- **Production** (any non-localhost domain): `https://aivaprototype.onrender.com`

The system uses `window.location.hostname` to determine the environment:
- If `hostname === 'localhost'` → Development mode
- If `hostname !== 'localhost'` → Production mode

#### Configuration Files

- `src/config/api.js` - Centralized API configuration
- `src/config/api.test.js` - Test file for configuration validation

### 2. Backend Requirements

Ensure the backend is running with the new authentication API:

```bash
# In the AivaPrototype directory
poetry install
poetry run uvicorn main:app --reload --port 8000
```

### 3. Google OAuth Configuration

Make sure your Google OAuth credentials are properly configured in the backend:

```bash
# Required environment variables in backend
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000
```

## Authentication Flow

### Login/Signup Process

1. **User clicks "Login" or "Sign Up"** → Redirected to `/login`
2. **User clicks "Continue with Google"** → Frontend calls `/api/auth/google/authorize`
3. **User redirected to Google OAuth** → Google authentication page
4. **User authenticates with Google** → Google redirects to `/api/auth/google/callback`
5. **Backend processes OAuth** → Creates/retrieves user, stores credentials, sets session cookie
6. **Backend redirects to frontend** → With user info in URL parameters
7. **Frontend processes callback** → Updates authentication state, redirects to dashboard/onboarding

### Session Management

- **JWT Tokens**: 24-hour expiry, stored in HTTP-only cookies
- **Automatic Refresh**: Session can be refreshed before expiry
- **Secure Storage**: HTTP-only, secure (in production), SameSite=Lax
- **Dual Authentication**: Supports both Authorization header and session cookies

## Components

### AuthContext (`src/contexts/AuthContext.js`)

Global authentication state management with the following features:

- **State Management**: User info, authentication status, loading states
- **OAuth Integration**: Google OAuth flow handling
- **Session Management**: Login, logout, session refresh
- **Error Handling**: Comprehensive error management

### ProtectedRoute (`src/components/ProtectedRoute.js`)

Route guard component that:

- **Checks Authentication**: Verifies user is logged in
- **Loading States**: Shows spinner while checking auth
- **Automatic Redirects**: Redirects unauthenticated users to login
- **Preserves Intended Destination**: Remembers where user wanted to go

### GoogleLoginButton (`src/components/GoogleLoginButton.js`)

Modern Google OAuth button with:

- **Google Branding**: Official Google colors and logo
- **Loading States**: Spinner during authentication
- **Error Handling**: Displays authentication errors
- **Customizable**: Configurable text and styling

## Pages

### Login (`src/pages/Login.js`)

- **Google OAuth Integration**: Single-click Google authentication
- **Error Display**: Shows authentication errors
- **Redirect Handling**: Automatically redirects authenticated users
- **Modern Design**: Beautiful, responsive UI

### Dashboard (`src/pages/Dashboard.js`)

- **User Profile**: Displays user information
- **OAuth Status**: Shows connected services (Gmail, Calendar, Drive)
- **Account Actions**: Settings and logout buttons
- **Session Data**: Real-time OAuth connection status

### OAuthCallback (`src/pages/OAuthCallback.js`)

- **Callback Processing**: Handles OAuth redirect from Google
- **Error Handling**: Displays OAuth errors
- **Success States**: Shows authentication success
- **Automatic Redirects**: Redirects to appropriate page

### Onboarding (`src/pages/Onboarding.js`)

- **Welcome Flow**: Welcomes new users
- **Service Overview**: Explains connected services
- **Account Info**: Shows user account details
- **Getting Started**: Guides users to dashboard

## Usage Examples

### Using the Auth Context

```javascript
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, loginWithGoogle, logout } = useAuth();

  if (isAuthenticated) {
    return <div>Welcome, {user.name}!</div>;
  }

  return <button onClick={() => loginWithGoogle()}>Login</button>;
};
```

### Protecting Routes

```javascript
import ProtectedRoute from '../components/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Using the Google Login Button

```javascript
import GoogleLoginButton from '../components/GoogleLoginButton';

<GoogleLoginButton
  onSuccess={() => console.log('Login successful')}
  onError={(error) => console.error('Login failed:', error)}
  returnUrl="/dashboard"
>
  Continue with Google
</GoogleLoginButton>
```

## Security Features

### Frontend Security
- **HTTPS Only**: Secure cookies in production
- **CSRF Protection**: SameSite=Lax cookie policy
- **Input Validation**: Client-side validation
- **Error Handling**: Secure error messages

### Backend Integration
- **JWT Tokens**: Secure session management
- **OAuth State**: CSRF protection for OAuth flows
- **Rate Limiting**: Protection against abuse
- **Input Sanitization**: Server-side validation

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for frontend domain
2. **OAuth Errors**: Check Google OAuth credentials and redirect URIs
3. **Session Issues**: Verify JWT secret and cookie settings
4. **Redirect Loops**: Check authentication state management

### Debug Mode

Enable debug mode in `.env`:

```bash
REACT_APP_ENABLE_DEBUG_MODE=true
```

This will show additional console logs for debugging authentication issues.

## Testing

### Manual Testing

1. **Start Backend**: `poetry run uvicorn main:app --reload --port 8000`
2. **Start Frontend**: `npm start`
3. **Test Login**: Navigate to `/login` and test Google OAuth
4. **Test Dashboard**: Verify user info and OAuth status
5. **Test Logout**: Verify session clearing

### Automated Testing

The authentication system is designed to work with existing React testing frameworks. Test the following:

- Authentication state management
- OAuth flow handling
- Protected route behavior
- Error handling
- Session management

## Production Deployment

### Environment Variables

For production, update the environment variables:

```bash
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_ENV=production
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_DEBUG_MODE=false
```

### Security Considerations

- **HTTPS**: Ensure both frontend and backend use HTTPS
- **Cookie Security**: Verify secure cookie settings
- **CORS**: Configure CORS for production domains
- **OAuth Redirects**: Update Google OAuth redirect URIs

The authentication system is now ready for production use with proper security measures in place.
