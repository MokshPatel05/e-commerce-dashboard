import React, { useState, useMemo } from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { products, loading, error } = useProducts();
  const { cart, addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return ['all', ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover amazing products at great prices
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Search by name..."
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field pl-10 capitalize"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="capitalize">
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold">{products.length}</span> products
            </p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" text="Loading products..." />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Products</h3>
            <p className="text-red-700">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isInCart={isInCart(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
