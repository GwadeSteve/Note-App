import React from 'react'
import '../pages/Auth.css';
import AppLogo from './AppLogo';
import HamburgerMenu from './Hamburger';


const Nav = () => {
  return (
    <header className='Navbar'>
        <div className="logo">
            <AppLogo />
        </div>
        < HamburgerMenu />       
 </header>
  )
}

export default Nav
