import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RegisterInput({ onRegister }) {
  const [name, onName] = useInput('');
  const [email, onEmail] = useInput('');
  const [password, onPassword] = useInput('');

  return (
    <form className='auth-card'>
      <h2>Daftar</h2>
      <p className='subtitle'>Daftar untuk memulai</p>

      <div className='input-group'>
        <label>Nama</label>
        <input type="text" value={name} onChange={onName} placeholder='Username' />
      </div>

      <div className='input-group'>
        <label>Email</label>
        <input type="text" value={email} onChange={onEmail} placeholder='Email' />
      </div>

      <div className='input-group'>
        <label>Password</label>
        <input type="password" value={password} onChange={onPassword} placeholder='Password' />
      </div>

      <button type='button' onClick={() => onRegister({ name, email, password })}>Daftar</button>

      <p className='footer-text'>Sudah punya akun? <span><Link to="/login">Masuk</Link></span></p>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;