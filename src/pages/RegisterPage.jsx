import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';

import '../styles/auth.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <div className='auth-container'>
      <RegisterInput onRegister={onRegister} />
    </div>
  );
}

export default RegisterPage;