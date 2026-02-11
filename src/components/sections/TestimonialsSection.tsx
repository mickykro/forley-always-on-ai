import MessageBubble from "@/components/MessageBubble";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="px-4">
        <div className="flex flex-col items-center mb-16">
          <MessageBubble className="mb-4">
            <h2 className="text-4xl font-bold text-primary">מה הלקוחות שלנו אומרים</h2>
          </MessageBubble>
          <MessageBubble>
            <p className="text-xl text-muted-foreground">סיפורי הצלחה מעסקים כמוכם</p>
          </MessageBubble>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-card/20 backdrop-blur-sm border-2 border-primary/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:border-primary transition-all">
            <CardContent className="pt-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary/50 rounded-full flex items-center justify-center text-primary font-bold shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                  א
                </div>
                <div>
                  <h4 className="font-bold text-primary">אבי כהן</h4>
                  <p className="text-sm text-foreground/70">בעל עסק שירותים</p>
                </div>
              </div>
              <p className="text-foreground italic">
                "מאז שהתקנו את פורלי לא הפסדנו לקוחות. כל שיחה מתועדת ומטופלת בצורה מקצועית. החזר ההשקעה מיידי!"
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-card/20 backdrop-blur-sm border-2 border-primary/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:border-primary transition-all">
            <CardContent className="pt-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary/50 rounded-full flex items-center justify-center text-primary font-bold shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                  ש
                </div>
                <div>
                  <h4 className="font-bold text-primary">שרה לוי</h4>
                  <p className="text-sm text-foreground/70">מנהלת קליניקה</p>
                </div>
              </div>
              <p className="text-foreground italic">
                "פורלי חסך לנו שעות של עבודה יומית. המערכת חכמה, נוחה ומשדרגת את השירות שלנו בצורה משמעותית."
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-card/20 backdrop-blur-sm border-2 border-primary/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:border-primary transition-all">
            <CardContent className="pt-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary/50 rounded-full flex items-center justify-center text-primary font-bold shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                  ד
                </div>
                <div>
                  <h4 className="font-bold text-primary">דן אברהם</h4>
                  <p className="text-sm text-foreground/70">יועץ עסקי</p>
                </div>
              </div>
              <p className="text-foreground italic">
                "ההשקעה הכי חכמה שעשיתי השנה. פורלי הפך כל שיחה לעסק, ואני יכול להתמקד במה שאני הכי טוב בו."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
