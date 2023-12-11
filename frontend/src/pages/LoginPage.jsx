import React from 'react';
import FormLeft from "../components/FormLeft";
import FormRight from '../components/FormRight';

const LoginPage = () => {
  const { pathname } = window.location;
  const name = pathname.includes('login') ? 'Login' : 'Registration';

  return (
    <div>
      <FormLeft />
      <FormRight page={name} />
    </div>
  );
};

export default LoginPage;
