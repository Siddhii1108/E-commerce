import React from 'react';
import { ColorVariant } from '../types/Product';

interface ColorVariantsProps {
  colors: ColorVariant[];
  selectedColor: string;
  onColorChange: (colorId: string) => void;
}

const ColorVariants: React.FC<ColorVariantsProps> = ({
  colors,
  selectedColor,
  onColorChange
}) => {
  if (colors.length <= 1) return null;

  return (
    <div className="space-y-2">
      <span className="text-sm text-gray-400 font-medium">Color:</span>
      <div className="flex items-center space-x-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onColorChange(color.id)}
            className={`
              relative w-8 h-8 rounded-full border-2 transition-all duration-200
              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
              ${selectedColor === color.id 
                ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900' 
                : 'border-gray-600 hover:border-gray-500'
              }
            `}
            style={{ backgroundColor: color.color }}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          >
            {selectedColor === color.id && (
              <div className="absolute inset-0 rounded-full border-2 border-white opacity-80" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorVariants;