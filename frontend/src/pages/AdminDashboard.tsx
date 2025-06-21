import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { ordersAPI, productsAPI, usersAPI } from '../services/api.ts';
import { Order, Product, User } from '../types';
import { 
  FaUsers, 
  FaBox, 
  FaShoppingCart, 
  FaDollarSign, 
  FaChartLine,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye
} from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch orders for stats and recent orders
      const ordersResponse = await ordersAPI.getAll();
      const orders = ordersResponse.data;
      
      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      
      // Fetch products for stats
      const productsResponse = await productsAPI.getAll();
      const products = productsResponse.data.products;
      
      // Fetch users for stats
      const usersResponse = await usersAPI.getAll();
      const users = usersResponse.data;
      
      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue
      });
      
      // Get recent orders (last 5)
      setRecentOrders(orders.slice(0, 5));
      
      // Get recent products (last 5)
      setRecentProducts(products.slice(0, 5));
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
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

  if (user?.role !== 'admin') {
    return (
      <div className="auth-required">
        <h2>Access Denied</h2>
        <p>You don't have permission to access the admin dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-error">{error}</div>
        <button onClick={fetchDashboardData} className="btn btn-primary">Try Again</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-content">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaDollarSign />
          </div>
          <div className="stat-content">
            <h3>${stats.totalRevenue.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <Link to="/admin/orders" className="btn btn-outline">
              View All Orders
            </Link>
          </div>
          
          <div className="orders-table">
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
                    <td>
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/admin/orders/${order._id}`} className="btn btn-sm btn-outline">
                        <FaEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Products</h2>
            <Link to="/admin/products" className="btn btn-outline">
              <FaPlus /> Add Product
            </Link>
          </div>
          
          <div className="products-grid">
            {recentProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img src={product.images[0] || '/placeholder-product.jpg'} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-stock">Stock: {product.stock}</p>
                  <div className="product-actions">
                    <Link to={`/admin/products/${product._id}/edit`} className="btn btn-sm btn-outline">
                      <FaEdit />
                    </Link>
                    <button className="btn btn-sm btn-danger">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/products/new" className="action-card">
            <FaPlus />
            <h3>Add Product</h3>
            <p>Create a new product listing</p>
          </Link>
          
          <Link to="/admin/orders" className="action-card">
            <FaShoppingCart />
            <h3>Manage Orders</h3>
            <p>View and update order status</p>
          </Link>
          
          <Link to="/admin/users" className="action-card">
            <FaUsers />
            <h3>Manage Users</h3>
            <p>View and manage user accounts</p>
          </Link>
          
          <Link to="/admin/analytics" className="action-card">
            <FaChartLine />
            <h3>Analytics</h3>
            <p>View sales and performance data</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 