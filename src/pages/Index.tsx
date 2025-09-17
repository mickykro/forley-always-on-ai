import forliMascot from "@/assets/forli_no_bg.png";
import answeringVid from "@/assets/answering_vid.mp4";
import typingVid from "@/assets/typing_vid.mp4";
import summaryVid from "@/assets/summary_vid.mp4";
import valuePropositionVid from "@/assets/value_proposition_vid.mp4";
import heroMascotVid from "@/assets/hero_mascot_vid.mp4";
import ctaMascotVid from "@/assets/cta_mascot_vid.mp4";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhoneIcon, MessageCircleIcon, ClipboardCheckIcon, TrendingUpIcon, ClockIcon, BrainIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [dealValue, setDealValue] = useState<number>(1000);
  const [callsPerMonth, setCallsPerMonth] = useState<number>(100);
  
  const expectedReturn = Math.round(dealValue * callsPerMonth * 0.3);
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={forliMascot} alt="פורלי הינשוף" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Call4li</h1>
              <p className="text-sm text-muted-foreground">עם פורלי הינשוף החכם</p>
            </div>
          </div>
          <Link to="/contact">
            <Button variant="outline" className="text-secondary hover:bg-secondary hover:text-white">
              להתחלת ניסיון חינם
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center text-text-custom">
          <div className="flex justify-center mb-8">
            <video 
              src={heroMascotVid}
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight text-text-custom">
            לא מפספסים יותר שיחות –<br />
            <span className="text-accent font-black">Call4li</span>, הבוט שמחזיר לך שליטה
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-text-custom">
            פורלי הינשוף החכם עונה כשאתה לא יכול – מתעד שיחות, יוצר קשר עם הלקוחות שלך, ושולח לך סיכום ברור
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
              להתחלת ניסיון חינם
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">איך זה עובד?</h2>
            <p className="text-xl text-muted-foreground">3 שלבים פשוטים שמשנים את העסק</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 hover:border-secondary transition-colors">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
                    <PhoneIcon className="w-10 h-10 text-secondary" />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <video 
                    src={answeringVid} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">לקוח מתקשר</h3>
                <p className="text-muted-foreground text-lg">
                  פורלי מזהה את השיחה הנכנסת ומתכונן לפעול
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-secondary transition-colors">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
                    <MessageCircleIcon className="w-10 h-10 text-secondary" />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <video 
                    src={typingVid} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">תגובה חכמה</h3>
                <p className="text-muted-foreground text-lg">
                  אם לא ענית - פורלי שולח ווטסאפ ללקוח<br />
                  אם ענית - פורלי מתעד ומסכם
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-secondary transition-colors">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center">
                    <ClipboardCheckIcon className="w-10 h-10 text-secondary" />
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <video 
                    src={summaryVid} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">סיכום מושלם</h3>
                <p className="text-muted-foreground text-lg">
                  כל השיחה נשמרת בגיליון או CRM עם סיכום ברור
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">למה פורלי?</h2>
            <p className="text-xl text-muted-foreground">היתרונות שיהפכו את העסק שלך</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 animate-fade-in opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards] transform translate-y-8">
              <CardContent className="pt-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:bg-success/20">
                  <TrendingUpIcon className="w-8 h-8 text-success transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">🦉 לא מפספסים לידים</h3>
                <p className="text-muted-foreground">כל שיחה הופכת להזדמנות עסקית</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 animate-fade-in opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards] transform translate-y-8">
              <CardContent className="pt-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:bg-secondary/20">
                  <ClipboardCheckIcon className="w-8 h-8 text-secondary transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">📊 הכל מתועד אוטומטית</h3>
                <p className="text-muted-foreground">מערכת ניהול לקוחות חכמה</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 animate-fade-in opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards] transform translate-y-8">
              <CardContent className="pt-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:bg-accent/20">
                  <ClockIcon className="w-8 h-8 text-accent-foreground transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">⏱️ זמן תגובה מהיר ומקצועי</h3>
                <p className="text-muted-foreground">לקוחות מרוצים, עסק שגדל</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 animate-fade-in opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards] transform translate-y-8">
              <CardContent className="pt-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:bg-primary/20">
                  <BrainIcon className="w-8 h-8 text-primary transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">💡 מערכת חכמה עם סיכומי AI</h3>
                <p className="text-muted-foreground">טכנולוגיה מתקדמת בשירותך</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <video 
              src={valuePropositionVid} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-24 h-24"
            />
          </div>
          <h2 className="text-4xl font-bold text-primary mb-6">עסק ממוצע מפספס 30% מהשיחות</h2>
          <p className="text-2xl text-muted-foreground mb-8">Call4li הופך אותן להזדמנויות!</p>
          
          <Card className="max-w-md mx-auto bg-white text-primary p-8">
            <CardContent className="pt-4">
              <h3 className="text-2xl font-bold mb-6">מחשבון החיסכון שלך</h3>
              <div className="space-y-4 text-right">
                <div>
                  <label className="block text-sm font-medium mb-2">שווי עסקה ממוצעת (₪)</label>
                  <input 
                    type="number" 
                    value={dealValue}
                    onChange={(e) => setDealValue(Number(e.target.value) || 0)}
                    className="w-full p-3 border rounded-lg text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">שיחות בחודש</label>
                  <input 
                    type="number" 
                    value={callsPerMonth}
                    onChange={(e) => setCallsPerMonth(Number(e.target.value) || 0)}
                    className="w-full p-3 border rounded-lg text-center"
                  />
                </div>
                <div className="pt-4 border-t">
                  <p className="text-lg font-bold text-success">החזר צפוי: ₪{expectedReturn.toLocaleString()}/חודש</p>
                  <p className="text-sm text-muted-foreground">מ-30% מהשיחות שהפספסתם</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">חבילות המחיר שלנו</h2>
            <p className="text-xl text-muted-foreground">בחרו את החבילה המתאימה לעסק שלכם</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border-2 hover:border-secondary transition-colors">
              <CardContent className="pt-4">
                <div className="text-center mb-8">
                  <Badge className="bg-muted text-muted-foreground mb-4">בסיסית</Badge>
                  <div className="mb-4">
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-muted-foreground line-through mb-1">₪150</h3>
                      <h2 className="text-4xl font-bold text-success mb-1">₪50</h2>
                      <p className="text-muted-foreground text-sm">החודש הראשון</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-muted">
                      <p className="text-sm text-muted-foreground">לאחר מכן: ₪150/חודש</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 text-right">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>עד 100 שיחות בחודש</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>תגובה אוטומטית בווטסאפ</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>סיכומי שיחות AI</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>דוחות בסיסיים</span>
                  </li>
                </ul>
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    התחילו עכשיו
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 border-accent shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground">הכי פופולרי</Badge>
              </div>
              <CardContent className="pt-4">
                <div className="text-center mb-8">
                  <Badge className="bg-primary text-primary-foreground mb-4">פרו</Badge>
                  <div className="mb-4">
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-muted-foreground line-through mb-1">₪450</h3>
                      <h2 className="text-4xl font-bold text-accent-foreground mb-1">חינם!</h2>
                      <p className="text-muted-foreground text-sm">החודש הראשון</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-muted">
                      <p className="text-sm text-muted-foreground">לאחר מכן: ₪450/חודש</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 text-right">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>שיחות ללא הגבלה</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>אינטגרציה מלאה עם CRM</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>ניתוח מתקדם וחדשנות AI</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>תזכורות אוטומטיות ללקוח ולעסק</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>תמיכה 24/7</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>דוחות מתקדמים</span>
                  </li>
                </ul>
                <Link to="/contact" className="w-full">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    התחילו עכשיו
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">מה הלקוחות שלנו אומרים</h2>
            <p className="text-xl text-muted-foreground">סיפורי הצלחה מעסקים כמוכם</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold">
                    א
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">אבי כהן</h4>
                    <p className="text-sm text-muted-foreground">בעל עסק שירותים</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "מאז שהתקנו את פורלי לא הפסדנו לקוחות. כל שיחה מתועדת ומטופלת בצורה מקצועית. החזר ההשקעה מיידי!"
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold">
                    ש
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">שרה לוי</h4>
                    <p className="text-sm text-muted-foreground">מנהלת קליניקה</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "פורלי חסך לנו שעות של עבודה יומית. המערכת חכמה, נוחה ומשדרגת את השירות שלנו בצורה משמעותית."
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold">
                    ד
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">דן אברהם</h4>
                    <p className="text-sm text-muted-foreground">יועץ עסקי</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "ההשקעה הכי חכמה שעשיתי השנה. פורלי הפך כל שיחה לעסק, ואני יכול להתמקד במה שאני הכי טוב בו."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-text-custom">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <video 
              src={ctaMascotVid}
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <h2 className="text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            הצטרפו לעסקים שכבר משתמשים בפורלי ולא מפספסים אף הזדמנות
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
              התחילו ניסיון חינם היום
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-text-custom py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-right">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <img src={forliMascot} alt="פורלי הינשוף" className="w-10 h-10" />
                <h3 className="text-2xl font-bold">Call4li</h3>
              </div>
              <p className="text-primary-foreground/80">
                פורלי הינשוף שתמיד ער בשביל העסק שלך
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">יצירת קשר</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>📧 micky@kaizen-il.com</p>
                <p>📞 054-2045280</p>
                <p>💬 ווטסאפ: 054-2045280</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">קישורים</h4>
              <div className="space-y-2">
                <a href="#" className="block text-primary-foreground/80 hover:text-white transition-colors">
                  מדיניות פרטיות
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-white transition-colors">
                  תנאי שימוש
                </a>
                <a href="#" className="block text-primary-foreground/80 hover:text-white transition-colors">
                  צור קשר
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/60">
              © 2024 Call4li. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;