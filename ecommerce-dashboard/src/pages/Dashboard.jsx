import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, User, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const { getCartItemsCount, getCartTotal } = useCart();

  const stats = [
    {
      label: 'Cart Items',
      value: getCartItemsCount(),
      icon: ShoppingCart,
      color: 'bg-blue-500',
      link: '/cart',
    },
    {
      label: 'Cart Total',
      value: `$${getCartTotal().toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-green-500',
      link: '/cart',
    },
    {
      label: 'Browse Products',
      value: 'Shop Now',
      icon: Package,
      color: 'bg-purple-500',
      link: '/products',
    },
    {
      label: 'Your Profile',
      value: 'Manage',
      icon: User,
      color: 'bg-orange-500',
      link: '/profile',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here's what's happening with your shopping today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Action Card */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Start Shopping</h2>
            <p className="mb-6 text-primary-100">
              Explore our wide range of products and find exactly what you're looking for.
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Browse Products
            </Link>
          </div>

          {/* Account Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Name</span>
                <span className="font-medium text-gray-900">{user?.name}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{user?.email}</span>
              </div>
              <div className="pt-4">
                <Link
                  to="/profile"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Edit Profile →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Quick Tip</h3>
          <p className="text-blue-800">
            Your session will expire after 5 minutes of login. The timer is displayed in the navigation bar.
            Make sure to complete your shopping before the session ends!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
