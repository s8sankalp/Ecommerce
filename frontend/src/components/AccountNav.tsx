import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { FaUser, FaBoxOpen, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './AccountNav.css';

const AccountNav: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="account-nav-sidebar">
      <div className="user-profile-card">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase() || <FaUser />}
        </div>
        <div className="user-info">
          <h4 className="user-name">{user?.name}</h4>
          <p className="user-email">{user?.email}</p>
        </div>
      </div>
      <nav className="account-navigation">
        <NavLink to="/profile" className="nav-item">
          <FaUser />
          <span>My Profile</span>
        </NavLink>
        <NavLink to="/orders" className="nav-item">
          <FaBoxOpen />
          <span>My Orders</span>
        </NavLink>
        <NavLink to="/account-settings" className="nav-item">
          <FaCog />
          <span>Settings</span>
        </NavLink>
        <button onClick={handleLogout} className="nav-item logout-btn">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default AccountNav; 