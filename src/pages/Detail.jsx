import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import productsData from "../data/products.json";
import launchesData from "../data/launches.json";
import hairData from "../data/hair.json";
import skinData from "../data/skin.json";
import bestsellersData from "../data/bestsellers.json";
import newLaunchesData from "../data/newlaunches.json";

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const { addToCart: addToCartCtx } = useCart();
  const { wishlistItems, toggleWishlist: toggleWishlistCtx } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const [mainRef, isMainVisible] = useScrollAnimation();
  const [tabsRef, isTabsVisible] = useScrollAnimation();
  const [relatedRef, isRelatedVisible] = useScrollAnimation();

  const hasStructuredSizes = Array.isArray(product?.sizes) && typeof product.sizes[0] === 'object';
  const [selectedSize, setSelectedSize] = useState(hasStructuredSizes ? product.sizes[0] : null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1);
    setActiveTab('description');
    if (hasStructuredSizes) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize(null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-[1100px] mx-auto px-5 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors duration-200"
        >
          Go Home
        </button>
      </div>
    );
  }

  const image = product?.images?.[0] || product?.image || '';
  const description = product?.description || product?.concern || '';
  const price = Number(selectedSize ? selectedSize.price : product?.price) || 0;
  const oldPrice = selectedSize ? selectedSize.oldPrice : product?.oldPrice;

  const isInWishlist = wishlistItems ? wishlistItems.some(item => item.id === product.id) : false;
  const handleWishlistToggle = () => {
    const itemToToggle = {
      id: product.id,
      name: product.name,
      description: description,
      price: price,
      image: image
    };

    if (toggleWishlistCtx) {
      toggleWishlistCtx(itemToToggle);
    } else {
      const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
      const exists = existing.find(item => item.id === product.id);
      let updated;

      if (!exists) {
        updated = [...existing, itemToToggle];
      } else {
        updated = existing.filter(item => item.id !== product.id);
      }

      localStorage.setItem('wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlistChanged'));
    }
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
      quantity: quantity
    };

    if (addToCartCtx) {
      addToCartCtx(itemToAdd, quantity);
    } else {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = existingCart.find(
        item => item.id === product.id && item.size === sizeLabel
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        existingCart.push(itemToAdd);
      }
      localStorage.setItem('cart', JSON.stringify(existingCart));
    }

    navigate('/cart');
  };

  const getRelatedProducts = () => {
    const allData = [
      ...productsData,
      ...launchesData,
      ...hairData,
      ...skinData,
      ...bestsellersData,
      ...newLaunchesData
    ];

    const currentId = String(product.id);
    const filtered = allData.filter(p => String(p.id) !== currentId);
    const prefix = currentId.split('-')[0];
    const samePrefix = filtered.filter(p => String(p.id).startsWith(prefix));

    if (samePrefix.length >= 4) return samePrefix.slice(0, 4);

    const rest = filtered.filter(p => !String(p.id).startsWith(prefix));
    return [...samePrefix, ...rest].slice(0, 4);
  };

  const relatedProducts = getRelatedProducts();

  return (
    <div className="py-10 pb-20">
      <div className="max-w-[1100px] mx-auto px-5">
        <div
          ref={mainRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[50px] transition-all duration-700 ease-out transform ${
            isMainVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
            <img src={image} alt={product.name} className="w-full h-full object-contain p-[30px]" />
          </div>

          <div>
            <h1 className="text-[1.8rem] font-bold text-gray-900 mb-3">{product.name}</h1>
            <p className="text-base text-gray-500 mb-5 leading-normal">{description}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-[1.6rem] font-bold text-gray-900">₹{price}</span>
              {oldPrice && <span className="text-lg text-gray-400 line-through">₹{oldPrice}</span>}
            </div>

            {hasStructuredSizes && (
              <div className="mb-7">
                <p className="text-sm font-semibold text-gray-900 mb-2.5">Size:</p>
                <div className="flex gap-2.5 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size.label}
                      className={`px-[18px] py-2.5 border rounded text-sm cursor-pointer transition-all duration-200 ${
                        selectedSize?.label === size.label
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'border-gray-200 bg-white text-gray-900'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded h-[54px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100 transition-colors rounded-l"
                >
                  −
                </button>
                <span className="w-12 text-center text-base font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100 transition-colors rounded-r"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 py-4 bg-gray-900 text-white rounded text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-gray-800"
                onClick={addToCart}
              >
                Add to Cart — ₹{price * quantity}
              </button>
              <button
                className={`w-[54px] h-[54px] flex items-center justify-center rounded border cursor-pointer text-lg transition-all duration-200 shrink-0 ${
                  isInWishlist
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-200 bg-white text-gray-400'
                }`}
                onClick={handleWishlistToggle}
              >
                <FiHeart className={isInWishlist ? 'fill-red-500 text-red-500' : ''} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={tabsRef}
          className={`mt-16 transition-all duration-700 ease-out transform ${
            isTabsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 px-6 text-sm font-semibold transition-colors ${
                activeTab === 'description'
                  ? 'border-b-2 border-gray-900 text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={`pb-3 px-6 text-sm font-semibold transition-colors ${
                activeTab === 'howToUse'
                  ? 'border-b-2 border-gray-900 text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              How to Use
            </button>
          </div>

          <div className="text-gray-600 leading-relaxed">
            {activeTab === 'description' && (
              <p>{product.longDescription || description}</p>
            )}
            {activeTab === 'howToUse' && (
              <p>{product.howToUse || "Apply to cleansed face and neck. Use morning and evening for best results. Avoid direct contact with eyes."}</p>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div
            ref={relatedRef}
            className={`mt-20 transition-all duration-700 ease-out transform ${
              isRelatedVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((item, index) => {
                const itemPrice =
                  item.price ||
                  item.discountedPrice ||
                  (Array.isArray(item.sizes) && item.sizes[0]?.price) ||
                  0;

                const itemOldPrice =
                  item.oldPrice ||
                  item.originalPrice ||
                  (Array.isArray(item.sizes) && item.sizes[0]?.oldPrice);

                return (
                  <div
                    key={item.id}
                    style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                    className={`cursor-pointer group transition-all duration-700 ease-out transform ${
                      isRelatedVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    onClick={() => navigate('/product', { state: { product: item } })}
                  >
                    <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center overflow-hidden mb-3">
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mb-2">{item.description || item.concern}</p>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">
                        ₹{itemPrice}
                      </span>
                      {itemOldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{itemOldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;