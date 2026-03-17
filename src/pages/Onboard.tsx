import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { logOnboardingEvent } from "@/services/onboardingIntegration";
import forliMascot from "@/assets/forli_no_bg_silver.png";

interface Carrier {
  name: string;
  code: string;
}

const carriers: Carrier[] = [
  // HOT Mobile supports 004
  { name: "HOT Mobile", code: "hot" },

  // Golan supports 004
  { name: "Golan Telecom", code: "golan" },

  // Rami Levy (MVNO) usually supports 004
  { name: "Rami Levy", code: "rami" },

  // 012 Mobile is Partner. If Partner needs 61/62/67, 012 likely does too.
  // If you are sure 004 works for 012, keep it.
  { name: "012 Mobile", code: "012" },

  // --- THE PROBLEMATIC ONES ---
  // If you confirmed *004* fails on these, using *61* is a partial fix.
  // Ideally, test **004* on these. If it fails, they need 67/62 as well.
  { name: "Pelephone", code: "pelephone" },
  { name: "Partner", code: "partner" },
  { name: "Cellcom", code: "cellcom" },
];

const TIMER_OPTIONS = [10, 20, 30] as const;
type TimerOption = typeof TIMER_OPTIONS[number];

const Onboard = () => {
  const { client_id } = useParams<{ client_id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCarrierDialogOpen, setIsCarrierDialogOpen] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<TimerOption>(20);

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

      const activationCode = `**004*0535972420**${selectedTimer}%23`;
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
            <img src={forliMascot} alt="Forli Mascot" className="w-28 h-16" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">הפעלת Follow-Me לשיחות שלא נענו</CardTitle>
          <CardDescription className="text-base">
            בלחיצה על הכפתור, הפלאפון שלך יגדיר העברת שיחות אוטומטית למספר Call4li.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">זמן המתנה לפני העברה</p>
            <div className="flex gap-2 justify-center">
              {TIMER_OPTIONS.map((seconds) => (
                <button
                  key={seconds}
                  onClick={() => setSelectedTimer(seconds)}
                  className={`flex-1 h-11 rounded-md border text-sm font-semibold transition-colors ${
                    selectedTimer === seconds
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                >
                  {seconds} שנ׳
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              ⚠️ שיחות שיסתיימו לפני {selectedTimer} שניות לא יטופלו על ידי המערכת
            </p>
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
