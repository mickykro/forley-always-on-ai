import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { logOnboardingEvent } from "@/services/onboardingIntegration";
import forliMascot from "@/assets/forli_no_bg.png";

interface Carrier {
  name: string;
  code: string;
  activationCodeTemplate: string;
}

const WAITING_TIME_PLACEHOLDER = "{wait}";
const WAITING_TIME_OPTIONS = [10, 20, 30];

const carriers: Carrier[] = [
  // HOT Mobile supports 004
  { name: "HOT Mobile", code: "hot", activationCodeTemplate: "**004*0535972420**{wait}%23" },

  // Golan supports 004
  { name: "Golan Telecom", code: "golan", activationCodeTemplate: "**004*0535972420**{wait}%23" },

  // Rami Levy (MVNO) usually supports 004
  { name: "Rami Levy", code: "rami", activationCodeTemplate: "**004*0535972420**{wait}%23" },

  // 012 Mobile is Partner. If Partner needs 61/62/67, 012 likely does too.
  // If you are sure 004 works for 012, keep it.
  { name: "012 Mobile", code: "012", activationCodeTemplate: "**004*0535972420**{wait}%23" },

  // --- THE PROBLEMATIC ONES ---
  // If you confirmed *004* fails on these, using *61* is a partial fix.
  // Ideally, test **004* on these. If it fails, they need 67/62 as well.
  { name: "Pelephone", code: "pelephone", activationCodeTemplate: "**004*0535972420**{wait}%23" },
  { name: "Partner", code: "partner", activationCodeTemplate: "**004*0535972420**{wait}%23" },
  { name: "Cellcom", code: "cellcom", activationCodeTemplate: "**004*0535972420**{wait}%23" },
];

const Onboard = () => {
  const { client_id } = useParams<{ client_id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCarrierDialogOpen, setIsCarrierDialogOpen] = useState(false);
  const [waitingTime, setWaitingTime] = useState<number>(WAITING_TIME_OPTIONS[0]);

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

      const template = carrier.activationCodeTemplate;
      const activationCode = template.includes(WAITING_TIME_PLACEHOLDER)
        ? template.replace(WAITING_TIME_PLACEHOLDER, waitingTime.toString())
        : template;

      window.location.href = `tel:${activationCode}`;

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
          <div className="space-y-2 text-center">
            <p className="text-sm text-muted-foreground">בחר זמן המתנה לפני העברת השיחה</p>
            <ToggleGroup
              type="single"
              value={String(waitingTime)}
              onValueChange={(value) => {
                if (value) {
                  setWaitingTime(Number(value));
                }
              }}
              aria-label="זמן המתנה"
              className="w-full justify-center gap-2"
            >
              {WAITING_TIME_OPTIONS.map((option) => (
                <ToggleGroupItem key={option} value={String(option)} className="flex-1">
                  {option} שניות
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
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
                className="w-full h-12 text-base font-medium flex items-center justify-between"
                onClick={() => handleCarrierSelect(carrier)}
                disabled={isLoading}
              >
                <span className="w-full ">{carrier.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Onboard;
