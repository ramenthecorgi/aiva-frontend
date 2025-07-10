# Aiva Web

A modern React application with Tailwind CSS via CDN.

## Features

- React for UI components and interactivity
- Tailwind CSS via CDN for styling
- Simple "Hello World" interface
- Custom animations
- Interactive button

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```
npm install
```

### Running the Application

Start the development server:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment on Render.com

You can easily deploy this app as a static site on [Render.com](https://render.com/):

### 1. Push Your Code to a Git Repository
Push your latest code to GitHub, GitLab, or Bitbucket.

### 2. Create a New Static Site on Render
- Go to [Render Static Sites](https://dashboard.render.com/new/static)
- Connect your repository and choose the branch to deploy

### 3. Configure Build and Output
- **Build Command:**
  ```
  npm run build
  ```
- **Publish directory:**
  ```
  build
  ```

### 4. Enable SPA Routing
A `static.json` file is included in this project. Render uses this to serve `index.html` for all routes, so React Router will work on direct links and refreshes.

### 5. Deploy
Click "Create Static Site". Render will install dependencies, build your app, and serve it from the `build` directory.

### 6. Visit Your Site
Once deployed, open your Render URL. All routes (including `/privacy-policy` and `/terms-of-service`) will work as expected.

---

## Project Structure

- `public/index.html` - Main HTML file with Tailwind CSS CDN
- `src/App.js` - Main React component
- `src/index.css` - Custom CSS styles and animations
- `src/index.js` - React entry point

## Customization

### Tailwind CSS

This project uses Tailwind CSS via CDN for simplicity. For production use, consider installing Tailwind CSS locally for better performance and customization.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Learn More

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
