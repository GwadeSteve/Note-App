import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/Auth.css';

const FormRight = ({ page }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

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
          localStorage.setItem('userToken', token);
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
            localStorage.setItem('userToken', token); 
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
    <div className="Right">
      <h1 className='Highlight'>{page}</h1>
      <form onSubmit={handleFormSubmit}>
        {page === 'Login' ? (
          <div className='content'>
            <div className="inputs">
              <div className="input">
                <input type="email" name="email" placeholder="Email" autoComplete="off" onChange={handleInputChange} required />
              </div>
              <div className="input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Password" 
                  onChange={handleInputChange} 
                  required 
                />
                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <button type="submit">LOGIN</button>
            <p>
              Don't yet have an account? <Link to="/register">Create an account</Link>
            </p>
          </div>
        ) : (
          <div className='content'>
            <div className="inputs">
                <div className="input">
                  <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} required />
                </div>
                <div className="input">
                  <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} required />
                </div>
                <div className="input">
                  <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
                </div>
                <div className="input">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleInputChange} 
                    required 
                  />
                  <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
                <div className="input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    required
                  />
                  <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
            </div>
            <button type="submit">REGISTER</button>
            <p>
              Already have an account? <Link to="/login">Login Instead</Link>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormRight;