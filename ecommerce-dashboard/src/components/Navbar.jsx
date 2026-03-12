import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Clock, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, getTimeRemaining } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [getTimeRemaining]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white p-2 rounded-lg">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-gray-900">E-Shop</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isActive('/dashboard')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/products"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isActive('/products')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Products</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors relative ${isActive('/cart')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isActive('/profile')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>

            <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-700" />
              <span className="text-sm font-medium text-yellow-700">
                {formatTime(timeRemaining)}
              </span>
            </div>

            <div className="flex items-center space-x-4 pl-4 border-l border-gray-300">
              <span className="text-sm text-gray-700">
                Welcome, <span className="font-semibold">{user?.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <div className="px-3 py-2 bg-gray-100 rounded-lg mb-2">
                <div className="text-sm text-gray-600">Logged in as:</div>
                <div className="font-semibold text-gray-900">{user?.name}</div>
              </div>

              <div className="flex items-center justify-between px-3 py-2 bg-yellow-100 rounded-lg mb-2">
                <span className="text-sm font-medium text-yellow-700">Session Time:</span>
                <span className="text-sm font-bold text-yellow-700">{formatTime(timeRemaining)}</span>
              </div>

              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isActive('/dashboard')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isActive('/products')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Products</span>
              </Link>

              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isActive('/cart')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
                {getCartItemsCount() > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>

              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isActive('/profile')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors mt-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
