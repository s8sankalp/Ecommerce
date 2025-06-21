import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ShopHub</h3>
          <p>Your one-stop shop for all your needs. Quality products at great prices.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><a href="/">Home</a></p>
          <p><a href="/products">Products</a></p>
          <p><a href="/cart">Cart</a></p>
          <p><a href="/login">Login</a></p>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@shophub.com</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 Main St, City, State</p>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p><a href="#">Facebook</a></p>
          <p><a href="#">Twitter</a></p>
          <p><a href="#">Instagram</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 