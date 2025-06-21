import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';

const Cart: React.FC = () => {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-content">
          <FaShoppingCart className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.product._id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={item.product.images[0] || '/placeholder-product.jpg'} 
                  alt={item.product.name} 
                />
              </div>
              
              <div className="cart-item-details">
                <h3 className="cart-item-title">
                  <Link to={`/products/${item.product._id}`}>
                    {item.product.name}
                  </Link>
                </h3>
                
                <div className="cart-item-price">
                  <span className="current-price">${item.product.price.toFixed(2)}</span>
                  {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                    <span className="original-price">${item.product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="cart-item-stock">
                  {item.product.stock > 0 ? (
                    <span className="in-stock">In Stock ({item.product.stock} available)</span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
              </div>
              
              <div className="cart-item-quantity">
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  
                  <span className="quantity-display">{item.quantity}</span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                    className="quantity-btn"
                    disabled={item.quantity >= item.product.stock}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              
              <div className="cart-item-total">
                <span className="item-total-price">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
              
              <div className="cart-item-actions">
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="btn btn-danger btn-sm"
                  title="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({itemCount} items):</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total:</span>
              <span>${(total * 1.1).toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <Link to="/checkout" className="btn btn-primary btn-full">
                Proceed to Checkout
              </Link>
              
              <button
                onClick={clearCart}
                className="btn btn-outline btn-full"
              >
                Clear Cart
              </button>
              
              <Link to="/products" className="btn btn-secondary btn-full">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 