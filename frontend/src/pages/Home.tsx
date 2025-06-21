import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to ShopHub</h1>
        <p>Discover amazing products at unbeatable prices</p>
        <Link to="/products" className="btn btn-primary">
          Shop Now
        </Link>
      </section>
      
      <section>
        <h2>Featured Categories</h2>
        <div className="grid grid-3">
          <div className="card">
            <div className="card-body">
              <h3>Electronics</h3>
              <p>Latest gadgets and technology</p>
              <Link to="/products?category=Electronics" className="btn btn-outline">
                Browse Electronics
              </Link>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h3>Clothing</h3>
              <p>Fashion and style for everyone</p>
              <Link to="/products?category=Clothing" className="btn btn-outline">
                Browse Clothing
              </Link>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h3>Home & Garden</h3>
              <p>Everything for your home</p>
              <Link to="/products?category=Home & Garden" className="btn btn-outline">
                Browse Home & Garden
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 