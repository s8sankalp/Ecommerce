import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { ordersAPI } from '../services/api.ts';
import { Order } from '../types';
import { FaArrowLeft, FaTruck, FaCheckCircle, FaClock, FaTimes, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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
      setError(err.response?.data?.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'Shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'Processing':
        return <FaClock className="status-icon processing" />;
      case 'Cancelled':
        return <FaTimes className="status-icon cancelled" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'delivered';
      case 'Shipped':
        return 'shipped';
      case 'Processing':
        return 'processing';
      case 'Cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-required">
        <h2>Authentication Required</h2>
        <p>Please log in to view order details.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="error-container">
        <div className="alert alert-error">{error || 'Order not found'}</div>
        <button onClick={() => navigate('/orders')} className="btn btn-primary">
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      <button onClick={() => navigate('/orders')} className="back-btn">
        <FaArrowLeft /> Back to Orders
      </button>

      <div className="order-detail-header">
        <h1>Order #{order._id.slice(-8)}</h1>
        <div className="order-status-badge">
          {getStatusIcon(order.status)}
          <span className={`status-text ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="order-detail-layout">
        <div className="order-detail-main">
          <div className="order-section">
            <h2>Order Items</h2>
            <div className="order-items-list">
              {order.orderItems.map((item, index) => (
                <div key={index} className="order-item-detail">
                  <img 
                    src={item.image || '/placeholder-product.jpg'} 
                    alt={item.name} 
                  />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p className="item-price">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-section">
            <h2>Shipping Address</h2>
            <div className="shipping-address">
              <FaMapMarkerAlt />
              <div>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          <div className="order-section">
            <h2>Payment Information</h2>
            <div className="payment-info">
              <FaCreditCard />
              <div>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Payment Status:</strong> {order.isPaid ? 'Paid' : 'Pending'}</p>
                {order.isPaid && order.paidAt && (
                  <p><strong>Paid On:</strong> {new Date(order.paidAt).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="order-detail-sidebar">
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            
            <div className="order-dates">
              <div className="date-item">
                <span>Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              {order.isDelivered && order.deliveredAt && (
                <div className="date-item">
                  <span>Delivered:</span>
                  <span>{new Date(order.deliveredAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax:</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="total-row final">
                <span>Total:</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {order.trackingNumber && (
              <div className="tracking-info">
                <h4>Tracking Information</h4>
                <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
              </div>
            )}

            {order.notes && (
              <div className="order-notes">
                <h4>Order Notes</h4>
                <p>{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 