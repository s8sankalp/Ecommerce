import React, { useState, useEffect } from 'react';
import api from '../../services/api.ts';
import { Order } from '../../types/index.ts';
import { Link } from 'react-router-dom';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { data } = await api.put(`/orders/${id}/status`, { status });
      setOrders(orders.map((o) => (o._id === id ? data : o)));
    } catch (err) {
      setError('Failed to update order status');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-orders">
      <h1>Manage Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id.substring(0, 8)}...</td>
              <td>{typeof order.user === 'object' ? order.user.name : 'N/A'}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.isPaid ? 'Yes' : 'No'}</td>
              <td>{order.isDelivered ? 'Yes' : 'No'}</td>
              <td>
                <select 
                  value={order.status} 
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`status-select status-${order.status.toLowerCase()}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <Link to={`/order/${order._id}`} className="view-details-link">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders; 