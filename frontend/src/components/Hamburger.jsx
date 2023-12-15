import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePicture from './ProfilePicture';
import '../pages/Auth.css'

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('userToken');

      const response = await fetch('/accounts/logout/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('userToken');
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    }
  };


  return (
    <div className={menuOpen ? 'menu-visible' : ''}>
      <svg onClick={toggleMenu} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 45 45" fill="none">
        <g clipPath="url(#clip0_264_9)">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0H11.25V11.25H0V0ZM0 16.875H11.25V28.125H0V16.875ZM0 33.75H11.25V45H0V33.75ZM16.875 0H28.125V11.25H16.875V0ZM16.875 16.875H28.125V28.125H16.875V16.875ZM16.875 33.75H28.125V45H16.875V33.75ZM33.75 0H45V11.25H33.75V0ZM33.75 16.875H45V28.125H33.75V16.875ZM33.75 33.75H45V45H33.75V33.75Z" fill="#F0C016"/>
        </g>
        <defs>
          <clipPath id="clip0_264_9">
            <rect width="45" height="45" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      {menuOpen && (
        <ul className='Drop'>
          <div className="CloseNav">
            <li>
              <p className='Close' onClick={toggleMenu}>Close Navigation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cross">X</span></p>
            </li>
          </div>
          <div className="Utils">
            <li className='utils'>
              <div className="Label">
              OverView
              </div>
              <span>Everything in one place</span>
            </li>
            <li className='utils'>
              <div className="Label">
              Create Note
              </div>
              <span>You have something on your mind, Write it</span>
            </li>
            <li className='utils'>
              <div className="Label">
              Search Notes
              </div>
              <span>Do a quick search to get that note</span>
            </li>
          </div>
          <div className="Profile">
            <li>
              <div className='Recap' onClick={toggleProfileDropdown}>
                Gwade Steve
                <ProfilePicture />
              </div>
              {profileDropdownOpen && (
                <ul className='InnerDrop'>
                  <li>
                    <div className="Inner-Lab">
                      <p>View Profile</p>
                    </div>
                    <span>View and edit your profile here</span>
                  </li>
                  <li>
                    <div className="Inner-Lab">
                      <p className='logout' onClick={handleLogout}>Logout</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path opacity="0.5" d="M9.96672 16.6334C6.28482 16.6334 3.30005 13.6486 3.30005 9.96672C3.30005 6.28482 6.28482 3.30005 9.96672 3.30005" stroke="#FF2E2E" stroke-linecap="round"/>
                          <path d="M8.30005 9.9668H16.6334M16.6334 9.9668L14.1334 7.4668M16.6334 9.9668L14.1334 12.4668" stroke="#FF2E2E" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <span>Time to say Goodbye ? :(</span>
                  </li>
                </ul>
              )}
            </li>
          </div>
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;
