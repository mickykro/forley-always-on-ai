import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { logOnboardingEvent } from "@/services/onboardingIntegration";
import forliMascot from "@/assets/forli_no_bg.png";

interface Carrier {
  name: string;
  code: string;
  activationCode: string;
}

const carriers: Carrier[] = [
  { name: "HOT Mobile", code: "hot", activationCode: "*004*0535972420**10%23" },
  { name: "Pelephone", code: "pelephone", activationCode: "*61*0535972420**10%23" },
  { name: "Partner", code: "partner", activationCode: "*61*0535972420**10%23" },
  { name: "Cellcom", code: "cellcom", activationCode: "*61*0535972420**10%23" },
  { name: "Golan Telecom", code: "golan", activationCode: "*004*0535972420**10%23" },
  { name: "Rami Levy", code: "rami", activationCode: "*004*0535972420**10%23" },
  { name: "012 Mobile", code: "012", activationCode: "*004*0535972420**10%23" },
];

const Onboard = () => {
  const { client_id } = useParams<{ client_id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCarrierDialogOpen, setIsCarrierDialogOpen] = useState(false);

  useEffect(() => {
    if (client_id) {
      logOnboardingEvent({
        event: "page_opened",
        client_id,
      });
    }
  }, [client_id]);

  const handleActivateClick = () => {
    setIsCarrierDialogOpen(true);
  };

  const handleCarrierSelect = async (carrier: Carrier) => {
    if (!client_id) return;

    setIsLoading(true);

    try {
      await logOnboardingEvent({
        event: "button_clicked",
        client_id,
        action: "activate",
      });

      window.location.href = `tel:${carrier.activationCode}`;

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
      setIsCarrierDialogOpen(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!client_id) return;

    setIsLoading(true);

    try {
      await logOnboardingEvent({
        event: "button_clicked",
        client_id,
        action: "check",
      });

      window.location.href = "tel:*%2361%23";

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
          <CardTitle className="text-2xl font-bold text-primary">הפעלת Follow-Me לשיחות שלא נענו</CardTitle>
          <CardDescription className="text-base">
            בלחיצה על הכפתור, הפלאפון שלך יגדיר העברת שיחות אוטומטית למספר Call4li.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleActivateClick}
            disabled={isLoading}
          >
            הפעל העברת שיחות
          </Button>

          <Button
            className="w-full h-14 text-lg font-semibold bg-muted text-muted-foreground hover:bg-muted/80"
            onClick={handleCheckStatus}
            disabled={isLoading}
          >
            בדיקת סטטוס
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isCarrierDialogOpen} onOpenChange={setIsCarrierDialogOpen}>
        <DialogContent className="max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl text-center">בחר את ספק הסלולר שלך</DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              לאחר הבחירה, המכשיר שלך יחייג אוטומטית למספר שיגדיר את העברת השיחות. פשוט המתן לסיום השיחה.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 pt-4">
            {carriers.map((carrier) => (
              <Button
                key={carrier.code}
                variant="outline"
                className="w-full h-12 text-base font-medium"
                onClick={() => handleCarrierSelect(carrier)}
                disabled={isLoading}
              >
                {carrier.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Onboard;
