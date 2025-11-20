import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  suffix?: string;
  separator?: string;
}

export const useCountUp = ({ 
  end, 
  duration = 2000, 
  start = 0,
  suffix = '',
  separator = ','
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
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

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [end, duration, start, hasAnimated]);

  // Continue incrementing after reaching target
  useEffect(() => {
    if (!hasAnimated) return;

    const scheduleNextIncrement = () => {
      // Random interval between 30 seconds and 3 minutes (30000ms to 180000ms)
      const randomDelay = Math.random() * (180000 - 30000) + 30000;
      
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
  }, [hasAnimated, duration]);

  // Set up recurring increments
  useEffect(() => {
    if (!hasAnimated || count < end) return;

    const scheduleNextIncrement = () => {
      const randomDelay = Math.random() * (180000 - 30000) + 30000;
      
      return setTimeout(() => {
        setCount(prev => prev + 1);
      }, randomDelay);
    };

    const timeoutId = scheduleNextIncrement();

    return () => clearTimeout(timeoutId);
  }, [count, hasAnimated, end]);

  const formattedCount = count.toLocaleString('en-US').replace(/,/g, separator);
  
  return { 
    count, 
    formattedCount: `${formattedCount}${suffix}`,
    countRef 
  };
};
