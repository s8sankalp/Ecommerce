import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          ShopHub
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="nav-link">
                <FaUser /> Profile
              </Link>
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="btn btn-outline">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
          
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 