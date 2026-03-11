import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, isInCart }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 mb-4 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain p-4"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">
              {product.rating?.rate || 'N/A'}
            </span>
          </div>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-600">
            {product.rating?.count || 0} reviews
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            disabled={isInCart}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isInCart
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
