import React from 'react'
import LogOutBtn from './LogOutBtn'
import '../pages/Auth.css';
import AppLogo from './AppLogo';

const Nav = () => {
  return (
    <header className='Navbar'>
        <div className="logo">
            <AppLogo />
        </div>
        <LogOutBtn />
    </header>
  )
}

export default Nav
