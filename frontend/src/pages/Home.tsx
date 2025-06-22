import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import './Home.css';

const products = [
  {
    id: 1,
    name: 'Apple AirPods',
    image: '/images/airpods.jpg',
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    image: '/images/headphones.jpg',
  },
  {
    id: 3,
    name: 'Samsung Galaxy S23',
    image: '/images/phone.jpg',
  },
  {
    id: 4,
    name: 'Smartwatch',
    image: '/images/watch.jpg',
  },
  {
    id: 5,
    name: 'PlayStation 5',
    image: '/images/ps5.jpg',
  },
];

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-deal">Exclusive Deal 40% Off</p>
          <h1 className="hero-title">
            Power Meets Elegance -<br />
            Apple MacBook Pro Is Here for you!
          </h1>
          <div className="hero-buttons">
            <Link to="/product/macbook-pro" className="btn btn-primary">
              Order Now
            </Link>
            <Link to="/learn-more" className="btn btn-secondary">
              Learn More &rarr;
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/macbook.png" alt="MacBook Pro" />
        </div>
      </section>

      <section className="popular-products-section">
        <h2 className="section-title">Popular products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <button className="wishlist-button">
                  <FaHeart />
                </button>
              </div>
              <p className="product-name">{product.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 