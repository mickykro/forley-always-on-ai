import { useEffect, useState } from "react";
import MessageBubble from "@/components/MessageBubble";
import { Card, CardContent } from "@/components/ui/card";

const objectionHighlights = [
  {
    title: '"אני לא תמיד זמין לענות"',
    description: "פורלי עונה עבורך, שולח ווטסאפ אישי ללקוח ומעדכן אותך – בלי לפספס שיחות.",
  },
  {
    title: '"אני שוכח לתעד שיחות"',
    description: "כל שיחה מסוכמת אוטומטית ונשלחת אליך – תיעוד מלא בלי להרים אצבע.",
  },
  {
    title: '"לקוחות נעלמים אם לא עניתי"',
    description: "פורלי שומר על קשר עם הלקוח, מגיב מיידית – ואתה לא מאבד את הליד.",
  },
];

const ObjectionsSection = () => {
  const [activeObjectionIndex, setActiveObjectionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveObjectionIndex((current) => (current + 1) % objectionHighlights.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeObjection = objectionHighlights[activeObjectionIndex];

  return (
    <section className="py-6 md:py-20 silver-section">
      <div className="px-4 text-center relative">
        <div className="flex flex-col items-center gap-2 mb-4">
          <MessageBubble>
            <h2 className="text-4xl font-bold text-primary">מתלבטים? הנה התשובות</h2>
          </MessageBubble>
          <MessageBubble>
            <p className="text-xl text-muted-foreground text-red-50">3 התנגדויות נפוצות – ופורלי עונה לכולן</p>
          </MessageBubble>
        </div>

        <div className="mx-auto mt-8 w-full max-w-3xl text-right" aria-live="polite">
          <Card
            key={activeObjectionIndex}
            className="p-6 bg-card/20 backdrop-blur-sm border-2 border-primary hover:border-primary transition-all duration-500 shadow-lg"
          >
            <CardContent>
              <h3 className="font-bold text-primary text-lg mb-2">{activeObjection.title}</h3>
              <p className="text-foreground">{activeObjection.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ObjectionsSection;
