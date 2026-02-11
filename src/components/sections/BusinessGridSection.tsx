import { useEffect, useMemo, useRef, useState } from "react";

const HIGHLIGHT_BUSINESS = "Call4li";
const businessTypes = [
  "עורכי דין", "רואי חשבון", "קליניקות", "מתווכים",
  "מאמנים אישיים", "יועצים עסקיים", "פסיכולוגים", "אדריכלים",
  "קוסמטיקאיות", "מספרות", "מוסכים", "טכנאים",
  "סוכני ביטוח", "צלמים", "מעצבים גרפיים", "וטרינרים",
  "רופאי שיניים", "פיזיותרפיסטים", "קבלנים", "חשמלאים",
  "אינסטלטורים", "שפים פרטיים", "מורי נהיגה",
  "מפתחי אתרים", "יועצי משכנתאות", "תזונאים", "מנעולנים",
  "מדבירים", "חברות ניקיון", "שירותי קייטרינג", "מפיקי אירועים",
  "סדנאות", "חוגים", "מרפאות", "משרדי נסיעות",
  "חנויות בוטיק", "מאפיות",
];

const shuffledBusinesses = [...businessTypes]
  .filter((business) => business !== HIGHLIGHT_BUSINESS)
  .sort(() => Math.random() - 0.5);

const orderedBusinesses = [
  ...shuffledBusinesses.slice(0, 8),
  ...shuffledBusinesses.slice(8),
];

const gridItems = orderedBusinesses.map((business) => ({
  content: business,
  isSpecial: business === HIGHLIGHT_BUSINESS,
}));

const BusinessGridSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(max-width: 640px)");
    const updateMatch = () => setIsMobile(media.matches);
    updateMatch();

    if (media.addEventListener) {
      media.addEventListener("change", updateMatch);
    } else {
      media.addListener(updateMatch);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", updateMatch);
      } else {
        media.removeListener(updateMatch);
      }
    };
  }, []);

  const visibleItems = useMemo(() => {
    if (!isMobile) {
      return gridItems;
    }

    return gridItems.slice(0, Math.ceil(gridItems.length / 2));
  }, [isMobile]);
  const visibleItems2 = useMemo(() => {
    if (!isMobile) {
      return gridItems;
    }

    return gridItems.slice( Math.ceil(gridItems.length / 2));
  }, [isMobile]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle("is-animating", entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div>
        <p className="text-lg md:text-xl leading-relaxed text-foreground">העסקים שעובדים איתנו</p>
      </div>
      <div ref={containerRef} className="stuck-grid-container full-width-section">
        <section className="stuck-grid">
          {visibleItems.map((item, index) => {
            console.log(item, index);
            return (
              <div
                key={index}
                className={`grid-item${item.isSpecial ? " special" : ""}`}
              >
                {item.content}
              </div>
            );
          })}
        </section>
        <section className="stuck-grid" aria-hidden="true">
          {visibleItems2.map((item, index) => {
            console.log(item, index);
            return (
              <div
                key={index}
                className={`grid-item${item.isSpecial ? " special" : ""}`}
              >
                {item.content}
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default BusinessGridSection;
