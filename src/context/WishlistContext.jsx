import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WishlistContext = createContext();

const getUserKey = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user?.email ? user.email.toLowerCase() : 'guest';
};

const loadWishlist = () => {
  try {
    const saved = localStorage.getItem(`wishlist_${getUserKey()}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem(`wishlist_${getUserKey()}`, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const reloadWishlist = useCallback(() => {
    setWishlistItems(loadWishlist());
  }, []);

  useEffect(() => {
    window.addEventListener('userChanged', reloadWishlist);
    return () => window.removeEventListener('userChanged', reloadWishlist);
  }, [reloadWishlist]);

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlistItems.some(item => item.id === id);
  const clearWishlist = () => setWishlistItems([]);

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount: wishlistItems.length,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
      reloadWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);