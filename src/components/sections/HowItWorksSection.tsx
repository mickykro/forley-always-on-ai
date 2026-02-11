import answeringVid from "@/assets/answering_vid.mp4";
import typingVid from "@/assets/typing_vid.mp4";
import summaryVid from "@/assets/summary_vid.mp4";
import MessageBubble from "@/components/MessageBubble";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PhoneIcon, MessageCircleIcon, ClipboardCheckIcon } from "lucide-react";

const HowItWorksSection = () => {
  const card1 = useScrollAnimation();
  const card2 = useScrollAnimation();
  const card3 = useScrollAnimation();

  return (
    <section className="pb-10">
      <div className="">
        <div className="flex flex-col items-center mb-2 md:mb-16">
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
  );
};

export default HowItWorksSection;
