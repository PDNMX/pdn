import { useEffect, useRef, useState } from 'react';

const ScrollAnimation = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.6, // Change this threshold as per your needs
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      <div
        style={{
          opacity: isVisible ? 1 : 0.25,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
          transition: 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollAnimation;
