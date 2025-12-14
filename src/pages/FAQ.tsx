import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const FAQ = () => {
  const faqs = [
    {
      question: "מה זה Forli?",
      answer: "Forli היא מערכת חכמה שמאפשרת לעסקים לענות על שאלות של לקוחות באופן אוטומטי ומדויק. המערכת משתמשת בטכנולוגיה מתקדמת כדי להבין שאלות ולספק תשובות מותאמות אישית בזמן אמת."
    },
    {
      question: "איך Forli עובד?",
      answer: "Forli לומד את המידע על העסק שלך ומשתמש בו כדי לענות על שאלות לקוחות. המערכת מנתחת את השאלות, מחפשת את המידע הרלוונטי ומספקת תשובות מדויקות ומקצועיות."
    },
    {
      question: "כמה זמן לוקח להתחיל להשתמש ב-Forli?",
      answer: "תהליך ההטמעה הוא מהיר ופשוט. לאחר שתמלא את הטופס עם פרטי העסק שלך, נוכל להתחיל לעבוד על הגדרת המערכת והיא תהיה מוכנה לשימוש תוך זמן קצר."
    },
    {
      question: "האם Forli יכול להתאים לכל סוג של עסק?",
      answer: "כן! Forli הוא גמיש ומותאם לכל סוג עסק - בין אם אתה מנהל חנות אונליין, מספק שירותים מקצועיים, או מנהל עסק פיזי. המערכת מותאמת לצרכים הייחודיים של כל לקוח."
    },
    {
      question: "איזה סוג מידע אני צריך לספק?",
      answer: "נזדקק למידע בסיסי על העסק שלך - שם החברה, תיאור קצר של העסק והשירותים שאתה מציע, ופרטי קשר. כמו כן, נשמח לקבל מידע נוסף שיעזור למערכת לספק תשובות מדויקות יותר."
    },
    {
      question: "האם המידע שלי מאובטח?",
      answer: "בהחלט. אנחנו מקפידים על אבטחת מידע ברמה הגבוהה ביותר. כל המידע שאתה משתף איתנו נשמר בצורה מאובטחת ומוצפנת. ניתן לקרוא עוד במדיניות הפרטיות שלנו."
    },
    {
      question: "מה קורה אם הלקוח שואל שאלה שהמערכת לא יודעת לענות עליה?",
      answer: "במקרה כזה, המערכת תודיע שהיא צריכה עזרה נוספת ותפנה את השאלה אליך. כך אתה תמיד בשליטה ויכול להבטיח שהלקוחות שלך מקבלים את התשובות המדויקות ביותר."
    },
    {
      question: "האם אפשר לעדכן את המידע במערכת?",
      answer: "כן, ניתן לעדכן ולשפר את המידע במערכת בכל עת. זה חשוב במיוחד כאשר יש שינויים בעסק, במוצרים או בשירותים שאתה מציע."
    },
    {
      question: "כיצד ניתן ליצור קשר עם צוות Forli?",
      answer: "אפשר ליצור איתנו קשר דרך טופס יצירת הקשר באתר, לשלוח אימייל ל-contact@forli.ai, או להתקשר אלינו בטלפון 050-123-4567. אנחנו זמינים לכל שאלה ובקשה."
    }
  ];

  return (
    <>
      <SEO
        title="שאלות ותשובות - Call4li"
        description="מצא תשובות לשאלות הנפוצות ביותר על Call4li - איך זה עובד, כמה זה עולה, ואיך להתחיל."
        canonicalUrl="https://call4li.com/faq"
      />
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <ArrowRight className="h-5 w-5" />
            <span className="font-semibold">חזרה לדף הבית</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            שאלות ותשובות
          </h1>
          <p className="text-lg text-muted-foreground">
            מצא תשובות לשאלות הנפוצות ביותר על Forli
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border rounded-lg px-6 bg-card"
            >
              <AccordionTrigger className="text-right text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-right text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-16 text-center p-8 bg-primary/5 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">לא מצאת את התשובה שחיפשת?</h2>
          <p className="text-muted-foreground mb-6">
            צוות Forli זמין לענות על כל שאלה נוספת
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            צור קשר
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Forli. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default FAQ;
