import axios from 'axios';
import { Product, User, Order, AuthState, ProductFilters, PaginatedResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: { name: string; email: string; password: string }) =>
    api.post<AuthState>('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post<AuthState>('/auth/login', credentials),
  
  getCurrentUser: () => api.get<User>('/auth/me'),
};

// Products API
export const productsAPI = {
  getAll: (filters?: ProductFilters) =>
    api.get<PaginatedResponse<Product>>('/products', { params: filters }),
  
  getFeatured: () => api.get<Product[]>('/products/featured'),
  
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  
  create: (productData: Partial<Product>) =>
    api.post<Product>('/products', productData),
  
  update: (id: string, productData: Partial<Product>) =>
    api.put<Product>(`/products/${id}`, productData),
  
  delete: (id: string) => api.delete(`/products/${id}`),
  
  addReview: (id: string, reviewData: { rating: number; comment: string }) =>
    api.post(`/products/${id}/reviews`, reviewData),
};

// Orders API
export const ordersAPI = {
  create: (orderData: {
    orderItems: any[];
    shippingAddress: any;
    paymentMethod: string;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
  }) => api.post<Order>('/orders', orderData),
  
  getById: (id: string) => api.get<Order>(`/orders/${id}`),
  
  getMyOrders: () => api.get<Order[]>('/orders/myorders'),
  
  getAll: () => api.get<Order[]>('/orders'),
  
  updateToPaid: (id: string, paymentResult: any) =>
    api.put<Order>(`/orders/${id}/pay`, paymentResult),
  
  updateToDelivered: (id: string) =>
    api.put<Order>(`/orders/${id}/deliver`),
  
  updateStatus: (id: string, status: string) =>
    api.put<Order>(`/orders/${id}/status`, { status }),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get<User>('/users/profile'),
  
  updateProfile: (userData: Partial<User>) =>
    api.put<User>('/users/profile', userData),
  
  getAll: () => api.get<User[]>('/users'),
  
  delete: (id: string) => api.delete(`/users/${id}`),
};

export default api; 
 