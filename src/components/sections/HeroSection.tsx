import chat1 from "@/assets/chat1.jpg";
import chat2 from "@/assets/chat2.jpeg";
import chat3 from "@/assets/chat3.png";
import heroMascotVid from "@/assets/hero_mascot_vid.mp4";
import MessageBubble from "@/components/MessageBubble";
import ContactUs from "@/components/ContactUs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const HeroSection = () => {
  const [isIphone, setIsIphone] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const chatImages = useMemo(() => {
    const baseImages = [chat1, chat2, chat3];
    // Always use same count for consistent width calculations
    const repeatCount = 3;
    return Array.from({ length: repeatCount }, () => baseImages).flat();
  }, []);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const updateShiftRef = useRef<() => void>(() => {});

  const updateShift = useCallback(() => {
    if (!trackRef.current || !groupRef.current) {
      return;
    }

    const width = groupRef.current.scrollWidth || groupRef.current.getBoundingClientRect().width;
    if (!width) {
      return;
    }

    const speed = 35;
    const duration = width / speed;
    trackRef.current.style.setProperty("--carousel-duration", `${duration}s`);
    trackRef.current.style.setProperty("--carousel-width", `${width}px`);
  }, []);

  updateShiftRef.current = updateShift;

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
      setIsIphone(isIOS);

      // Detect RTL
      const direction = document.documentElement.dir || document.body.dir || 
                       getComputedStyle(document.documentElement).direction;
      setIsRTL(direction === 'rtl');

      // Set appropriate CSS animation based on direction
      if (trackRef.current) {
        const animationName = direction === 'rtl' ? 'carousel-scroll-rtl' : 'carousel-scroll-ltr';
        trackRef.current.style.animationName = animationName;
      }
    }

    updateShift();
    window.addEventListener("resize", updateShift);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && groupRef.current) {
      resizeObserver = new ResizeObserver(() => updateShift());
      resizeObserver.observe(groupRef.current);
    }

    const retryId = window.setTimeout(updateShift, 300);

    return () => {
      window.removeEventListener("resize", updateShift);
      resizeObserver?.disconnect();
      window.clearTimeout(retryId);
    };
  }, [updateShift]);

  // Intersection Observer to start animation only when visible
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Start when 10% visible
        rootMargin: '0px'
      }
    );

    observer.observe(carouselRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="hero-section relative overflow-hidden py-20">
      <div className=" text-center relative z-10">
        <div className="flex justify-center mb-8">
          <div className="hero-mascot-glow">
            <video
              src={heroMascotVid}
              autoPlay
              muted
              loop
              playsInline
              className="w-40 h-40 rounded-full object-cover animate-pop-in"
            />
          </div>
        </div>
        <MessageBubble className="mb-4">
          <h1 className="text-md md:text-4xl font-bold leading-tight text-primary cyber-glow">
           לא ענית לשיחה? הלקוח לא נעלם
          </h1>
        </MessageBubble>
        <MessageBubble className="max-w-[100%] w-full md:w-4/5">
          <p className="text-md md:text-xl leading-relaxed text-foreground">
           פורלי העוזרת האישית שלך דואגת ללקוח באופן אישי, מקבלת ממנו פרטים ושולחת לך סיכום מסודר מבלי לבזבז זמן. 
          </p>
        </MessageBubble>

        <div className="carousel gap-4" ref={carouselRef}>
          <div 
            className="carousel-track gap-2" 
            ref={trackRef}
            style={{ animationPlayState: isVisible ? 'running' : 'paused' }}
          >
            <div className="carousel-group" ref={groupRef}>
              {chatImages.map((image, index) => (
                <div key={`group1-${index}`} className="chat-card">
                  <img src={image} alt="דוגמת שיחה מהבוט" onLoad={() => updateShiftRef.current()} />
                </div>
              ))}
            </div>
            <div className="carousel-group" aria-hidden="true">
              {chatImages.map((image, index) => (
                <div key={`group2-${index}`} className="chat-card">
                  <img src={image} alt="דוגמת שיחה מהבוט" onLoad={() => updateShiftRef.current()} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ContactUs showWhatsAppOption={true} />
      </div>
    </section>
  );
};

export default HeroSection;
