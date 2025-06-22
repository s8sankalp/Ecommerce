import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { ordersAPI } from '../services/api.ts';
import { ShippingAddress } from '../types/index.ts';
import { FaCreditCard, FaPaypal, FaLock } from 'react-icons/fa';
import './Checkout.css';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, clearCart } = useCart();
  const { user } = useAuth();
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'USA'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const taxRate = 0.08;
  const shippingCost = total > 50 ? 0 : 5; // Free shipping on orders over $50
  const taxAmount = total * taxRate;
  const finalTotal = total + taxAmount + shippingCost;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        orderItems: items.map(item => ({
          product: item.product._id,
          name: item.product.name,
          image: item.product.images[0],
          price: item.product.price,
          quantity: item.quantity
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: total,
        taxPrice: taxAmount,
        shippingPrice: shippingCost,
        totalPrice: finalTotal
      };
      const response = await ordersAPI.create(orderData);
      clearCart();
      navigate(`/orders/${response.data._id}?status=success`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="empty-cart-container">
        <h2>Your cart is empty for checkout.</h2>
        <Link to="/products" className="btn-start-shopping">Return to Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-main-content">
        <h1 className="checkout-title">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="checkout-section">
            <h2>Shipping Information</h2>
            <div className="form-grid">
              <div className="input-group full-width">
                <label htmlFor="street">Street Address</label>
                <input type="text" id="street" name="street" value={shippingAddress.street} onChange={handleAddressChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={shippingAddress.city} onChange={handleAddressChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <input type="text" id="state" name="state" value={shippingAddress.state} onChange={handleAddressChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input type="text" id="zipCode" name="zipCode" value={shippingAddress.zipCode} onChange={handleAddressChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="country">Country</label>
                <select id="country" name="country" value={shippingAddress.country} onChange={handleAddressChange} required>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="checkout-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === 'Credit Card' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="Credit Card" checked={paymentMethod === 'Credit Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <FaCreditCard /> Credit Card
              </label>
              <label className={`payment-option ${paymentMethod === 'PayPal' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <FaPaypal /> PayPal
              </label>
            </div>
            {/* Can add credit card fields here if not using a payment gateway UI */}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="place-order-section">
            <button type="submit" className="btn-place-order" disabled={loading}>
              <FaLock />
              {loading ? 'Placing Order...' : `Place Order & Pay $${finalTotal.toFixed(2)}`}
            </button>
            <p className="secure-note">Your payment information is secure.</p>
          </div>
        </form>
      </div>

      <div className="checkout-summary-column">
        <div className="checkout-summary-card">
          <h3>Order Summary ({itemCount} items)</h3>
          <div className="checkout-items-list">
            {items.map(item => (
              <div key={item.product._id} className="checkout-item">
                <img src={item.product.images[0]} alt={item.product.name} />
                <div className="item-details">
                  <p>{item.product.name}</p>
                  <span>Qty: {item.quantity}</span>
                </div>
                <p className="item-price">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="checkout-totals">
            <p><span>Subtotal</span> <span>${total.toFixed(2)}</span></p>
            <p><span>Shipping</span> <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'FREE'}</span></p>
            <p><span>Taxes</span> <span>${taxAmount.toFixed(2)}</span></p>
            <div className="final-total">
              <p><span>Total</span> <span>${finalTotal.toFixed(2)}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 