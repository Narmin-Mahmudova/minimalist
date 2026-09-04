import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext'; 

function ProductModal({ product, onClose }) {
  const navigate = useNavigate();
  const { addToCart: addToCartCtx } = useCart(); 
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);

  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  if (!product) return null;

  const image = product.images ? product.images[0] : product.image;
  const description = product.description || product.concern;
  const price = selectedSize ? selectedSize.price : product.price;
  const oldPrice = selectedSize ? selectedSize.oldPrice : product.oldPrice;
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const toggleWishlist = () => {
    const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
    const exists = existing.find(item => item.id === product.id);

    let updated;
    if (!exists) {
      updated = [...existing, {
        id: product.id,
        name: product.name,
        description: description,
        price: price,
        image: image
      }];
    } else {
      updated = existing.filter(item => item.id !== product.id);
    }

    localStorage.setItem('wishlist', JSON.stringify(updated));
    setWishlistItems(updated);
  };

  const addToCart = () => {
    const sizeLabel = selectedSize ? selectedSize.label : null;

    const itemToAdd = {
      id: product.id,
      name: product.name,
      description: description,
      price: price,
      oldPrice: oldPrice,
      size: sizeLabel,
      image: image,
      quantity: 1
    };

    if (addToCartCtx) {
      addToCartCtx(itemToAdd);
    } else {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = existingCart.find(
        item => item.id === product.id && item.size === sizeLabel
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        existingCart.push(itemToAdd);
      }
      localStorage.setItem('cart', JSON.stringify(existingCart));
    }
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-5" onClick={onClose}>
      <div className="bg-white max-w-[900px] w-full max-h-[90vh] overflow-y-auto relative rounded-lg p-6 md:p-10" onClick={(e) => e.stopPropagation()}>
        
        <button 
          className="absolute top-4 right-4 bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer z-10 transition-all duration-200 hover:bg-[#1a1a1a] hover:text-white"
          onClick={onClose}
        >
          <FiX />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="product-detail-image">
            <img src={image} alt={product.name} className="w-full h-auto object-cover" />
          </div>

          <div className="product-detail-info">
            <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">{product.name}</h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl font-semibold text-[#1a1a1a]">₹{price}</span>
              {oldPrice && <span className="text-base text-gray-400 line-through">₹{oldPrice}</span>}
            </div>

            {product.sizes && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size.label}
                      className={`px-4 py-2 border text-sm transition-all duration-200 ${
                        selectedSize?.label === size.label 
                          ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' 
                          : 'bg-white text-[#1a1a1a] border-gray-300 hover:border-[#1a1a1a]'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button 
                className="flex-1 py-3 px-6 bg-[#1a1a1a] text-white font-medium text-sm hover:bg-[#333] transition-colors duration-300"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <button
                className={`w-12 h-12 flex items-center justify-center border transition-all duration-200 ${
                  isInWishlist 
                    ? 'bg-white border-[#1a1a1a] text-[#e74c3c]' 
                    : 'bg-white border-gray-300 text-[#1a1a1a] hover:border-[#1a1a1a]'
                }`}
                onClick={toggleWishlist}
              >
                <FiHeart className={isInWishlist ? 'fill-[#e74c3c] stroke-[#e74c3c]' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;