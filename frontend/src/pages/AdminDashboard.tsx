import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, productsAPI, usersAPI } from '../services/api';
import { Order, Product, User } from '../types';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaDollarSign, FaEye } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        ordersAPI.getAll(),
        productsAPI.getAll(),
        usersAPI.getAll()
      ]);
      
      const totalRevenue = ordersRes.data.reduce((sum: number, order: Order) => sum + order.totalPrice, 0);
      
      setStats({
        totalUsers: usersRes.data.length,
        totalProducts: productsRes.data.products.length,
        totalOrders: ordersRes.data.length,
        totalRevenue
      });
      
      setRecentOrders(ordersRes.data.slice(0, 5));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClass = status.toLowerCase().replace(' ', '-');
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (error) return <div className="notice error">{error}</div>;

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="stats-grid">
        <StatCard icon={<FaUsers />} label="Total Users" value={stats.totalUsers} />
        <StatCard icon={<FaBoxOpen />} label="Total Products" value={stats.totalProducts} />
        <StatCard icon={<FaShoppingCart />} label="Total Orders" value={stats.totalOrders} />
        <StatCard icon={<FaDollarSign />} label="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <Link to="/admin/orders" className="btn-view-all">View All</Link>
        </div>
        <div className="recent-orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-8)}</td>
                  <td>{order.user.name}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/admin/orders/${order._id}`} className="btn-view-details"><FaEye /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  </div>
);

export default AdminDashboard; 