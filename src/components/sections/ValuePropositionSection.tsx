import { useState } from "react";
import valuePropositionVid from "@/assets/value_proposition_vid.mp4";
import MessageBubble from "@/components/MessageBubble";
import { Card, CardContent } from "@/components/ui/card";

const ValuePropositionSection = () => {
  const [dealValue, setDealValue] = useState<number>(1000);
  const [callsPerMonth, setCallsPerMonth] = useState<number>(100);
  const expectedReturn = Math.round(dealValue * callsPerMonth * 0.3);

  return (
    <section className="py-20">
      <div className="px-4 text-center">
        <div className="flex justify-center mb-8">
        </div>
        <div className="block w-full">
          <MessageBubble className="mb-4">
            <div className="align-center flex justify-center">
          <video src={valuePropositionVid} autoPlay muted loop playsInline className="w-20 h-20 rounded-full object-cover shadow-[0_0_20px_rgba(240,177,220,0.4)]" />
            </div>
            <h2 className="text-4xl font-bold text-primary">עסק ממוצע מפספס 30% מהשיחות</h2>
            <p className="text-2xl text-muted-foreground">Call4li הופך אותן להזדמנויות!</p>
          </MessageBubble>
        </div>

        <Card className="max-w-md mx-auto bg-card/30 backdrop-blur-sm border-2 border-primary/30 text-foreground p-8 shadow-[0_0_30px_rgba(240,177,220,0.2)]">
          <CardContent className="pt-4">
            <h3 className="text-2xl font-bold mb-6 text-primary cyber-glow">מחשבון החיסכון שלך</h3>
            <div className="space-y-4 text-right">
              <div>
                <label htmlFor="dealValue" className="block text-sm font-medium mb-2 text-foreground">
                  שווי עסקה ממוצעת (₪)
                </label>
                <input
                  id="dealValue"
                  type="number"
                  value={dealValue}
                  onChange={(event) => setDealValue(Number(event.target.value) || 0)}
                  className="w-full p-3 border-2 border-primary/30 rounded-lg text-center bg-card/50 backdrop-blur-sm text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(240,177,220,0.4)] transition-all"
                />
              </div>
              <div>
                <label htmlFor="callsPerMonth" className="block text-sm font-medium mb-2 text-foreground">
                  שיחות בחודש
                </label>
                <input
                  id="callsPerMonth"
                  type="number"
                  value={callsPerMonth}
                  onChange={(event) => setCallsPerMonth(Number(event.target.value) || 0)}
                  className="w-full p-3 border-2 border-primary/30 rounded-lg text-center bg-card/50 backdrop-blur-sm text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(240,177,220,0.4)] transition-all"
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
  );
};

export default ValuePropositionSection;
