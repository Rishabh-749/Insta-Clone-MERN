import React from 'react';
import { useNavigate } from 'react-router';
import '../style/nav.scss';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        Instagram
      </div>
      <div className="nav-actions">
        <button className="create-post-btn" onClick={() => navigate('/create-post')}>
          <i className="ri-add-box-line"></i>
          <span>Create</span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;