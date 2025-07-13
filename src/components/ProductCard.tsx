import React, { useState } from 'react';
import { ShoppingCart, Heart, Truck, Zap } from 'lucide-react';
import { Product, ColorVariant } from '../types/Product';
import StarRating from './StarRating';
import QuantitySelector from './QuantitySelector';
import ColorVariants from './ColorVariants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number, selectedColor: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  const selectedColorVariant = product.colors.find(color => color.id === selectedColor);
  const currentImage = selectedColorVariant?.image || product.image;

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    onAddToCart(product.id, quantity, selectedColor);
    setIsAddingToCart(false);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group max-w-sm mx-auto">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-900">
        <img
          src={currentImage}
          alt={product.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          {product.fastDelivery && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
              <Zap size={10} />
              <span>Fast</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`
            absolute top-3 right-3 p-2 rounded-full transition-all duration-200
            ${isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
            }
            hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900
          `}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
        </button>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
            <span className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title and Rating */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <StarRating 
            rating={product.rating} 
            reviewCount={product.reviewCount}
            size={14}
          />
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-400">
            ₹{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-lg">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Shipping Info */}
        {product.freeShipping && (
          <div className="flex items-center space-x-2 text-green-400 text-sm">
            <Truck size={14} />
            <span>Free Shipping</span>
          </div>
        )}

        {/* Color Variants */}
        <ColorVariants
          colors={product.colors}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />

        {/* Quantity Selector */}
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
          className={`
            w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300
            flex items-center justify-center space-x-2
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
            ${product.inStock && !isAddingToCart
              ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 active:scale-95'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }
            ${isAddingToCart ? 'animate-pulse' : ''}
          `}
        >
          <ShoppingCart size={16} className={isAddingToCart ? 'animate-bounce' : ''} />
          <span>
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;