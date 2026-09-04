import { FiSearch, FiShoppingCart, FiHeart, FiX, FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.webp';
import searchIndex from '../data/searchIndex';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const buildQuery = (params) => new URLSearchParams(params).toString();

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem('currentUser')) || null;
      setCurrentUser(user);
    };
    updateUser();
    window.addEventListener('userChanged', updateUser);
    return () => window.removeEventListener('userChanged', updateUser);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const searchResults = searchQuery.trim().length > 0
    ? searchIndex.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setUserMenuOpen(false);
    window.dispatchEvent(new Event('userChanged'));
  };

  const handleResultClick = (product) => {
    closeSearch();
    navigate('/product', { state: { product } });
  };

  const navLinks = [
    {
      path: '/shop',
      label: 'Shop',
      type: 'grid',
      dropdown: [
        {
          label: 'Skin & Body',
          image: '/images/collection1.avif',
          path: '/skin-care'
        },
        {
          label: 'Hair',
          image: '/images/collection3.avif',
          path: '/hair-care'
        },
        {
          label: 'Lip',
          image: '/images/collection4.avif',
          path: '/lip'
        },
        {
          label: 'New Launches',
          image: '/images/collection5.avif',
          path: '/new-launches'
        }
      ]
    },
    {
      path: '/best-sellers',
      label: 'Best Sellers',
      dropdown: [
        {
          title: 'Best Sellers',
          items: [
            {
              label: 'Salicylic Acid + LHA 2% Cleanser',
              to: '/product',
              state: { product: searchIndex.find(p => p.name.includes('Salicylic Acid + LHA 2%')) || searchIndex[0] }
            },
            {
              label: 'SPF 50 Sunscreen',
              to: '/product',
              state: { product: searchIndex.find(p => p.name.includes('SPF 50')) }
            },
            {
              label: 'Vitamin B5 10% Moisturizer',
              to: '/product',
              state: { product: searchIndex.find(p => p.name.includes('Vitamin B5')) }
            },
            {
              label: 'Niacinamide 10% Face Serum',
              to: '/product',
              state: { product: searchIndex.find(p => p.name.includes('Niacinamide 10%')) }
            },
            {
              label: 'Vitamin C 10% Face Serum',
              to: '/product',
              state: { product: searchIndex.find(p => p.name.includes('Vitamin C 10%')) }
            },
            {
              label: 'Salicylic Acid 2% Face Serum',
              to: '/product',
              state: { product: searchIndex.find(p => p.name.includes('Salicylic Acid 2%')) }
            }
          ]
        }
      ]
    },
    {
      path: '/skin-care',
      label: 'Skin & Body Care',
      dropdown: [
        {
          title: 'Shop by Concern',
          items: [
            { label: 'Acne', query: { concern: 'Acne' } },
            { label: 'Aging', query: { concern: 'Aging' } },
            { label: 'Dryness', query: { concern: 'Dryness' } },
            { label: 'Oiliness', query: { concern: 'Oiliness' } }
          ]
        },
        {
          title: 'Shop by Ingredients',
          items: [
            { label: 'Vitamin C', query: { ingredient: 'Vitamin C' } },
            { label: 'Niacinamide', query: { ingredient: 'Niacinamide' } },
            { label: 'Retinol', query: { ingredient: 'Retinol' } },
            { label: 'Hyaluronic Acid', query: { ingredient: 'Hyaluronic Acid' } }
          ]
        },
        {
          title: 'Shop by Step',
          items: [
            { label: 'Cleanse', query: { step: 'Cleanse' } },
            { label: 'Tone', query: { step: 'Tone' } },
            { label: 'Treat', query: { step: 'Treat' } },
            { label: 'Moisturize', query: { step: 'Moisturize' } }
          ]
        }
      ]
    },
    {
      path: '/baby-care',
      label: 'Baby Care',
      dropdown: [
        {
          title: 'Baby Care',
          items: [
            {
              label: 'Baby Wash', to: '/product', state: { product: searchIndex.find(p => p.id === 'babycare-1') }
            },
            {
              label: 'Baby Lotion', to: '/product', state: { product: searchIndex.find(p => p.id === 'babycare-2') }
            },
            {
              label: 'Baby Oil', to: '/product', state: { product: searchIndex.find(p => p.id === 'babycare-4') }
            },
            {
              label: 'Baby Sunscreen', to: '/product', state: { product: searchIndex.find(p => p.id === 'babycare-3') }
            }
          ]
        }
      ]
    },
    {
      path: '/hair-care',
      label: 'Hair Care',
      dropdown: [
        {
          title: 'Shop by Concern',
          items: [
            { label: 'Hair Fall', query: { concern: 'Hair Fall' } },
            { label: 'Damaged Hair', query: { concern: 'Damaged Hair' } },
            { label: 'Dandruff', query: { concern: 'Dandruff' } },
            { label: 'Frizzy Hair', query: { concern: 'Frizzy Hair' } }
          ]
        },
        {
          title: 'Shop by Ingredients',
          items: [
            { label: 'Capixyl', query: { ingredient: 'Capixyl' } },
            { label: 'Maleic Acid', query: { ingredient: 'Maleic Acid' } },
            { label: 'Peptide', query: { ingredient: 'Peptide' } },
            { label: 'Carnitine', query: { ingredient: 'Carnitine' } }
          ]
        },
        {
          title: 'Hair',
          items: [
            { label: 'Treat', query: { step: 'Treat' } },
            { label: 'Shampoo', query: { step: 'Shampoo' } },
            { label: 'Mask', query: { step: 'Mask' } }
          ]
        }
      ]
    },
    {
      path: '/ai-assistants',
      label: 'AI Assistants',
      dropdown: null
    }
  ];

  const buildItemProps = (item, parentPath) => {
    if (item.to) {
      return { to: item.to, state: item.state || undefined };
    }
    if (item.query) {
      return { to: `${parentPath}?${buildQuery(item.query)}` };
    }
    return null;
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 z-[1000]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="block">
          <img src={logo} alt="MINIMALIST" className="h-6 md:h-7 w-auto block" />
        </Link>

        <nav className="hidden md:flex gap-7">
          {navLinks.map((link) => (
            <div
              key={link.path}
              className="relative py-4"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.path)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.path}
                className="no-underline text-gray-800 text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-200 hover:text-gray-500"
              >
                {link.label}
              </Link>

              {link.dropdown && activeDropdown === link.path && (
                link.type === 'grid' ? (
                  /* Shop Dropdown */
                  <div className="absolute top-full -left-20 min-w-[760px] bg-white border border-gray-200 border-t-2 border-t-ink p-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-[1001]">
                    <div className="grid grid-cols-4 gap-6">
                      {link.dropdown.map((card, idx) => (
                        <Link
                          key={idx}
                          to={card.path}
                          onClick={() => setActiveDropdown(null)}
                          className="group block text-center cursor-pointer relative z-10"
                        >
                          <div className="bg-[#EAEAEA] rounded-lg aspect-[4/5] flex items-center justify-center overflow-hidden mb-3 p-4 transition-transform duration-300 group-hover:scale-[1.02]">
                            <img
                              src={card.image}
                              alt={card.label}
                              className="w-full h-full object-contain pointer-events-none"
                            />
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:underline">
                            {card.label}
                          </h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Standart Siyahı Dropdown-lar */
                  <div className="absolute top-full left-1/2 -translate-x-1/2 flex gap-12 bg-white border border-gray-200 border-t-2 border-t-ink px-8 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-[1001] w-max">
                    {link.dropdown.map((section, index) => (
                      <div key={index}>
                        <Link to={link.path} onClick={() => setActiveDropdown(null)}>
                          <h4 className="text-xs font-bold text-ink uppercase tracking-widest mb-5 whitespace-nowrap">
                            {section.title}
                          </h4>
                        </Link>
                        <ul className="list-none p-0 m-0">
                          {section.items.map((item, i) => {
                            const linkProps = buildItemProps(item, link.path);
                            return (
                              <li key={i} className="mb-3">
                                {linkProps ? (
                                  <Link
                                    to={linkProps.to}
                                    state={linkProps.state}
                                    onClick={() => setActiveDropdown(null)}
                                    className="text-gray-500 text-sm whitespace-nowrap hover:text-gray-900 transition-colors duration-150"
                                  >
                                    {item.label}
                                  </Link>
                                ) : (
                                  <span className="text-gray-500 text-sm whitespace-nowrap cursor-default">
                                    {item.label}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <div className="relative hidden md:block">
            {currentUser ? (
              <>
                <button
                  className="w-8 h-8 rounded-full bg-ink text-white text-sm font-semibold flex items-center justify-center"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </button>

                {userMenuOpen && (
                  <div className="absolute top-[calc(100%+12px)] right-0 bg-white w-[220px] rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-gray-100 z-[1500] overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-ink truncate">{currentUser.name}</p>
                      <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut /> Log out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="w-8 h-8 flex items-center justify-center text-gray-800">
                <FiUser className="w-5 h-5 stroke-2" />
              </Link>
            )}
          </div>

          <Link to="/wishlist" className="relative w-8 h-8 flex items-center justify-center text-gray-800">
            <FiHeart className="w-5 h-5 stroke-2" />
            <span className="absolute -top-0.5 -right-0.5 bg-ink text-white text-[0.6rem] w-4 h-4 min-w-4 max-w-4 rounded-full flex items-center justify-center font-bold leading-none">
              {wishlistCount}
            </span>
          </Link>

          <div className="relative">
            <button
              className="w-8 h-8 flex items-center justify-center text-gray-800"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch className="w-5 h-5 stroke-2" />
            </button>

            {searchOpen && (
              <div className="absolute top-[calc(100%+12px)] right-0 bg-white w-[340px] max-md:fixed max-md:top-[70px] max-md:left-0 max-md:right-0 max-md:w-full rounded-lg md:rounded-lg max-md:rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.15)] max-md:shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-gray-100 max-md:border-l-0 max-md:border-r-0 z-[1500] overflow-hidden">
                <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-gray-100">
                  <FiSearch className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="flex-1 border-none outline-none text-sm py-1"
                  />
                  <button className="text-gray-400 flex items-center p-0.5 hover:text-ink" onClick={closeSearch}>
                    <FiX />
                  </button>
                </div>

                {searchQuery.trim().length > 0 && (
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map(product => (
                        <div
                          key={product.id}
                          className="flex items-center gap-2.5 px-3.5 py-2 cursor-pointer transition-colors duration-150 hover:bg-gray-100"
                          onClick={() => handleResultClick(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-[38px] h-[38px] object-contain bg-gray-100 rounded flex-shrink-0"
                          />
                          <span className="text-sm text-ink">{product.name}</span>
                        </div>
                      ))
                    ) : (
                      <p className="p-4 text-center text-gray-400 text-sm">No products found</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/cart" className="relative w-8 h-8 flex items-center justify-center text-gray-800">
            <FiShoppingCart className="w-5 h-5 stroke-2" />
            <span className="absolute -top-0.5 -right-0.5 bg-ink text-white text-[0.6rem] w-4 h-4 min-w-4 max-w-4 rounded-full flex items-center justify-center font-bold leading-none">
              {cartCount}
            </span>
          </Link>

          <button
            className="hidden max-md:flex w-8 h-8 items-center justify-center text-gray-800"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 transition-all duration-300 z-[1001] ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 w-[280px] h-screen bg-white transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] z-[1002] flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-ink m-0">Menu</h3>
          <button
            className="w-8 h-8 flex items-center justify-center text-gray-500"
            onClick={() => setMenuOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        {currentUser ? (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-ink text-white text-sm font-semibold flex items-center justify-center flex-shrink-0">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{currentUser.name}</p>
                <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
              </div>
            </div>
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="text-red-500 flex-shrink-0"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 no-underline text-ink"
          >
            <FiUser size={20} />
            <span className="text-sm font-medium">Log in / Sign up</span>
          </Link>
        )}

        <nav className="flex flex-col py-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="no-underline text-ink text-base font-medium px-6 py-4 border-b border-gray-100 transition-colors duration-200 hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;