import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import './Cart.css';

const Cart: React.FC = () => {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const estimatedTax = total * 0.08; // Example 8% tax
  const finalTotal = total + estimatedTax;

  if (items.length === 0) {
    return (
      <div className="empty-cart-container">
        <FaShoppingCart className="empty-cart-icon" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn-start-shopping">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-items-column">
        <div className="cart-header">
          <h1>My Cart</h1>
          <button onClick={clearCart} className="btn-clear-cart">Clear Cart</button>
        </div>
        <div className="cart-items-list">
          {items.map(item => (
            <div key={item.product._id} className="cart-item-card">
              <div className="cart-item-image">
                <img src={item.product.images[0]} alt={item.product.name} />
              </div>
              <div className="cart-item-info">
                <Link to={`/products/${item.product._id}`} className="item-name">{item.product.name}</Link>
                <p className="item-category">{item.product.category}</p>
                <p className="item-stock-status in-stock">
                  {item.product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div className="cart-item-quantity">
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}>-</button>
                  <input type="text" value={item.quantity} readOnly />
                  <button 
                    onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                  >+</button>
                </div>
              </div>
              <div className="cart-item-price">
                <p>${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-item-remove">
                <button onClick={() => removeFromCart(item.product._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link to="/products" className="btn-continue-shopping">&larr; Continue Shopping</Link>
      </div>
      <div className="order-summary-column">
        <div className="order-summary-card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({itemCount} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax</span>
            <span>${estimatedTax.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="shipping-cost">FREE</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-checkout">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart; 