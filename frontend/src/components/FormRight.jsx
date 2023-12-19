import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/Auth.css';

const FormRight = ({ page }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
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
  
        if (response.status === 200) {
          const data = await response.json();
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userFirstName', data.user.first_name);
          navigate('/');
        } else {
          console.error('Login failed:', response.statusText);
          alert(`Login failed: ${response.statusText || 'Unknown error'}`);
        }
      } else {
        const { first_name, last_name, email, password, confirmPassword } = formData;
        if (password === confirmPassword) {
          const registrationData = { email, first_name, last_name, password };
          const response = await fetch('/accounts/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
          });
  
          if (response.status === 201) {
            const data = await response.json();
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userFirstName', first_name);
            navigate('/');
          } else {
            alert(`Registration failed: ${response.statusText || 'Unknown error'}`);
          }
        } else {
          alert('Password and Confirm Password do not match!');
        }
      }
    } catch (error) {
      alert('Error');
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
                <input type="text" name="first_name" placeholder="First Name" onChange={handleInputChange} required />
              </div>
              <div className="input">
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleInputChange} required />
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
