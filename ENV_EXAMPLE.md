# Environment Configuration Examples

This file shows how to configure the `REACT_APP_API_URL` environment variable for different scenarios.

## Development Setup

### Option 1: Create a `.env` file in the frontend root
```bash
# .env
REACT_APP_API_URL=http://localhost:8000
```

### Option 2: Set environment variable before starting
```bash
# macOS/Linux
export REACT_APP_API_URL=http://localhost:8000
npm start

# Windows (Command Prompt)
set REACT_APP_API_URL=http://localhost:8000
npm start

# Windows (PowerShell)
$env:REACT_APP_API_URL="http://localhost:8000"
npm start
```

## Production Setup

### Option 1: Environment variable
```bash
REACT_APP_API_URL=https://aivaprototype.onrender.com
```

### Option 2: Build-time configuration
```bash
# Build with production API URL
REACT_APP_API_URL=https://aivaprototype.onrender.com npm run build
```

## Deployment Platforms

### Netlify
Set environment variable in Netlify dashboard:
- Key: `REACT_APP_API_URL`
- Value: `https://aivaprototype.onrender.com`

### Vercel
Set environment variable in Vercel dashboard:
- Key: `REACT_APP_API_URL`
- Value: `https://aivaprototype.onrender.com`

### Render
Set environment variable in Render dashboard:
- Key: `REACT_APP_API_URL`
- Value: `https://aivaprototype.onrender.com`

## Verification

After setting the environment variable, you should see in the browser console:
```
🔧 API Configuration: {
  hostname: "localhost",
  port: "3000",
  isDevelopment: true,
  isProduction: false,
  apiUrl: "http://localhost:8000",
  envOverride: "Yes"
}
```

## Fallback Behavior

If `REACT_APP_API_URL` is not set, the system will auto-detect:
- `localhost` → `http://localhost:8000`
- Any other domain → `https://aivaprototype.onrender.com`
