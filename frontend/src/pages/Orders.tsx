import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { ordersAPI } from '../services/api.ts';
import { Order } from '../types/index.ts';
import AccountNav from '../components/AccountNav.tsx';
import './Account.css'; // Shared styles
import './Orders.css'; // Page-specific styles
import { FaEye, FaShoppingBag } from 'react-icons/fa';

const Orders: React.FC = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getMyOrders();
      setOrders(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    const statusClass = status.toLowerCase().replace(' ', '-');
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };
  
  if (authLoading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!isAuthenticated) return <div className="error-container">Please log in to view your orders.</div>;

  return (
    <div className="account-page-container">
      <AccountNav />
      <div className="account-content">
        <div className="account-header">
          <h1>My Orders</h1>
          <p>View your order history and check the status of your purchases.</p>
        </div>

        {loading ? (
          <div className="loading-container"><div className="spinner"></div></div>
        ) : error ? (
          <div className="notice error">{error}</div>
        ) : orders.length === 0 ? (
          <div className="no-orders-container">
            <FaShoppingBag className="no-orders-icon" />
            <h2>No Orders Found</h2>
            <p>You haven't placed any orders yet. Let's change that!</p>
            <Link to="/products" className="btn-start-shopping">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td data-label="Order ID">#{order._id.slice(-8)}</td>
                    <td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td data-label="Status">{getStatusBadge(order.status)}</td>
                    <td data-label="Total">${order.totalPrice.toFixed(2)}</td>
                    <td data-label="Actions">
                      <Link to={`/orders/${order._id}`} className="btn-view-details">
                        <FaEye /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 