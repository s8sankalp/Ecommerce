import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { productsAPI } from '../services/api.ts';
import { Product, ProductFilters } from '../types/index.ts';
import { FaShoppingCart, FaStar, FaFilter, FaSort, FaRegHeart, FaHeart, FaTimes } from 'react-icons/fa';
import './Products.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  // Using a Set for efficient add/delete of wishlisted items
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const [filters, setFilters] = useState<ProductFilters>({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    sort: searchParams.get('sort') || 'default'
  });

  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(searchParams.entries());
      const response = await productsAPI.getAll(params);
      setProducts(response.data.products);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilterChange = (key: string, value: string | number | undefined) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === undefined || value === '' || value === 'default') {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    newParams.set('page', '1'); // Reset to first page on filter change
    setSearchParams(newParams);
  };
  
  const clearFilters = () => {
    setSearchParams({});
  };
  
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // You can add some feedback to the user here
  };
  
  const toggleWishlist = (productId: string) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const renderPagination = () => {
    if (pagination.pages <= 1) return null;
    const pageNumbers = [];
    for (let i = 1; i <= pagination.pages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handleFilterChange('page', number)}
            className={`pagination-btn ${pagination.page === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  const renderProductCard = (product: Product) => (
    <div key={product._id} className="product-card">
      <div className="product-image-container">
        <Link to={`/products/${product._id}`}>
          <img src={product.images[0] || '/images/placeholder.png'} alt={product.name} className="product-image" />
        </Link>
        <button className="wishlist-btn" onClick={() => toggleWishlist(product._id)}>
          {wishlist.has(product._id) ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>
      <div className="product-card-content">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h3>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < Math.round(product.rating) ? '#ffc107' : '#e4e5e9'} />
          ))}
          <span>({product.numReviews})</span>
        </div>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <button 
          className="btn-add-to-cart" 
          onClick={() => handleAddToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="products-page-container">
      <aside className="filters-sidebar">
        <h3><FaFilter /> Filters</h3>
        <button className="clear-filters-btn" onClick={clearFilters}>
          <FaTimes /> Clear All
        </button>
        <div className="filter-group">
          <h4>Category</h4>
          <ul>
            {categories.map(cat => (
              <li 
                key={cat} 
                onClick={() => handleFilterChange('category', cat)}
                className={searchParams.get('category') === cat ? 'active' : ''}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
        <div className="filter-group">
          <h4>Price Range</h4>
          <div className="price-filter">
            <input 
              type="number" 
              placeholder="Min" 
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              value={searchParams.get('minPrice') || ''}
            />
            <span>-</span>
            <input 
              type="number" 
              placeholder="Max"
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              value={searchParams.get('maxPrice') || ''}
            />
          </div>
        </div>
      </aside>
      <main className="products-main-content">
        <div className="products-toolbar">
          <div className="search-container">
            <FaShoppingCart className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              value={searchParams.get('keyword') || ''}
            />
          </div>
          <div className="sort-container">
            <select 
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              value={searchParams.get('sort') || 'default'}
            >
              <option value="default">Default Sort</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Top Rated</option>
            </select>
          </div>
        </div>
        <div className="products-header">
          <p>Showing {products.length} of {pagination.total} results</p>
        </div>
        
        {loading ? (
          <div className="loading-container"><div className="spinner"></div></div>
        ) : error ? (
          <div className="error-container">{error}</div>
        ) : products.length > 0 ? (
          <>
            <div className="products-grid">
              {products.map(renderProductCard)}
            </div>
            {renderPagination()}
          </>
        ) : (
          <div className="no-products-found">
            <h2>No Products Found</h2>
            <p>Try adjusting your filters or clearing them to see all products.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products; 