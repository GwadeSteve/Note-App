import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogOutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('userToken');

      const response = await fetch('/accounts/logout/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('userToken');
        navigate('/'); // Redirect the user to the loading page
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogOutBtn;
