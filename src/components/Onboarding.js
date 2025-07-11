import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [aivaEmail, setAivaEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate Aiva email based on username from original email
  const generateAivaEmail = (userEmail) => {
    try {
      const username = userEmail.split('@')[0];
      // Remove special characters and spaces for cleaner username
      const cleanUsername = username.replace(/[^a-zA-Z0-9]/g, '');
      return `${cleanUsername}@user.askaiva.app`;
    } catch (error) {
      console.error('Error generating Aiva email:', error);
      return '';
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const generatedEmail = generateAivaEmail(email);
      setAivaEmail(generatedEmail);
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleConfirmEmail = () => {
    setIsLoading(true);
    
    // Simulate account creation process
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 2000);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        <div className="logo-container">
          <img 
            src="/logo.png" 
            alt="Aiva Logo" 
            className="onboarding-logo" 
            onError={(e) => e.target.src = 'https://placehold.co/200x80?text=AIVA'} 
          />
        </div>

        {step === 1 && (
          <div className="onboarding-step">
            <h1>Welcome to Aiva</h1>
            <p className="subtitle">Let's get you set up with your personal AI assistant</p>
            
            <form onSubmit={handleEmailSubmit} className="email-form">
              <div className="form-group">
                <label htmlFor="email">Enter your email address</label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className={emailError ? 'input-error' : ''}
                  disabled={isLoading}
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              
              <button 
                type="submit" 
                className="primary-button"
                disabled={isLoading || !email}
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </button>
            </form>

            <p className="privacy-note">
              By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <h1>Your Aiva Email</h1>
            <p className="subtitle">This is your dedicated email for communicating with Aiva</p>
            
            <div className="aiva-email-container">
              <p className="aiva-email">{aivaEmail}</p>
              <p className="email-info">
                We've created this email address for you to communicate with Aiva.
                You can send emails to Aiva, and she'll respond directly to your primary email ({email}).
              </p>
            </div>

            <button 
              onClick={handleConfirmEmail} 
              className="primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Setting up your account...' : 'Confirm and Continue'}
            </button>
            
            <button 
              onClick={() => setStep(1)} 
              className="secondary-button"
              disabled={isLoading}
            >
              Go Back
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <div className="completion-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h1>Setup Complete!</h1>
            <p className="subtitle">Aiva will introduce herself via email soon</p>
            
            <div className="completion-info">
              <p>
                Check <strong>{email}</strong> for an introduction email from Aiva.
                She'll help you get started and answer any questions you have.
              </p>
              
              <p className="tip">
                <strong>Pro Tip:</strong> Add <span className="highlight">{aivaEmail}</span> to your contacts 
                to ensure emails from Aiva don't end up in spam.
              </p>
            </div>

            <button 
              onClick={goToHome} 
              className="primary-button"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
