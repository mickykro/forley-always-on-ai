import { useEffect, useMemo, useRef } from "react";

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
  "סדנאות", "חוגים", "מרפאות", "נגרים", "חנויות פרחים",
];

const shuffledBusinesses = [...businessTypes]
  .filter((business) => business !== HIGHLIGHT_BUSINESS)
  .sort(() => Math.random() - 0.5);

const gridItems = shuffledBusinesses.map((business) => ({
  content: business,
  isSpecial: business === HIGHLIGHT_BUSINESS,
}));

const BusinessGridSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visibleChunks = useMemo(() => {
    const chunkCount = 3;
    const chunkSize = Math.ceil(gridItems.length / chunkCount);
    return [
      gridItems.slice(0, chunkSize),
      gridItems.slice(chunkSize, chunkSize * 2),
      gridItems.slice(chunkSize * 2),
    ];
  }, []);

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
        {visibleChunks.map((chunk, chunkIndex) => (
          <section
            key={chunkIndex}
            className="stuck-grid"
            aria-hidden={chunkIndex > 0 ? true : undefined}
          >
            {chunk.map((item, index) => {
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
        ))}
      </div>
    </>
  );
};

export default BusinessGridSection;
