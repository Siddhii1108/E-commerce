import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { Product } from './types/Product';
import ProductCard from './components/ProductCard';
import Toast from './components/Toast';

function App() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Sample product data
  const sampleProducts: Product[] = [
    {
      id: '1',
      title: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation',
      price: 199.99,
      originalPrice: 299.99,
      description: 'Experience crystal-clear audio with our premium wireless headphones featuring advanced noise cancellation technology and 30-hour battery life.',
      rating: 4.5,
      reviewCount: 2847,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
      colors: [
        {
          id: 'black',
          name: 'Midnight Black',
          color: '#1a1a1a',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500'
        },
        {
          id: 'white',
          name: 'Pearl White',
          color: '#f8f9fa',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500'
        },
        {
          id: 'blue',
          name: 'Ocean Blue',
          color: '#3b82f6',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500'
        }
      ],
      inStock: true,
      fastDelivery: true,
      freeShipping: true
    },
    {
      id: '2',
      title: 'Smart Fitness Watch with Heart Rate Monitor',
      price: 149.99,
      originalPrice: 199.99,
      description: 'Track your fitness goals with this advanced smartwatch featuring GPS, heart rate monitoring, and 7-day battery life.',
      rating: 4.2,
      reviewCount: 1523,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
      colors: [
        {
          id: 'black',
          name: 'Space Black',
          color: '#2d3748',
          image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500'
        },
        {
          id: 'silver',
          name: 'Silver',
          color: '#e2e8f0',
          image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500'
        }
      ],
      inStock: true,
      fastDelivery: false,
      freeShipping: true
    },
    {
      id: '3',
      title: 'Professional Camera Lens 85mm f/1.4',
      price: 899.99,
      description: 'Capture stunning portraits with this professional-grade camera lens featuring ultra-fast autofocus and exceptional image quality.',
      rating: 4.8,
      reviewCount: 456,
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
      colors: [
        {
          id: 'black',
          name: 'Professional Black',
          color: '#1a202c',
          image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500'
        }
      ],
      inStock: false,
      fastDelivery: false,
      freeShipping: false
    }
  ];

  const handleAddToCart = (productId: string, quantity: number, selectedColor: string) => {
    const product = sampleProducts.find(p => p.id === productId);
    const colorName = product?.colors.find(c => c.id === selectedColor)?.name || '';
    
    setToastMessage(
      `Added ${quantity}x ${product?.title}${colorName ? ` (${colorName})` : ''} to cart!`
    );
    setToastVisible(true);
    
    // Here you would typically dispatch to a cart context or state management
    console.log('Added to cart:', { productId, quantity, selectedColor });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Package size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Premium Store</h1>
              <p className="text-gray-400 text-sm">Discover amazing products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">
            Modern e-commerce experience with premium design 🛍️
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

export default App;