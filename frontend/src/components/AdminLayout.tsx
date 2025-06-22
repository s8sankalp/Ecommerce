import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaList, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import './AdminLayout.css';
import { useAuth } from '../context/AuthContext.tsx';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="admin-layout-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h3>QuickCart Admin</h3>
        </div>
        <nav className="admin-navigation">
          <NavLink to="/admin/dashboard" className="admin-nav-item">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/products" className="admin-nav-item">
            <FaBox />
            <span>Products</span>
          </NavLink>
          <NavLink to="/admin/orders" className="admin-nav-item">
            <FaList />
            <span>Orders</span>
          </NavLink>
          <NavLink to="/admin/users" className="admin-nav-item">
            <FaUsers />
            <span>Users</span>
          </NavLink>
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={logout} className="admin-nav-item logout-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 