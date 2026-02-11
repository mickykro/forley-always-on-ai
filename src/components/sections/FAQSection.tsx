import MessageBubble from "@/components/MessageBubble";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className="py-20">
      <div className="px-4 max-w-4xl mx-auto">
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
  );
};

export default FAQSection;
