import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  suffix?: string;
  separator?: string;
  incrementInterval?: { min: number; max: number };
}

export const useCountUp = ({ 
  end, 
  duration = 2000, 
  start = 0,
  suffix = '',
  separator = ',',
  incrementInterval
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showIncrement, setShowIncrement] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const startTime = Date.now();
          const endTime = startTime + duration;
          
          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const currentCount = Math.floor(start + (end - start) * easeOutQuart);
            setCount(currentCount);
            
            if (now < endTime) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = countRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [end, duration, start, hasAnimated]);

  // Continue incrementing after reaching target
  useEffect(() => {
    if (!hasAnimated || !incrementInterval) return;

    const scheduleNextIncrement = () => {
      const randomDelay = Math.random() * (incrementInterval.max - incrementInterval.min) + incrementInterval.min;
      
      return setTimeout(() => {
        setCount(prev => prev + 1);
      }, randomDelay);
    };

    // Wait for initial animation to complete before starting increments
    const initialDelay = setTimeout(() => {
      const timeoutId = scheduleNextIncrement();
      
      return () => clearTimeout(timeoutId);
    }, duration + 1000);

    return () => clearTimeout(initialDelay);
  }, [hasAnimated, duration, incrementInterval]);

  // Set up recurring increments
  useEffect(() => {
    if (!hasAnimated || !incrementInterval || count < end || showIncrement) return;

    const scheduleNextIncrement = () => {
      const randomDelay = Math.random() * (incrementInterval.max - incrementInterval.min) + incrementInterval.min;
      
      return setTimeout(() => {
        console.log('Counter incrementing, showing notification');
        setCount(prev => prev + 1);
        setShowIncrement(true);
        setTimeout(() => setShowIncrement(false), 16000);
      }, randomDelay);
    };

    const timeoutId = scheduleNextIncrement();

    return () => clearTimeout(timeoutId);
  }, [count, hasAnimated, end, incrementInterval, showIncrement]);

  const formattedCount = count.toLocaleString('en-US').replace(/,/g, separator);
  
  return { 
    count, 
    formattedCount: `${formattedCount}${suffix}`,
    countRef,
    showIncrement
  };
};
