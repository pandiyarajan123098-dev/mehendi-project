import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Cart State with LocalStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('rivaaz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rivaaz_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectAfter, setAuthRedirectAfter] = useState(null); // 'checkout' or null
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState(null);

  // Selected Service for booking form pre-fill
  const [prefilledService, setPrefilledService] = useState('Bridal Mehendi');

  // Toasts
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1B3627', '#C5A880', '#D4AF37', '#FAF7F2']
    });
  };

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('rivaaz_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync User to LocalStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('rivaaz_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('rivaaz_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added ${quantity} × ${product.name} to cart`);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeDeliveryThreshold = 500;
  const deliveryCharge = cartSubtotal === 0 || cartSubtotal >= freeDeliveryThreshold ? 0 : 50;
  const cartTotal = cartSubtotal + deliveryCharge;
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Auth Operations
  const login = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${userData.name}!`);
    if (authRedirectAfter === 'checkout') {
      setIsCheckoutOpen(true);
      setAuthRedirectAfter(null);
    }
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  // Checkout flow trigger: enforces "Account-required checkout" as shown in screenshot!
  const startCheckout = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }
    setIsCartOpen(false);
    if (!user) {
      setAuthRedirectAfter('checkout');
      setIsAuthModalOpen(true);
      showToast('Please sign in or create an account to proceed with checkout', 'info');
    } else {
      setIsCheckoutOpen(true);
    }
  };

  // Scroll to booking form helper
  const scrollToBooking = (serviceType = 'Bridal Mehendi') => {
    if (serviceType) {
      setPrefilledService(serviceType);
    }
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openClassModal = (course) => {
    setSelectedClass(course);
    setIsClassModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        deliveryCharge,
        cartTotal,
        cartItemCount,
        freeDeliveryThreshold,

        user,
        login,
        logout,

        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        selectedClass,
        setSelectedClass,
        isClassModalOpen,
        setIsClassModalOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        lastConfirmedOrder,
        setLastConfirmedOrder,

        prefilledService,
        setPrefilledService,
        scrollToBooking,
        openClassModal,
        startCheckout,

        toast,
        showToast,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
