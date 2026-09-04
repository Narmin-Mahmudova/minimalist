import { useEffect, useRef, useState } from 'react';

function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); 
        }
      },
      {
        threshold: 0.15, 
        ...options
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

export default useScrollAnimation;