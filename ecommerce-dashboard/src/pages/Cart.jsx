import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Trash2, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const USD_TO_INR = 83;

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <Package className="h-5 w-5" />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-lg">
            Review your items and checkout when ready
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full sm:w-32 h-32 object-contain bg-gray-50 rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize mb-4">
                      Category: {item.category}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="text-xl font-bold text-primary-600">
                            ₹{Math.round(item.price * USD_TO_INR * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="w-full sm:w-auto px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              Clear Cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">₹{Math.round(getCartTotal() * USD_TO_INR).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span className="font-medium">₹{Math.round(getCartTotal() * USD_TO_INR * 0.18).toLocaleString('en-IN')}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{Math.round(getCartTotal() * USD_TO_INR * 1.18).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full btn-primary py-3 mb-3"
                onClick={() => alert('Checkout functionality would be implemented here!')}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
