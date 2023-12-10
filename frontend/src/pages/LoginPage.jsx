import React from 'react';
import FormLeft from "../components/FormLeft";

const LoginPage = () => {
  const { pathname } = window.location;
  const name = pathname.includes('login') ? 'Login' : 'Registration';

  return (
    <div>
      <FormLeft page={name} />
    </div>
  );
};

export default LoginPage;
