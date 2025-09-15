import forliMascot from "@/assets/forli-mascot.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhoneIcon, MessageCircleIcon, ClipboardCheckIcon, TrendingUpIcon, ClockIcon, BrainIcon } from "lucide-react";

const Index = () => {
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
          <Button variant="outline" className="text-secondary hover:bg-secondary hover:text-white">
            להתחלת ניסיון חינם
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center text-text-custom">
          <div className="flex justify-center mb-8">
            <img src={forliMascot} alt="פורלי הינשוף החכם" className="w-32 h-32" />
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight text-text-custom">
            לא מפספסים יותר שיחות –<br />
            <span className="text-accent font-black">Call4li</span>, הבוט שמחזיר לך שליטה
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-text-custom">
            פורלי הינשוף החכם עונה כשאתה לא יכול – מתעד שיחות, יוצר קשר עם הלקוחות שלך, ושולח לך סיכום ברור
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
            להתחלת ניסיון חינם
          </Button>
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
                  <img src={forliMascot} alt="פורלי" className="w-16 h-16" />
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
                  <img src={forliMascot} alt="פורלי" className="w-16 h-16" />
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
                  <img src={forliMascot} alt="פורלי" className="w-16 h-16" />
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
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUpIcon className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">🦉 לא מפספסים לידים</h3>
                <p className="text-muted-foreground">כל שיחה הופכת להזדמנות עסקית</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClipboardCheckIcon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">📊 הכל מתועד אוטומטית</h3>
                <p className="text-muted-foreground">מערכת ניהול לקוחות חכמה</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">⏱️ זמן תגובה מהיר ומקצועי</h3>
                <p className="text-muted-foreground">לקוחות מרוצים, עסק שגדל</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BrainIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">💡 מערכת חכמה עם סיכומי AI</h3>
                <p className="text-muted-foreground">טכנולוגיה מתקדמת בשירותך</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <img src={forliMascot} alt="פורלי הינשוף" className="w-24 h-24" />
          </div>
          <h2 className="text-4xl font-bold mb-6">עסק ממוצע מפספס 30% מהשיחות</h2>
          <p className="text-2xl mb-8">Call4li הופך אותן להזדמנויות!</p>
          
          <Card className="max-w-md mx-auto bg-white text-primary p-8">
            <CardContent className="pt-4">
              <h3 className="text-2xl font-bold mb-6">מחשבון החיסכון שלך</h3>
              <div className="space-y-4 text-right">
                <div>
                  <label className="block text-sm font-medium mb-2">שווי עסקה ממוצעת (₪)</label>
                  <input 
                    type="number" 
                    placeholder="1,000" 
                    className="w-full p-3 border rounded-lg text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">שיחות בחודש</label>
                  <input 
                    type="number" 
                    placeholder="100" 
                    className="w-full p-3 border rounded-lg text-center"
                  />
                </div>
                <div className="pt-4 border-t">
                  <p className="text-lg font-bold text-success">החזר צפוי: ₪30,000/חודש</p>
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
                  <h3 className="text-3xl font-bold text-primary mb-2">₪299</h3>
                  <p className="text-muted-foreground">לחודש</p>
                </div>
                <ul className="space-y-4 mb-8 text-right">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>עד 200 שיחות בחודש</span>
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
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  התחילו עכשיו
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 border-accent shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground">הכי פופולרי</Badge>
              </div>
              <CardContent className="pt-4">
                <div className="text-center mb-8">
                  <Badge className="bg-primary text-primary-foreground mb-4">פרו</Badge>
                  <h3 className="text-3xl font-bold text-primary mb-2">₪749</h3>
                  <p className="text-muted-foreground">לחודש</p>
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
                    <span>תמיכה 24/7</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <span>דוחות מתקדמים</span>
                  </li>
                </ul>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  התחילו עכשיו
                </Button>
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
            <img src={forliMascot} alt="פורלי הינשוף" className="w-32 h-32" />
          </div>
          <h2 className="text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            הצטרפו לעסקים שכבר משתמשים בפורלי ולא מפספסים אף הזדמנות
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
            התחילו ניסיון חינם היום
          </Button>
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
                <p>📧 info@call4li.com</p>
                <p>📞 1-700-555-0123</p>
                <p>💬 ווטסאפ: 050-1234567</p>
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