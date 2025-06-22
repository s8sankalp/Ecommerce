import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { ordersAPI } from '../services/api.ts';
import { Order } from '../types/index.ts';
import AccountNav from '../components/AccountNav.tsx';
import './Account.css';
import './OrderDetail.css';
import { FaArrowLeft, FaTruck, FaCreditCard, FaCalendar } from 'react-icons/fa';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id && isAuthenticated) {
      fetchOrder();
    }
  }, [id, isAuthenticated]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getById(id!);
      setOrder(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch order details.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClass = status.toLowerCase().replace(' ', '-');
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  if (authLoading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!isAuthenticated) return <div className="error-container">Please log in to view order details.</div>;
  if (loading) return (
    <div className="account-page-container">
      <AccountNav />
      <div className="account-content"><div className="loading-container"><div className="spinner"></div></div></div>
    </div>
  );
  if (error || !order) return (
    <div className="account-page-container">
      <AccountNav />
      <div className="account-content"><div className="notice error">{error || 'Order not found'}</div></div>
    </div>
  );

  return (
    <div className="account-page-container">
      <AccountNav />
      <div className="account-content">
        <div className="order-detail-header">
          <div>
            <Link to="/orders" className="back-to-orders-link"><FaArrowLeft /> Back to Orders</Link>
            <h1>Order #{order._id.slice(-8)}</h1>
            <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="order-header-status">
            {getStatusBadge(order.status)}
          </div>
        </div>

        <div className="order-detail-grid">
          <div className="order-detail-left">
            <div className="detail-card">
              <h3>Order Items ({order.orderItems.length})</h3>
              <div className="ordered-items-list">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="ordered-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <Link to={`/products/${item.product}`}>{item.name}</Link>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="detail-card">
              <h3>Shipping Address</h3>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
          <div className="order-detail-right">
            <div className="detail-card">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <p><span>Subtotal</span> <span>${order.itemsPrice.toFixed(2)}</span></p>
                <p><span>Shipping</span> <span>${order.shippingPrice.toFixed(2)}</span></p>
                <p><span>Tax</span> <span>${order.taxPrice.toFixed(2)}</span></p>
                <div className="summary-total">
                  <p><span>Total</span> <span>${order.totalPrice.toFixed(2)}</span></p>
                </div>
              </div>
              <div className="payment-status">
                <h4>Payment</h4>
                <p>{order.paymentMethod} - {order.isPaid ? `Paid on ${new Date(order.paidAt!).toLocaleDateString()}` : 'Pending'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 