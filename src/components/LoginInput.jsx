import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';

function LoginInput({ login }) {
  const [email, onEmail] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className='auth-card'>
      <h2>Login</h2>
      <p className='subtitle'>Masukkan akun anda</p>

      <div  className='input-group'>
        <label>Email</label>
        <input type='text' value={email} onChange={onEmail} placeholder='Email' />
      </div>

      <div className='input-group'>
        <label>Password</label>
        <input className='input-group' type='password' value={password} onChange={onPasswordChange} placeholder='Password' />
      </div>

      <button type='button' onClick={() => login({ email, password })}>Login</button>
      <p className='footer-text'>
        Tidak memiliki akun? <span><Link to="/register">Daftar</Link></span>
      </p>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;