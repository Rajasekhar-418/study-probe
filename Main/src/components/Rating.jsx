import { Star } from 'lucide-react';

export default function Rating({ rating, reviewCount, size = 'sm' }) {
  const starSize = size === 'lg' ? 18 : 14;
  const textSize = size === 'lg' ? 'text-base' : 'text-sm';
  const ratingColor = size === 'lg' ? 'text-amber-700' : 'text-amber-600';

  return (
    <div className="flex items-center gap-1">
      <span className={`font-bold ${ratingColor} ${textSize}`}>{rating.toFixed(1)}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => {
          const fill = rating >= n ? 1 : rating >= n - 0.5 ? 0.5 : 0;
          return (
            <span key={n} className="relative">
              <Star size={starSize} className="text-gray-300" />
              {fill > 0 && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star size={starSize} className="text-amber-400 fill-amber-400" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {reviewCount != null && (
        <span className="text-gray-500 text-xs">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
