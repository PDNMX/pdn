import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollAnimation = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
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

  useEffect(() => {
    if (isVisible) {
      controls.start( {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          duration: 0.8
        }
      });
    }
  }, [isVisible, controls]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{
            opacity: 0.25,
            scale: 0.9,
            y: 40,
            transition: {
              type: "spring",
              duration: 0.8
            }
          }}
        animate={controls}
        exit={{ opacity: 0, y: 50 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollAnimation;
