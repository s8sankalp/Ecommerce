import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { productsAPI } from '../services/api.ts';
import { Product, ProductFilters } from '../types';
import { FaSearch, FaFilter, FaShoppingCart, FaStar } from 'react-icons/fa';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [filters, setFilters] = useState<ProductFilters>({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1
  });

  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Toys', 'Automotive', 'Health', 'Food'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Dell', 'HP', 'Canon', 'Nikon'];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll(filters);
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

  const handleFilterChange = (key: keyof ProductFilters, value: string | number | undefined) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v !== undefined && v !== '') {
        params.set(k, String(v));
      }
    });
    setSearchParams(params);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handlePageChange = (page: number) => {
    handleFilterChange('page', page);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-error">{error}</div>
        <button onClick={fetchProducts} className="btn btn-primary">Try Again</button>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>
        <p>Found {pagination.total} products</p>
      </div>

      <div className="products-layout">
        <aside className="filters-sidebar">
          <h3><FaFilter /> Filters</h3>
          
          <div className="filter-section">
            <h4>Search</h4>
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.keyword || ''}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="filter-section">
            <h4>Category</h4>
            <select
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="form-control"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h4>Brand</h4>
            <select
              value={filters.brand || ''}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="form-control"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="form-control"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="form-control"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setFilters({ page: 1 });
              setSearchParams({});
            }}
            className="btn btn-outline"
          >
            Clear Filters
          </button>
        </aside>

        <main className="products-main">
          {products.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map(product => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      <img src={product.images[0] || '/placeholder-product.jpg'} alt={product.name} />
                      {product.discount > 0 && (
                        <span className="discount-badge">-{product.discount}%</span>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-title">
                        <Link to={`/products/${product._id}`}>{product.name}</Link>
                      </h3>
                      
                      <div className="product-rating">
                        <FaStar className="star-icon" />
                        <span>{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
                      </div>
                      
                      <div className="product-price">
                        <span className="current-price">${product.price.toFixed(2)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <p className="product-description">{product.description.substring(0, 100)}...</p>
                      
                      <div className="product-actions">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="btn btn-primary"
                          disabled={product.stock === 0}
                        >
                          <FaShoppingCart /> {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pagination.pages > 1 && (
                <div className="pagination">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`btn ${page === pagination.page ? 'btn-primary' : 'btn-outline'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products; 