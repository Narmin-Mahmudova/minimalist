import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Səhifəni ən yuxarı çəkir
  }, [pathname]); // Hər dəfə pathname (səhifə ünvanı) dəyişəndə işə düşür

  return null; // Bu komponent ekrana heç nə render etmir
}

export default ScrollToTop;