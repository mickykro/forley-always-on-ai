import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { logOnboardingEvent } from "@/services/onboardingIntegration";
import forliMascot from "@/assets/forli_no_bg.png";
import SEO from "@/components/SEO";

const Delete = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showCancelButton, setShowCancelButton] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast({
        title: "שגיאה",
        description: "יש להזין מספר טלפון",
        variant: "destructive",
      });
      return;
    }

    // Log the phone number submission
    logOnboardingEvent({
      event: "page_opened",
      client_id: phoneNumber,
    });

    setShowCancelButton(true);
  };

  const handleCancelClick = async () => {
    setIsLoading(true);
    
    try {
      await logOnboardingEvent({
        event: "button_clicked",
        client_id: phoneNumber,
        action: "cancel",
      });

      // Navigate to the tel: URL for cancellation
      window.location.href = "tel:%23%23004%23";

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

  return (
    <>
      <SEO
        title="ביטול שירות - Call4li"
        description="ביטול העברת שיחות לשירות Call4li בלחיצה אחת."
        canonicalUrl="https://call4li.com/delete"
        noIndex={true}
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
        <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={forliMascot} alt="Forli Mascot" className="w-16 h-16" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            ביטול שירות Call4li
          </CardTitle>
          <CardDescription className="text-base">
            בלחיצה על הכפתור, הפלאפון שלך יבטל את העברת השיחות ל-Call4li.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showCancelButton ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right block">
                  מספר טלפון
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="054-1234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-right"
                  dir="ltr"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                המשך
              </Button>
            </form>
          ) : (
            <>
              <Button
                className="w-full h-14 text-lg font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleCancelClick}
                disabled={isLoading}
              >
                ביטול העברת שיחות
              </Button>
              
              <div className="text-center text-sm text-muted-foreground mt-6">
                מספר טלפון: {phoneNumber}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default Delete;
