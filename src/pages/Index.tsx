import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import SEO from "@/components/SEO";
import CircuitBackground from "@/components/CircuitBackground";
import ContactUs from "@/components/ContactUs";
import {
  BenefitsSection,
  BusinessGridSection,
  CTASection,
  FAQSection,
  FooterSection,
  HeaderSection,
  HeroSection,
  HowItWorksSection,
  ObjectionsSection,
  PricingSection,
  StatsSection,
  TestimonialsSection,
  ValuePropositionSection,
} from "@/components/sections";

const Index = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const openContactPopup = () => {
    setIsContactPopupOpen(true);
  };
  return (
    <>
      <SEO
        title="Call4li - פורלי הינשוף החכם עונה כשאתה לא יכול"
        description="מערכת בוט חכמה שמתעדת שיחות, יוצרת קשר עם לקוחות ושולחת סיכומים. לא מפספסים אף הזדמנות עסקית!"
        canonicalUrl={import.meta.env.VITE_DOMAIN_URL || "https://call4li.com"}
      />
      {/* <PromoModal whatsappUrl={whatsappUrl} /> */}
      <Dialog open={isContactPopupOpen} onOpenChange={setIsContactPopupOpen}>
        <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-primary/5 to-accent/10 border-2 border-primary/20">
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="text-3xl font-bold text-primary">בואו נתחיל</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              שני צעדים קצרים ואנחנו איתכם.
            </DialogDescription>
          </DialogHeader>
          <ContactUs variant="modal" onComplete={() => setIsContactPopupOpen(false)} />
        </DialogContent>
      </Dialog>
      <CircuitBackground className="min-h-screen w-full">
        <HeaderSection onOpenContact={openContactPopup} />
        <HeroSection />
        <BusinessGridSection />
        <StatsSection />
        <HowItWorksSection />
        <ObjectionsSection />
        <BenefitsSection />
        <ValuePropositionSection />
        <PricingSection onOpenContact={openContactPopup} />
        <TestimonialsSection />
        <CTASection onOpenContact={openContactPopup} />
        <FAQSection />
        <FooterSection />
      </CircuitBackground>
    </>
  );
};
export default Index;
