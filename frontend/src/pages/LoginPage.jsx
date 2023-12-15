import React from 'react';
import FormLeft from "../components/FormLeft";
import FormRight from '../components/FormRight';
import './Auth.css';

const LoginPage = () => {
  const { pathname } = window.location;
  const name = pathname.includes('login') ? 'Login' : 'Registration';

  return (
    <div className='Auth'>
      <FormLeft />
      <FormRight page={name} />
    </div>
  );
};

export default LoginPage;
