import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { logOnboardingEvent } from "@/services/onboardingIntegration";
import forliMascot from "@/assets/forli_no_bg.png";

const Onboard = () => {
  const { client_id } = useParams<{ client_id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (client_id) {
      logOnboardingEvent({
        event: "page_opened",
        client_id,
      });
    }
  }, [client_id]);

  const handleButtonClick = async (action: "activate" | "cancel" | "check", telUrl: string) => {
    if (!client_id) return;

    setIsLoading(true);
    
    try {
      await logOnboardingEvent({
        event: "button_clicked",
        client_id,
        action,
      });

      // Navigate to the tel: URL
      window.location.href = telUrl;

      toast({
        title: "פעולה בוצעה בהצלחה",
        description: "הבקשה נשלחה למערכת הטלפון שלך",
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בביצוע הפעולה",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!client_id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-destructive">קוד לקוח לא תקין</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={forliMascot} alt="Forli Mascot" className="w-16 h-16" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            הפעלת Follow-Me לשיחות שלא נענו
          </CardTitle>
          <CardDescription className="text-base">
            בלחיצה על הכפתור, הפלאפון שלך יגדיר העברת שיחות אוטומטית למספר Call4li.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => handleButtonClick("activate", "tel:*004*+972535972420%23")}
            disabled={isLoading}
          >
            הפעל העברת שיחות
          </Button>
          
          <Button
            className="w-full h-14 text-lg font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => handleButtonClick("cancel", "tel:%23%23004%23")}
            disabled={isLoading}
          >
            ביטול העברת שיחות
          </Button>
          
          <Button
            className="w-full h-14 text-lg font-semibold bg-muted text-muted-foreground hover:bg-muted/80"
            onClick={() => handleButtonClick("check", "tel:*%23004%23")}
            disabled={isLoading}
          >
            בדיקת סטטוס
          </Button>
          
          <div className="text-center text-sm text-muted-foreground mt-6">
            קוד לקוח: {client_id}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboard;