import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function Wishlist() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlist, clearWishlist } = useWishlist();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    navigate('/cart');
  };

  const moveAllToCart = () => {
    wishlistItems.forEach(product => addToCart(product, 1));
    clearWishlist();
    navigate('/cart');
  };

  const handleClearAll = () => {
    if (window.confirm('Remove all items from your wishlist?')) {
      clearWishlist();
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="pt-20 md:pt-24 pb-10 bg-[#f8f8f8] min-h-screen overflow-x-hidden">
        <div className="max-w-[1200px] mx-auto px-4 md:px-5 w-full">
          <div className="text-center py-16 md:py-24 px-5 bg-white rounded-lg">
            <h2 className="text-xl md:text-2xl font-semibold text-ink mb-2.5">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-7 text-sm md:text-base">Save your favorite items here and shop them later.</p>
            <Link to="/" className="inline-block py-3.5 px-10 bg-ink text-white no-underline font-medium text-sm transition-all duration-300 hover:bg-[#333]">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24 pb-10 bg-[#f8f8f8] min-h-screen overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-5 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-xl md:text-2xl font-bold text-ink m-0">My Wishlist</h1>
          <span className="text-sm text-gray-500">{wishlistItems.length} items</span>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            className="inline-flex items-center gap-2 py-3 px-6 bg-ink text-white border-none rounded font-medium text-sm cursor-pointer transition-all duration-300 hover:bg-[#333] hover:-translate-y-0.5 hover:shadow-lg"
            onClick={moveAllToCart}
          >
            <FiShoppingCart className="w-4 h-4" /> Move All to Cart
          </button>
          <button
            className="inline-flex items-center gap-2 py-3 px-6 bg-white text-red-500 border border-red-200 rounded font-medium text-sm cursor-pointer transition-all duration-300 hover:bg-red-50 hover:border-red-500"
            onClick={handleClearAll}
          >
            <FiTrash2 className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3 md:gap-5 w-full">
          {wishlistItems.map(item => (
            <div key={item.id} className="bg-white rounded-md overflow-hidden border border-gray-200 flex flex-col min-w-0 transition-all duration-200 hover:shadow-lg hover:border-gray-300 group">
              <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden relative">
                <button
                  className="absolute top-2.5 left-2.5 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center z-10 shadow-md transition-transform hover:scale-110"
                  onClick={() => toggleWishlist(item)}
                  aria-label="Remove from wishlist"
                >
                  <FiHeart className="w-[18px] h-[18px] fill-red-500 stroke-red-500" />
                </button>
                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-5 block transition-transform duration-300 group-hover:scale-105" />
              </div>

              <div className="px-3 md:px-4 pt-3 md:pt-4 pb-2.5 flex-1">
                <h3 className="text-sm md:text-base font-semibold text-ink mb-1.5 leading-snug line-clamp-2">{item.name}</h3>
                <p className="text-xs md:text-[0.82rem] text-gray-500 mb-2.5 leading-tight line-clamp-2">{item.description}</p>
                <span className="text-base md:text-lg font-bold text-ink">₹{item.price}</span>
              </div>

              <div className="flex gap-2 px-3 md:px-4 pb-3 md:pb-4">
                <button
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-ink text-white border-none rounded text-xs md:text-[0.82rem] font-medium cursor-pointer transition-all duration-300 hover:bg-[#333]"
                  onClick={() => handleAddToCart(item)}
                >
                  <FiShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded text-gray-400 cursor-pointer transition-all duration-200 flex-shrink-0 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
                  onClick={() => toggleWishlist(item)}
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;