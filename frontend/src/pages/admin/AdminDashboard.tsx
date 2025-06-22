import React, { useEffect, useState } from 'react';
import api from '../../services/api.ts';
import { Link } from 'react-router-dom';
import { FaBox, FaChartLine, FaList, FaUsers } from 'react-icons/fa';
import './AdminDashboard.css';
import { Order, Product } from '../../types/index.ts';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number | string;
    colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, colorClass }) => (
    <div className="stat-card">
        <div className={`stat-card-icon ${colorClass}`}>
            {icon}
        </div>
        <div className="stat-card-info">
            <h3>{label}</h3>
            <p>{value}</p>
        </div>
    </div>
);


const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        products: 0,
        totalSales: 0,
    });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [usersRes, ordersRes, productsRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/orders'),
                    api.get('/products'),
                ]);
                
                const totalSales = ordersRes.data
                    .filter((order: Order) => order.status === 'Delivered')
                    .reduce((acc: number, order: Order) => acc + order.totalPrice, 0);

                setStats({
                    users: usersRes.data.length,
                    orders: ordersRes.data.length,
                    products: productsRes.data.length,
                    totalSales: totalSales,
                });

                setRecentOrders(ordersRes.data.slice(0, 5));

            } catch (err) {
                setError('Failed to fetch dashboard data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="stats-grid">
                <StatCard icon={<FaChartLine />} label="Total Sales" value={`$${stats.totalSales.toFixed(2)}`} colorClass="total-sales" />
                <StatCard icon={<FaList />} label="Total Orders" value={stats.orders} colorClass="total-orders" />
                <StatCard icon={<FaBox />} label="Total Products" value={stats.products} colorClass="total-products" />
                <StatCard icon={<FaUsers />} label="Total Users" value={stats.users} colorClass="total-users" />
            </div>
            <div className="recent-orders">
                <h2>Recent Orders</h2>
                <table className="recent-orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id.substring(0, 8)}...</td>
                                <td>{typeof order.user === 'object' ? order.user.name : 'N/A'}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td><span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                                <td>
                                    <Link to={`/admin/orders/${order._id}`} className="view-order-link">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;