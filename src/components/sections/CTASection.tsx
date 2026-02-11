import ctaMascotVid from "@/assets/cta_mascot_vid.mp4";
import MessageBubble from "@/components/MessageBubble";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onOpenContact: () => void;
}

const CTASection = ({ onOpenContact }: CTASectionProps) => {
  return (
    <section className="py-20">
      <div className="px-4 text-center">
        <div className="flex justify-center mb-8">
          <video
            src={ctaMascotVid}
            autoPlay
            muted
            loop
            playsInline
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="block w-full">
          <MessageBubble className="mb-6">
            <h2 className="text-4xl font-bold text-primary">מוכנים להתחיל?</h2>
          </MessageBubble>
        </div>
        <div className="block w-full">
          <MessageBubble className="mb-8">
            <p className="text-xl text-muted-foreground max-w-2xl">
              הצטרפו לעסקים שכבר משתמשים בפורלי ולא מפספסים אף הזדמנות
            </p>
          </MessageBubble>
        </div>
        <div className="block w-full">
          <Button
            type="button"
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6"
            onClick={onOpenContact}
          >
            התחילו ניסיון חינם היום
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
