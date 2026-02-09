import React from 'react';
import LoginInput from '../components/LoginInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import '../styles/auth.css';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  if (authUser !== null) {
    navigate('/');
  }

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className='auth-container'>
      <LoginInput login={onLogin} />
    </div>
  );
}

export default LoginPage;