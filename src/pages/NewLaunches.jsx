import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiX } from 'react-icons/fi';
import filtersData from '../data/filters.json';
import productsData from '../data/newlaunches.json';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function ProductCard({ product, index, isInWishlist, addToWishlist, addToCart, navigate }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 150}ms` }}
      className={`bg-white flex flex-col h-full cursor-pointer transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onClick={() => navigate('/product', { state: { product } })}
    >
      <div className="relative bg-gray-200 aspect-[3/4] mb-4 overflow-hidden">
        <button
          className={`absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full border transition-all duration-200 ${
            isInWishlist(product.id)
              ? 'text-red-500 border-red-500 bg-red-50'
              : 'text-gray-400 border-gray-200 hover:text-gray-900'
          }`}
          onClick={(e) => { e.stopPropagation(); addToWishlist(product); }}
        >
          <FiHeart />
        </button>
        {product.badge && (
          <span className="absolute top-4 right-16 bg-gray-900 text-white py-1 px-3 text-[0.7rem] font-semibold rounded-full z-10">
            {product.badge}
          </span>
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain p-6 block"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-base font-semibold text-gray-900 mb-1 leading-tight">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-2 leading-snug">{product.description}</p>

        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-base font-semibold text-gray-900">₹ {product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹ {product.oldPrice}</span>
        </div>

        <button
          className="w-full py-4 bg-gray-900 text-white border-0 text-sm font-medium cursor-pointer transition-colors duration-300 hover:bg-gray-800 mt-auto"
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function NewLaunches() {
  const navigate = useNavigate();
  const { addToCart: addToCartCtx } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [headerRef, isHeaderVisible] = useScrollAnimation();
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    category: [],
    step: [],
    type: [],
    concern: [],
    ingredient: [],
    availability: []
  });

  const toggleFilter = (group, id) => {
    setActiveFilters(prev => {
      const current = prev[group];
      const updated = current.includes(id)
        ? current.filter(x => x !== id)
        : [...current, id];
      return { ...prev, [group]: updated };
    });
  };

  const addToCart = (product) => {
    addToCartCtx(product, 1);
    navigate('/cart');
  };

  const addToWishlist = (product) => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.images[0]
    });
  };

  const { categories, steps, types, concerns, ingredients, availability } = filtersData.newlaunches;
  const products = productsData;

  const filteredProducts = products.filter(product => {
    if (activeFilters.category.length && !activeFilters.category.includes(product.category)) return false;
    if (activeFilters.step.length && !activeFilters.step.includes(product.step)) return false;
    if (activeFilters.type.length && !activeFilters.type.includes(product.type)) return false;

    if (activeFilters.concern.length) {
      const productConcerns = product.concerns || [];
      if (!activeFilters.concern.some(c => productConcerns.includes(c))) return false;
    }

    if (activeFilters.ingredient.length) {
      const productIngredients = product.ingredients || [];
      if (!activeFilters.ingredient.some(i => productIngredients.includes(i))) return false;
    }

    if (activeFilters.availability.length) {
      const wantInStock = activeFilters.availability.includes('in-stock');
      const wantOutStock = activeFilters.availability.includes('out-of-stock');
      if (wantInStock && !wantOutStock && !product.inStock) return false;
      if (wantOutStock && !wantInStock && product.inStock) return false;
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
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

  const FilterSections = () => (
    <>
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Category</h4>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`block w-full py-2 pl-5 bg-transparent border-0 text-left text-sm cursor-pointer transition-colors duration-200 relative hover:text-gray-900 ${
              activeFilters.category.includes(cat.id)
                ? 'text-gray-900 font-semibold before:content-["✓"] before:absolute before:left-0 before:text-gray-900'
                : 'text-gray-500'
            }`}
            onClick={() => toggleFilter('category', cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Step</h4>
        {steps.map(step => (
          <button
            key={step.id}
            className={`block w-full py-2 pl-5 bg-transparent border-0 text-left text-sm cursor-pointer transition-colors duration-200 relative hover:text-gray-900 ${
              activeFilters.step.includes(step.id)
                ? 'text-gray-900 font-semibold before:content-["✓"] before:absolute before:left-0 before:text-gray-900'
                : 'text-gray-500'
            }`}
            onClick={() => toggleFilter('step', step.id)}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Type of Product</h4>
        {types.map(type => (
          <button
            key={type.id}
            className={`block w-full py-2 pl-5 bg-transparent border-0 text-left text-sm cursor-pointer transition-colors duration-200 relative hover:text-gray-900 ${
              activeFilters.type.includes(type.id)
                ? 'text-gray-900 font-semibold before:content-["✓"] before:absolute before:left-0 before:text-gray-900'
                : 'text-gray-500'
            }`}
            onClick={() => toggleFilter('type', type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Concern</h4>
        {concerns.map(concern => (
          <button
            key={concern.id}
            className={`block w-full py-2 pl-5 bg-transparent border-0 text-left text-sm cursor-pointer transition-colors duration-200 relative hover:text-gray-900 ${
              activeFilters.concern.includes(concern.id)
                ? 'text-gray-900 font-semibold before:content-["✓"] before:absolute before:left-0 before:text-gray-900'
                : 'text-gray-500'
            }`}
            onClick={() => toggleFilter('concern', concern.id)}
          >
            {concern.label}
          </button>
        ))}
      </div>

      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Ingredient</h4>
        {ingredients.map(ingredient => (
          <button
            key={ingredient.id}
            className={`block w-full py-2 pl-5 bg-transparent border-0 text-left text-sm cursor-pointer transition-colors duration-200 relative hover:text-gray-900 ${
              activeFilters.ingredient.includes(ingredient.id)
                ? 'text-gray-900 font-semibold before:content-["✓"] before:absolute before:left-0 before:text-gray-900'
                : 'text-gray-500'
            }`}
            onClick={() => toggleFilter('ingredient', ingredient.id)}
          >
            {ingredient.label}
          </button>
        ))}
      </div>

      <div className="mb-8 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Availability</h4>
        {availability.map(item => (
          <button
            key={item.id}
            className={`block w-full py-2 pl-5 bg-transparent border-0 text-left text-sm cursor-pointer transition-colors duration-200 relative hover:text-gray-900 ${
              activeFilters.availability.includes(item.id)
                ? 'text-gray-900 font-semibold before:content-["✓"] before:absolute before:left-0 before:text-gray-900'
                : 'text-gray-500'
            }`}
            onClick={() => toggleFilter('availability', item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white">

      <div
        ref={headerRef}
        className={`py-8 border-b border-gray-200 text-center transition-all duration-700 transform ${
          isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-3xl font-bold text-gray-900">New Launches</h1>
          <p className="text-base text-gray-500 max-w-3xl mx-auto mt-2 leading-relaxed">Check our new product launches</p>
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
                <span>Sort ({activeCount})</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14"/>
                  <line x1="4" y1="10" x2="4" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12" y2="3"/>
                  <line x1="20" y1="21" x2="20" y2="16"/>
                  <line x1="20" y1="12" x2="20" y2="3"/>
                  <line x1="1" y1="14" x2="7" y2="14"/>
                  <line x1="9" y1="8" x2="15" y2="8"/>
                  <line x1="17" y1="16" x2="23" y2="16"/>
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-6">Showing {sortedProducts.length} products</p>

            {filterOpen && (
              <>
                <style>{`
                  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                  @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
                `}</style>
                <div
                  className="fixed inset-0 bg-black/40 z-[1001] animate-[fadeIn_0.3s_ease]"
                  onClick={() => setFilterOpen(false)}
                />
                <div className="fixed top-0 right-0 h-full w-80 bg-white z-[1002] flex flex-col animate-[slideInRight_0.35s_cubic-bezier(0.4,0,0.2,1)]">
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 m-0">Filters</h3>
                    <button
                      className="bg-transparent border-0 cursor-pointer text-gray-500 flex items-center justify-center p-1"
                      onClick={() => setFilterOpen(false)}
                    >
                      <FiX size={24} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <SortSection />
                    <FilterSections />
                  </div>
                  <div className="flex gap-4 px-6 py-4 border-t border-gray-200">
                    <button
                      className="flex-1 py-3.5 rounded-md text-sm font-medium cursor-pointer bg-white border border-gray-900 text-gray-900"
                      onClick={() => setActiveFilters({
                        category: [], step: [], type: [], concern: [], ingredient: [], availability: []
                      })}
                    >
                      Clear All
                    </button>
                    <button
                      className="flex-1 py-3.5 rounded-md text-sm font-medium cursor-pointer bg-gray-900 border border-gray-900 text-white"
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

export default NewLaunches;