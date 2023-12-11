import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FormRight = ({ page }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (page === 'Login') {
        const { email, password } = formData;
        const response = await fetch('/accounts/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem('userToken', token); // Store token in local storage
          console.log('Login successful. Token:', token);
          navigate('/');
        } else {
          console.error('Login failed');
        }
      } else {
        const { firstName, lastName, email, password, confirmPassword } = formData;
        if (password === confirmPassword) {
          const response = await fetch('/accounts/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password }),
          });

          if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('userToken', token); // Store token in local storage
            console.log('Registration successful. Token:', token);
          } else {
            console.error('Registration failed');
          }
        } else {
          alert('Password and Confirm Password do not match!');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="Right-Form">
      <h1>{page}</h1>
      <form onSubmit={handleFormSubmit}>
        {page === 'Login' ? (
          <>
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
            <button type="submit">LOGIN</button>
            <p>
              Don't yet have an account? <Link to="/register">Create an account</Link>
            </p>
          </>
        ) : (
          <>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              required
            />
            <button type="submit">REGISTER</button>
            <p>
              Already have an account? <Link to="/login">Login Instead</Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default FormRight;
