import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showRating?: boolean;
  reviewCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxRating = 5, 
  size = 16, 
  showRating = true,
  reviewCount 
}) => {
  const stars = [];
  
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= Math.floor(rating);
    const isHalfFilled = i === Math.ceil(rating) && rating % 1 !== 0;
    
    stars.push(
      <div key={i} className="relative">
        <Star 
          size={size} 
          className="text-gray-600 fill-gray-600"
        />
        {(isFilled || isHalfFilled) && (
          <Star 
            size={size} 
            className={`absolute top-0 left-0 text-yellow-400 fill-yellow-400 ${
              isHalfFilled ? 'w-1/2 overflow-hidden' : ''
            }`}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-0.5">
        {stars}
      </div>
      {showRating && (
        <div className="flex items-center space-x-1 text-sm">
          <span className="text-gray-300 font-medium">{rating.toFixed(1)}</span>
          {reviewCount && (
            <span className="text-gray-500">({reviewCount.toLocaleString()})</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StarRating;