import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import './Header.css';

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          ShopHub
        </Link>
        
        <nav className="nav-menu">
          <NavLink to="/" className="nav-link" >
            Home
          </NavLink>
          <NavLink to="/products" className="nav-link">
            Shop
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About Us
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </nav>

        <div className="header-right">
          <button className="search-btn">
            <FaSearch />
          </button>
          
          {isAuthenticated ? (
            <NavLink to="/profile" className="nav-link">
              <FaUser /> Account
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav-link">
               Account
            </NavLink>
          )}

          <Link to="/cart" className="cart-link">
            <FaShoppingCart />
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 