import MessageBubble from "@/components/MessageBubble";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PricingSectionProps {
  onOpenContact: () => void;
}

const PricingSection = ({ onOpenContact }: PricingSectionProps) => {
  return (
    <section id="pricing" className="py-20">
      <div className="px-4">
        <div className="flex flex-col items-center mb-16">
          <MessageBubble className="mb-4">
            <h2 className="text-4xl font-bold text-primary">חבילות המחיר שלנו</h2>
          </MessageBubble>
          <MessageBubble>
            <p className="text-xl text-muted-foreground">בחרו את החבילה המתאימה לעסק שלכם</p>
          </MessageBubble>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-secondary/30 bg-card/20 backdrop-blur-sm hover:border-secondary hover:shadow-[0_0_30px_rgba(46,90,117,0.4)] transition-all">
            <CardContent className="pt-4">
              <div className="text-center mb-8">
                <Badge className="bg-muted text-foreground mb-4 border border-secondary/30">בסיסית</Badge>
                <div className="mb-4">
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-muted-foreground line-through mb-1">₪150</h3>
                    <h2 className="text-4xl font-bold text-success cyber-glow mb-1">₪50</h2>
                    <p className="text-foreground text-sm">החודש הראשון</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-secondary/20">
                    <p className="text-sm text-foreground">לאחר מכן: ₪150/חודש</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-8 text-right">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
                  <span className="text-foreground">עד 100 שיחות בחודש</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
                  <span className="text-foreground">תגובה אוטומטית בווטסאפ</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
                  <span className="text-foreground">סיכומי שיחות AI</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
                  <span className="text-foreground">דוחות בסיסיים</span>
                </li>
              </ul>
              <Button
                type="button"
                className="w-full bg-secondary hover:bg-secondary/90 hover:shadow-[0_0_20px_rgba(46,90,117,0.5)]"
                onClick={onOpenContact}
              >
                התחילו עכשיו
              </Button>
            </CardContent>
          </Card>

          <Card className="p-8 border-2 border-primary/50 bg-card/20 backdrop-blur-sm shadow-[0_0_40px_rgba(0,229,255,0.3)] relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-black shadow-[0_0_15px_rgba(0,229,255,0.6)]">הכי פופולרי</Badge>
            </div>
            <CardContent className="pt-4">
              <div className="text-center mb-8">
                <Badge className="bg-primary/20 text-primary mb-4 border border-primary/50">פרו</Badge>
                <div className="mb-4">
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-muted-foreground line-through mb-1">₪450</h3>
                    <h2 className="text-4xl font-bold text-primary cyber-glow mb-1">חינם!</h2>
                    <p className="text-foreground text-sm">החודש הראשון</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <p className="text-sm text-foreground">לאחר מכן: ₪450/חודש</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-4 mb-8 text-right">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
                  <span className="text-foreground">שיחות ללא הגבלה</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
                  <span className="text-foreground">ניתוח מתקדם וחדשנות AI</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
                  <span className="text-foreground">תזכורות אוטומטיות ללקוח ולעסק</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
                  <span className="text-foreground">תמיכה 24/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-success rounded-full shadow-[0_0_5px_rgba(0,255,255,0.8)]"></span>
                  <span className="text-foreground">דוחות יומיים ושבועיים</span>
                </li>
              </ul>
              <Button
                type="button"
                className="w-full bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]"
                onClick={onOpenContact}
              >
                התחילו עכשיו
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
