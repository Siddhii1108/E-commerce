import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 10
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-400 font-medium">Qty:</span>
      <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800">
        <button
          onClick={handleDecrease}
          disabled={quantity <= min}
          className="p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 rounded-l-lg"
          aria-label="Decrease quantity"
        >
          <Minus size={14} className="text-gray-300" />
        </button>
        
        <span className="px-4 py-2 text-sm font-medium text-gray-200 min-w-[3rem] text-center">
          {quantity}
        </span>
        
        <button
          onClick={handleIncrease}
          disabled={quantity >= max}
          className="p-2 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 rounded-r-lg"
          aria-label="Increase quantity"
        >
          <Plus size={14} className="text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;