import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';

const LoadingPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const checkUserToken = useCallback(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setMessage('OK');
      setTimeout(() => {
        navigate('/notes');
      }, 4000);
    } else {
      setMessage('NOT');
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }
  }, [navigate]);

  useEffect(() => {
    checkUserToken();
  }, [checkUserToken]);

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
        {
          message === 'OK' ? (<p>Preparing your space ...</p>) : (<p>Redirecting to Auth  ...</p>)
        }
      </div>
    </div>
  );
};

export default LoadingPage;
