import React from 'react';
import { HiOutlineChatAlt2, HiOutlineChartBar, HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Footer({ authUser, onSingOut }) {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigateLeaderboards = () => {
    navigate('/leaderboards');
  };

  return (
    <footer className='home-footer'>
      <nav className='footer-nav'>
        <a onClick={handleNavigateHome} className='footer-item'>
          <HiOutlineChatAlt2 size={20} />
          <span>Threads</span>
        </a>

        <a onClick={handleNavigateLeaderboards} className='footer-item'>
          <HiOutlineChartBar size={20} />
          <span>Leaderboards</span>
        </a>

        {authUser ? <Link onClick={onSingOut} className='footer-item'>
          <HiOutlineLogout size={20} />
          <span>Logout</span>
        </Link> : <Link to="/login" className='footer-item'>
          <HiOutlineLogin size={20} />
          <span>Login</span>
        </Link>}
      </nav>
    </footer>
  );
}

Footer.propTypes = {
  authUser: PropTypes.bool.isRequired,
  onSingOut: PropTypes.func.isRequired,
};

export default Footer;