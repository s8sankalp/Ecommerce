import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import { productsAPI } from '../services/api.ts';
import { Product, Review as ReviewType } from '../types/index.ts';
import { FaStar, FaShoppingCart, FaRegHeart, FaHeart, FaShareAlt, FaArrowLeft } from 'react-icons/fa';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
    // Check local storage or API for wishlisted status
    const wishlisted = localStorage.getItem(`wishlist_${id}`);
    if (wishlisted) setIsWishlisted(true);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id!);
      setProduct(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch product details.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Optional: Add user feedback (e.g., a toast notification)
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // You would typically also make an API call here
    if (!isWishlisted) {
      localStorage.setItem(`wishlist_${id}`, 'true');
    } else {
      localStorage.removeItem(`wishlist_${id}`);
    }
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color={i < Math.round(rating) ? '#ffc107' : '#e4e5e9'} />
        ))}
        <span className="rating-value">{product?.rating.toFixed(1)}</span>
        <a href="#reviews" className="reviews-link">({product?.numReviews} Reviews)</a>
      </div>
    );
  };

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (error || !product) return <div className="error-container">{error || 'Product not found'}</div>;

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
      </div>
      <div className="product-detail-main">
        <div className="product-gallery">
          <div className="main-product-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="product-thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-details-content">
          <h1 className="product-detail-title">{product.name}</h1>
          {renderStarRating(product.rating)}
          
          <div className="product-detail-price">
            <span>${product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
          </div>
          
          <p className="product-detail-description">{product.description}</p>
          
          <div className="product-meta">
            <p><strong>Category:</strong> <span>{product.category}</span></p>
            <p><strong>Brand:</strong> <span>{product.brand}</span></p>
            <p><strong>Availability:</strong> <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
          </div>

          <div className="purchase-actions">
            <div className="quantity-control">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
            <button 
              className="btn-add-to-cart-detail"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
          
          <div className="secondary-actions">
            <button className="btn-wishlist" onClick={toggleWishlist}>
              {isWishlisted ? <FaHeart /> : <FaRegHeart />} 
              {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
            <button className="btn-share">
              <FaShareAlt /> Share
            </button>
          </div>
        </div>
      </div>
      
      {/* Reviews Section would go here, can be a separate component */}
    </div>
  );
};

const ReviewSection = ({ productId, reviews }: { productId: string, reviews: ReviewType[] }) => {
  // Logic for submitting and displaying reviews
  return <div>Reviews...</div>
}

export default ProductDetail;