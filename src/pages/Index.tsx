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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PhoneIcon, MessageCircleIcon, ClipboardCheckIcon, TrendingUpIcon, ClockIcon, BrainIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import SEO from "@/components/SEO";
import MessageBubble from "@/components/MessageBubble";
import PromoModal from "@/components/PromoModal";
import CircuitBackground from "@/components/CircuitBackground";

const Index = () => {
  const defaultWhatsAppMessage = "היי פורלי, אני מעוניין/ת להירשם";
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE || "972553163293";
  const whatsappBaseUrl = `https://wa.me/${phoneNumber}?text=`;
  const [dealValue, setDealValue] = useState<number>(1000);
  const [callsPerMonth, setCallsPerMonth] = useState<number>(100);
  const [heroMessage, setHeroMessage] = useState<string>(defaultWhatsAppMessage);
  const expectedReturn = Math.round(dealValue * callsPerMonth * 0.3);

  const whatsappUrl = `${whatsappBaseUrl}${encodeURIComponent(defaultWhatsAppMessage)}`;
  const heroWhatsAppUrl = `${whatsappBaseUrl}${encodeURIComponent(heroMessage || defaultWhatsAppMessage)}`;

  // Counter animations
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
    end: 3737,
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
  const card1 = useScrollAnimation();
  const card2 = useScrollAnimation();
  const card3 = useScrollAnimation();
  return (
    <>
      <SEO
        title="Call4li - פורלי הינשוף החכם עונה כשאתה לא יכול"
        description="מערכת בוט חכמה שמתעדת שיחות, יוצרת קשר עם לקוחות ושולחת סיכומים. לא מפספסים אף הזדמנות עסקית!"
        canonicalUrl={import.meta.env.VITE_DOMAIN_URL || "https://call4li.com"}
      />
      <PromoModal whatsappUrl={whatsappUrl} />
      <CircuitBackground className="min-h-screen">
        {/* Header */}
        <header className="bg-cyber-void/80 backdrop-blur-sm shadow-lg border-b border-cyber-cyan/30 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={forliMascot} alt="פורלי הינשוף" className="w-12 h-12 animate-glow-pulse" />
              <div>
                <h1 className="text-2xl font-bold text-primary cyber-glow">Call4li</h1>
                <p className="text-sm text-muted-foreground">עם פורלי הינשוף החכם</p>
              </div>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="text-primary hover:bg-primary hover:text-black border-primary cyber-border">
                להתחלת ניסיון חינם
              </Button>
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="flex justify-center mb-8">
                <video
                  src={heroMascotVid}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-40 h-40 rounded-full object-cover animate-pop-in shadow-[0_0_50px_rgba(0,229,255,0.6)]"
                />
              </div>
              <MessageBubble className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary cyber-glow">
                  לא מפספסים יותר שיחות –<br />
                  <span className="font-black text-accent">Call4li</span>, הבוט שמחזיר לך שליטה
                </h1>
              </MessageBubble>
              <MessageBubble className="mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-foreground">
                  פורלי הינשוף החכם עונה כשאתה לא יכול – מתעד שיחות, יוצר קשר עם הלקוחות שלך, ושולח לך סיכום ברור
                </p>
              </MessageBubble>
              
              {/* Rounded Text Field */}
              <div className="w-full md:w-4/5 mx-auto mt-12">
                <input
                  type="text"
                  placeholder="כאן כותבים הודעה לפורלי."
                  className="w-full px-6 py-4 rounded-full bg-card/50 backdrop-blur-sm border-2 border-primary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300 text-center text-lg"
                  value={heroMessage}
                  onChange={(e) => setHeroMessage(e.target.value)}
                />
              </div>
              
              <div className="block mt-6">
                <a href={heroWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary text-black hover:bg-primary/90 text-lg px-8 py-6 shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_50px_rgba(0,229,255,0.6)] transition-all">
                    להתחלת ניסיון חינם
                  </Button>
                </a>
              </div>
            </div>
        </section>


        {/* How It Works */}
        <section className="py-2">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center mb-16">
                <MessageBubble className="mb-4">
                  <h2 className="text-4xl font-bold text-primary">איך זה עובד?</h2>
                </MessageBubble>
                <MessageBubble>
                  <p className="text-xl text-muted-foreground">3 שלבים פשוטים שמשנים את העסק</p>
                </MessageBubble>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card
                  ref={card1.ref}
                  className={`text-center p-8 border-2 border-secondary/30 bg-card/20 backdrop-blur-sm hover:border-primary hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-700 ${card1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center border border-secondary/50">
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
                        className="w-16 h-16 rounded-full object-cover shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">לקוח מתקשר</h3>
                    <p className="text-foreground text-lg">פורלי מזהה את השיחה הנכנסת ומתכונן לפעול</p>
                  </CardContent>
                </Card>

                <Card
                  ref={card2.ref}
                  className={`text-center p-8 border-2 border-secondary/30 bg-card/20 backdrop-blur-sm hover:border-primary hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-700 delay-150 ${card2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center border border-secondary/50">
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
                        className="w-16 h-16 rounded-full object-cover shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">תגובה חכמה</h3>
                    <p className="text-foreground text-lg">
                      אם לא ענית - פורלי שולח ווטסאפ ללקוח
                      <br />
                      אם ענית - פורלי מתעד ומסכם
                    </p>
                  </CardContent>
                </Card>

                <Card
                  ref={card3.ref}
                  className={`text-center p-8 border-2 border-secondary/30 bg-card/20 backdrop-blur-sm hover:border-primary hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-700 delay-300 ${card3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center border border-secondary/50">
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
                        className="w-16 h-16 rounded-full object-cover shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">סיכום מושלם</h3>
                    <p className="text-foreground text-lg">כל השיחה נשמרת בגיליון או CRM עם סיכום ברור</p>
                  </CardContent>
                </Card>
              </div>
            </div>
        </section>

        {/* Statistics Counter */}
        <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div ref={businessCount.countRef} className="relative group">
                  <div className="bg-card/30 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-primary text-center overflow-hidden">
                    {businessCount.showIncrement && (
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 animate-float-up-fade z-10">
                        <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                          <span className="text-black font-bold text-xl">+1</span>
                        </div>
                      </div>
                    )}
                    <div className="text-5xl font-bold text-primary cyber-glow mb-4">{businessCount.formattedCount}</div>
                    <p className="text-lg text-foreground font-semibold">עסקים משתמשים בשירות</p>
                  </div>
                </div>

                <div ref={callsCount.countRef} className="relative group">
                  <div className="bg-card/30 backdrop-blur-sm border-2 border-accent/30 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-accent text-center overflow-hidden">
                    {callsCount.showIncrement && (
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 animate-float-up-fade z-10">
                        <div className="bg-accent rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                          <span className="text-black font-bold text-xl">+1</span>
                        </div>
                      </div>
                    )}
                    <div className="text-5xl font-bold text-accent cyber-glow mb-4">{callsCount.formattedCount}</div>
                    <p className="text-lg text-foreground font-semibold">שיחות נשמרו בזכות הבוט</p>
                  </div>
                </div>

                <div ref={satisfactionCount.countRef} className="relative group">
                  <div className="bg-card/30 backdrop-blur-sm border-2 border-secondary/30 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_40px_rgba(46,90,117,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary text-center">
                    <div className="text-5xl font-bold text-secondary mb-4">{satisfactionCount.formattedCount}</div>
                    <p className="text-lg text-foreground font-semibold">שביעות רצון לקוחות</p>
                  </div>
                </div>
              </div>
            </div>
        </section>
        {/* Benefits */}
        <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center mb-16">
                <MessageBubble className="mb-4">
                  <h2 className="text-4xl font-bold text-primary">למה פורלי?</h2>
                </MessageBubble>
                <MessageBubble>
                  <p className="text-xl text-muted-foreground">היתרונות שיהפכו את העסק שלך</p>
                </MessageBubble>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 text-center bg-card/20 backdrop-blur-sm border-2 border-success/30 hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:border-success transition-all">
                  <CardContent className="pt-4">
                    <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-success/50">
                      <TrendingUpIcon className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">🦉 לא מפספסים לידים</h3>
                    <p className="text-foreground">כל שיחה הופכת להזדמנות עסקית</p>
                  </CardContent>
                </Card>

                <Card className="p-6 text-center bg-card/20 backdrop-blur-sm border-2 border-secondary/30 hover:shadow-[0_0_25px_rgba(46,90,117,0.4)] hover:border-secondary transition-all">
                  <CardContent className="pt-4">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-secondary/50">
                      <ClipboardCheckIcon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">📊 הכל מתועד אוטומטית</h3>
                    <p className="text-foreground">מערכת ניהול לקוחות חכמה</p>
                  </CardContent>
                </Card>

                <Card className="p-6 text-center bg-card/20 backdrop-blur-sm border-2 border-accent/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:border-accent transition-all">
                  <CardContent className="pt-4">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/50">
                      <ClockIcon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">⏱️ זמן תגובה מהיר ומקצועי</h3>
                    <p className="text-foreground">לקוחות מרוצים, עסק שגדל</p>
                  </CardContent>
                </Card>

                <Card className="p-6 text-center bg-card/20 backdrop-blur-sm border-2 border-primary/30 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] hover:border-primary transition-all">
                  <CardContent className="pt-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/50">
                      <BrainIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">💡 מערכת חכמה עם סיכומי AI</h3>
                    <p className="text-foreground">טכנולוגיה מתקדמת בשירותך</p>
                  </CardContent>
                </Card>
              </div>
            </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center mb-8">
                <video src={valuePropositionVid} autoPlay muted loop playsInline className="w-24 h-24" />
              </div>
              <div className="block w-full">
                <MessageBubble className="mb-4">
                  <h2 className="text-4xl font-bold text-primary">עסק ממוצע מפספס 30% מהשיחות</h2>
                </MessageBubble>
              </div>
              <div className="block w-full">
                <MessageBubble className="mb-8">
                  <p className="text-2xl text-muted-foreground">Call4li הופך אותן להזדמנויות!</p>
                </MessageBubble>
              </div>

              <Card className="max-w-md mx-auto bg-card/30 backdrop-blur-sm border-2 border-primary/30 text-foreground p-8 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                <CardContent className="pt-4">
                  <h3 className="text-2xl font-bold mb-6 text-primary cyber-glow">מחשבון החיסכון שלך</h3>
                  <div className="space-y-4 text-right">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">שווי עסקה ממוצעת (₪)</label>
                      <input
                        type="number"
                        value={dealValue}
                        onChange={(e) => setDealValue(Number(e.target.value) || 0)}
                        className="w-full p-3 border-2 border-primary/30 rounded-lg text-center bg-card/50 backdrop-blur-sm text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">שיחות בחודש</label>
                      <input
                        type="number"
                        value={callsPerMonth}
                        onChange={(e) => setCallsPerMonth(Number(e.target.value) || 0)}
                        className="w-full p-3 border-2 border-primary/30 rounded-lg text-center bg-card/50 backdrop-blur-sm text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all"
                      />
                    </div>
                    <div className="pt-4 border-t border-primary/20">
                      <p className="text-lg font-bold text-success cyber-glow">
                        החזר צפוי: ₪{expectedReturn.toLocaleString()}/חודש
                      </p>
                      <p className="text-sm text-foreground/70">מ-30% מהשיחות שהפספסתם</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20">
            <div className="container mx-auto px-4">
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
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-secondary hover:bg-secondary/90 hover:shadow-[0_0_20px_rgba(46,90,117,0.5)]">התחילו עכשיו</Button>
                    </a>
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
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.6)]">
                        התחילו עכשיו
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
            <div className="container mx-auto px-4">
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

        {/* CTA Section */}
        <section className="py-20">
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
              <div className="block w-full">
                <MessageBubble className="mb-6">
                  <h2 className="text-4xl font-bold text-primary">מוכנים להתחיל?</h2>
                </MessageBubble>
              </div>
              <div className="block w-full">
                <MessageBubble className="mb-8">
                  <p className="text-xl text-muted-foreground max-w-2xl">
                    הצטרפו לעסקים שכבר משתמשים בפורלי ולא מפספסים אף הזדמנות
                  </p>
                </MessageBubble>
              </div>
              <div className="block w-full">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                    התחילו ניסיון חינם היום
                  </Button>
                </a>
              </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex flex-col items-center mb-12">
                <MessageBubble className="mb-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-primary">שאלות ותשובות</h2>
                </MessageBubble>
                <MessageBubble>
                  <p className="text-lg text-muted-foreground">כל מה שרציתם לדעת על Forli</p>
                </MessageBubble>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="bg-card/20 backdrop-blur-sm border-2 border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-all">
                  <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-primary">
                    מה זה Forli?
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-foreground">
                    Forli היא מערכת חכמה שמאפשרת לעסקים לענות על שאלות של לקוחות באופן אוטומטי ומדויק. המערכת משתמשת
                    בטכנולוגיה מתקדמת כדי להבין שאלות ולספק תשובות מותאמות אישית בזמן אמת.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card/20 backdrop-blur-sm border-2 border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-all">
                  <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-primary">
                    איך Forli עובד?
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-foreground">
                    Forli לומד את המידע על העסק שלך ומשתמש בו כדי לענות על שאלות לקוחות. המערכת מנתחת את השאלות, מחפשת
                    את המידע הרלוונטי ומספקת תשובות מדויקות ומקצועיות.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card/20 backdrop-blur-sm border-2 border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-all">
                  <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-primary">
                    כמה זמן לוקח להתחיל להשתמש ב-Forli?
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-foreground">
                    תהליך ההטמעה הוא מהיר ופשוט. לאחר שתמלא את הטופס עם פרטי העסק שלך, נוכל להתחיל לעבוד על הגדרת המערכת
                    והיא תהיה מוכנה לשימוש תוך זמן קצר.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card/20 backdrop-blur-sm border-2 border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-all">
                  <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-primary">
                    האם Forli יכול להתאים לכל סוג של עסק?
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-foreground">
                    כן! Forli הוא גמיש ומותאם לכל סוג עסק - בין אם אתה מנהל חנות אונליין, מספק שירותים מקצועיים, או מנהל
                    עסק פיזי. המערכת מותאמת לצרכים הייחודיים של כל לקוח.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card/20 backdrop-blur-sm border-2 border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-all">
                  <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-primary">
                    איזה סוג מידע אני צריך לספק?
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-foreground">
                    נזדקק למידע בסיסי על העסק שלך - שם החברה, תיאור קצר של העסק והשירותים שאתה מציע, ופרטי קשר. כמו כן,
                    נשמח לקבל מידע נוסף שיעזור למערכת לספק תשובות מדויקות יותר.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="bg-card/20 backdrop-blur-sm border-2 border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-all">
                  <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-primary">
                    האם המידע שלי מאובטח?
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-foreground">
                    בהחלט. אנחנו מקפידים על אבטחת מידע ברמה הגבוהה ביותר. כל המידע שאתה משתף איתנו נשמר בצורה מאובטחת
                    ומוצפנת. ניתן לקרוא עוד במדיניות הפרטיות שלנו.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" className="bg-card/20 backdrop-blur-sm border-2 border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-all">
                  <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-primary">
                    מה קורה אם הלקוח שואל שאלה שהמערכת לא יודעת לענות עליה?
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-foreground">
                    במקרה כזה, המערכת תודיע שהיא צריכה עזרה נוספת ותפנה את השאלה אליך. כך אתה תמיד בשליטה ויכול להבטיח
                    שהלקוחות שלך מקבלים את התשובות המדויקות ביותר.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8" className="bg-card/20 backdrop-blur-sm border-2 border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-all">
                  <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-primary">
                    האם אפשר לעדכן את המידע במערכת?
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-foreground">
                    כן, ניתן לעדכן ולשפר את המידע במערכת בכל עת. זה חשוב במיוחד כאשר יש שינויים בעסק, במוצרים או
                    בשירותים שאתה מציע.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9" className="bg-card/20 backdrop-blur-sm border-2 border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-all">
                  <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline text-primary">
                    כיצד ניתן ליצור קשר עם צוות Forli?
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-foreground">
                    אפשר ליצור איתנו קשר דרך טופס יצירת הקשר באתר, לשלוח אימייל ל-contact@forli.ai, או להתקשר אלינו
                    בטלפון 050-123-4567. אנחנו זמינים לכל שאלה ובקשה.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
        </section>

        {/* Footer */}
        <footer className="backdrop-blur-sm py-12 bg-card/30 text-foreground border-t-2 border-primary/20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyber-void/50 pointer-events-none"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-right">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <img src={forliMascot} alt="פורלי הינשוף" className="w-10 h-10 animate-glow-pulse" />
                  <h3 className="text-2xl font-bold text-primary cyber-glow">Call4li</h3>
                </div>
                <p className="text-foreground">פורלי הינשוף שתמיד ער בשביל העסק שלך</p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4 text-primary">יצירת קשר</h4>
                <div className="space-y-2 text-foreground">
                  <p>📧 micky@call4li.com</p>
                  <p>📞 054-2045280</p>
                  <p>💬 ווטסאפ: 054-2045280</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4 text-primary">קישורים</h4>
                <div className="space-y-2 text-foreground">
                  <Link to="/privacy" className="block transition-colors hover:text-primary">
                    מדיניות פרטיות
                  </Link>
                  <Link to="/faq" className="block transition-colors hover:text-primary">
                    שאלות נפוצות
                  </Link>
                  <a href="#" className="block transition-colors hover:text-primary">
                    תנאי שימוש
                  </a>
                  <a href="#" className="block transition-colors hover:text-primary">
                    צור קשר
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-primary/20 mt-8 pt-8 text-center">
              <p className="text-foreground/70">© 2024 Call4li. כל הזכויות שמורות.</p>
            </div>
          </div>
          </footer>
        </CircuitBackground>
      </>
    );
  };
export default Index;
