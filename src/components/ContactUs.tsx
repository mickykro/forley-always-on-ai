import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/schemas/contactValidation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

type ContactUsVariant = "page" | "modal";

interface ContactUsProps {
  variant?: ContactUsVariant;
  showWhatsAppOption?: boolean;
  onComplete?: () => void;
}

const ContactUs = ({ variant = "page", showWhatsAppOption = true, onComplete }: ContactUsProps) => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE || "972553163293";
  const whatsappBaseUrl = `https://wa.me/${phoneNumber}?text=`;

  const [whatsAppMessage, setWhatsAppMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [isMobile, setIsMobile] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isStickyDismissed, setIsStickyDismissed] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      companyName: "",
      businessDescription: "",
      phone: "",
    },
  });

  const formatIsraeliPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) return "";
    if (cleaned.startsWith("0")) return `972${cleaned.slice(1)}`;
    if (cleaned.startsWith("972")) return cleaned;
    return cleaned;
  };

  const handleNextStep = async () => {
    const isValid = await form.trigger(["companyName", "businessDescription"]);
    if (isValid) setStep(2);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        phone: formatIsraeliPhoneNumber(data.phone),
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("https://n8n.srv1173890.hstgr.cloud/webhook/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");

      alert("תודה! פרטיך נשלחו בהצלחה.");
      if (variant === "page") {
        sessionStorage.setItem("contactStickyDismissed", "true");
        setIsStickyDismissed(true);
      }
      form.reset();
      setStep(1);
      onComplete?.();
    } catch (error) {
      console.error("Submission error:", error);
      alert("אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Setup mobile/header listeners
  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (variant !== "page") return;
    setIsStickyDismissed(sessionStorage.getItem("contactStickyDismissed") === "true");
  }, [variant]);

  useEffect(() => {
    if (!isMobile || variant !== "page") return;
    const updateOffset = () => {
      const header = document.querySelector("header");
      setHeaderOffset(header ? Math.round(header.getBoundingClientRect().height) : 0);
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [isMobile, variant]);

  const isStickyActive = variant === "page" && isMobile && !isStickyDismissed;
  const stickyPlaceholderClass = isStickyActive ? "placeholder:text-xs/[11px]" : "";
  const stickyTopOffset = headerOffset + (isAtTop ? 32 : 0);

  useEffect(() => {
    if (!isStickyActive) return;
    const updateScroll = () => {
      setIsAtTop(window.scrollY <= 16);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [isStickyActive]);

  useEffect(() => {
    if (variant !== "page") return;
    if (typeof document === "undefined") return;
    document.body.classList.toggle("contact-sticky-active", isStickyActive);
    return () => document.body.classList.remove("contact-sticky-active");
  }, [isStickyActive, variant]);

  return (
    <section id="contact" className={variant === "page" ? "py-0 w-full" : ""}>
      <div className="md:px-4 md:max-w-4xl md:mx-auto space-y-8">
        <Card className="bg-transparent border-transparent md:p-8">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, (e) => console.log("Validation Failed:", e))} className="space-y-4 text-right">
                <div
                  className={isStickyActive ? "fixed left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-card/95 backdrop-blur-md border border-accent/30 p-3 shadow-lg" : ""}
                  style={isStickyActive ? { top: stickyTopOffset } : undefined}
                >
                  {/* STEP 1: Always in DOM, hidden if step is 2 */}
                  <div className={`${step === 1 ? "block" : "hidden"} ${isStickyActive ? "grid grid-cols-2 gap-2" : "md:mx-40 space-y-4"}`}>
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="איך פורלי תציג את העסק שלך" {...field} className={`rounded-full bg-card/50 border-[1px] border-accent/50 text-center ${stickyPlaceholderClass}`} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="businessDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="כמה מילים על העסק שלך" {...field} className={`rounded-full bg-card/50 border-[1px] border-accent/50 text-center ${stickyPlaceholderClass}`} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" size="lg" className={`w-full bg-transparent border border-primary/50 text-primary hover:bg-primary hover:text-black ${isStickyActive ? "col-span-2" : ""}`} onClick={handleNextStep}>
                      להמשך
                    </Button>
                  </div>

                  {/* STEP 2: Always in DOM, hidden if step is 1 */}
                  <div className={`${step === 2 ? "grid" : "hidden"} grid-cols-2 gap-2 ${isStickyActive ? "" : "sm:gap-4 md:mx-40"}`}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="שם מלא" {...field} className="rounded-full bg-card/60 border border-accent/40 text-center" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="מספר טלפון" {...field} className="rounded-full bg-card/60 border border-accent/40 text-center" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-success text-black hover:bg-success/95" disabled={isSubmitting}>
                      {isSubmitting ? "שולח..." : "סיים הרשמה"}
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                      חזרה
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {showWhatsAppOption && (
          <div className="text-center">
            <p className="text-lg md:text-xl text-muted-foreground">אפשר גם פשוט לשלוח לפורלי הודעה</p>
            <div className="mt-3 max-w-2xl mx-auto">
              <Input
                placeholder="כתבו כאן את הודעתכם..."
                className="w-full rounded-full bg-card/50 border-2 border-primary/50 text-center"
                value={whatsAppMessage}
                onChange={(e) => setWhatsAppMessage(e.target.value)}
              />
              <a href={`${whatsappBaseUrl}${encodeURIComponent(whatsAppMessage || "היי פורלי")}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                <Button size="lg" className="bg-success text-black text-lg px-8 py-6">שליחת הודעת ווטסאפ</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactUs;
