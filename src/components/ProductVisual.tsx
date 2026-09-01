import React from 'react';
import { Sparkles, Heart, Package, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  className = '',
  size = 'md',
  showBadge = true
}) => {
  const [imageError, setImageError] = React.useState(false);

  // Derive cosmetic container category styling
  const getVisualType = (category: string, name: string) => {
    const lowerName = name.toLowerCase();
    const lowerCat = category.toLowerCase();

    if (product.isBundle || lowerCat.includes('paket')) return 'bundle';
    if (lowerName.includes('tint') || lowerName.includes('lip')) return 'lip';
    if (lowerName.includes('serum') || lowerName.includes('drop')) return 'dropper';
    if (lowerName.includes('wash') || lowerName.includes('cleanser') || lowerName.includes('milk') || lowerName.includes('lotion')) return 'pump';
    if (lowerName.includes('cushion') || lowerName.includes('cream') || lowerName.includes('gel') || lowerName.includes('mask') || lowerName.includes('scrub') || lowerName.includes('butter')) return 'jar';
    if (lowerName.includes('sun') || lowerName.includes('stick') || lowerName.includes('balm')) return 'tube';
    return 'bottle';
  };

  const visualType = getVisualType(product.category, product.name);
  const shade = product.shadeColor || '#fec1d6';

  return (
    <div className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#FFF5F8] via-[#FAF3F6] to-[#F5EBF0] ${className}`}>
      {/* Background Soft Glow */}
      <div 
        className="absolute inset-0 opacity-40 blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${shade} 0%, transparent 70%)`
        }}
      />

      {/* Actual Product Photo */}
      {!imageError && product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Fallback Elegant Vector Cosmetic Bottle/Jar Representation */
        <div className="relative z-10 flex flex-col items-center justify-center p-3 text-center w-full h-full">
          {visualType === 'lip' && (
            <div className="relative flex flex-col items-center animate-pulse duration-1000">
              {/* Lip Tint Cap */}
              <div 
                className="w-5 h-8 rounded-t-md shadow-xs border border-white/60"
                style={{ backgroundColor: '#805062' }}
              />
              {/* Glass Body with Lip Tint Color */}
              <div 
                className="w-7 h-14 rounded-b-lg border-2 border-white shadow-md relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: shade }}
              >
                <span className="text-[7px] font-black text-white uppercase tracking-tighter transform -rotate-90">
                  BABY BLOOM
                </span>
              </div>
            </div>
          )}

          {visualType === 'dropper' && (
            <div className="relative flex flex-col items-center">
              {/* Dropper Pipette Pip */}
              <div className="w-3 h-4 bg-white rounded-t-full border border-gray-200" />
              <div className="w-6 h-3 bg-[#fec1d6] rounded-t-sm" />
              {/* Glass Dropper Bottle */}
              <div 
                className="w-9 h-14 rounded-b-xl border-2 border-white/90 shadow-md relative overflow-hidden flex flex-col items-center justify-center p-1"
                style={{ backgroundColor: '#fff0f5' }}
              >
                <div 
                  className="w-6 h-6 rounded-full opacity-70 mb-1"
                  style={{ backgroundColor: shade }}
                />
                <span className="text-[6px] font-extrabold text-[#805062] leading-none">
                  SERUM
                </span>
              </div>
            </div>
          )}

          {visualType === 'jar' && (
            <div className="relative flex flex-col items-center">
              {/* Jar Cap */}
              <div 
                className="w-14 h-4 rounded-t-lg border border-white shadow-xs"
                style={{ backgroundColor: '#ffd9e4' }}
              />
              {/* Jar Base */}
              <div 
                className="w-16 h-10 rounded-b-2xl border-2 border-white shadow-md flex items-center justify-center"
                style={{ backgroundColor: shade || '#fce7ef' }}
              >
                <span className="text-[7px] font-bold text-[#805062] px-1 text-center truncate">
                  Baby Bloom
                </span>
              </div>
            </div>
          )}

          {visualType === 'bundle' && (
            <div className="flex items-center gap-1.5 p-2 bg-white/80 rounded-2xl border border-[#fec1d6] shadow-sm">
              <Package className="w-8 h-8 text-[#805062]" />
              <div className="text-left">
                <span className="text-[10px] font-black text-[#805062] block">BUNDLING</span>
                <span className="text-[8px] text-gray-500 font-bold">FULL SET</span>
              </div>
            </div>
          )}

          {(visualType === 'tube' || visualType === 'pump' || visualType === 'bottle') && (
            <div className="relative flex flex-col items-center">
              <div className="w-4 h-5 bg-[#805062] rounded-t-sm" />
              <div 
                className="w-10 h-16 rounded-b-xl border-2 border-white shadow-md flex flex-col items-center justify-center p-1"
                style={{ backgroundColor: shade || '#fce7ef' }}
              >
                <span className="text-[7px] font-black text-[#805062] text-center uppercase tracking-tighter">
                  BABY BLOOM
                </span>
              </div>
            </div>
          )}

          <p className="text-[10px] font-bold text-[#805062] mt-1 line-clamp-1 max-w-[90%]">
            {product.name}
          </p>
        </div>
      )}

      {/* Shade Swatch Dot for Lip Tints & Colored Products */}
      {product.shadeColor && (
        <div 
          className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-full shadow-xs border border-white"
          title={`Shade: ${product.shadeName || product.shadeColor}`}
        >
          <span 
            className="w-3 h-3 rounded-full border border-black/10 shrink-0 shadow-2xs"
            style={{ backgroundColor: product.shadeColor }}
          />
          {product.shadeName && (
            <span className="text-[9px] font-bold text-gray-700 max-w-[80px] truncate">
              {product.shadeName.split(' ')[0]}
            </span>
          )}
        </div>
      )}

      {/* Best Seller / Bundle Badges */}
      {showBadge && product.isBestSeller && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-[#805062] to-[#a3637b] text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm flex items-center gap-0.5 tracking-wider uppercase">
          <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
          Best Seller
        </div>
      )}

      {showBadge && product.isBundle && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-sm flex items-center gap-0.5 tracking-wider uppercase">
          <Sparkles className="w-2.5 h-2.5" />
          Paket Hemat
        </div>
      )}

      {/* Volume Badge */}
      {product.volume && (
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
          {product.volume}
        </div>
      )}
    </div>
  );
};
