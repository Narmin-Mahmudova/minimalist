import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

const getUserKey = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user?.email ? user.email.toLowerCase() : 'guest';
};

const loadCart = () => {
  try {
    const saved = localStorage.getItem(`cart_${getUserKey()}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(`cart_${getUserKey()}`, JSON.stringify(cartItems));
  }, [cartItems]);

  const reloadCart = useCallback(() => {
    setCartItems(loadCart());
  }, []);

  useEffect(() => {
    window.addEventListener('userChanged', reloadCart);
    return () => window.removeEventListener('userChanged', reloadCart);
  }, [reloadCart]);

  const addToCart = (product, qty = 1, sizeLabel = null, priceOverride = null, oldPriceOverride = null) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === sizeLabel);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        description: product.description || product.concern,
        price: priceOverride ?? product.price,
        oldPrice: oldPriceOverride ?? product.oldPrice,
        size: sizeLabel,
        image: product.images ? product.images[0] : product.image,
        quantity: qty
      }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount: cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0),
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      reloadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);