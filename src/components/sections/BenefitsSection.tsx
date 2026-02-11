import MessageBubble from "@/components/MessageBubble";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUpIcon, ClipboardCheckIcon, ClockIcon, BrainIcon } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="py-20">
      <div className="px-4">
        <div className="flex flex-col items-center mb-16">
          <MessageBubble className="mb-4">
            <h2 className="text-4xl font-bold text-primary">למה פורלי?</h2>
          </MessageBubble>
          <MessageBubble>
            <p className="text-xl text-muted-foreground">היתרונות שיהפכו את העסק שלך</p>
          </MessageBubble>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="sm:p-6 text-center bg-card/20 backdrop-blur-sm border-2 border-success/30 hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:border-success transition-all">
            <CardContent className="pt-3 sm:pt-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 border border-success/50">
                <TrendingUpIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-success" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-1 sm:mb-2 leading-relaxed text-balance">🦉 לא מפספסים לידים</h3>
              <p className="text-xs sm:text-base text-foreground leading-relaxed text-balance">כל שיחה הופכת להזדמנות עסקית</p>
            </CardContent>
          </Card>

          <Card className="sm:p-6 text-center bg-card/20 backdrop-blur-sm border-2 border-secondary/30 hover:shadow-[0_0_25px_rgba(46,90,117,0.4)] hover:border-secondary transition-all">
            <CardContent className="pt-3 sm:pt-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 border border-secondary/50">
                <ClipboardCheckIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-secondary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-1 sm:mb-2 leading-relaxed text-balance">📊 הכל מתועד אוטומטית</h3>
              <p className="text-sm sm:text-base text-foreground leading-relaxed text-balance">מערכת ניהול לקוחות חכמה</p>
            </CardContent>
          </Card>

          <Card className="sm:p-6 text-center bg-card/20 backdrop-blur-sm border-2 border-accent/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:border-accent transition-all">
            <CardContent className="pt-3 sm:pt-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 border border-accent/50">
                <ClockIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-1 sm:mb-2 leading-relaxed text-balance">⏱️ זמן תגובה מהיר ומקצועי</h3>
              <p className="text-sm sm:text-base text-foreground leading-relaxed text-balance">לקוחות מרוצים, עסק שגדל</p>
            </CardContent>
          </Card>

          <Card className="sm:p-6 text-center bg-card/20 backdrop-blur-sm border-2 border-primary/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:border-primary transition-all">
            <CardContent className="pt-3 sm:pt-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 border border-primary/50">
                <BrainIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-1 sm:mb-2 leading-relaxed text-balance">💡 מערכת חכמה עם סיכומי AI</h3>
              <p className="text-sm sm:text-base text-foreground leading-relaxed text-balance">טכנולוגיה מתקדמת בשירותך</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
