import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiHeart, FiX } from 'react-icons/fi';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function ProductCard({ product, index, isInWishlist, addToWishlist, addToCart, navigate }) {
  const [ref, isVisible] = useScrollAnimation();

  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0;
  const [selectedSize, setSelectedSize] = useState(hasSizes ? product.sizes[0] : null);

  const currentPrice = selectedSize ? selectedSize.price : product.price;
  const currentOldPrice = selectedSize ? selectedSize.oldPrice : product.oldPrice;
  const imageUrl = product.images?.[0] || product.image;

  const handleSizeClick = (e, size) => {
    e.stopPropagation();
    setSelectedSize(size);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize);
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 150}ms` }}
      onClick={() => navigate('/product', { state: { product } })}
      className={`bg-white flex flex-col h-full cursor-pointer transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative bg-gray-200 aspect-[3/4] mb-4 overflow-hidden">
        <button 
          className={`absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full border transition-all duration-200 ${
            isInWishlist(product.id) 
              ? 'text-red-500 border-red-500 bg-red-50' 
              : 'text-gray-400 border-gray-200 hover:text-gray-900'
          }`}
          onClick={(e) => { e.stopPropagation(); addToWishlist(product, currentPrice, imageUrl); }}
        >
          <FiHeart />
        </button>

        {product.badge && (
          <span className="absolute top-4 left-4 bg-gray-900 text-white py-1 px-3 text-[0.7rem] font-semibold rounded-full z-10">
            {product.badge}
          </span>
        )}

        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain p-6 block" 
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-gray-900 mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 mb-2 leading-snug">
          {product.concern || product.description}
        </p>

        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-base font-semibold text-gray-900">
            ₹ {currentPrice}
          </span>
          {currentOldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹ {currentOldPrice}
            </span>
          )}
        </div>

        {hasSizes && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.sizes.map(size => (
              <button 
                key={size.label}
                className={`py-1 px-4 border text-sm cursor-pointer transition-all duration-200 ${
                  selectedSize?.label === size.label 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'border-gray-300 bg-white hover:border-gray-900'
                }`}
                onClick={(e) => handleSizeClick(e, size)}
              >
                {size.label}
              </button>
            ))}
          </div>
        )}

        <button 
          className="w-full py-4 bg-gray-900 text-white border-0 text-sm font-medium cursor-pointer transition-colors duration-300 hover:bg-gray-800 mt-auto"
          onClick={handleCartClick}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ProductListPage({ title, description, products, filters }) {
  const navigate = useNavigate();
  const { addToCart: addToCartCtx } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [headerRef, isHeaderVisible] = useScrollAnimation();
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    category: [], step: [], type: [], concern: [], ingredient: [], availability: []
  });

  const toggleFilter = (group, id) => {
    setActiveFilters(prev => {
      const current = prev[group] || [];
      const updated = current.includes(id)
        ? current.filter(x => x !== id)
        : [...current, id];
      return { ...prev, [group]: updated };
    });
  };

  const addToCart = (product, selectedSize) => {
    const sizeLabel = selectedSize ? selectedSize.label : null;
    const finalPrice = selectedSize ? selectedSize.price : product.price;
    const finalOldPrice = selectedSize ? selectedSize.oldPrice : product.oldPrice;

    addToCartCtx(product, 1, sizeLabel, finalPrice, finalOldPrice);
    navigate('/cart');
  };

  const addToWishlist = (product, price, image) => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      description: product.concern || product.description,
      price: price,
      image: image
    });
  };

  const categories = filters?.categories || [];
  const steps = filters?.steps || [];
  const types = filters?.types || [];
  const concerns = filters?.concerns || [];
  const ingredients = filters?.ingredients || [];
  const availability = filters?.availability || [];

  const filteredProducts = products.filter(product => {
    if (activeFilters.category?.length && !activeFilters.category.includes(product.category)) return false;
    if (activeFilters.step?.length && !activeFilters.step.includes(product.step)) return false;
    if (activeFilters.type?.length && !activeFilters.type.includes(product.type)) return false;

    if (activeFilters.concern?.length) {
      const productConcerns = product.concerns || [];
      if (!activeFilters.concern.some(c => productConcerns.includes(c))) return false;
    }

    if (activeFilters.ingredient?.length) {
      const productIngredients = product.ingredients || [];
      if (!activeFilters.ingredient.some(i => productIngredients.includes(i))) return false;
    }

    if (activeFilters.availability?.length) {
      const wantInStock = activeFilters.availability.includes('in-stock');
      const wantOutStock = activeFilters.availability.includes('out-of-stock');
      if (wantInStock && !wantOutStock && !product.inStock) return false;
      if (wantOutStock && !wantInStock && product.inStock) return false;
    }

    return true;
  });

  const getProductPrice = (p) => Array.isArray(p.sizes) && p.sizes.length > 0 ? p.sizes[0].price : p.price;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical': return a.name.localeCompare(b.name);
      case 'price-low': return getProductPrice(a) - getProductPrice(b);
      case 'price-high': return getProductPrice(b) - getProductPrice(a);
      default: return 0;
    }
  });

  const activeCount = Object.values(activeFilters).flat().length;

  const SortSection = () => (
    <div className="mb-8 pb-6 border-b border-gray-200">
      <label className="block text-sm text-gray-500 mb-2">Sort by:</label>
      <select 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full py-3 px-3 border border-gray-300 text-sm bg-white cursor-pointer"
      >
        <option value="featured">Featured</option>
        <option value="alphabetical">Alphabetically, A-Z</option>
        <option value="price-low">Price, Low to High</option>
        <option value="price-high">Price, High to Low</option>
      </select>
    </div>
  );

  const renderFilterGroup = (title, items, groupKey) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-900 mb-4">{title}</h4>
        {items.map(item => (
          <button 
            key={item.id}
            className={`block w-full py-2 pl-5 bg-transparent border-0 text-left text-sm cursor-pointer transition-colors duration-200 relative hover:text-gray-900 ${
              activeFilters[groupKey]?.includes(item.id) 
                ? 'text-gray-900 font-semibold before:content-["✓"] before:absolute before:left-0 before:text-gray-900' 
                : 'text-gray-500'
            }`}
            onClick={() => toggleFilter(groupKey, item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  };

  const FilterSections = () => (
    <>
      {renderFilterGroup("Category", categories, "category")}
      {renderFilterGroup("Step", steps, "step")}
      {renderFilterGroup("Type of Product", types, "type")}
      {renderFilterGroup("Concern", concerns, "concern")}
      {renderFilterGroup("Ingredient", ingredients, "ingredient")}
      {renderFilterGroup("Availability", availability, "availability")}
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      <div 
        ref={headerRef} 
        className={`py-12 border-b border-gray-200 text-center transition-all duration-700 transform ${
          isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-base text-gray-500 max-w-3xl mx-auto mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 py-4 md:py-8">
          <aside className="w-[250px] shrink-0 hidden md:block">
            <SortSection />
            <FilterSections />
          </aside>

          <div className="flex-1">
            <div className="flex md:hidden items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
              <div className="flex-1">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm bg-white cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="alphabetical">Alphabetically, A-Z</option>
                  <option value="price-low">Price, Low to High</option>
                  <option value="price-high">Price, High to Low</option>
                </select>
              </div>
              <button 
                className="flex items-center gap-2 py-3 px-4 border border-gray-200 rounded-lg bg-white text-sm text-gray-900 cursor-pointer font-medium whitespace-nowrap"
                onClick={() => setFilterOpen(true)}
              >
                <span>Filter ({activeCount})</span>
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-6">Showing {sortedProducts.length} products</p>

            {filterOpen && (
              <>
                <div className="fixed inset-0 bg-black/40 z-[1001]" onClick={() => setFilterOpen(false)} />
                <div className="fixed top-0 right-0 h-full w-80 bg-white z-[1002] flex flex-col">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 m-0">Filters</h3>
                    <button className="bg-transparent border-0 cursor-pointer text-gray-500" onClick={() => setFilterOpen(false)}>
                      <FiX size={24} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <SortSection />
                    <FilterSections />
                  </div>
                  <div className="flex gap-4 px-6 py-4 border-t border-gray-200">
                    <button 
                      className="flex-1 py-3.5 rounded-md text-sm font-medium bg-white border border-gray-900 text-gray-900"
                      onClick={() => setActiveFilters({ category: [], step: [], type: [], concern: [], ingredient: [], availability: [] })}
                    >
                      Clear All
                    </button>
                    <button 
                      className="flex-1 py-3.5 rounded-md text-sm font-medium bg-gray-900 text-white"
                      onClick={() => setFilterOpen(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isInWishlist={isInWishlist}
                  addToWishlist={addToWishlist}
                  addToCart={addToCart}
                  navigate={navigate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;