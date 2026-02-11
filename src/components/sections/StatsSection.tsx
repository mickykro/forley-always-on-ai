import { useCountUp } from "@/hooks/useCountUp";

const StatsSection = () => {
  const businessCount = useCountUp({
    end: 123,
    duration: 2500,
    suffix: "+",
    incrementInterval: {
      min: 200,
      max: 1000000,
    },
  });
  const callsCount = useCountUp({
    end: 737,
    duration: 2500,
    suffix: "+",
    incrementInterval: {
      min: 200,
      max: 1000,
    },
  });
  const satisfactionCount = useCountUp({
    end: 98,
    duration: 2000,
    suffix: "%",
  });

  return (
    <section className="py-16">
      <div className="px-4">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div ref={businessCount.countRef} className="relative group h-full">
            <div className="bg-card/30 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-primary text-center overflow-hidden h-full min-h-[170px] sm:min-h-[200px] md:min-h-[240px] flex flex-col items-center justify-center">
              {businessCount.showIncrement && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 animate-float-up-fade z-10">
                  <div className="bg-primary rounded-full w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg">
                    <span className="text-black font-bold text-sm sm:text-lg md:text-xl">+1</span>
                  </div>
                </div>
              )}
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-primary cyber-glow mb-2 sm:mb-3 md:mb-4">
                {businessCount.formattedCount}
              </div>
              <p className="text-xs sm:text-sm md:text-lg text-foreground font-semibold">עסקים משתמשים בשירות</p>
            </div>
          </div>

          <div ref={callsCount.countRef} className="relative group h-full">
            <div className="bg-card/30 backdrop-blur-sm border-2 border-accent/30 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-accent text-center overflow-hidden h-full min-h-[170px] sm:min-h-[200px] md:min-h-[240px] flex flex-col items-center justify-center">
              {callsCount.showIncrement && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 animate-float-up-fade z-10">
                  <div className="bg-accent rounded-full w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg">
                    <span className="text-black font-bold text-sm sm:text-lg md:text-xl">+1</span>
                  </div>
                </div>
              )}
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-accent cyber-glow mb-2 sm:mb-3 md:mb-4">
                {callsCount.formattedCount}
              </div>
              <p className="text-xs sm:text-sm md:text-lg text-foreground font-semibold">שיחות נשמרו בזכות הבוט</p>
            </div>
          </div>

          <div ref={satisfactionCount.countRef} className="relative group h-full">
            <div className="bg-card/30 backdrop-blur-sm border-2 border-secondary/30 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-[0_0_40px_rgba(46,90,117,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary text-center h-full min-h-[170px] sm:min-h-[200px] md:min-h-[240px] flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-secondary mb-2 sm:mb-3 md:mb-4">
                {satisfactionCount.formattedCount}
              </div>
              <p className="text-xs sm:text-sm md:text-lg text-foreground font-semibold">שביעות רצון לקוחות</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
