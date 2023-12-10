import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';

const LoadingPage = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState('');

  const fetchAuthStatus = useCallback(async () => {
    try {
      const response = await fetch('/accounts/auth_status/');
      if (response.ok) {
        const data = await response.json();
        setAuthStatus(data.status);
      } else {
        console.error('Failed to fetch authentication status');
        setAuthStatus('Failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching authentication status:', error);
      setAuthStatus('Error fetching data');
    }
  }, []);

  useEffect(() => {
    fetchAuthStatus();
  }, [fetchAuthStatus]);

  useEffect(() => {
    const redirectToApp = (status) => {
        setTimeout(() => {
          if (status === 'OK') {
            navigate('/notes');
          } else {
            navigate('/login');
          }
        }, 4000);
      };

    redirectToApp(authStatus); // Call redirectToApp after authStatus updates
  }, [authStatus, navigate]);

  return (
    <div className='wrapper'>
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='Message'>
        {authStatus === 'OK' ? (
          <p>Preparing your Space</p>
        ) : (
          <p>Redirecting to Login</p>
        )}
      </div>
    </div>
  );
};

export default LoadingPage;
