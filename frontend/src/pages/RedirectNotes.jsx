import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const RedirectNotes = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (location.pathname === '/notes/') {
        navigate('/notes', { replace: true }); // Redirect to '/notes' if the path is '/notes/'
      }
    }, [location.pathname, navigate]);
  
    return (
        <div>
        </div>
      )
  };

export default RedirectNotes

