import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PromoModalProps {
  whatsappUrl: string;
}

const PromoModal = ({ whatsappUrl }: PromoModalProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeenModal = localStorage.getItem("hasSeenPromoModal");

    if (!hasSeenModal) {
      // Show modal after 2 seconds delay
      const timer = setTimeout(() => {
        setOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Remember that user has seen the modal
    localStorage.setItem("hasSeenPromoModal", "true");
  };

  const handleJoin = () => {
    // Mark as seen and open WhatsApp
    localStorage.setItem("hasSeenPromoModal", "true");
    window.open(whatsappUrl, "_blank");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
        <button
          onClick={handleClose}
          className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="text-center space-y-4 pt-6">
          <div className="mx-auto">
            <div className="text-6xl mb-4">🎉</div>
          </div>

          <DialogTitle className="text-3xl font-bold text-primary">
            החודש הראשון חינם!
          </DialogTitle>

          <DialogDescription className="text-lg text-center space-y-4">
            <p className="font-semibold text-xl text-foreground">
              הצטרפו עכשיו לחבילת ה-PRO
            </p>
            <p className="text-muted-foreground">
              קבלו חודש ניסיון חינם לחלוטין
            </p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-2xl font-bold text-accent-foreground line-through decoration-2 mb-1">
                ₪159
              </p>
              <p className="text-4xl font-bold text-success">
                חינם!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                החודש הראשון ללא עלות
              </p>
            </div>
            <div className="text-right space-y-2 text-sm">
              <p className="flex items-center justify-center gap-2">
                <span className="text-success">✓</span>
                <span>שיחות ללא הגבלה</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-success">✓</span>
                <span>ניתוח מתקדם עם AI</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="text-success">✓</span>
                <span>תמיכה 24/7</span>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={handleJoin}
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xl py-6 font-bold"
          >
            להצטרפות 🚀
          </Button>

          <Button
            onClick={handleClose}
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground hover:text-foreground"
          >
            אולי מאוחר יותר
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoModal;
