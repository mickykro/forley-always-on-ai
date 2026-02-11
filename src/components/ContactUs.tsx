import { useState } from "react";
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

const ContactUs = ({
  variant = "page",
  showWhatsAppOption = true,
  onComplete,
}: ContactUsProps) => {
  const defaultWhatsAppMessage = "היי פורלי, אני רוצה לשמוע עוד פרטים";
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE || "972553163293";
  const whatsappBaseUrl = `https://wa.me/${phoneNumber}?text=`;

  const [whatsAppMessage, setWhatsAppMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [savedStepOne, setSavedStepOne] = useState<Pick<ContactFormData, "companyName" | "businessDescription"> | null>(null);

  const formatIsraeliPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      return "";
    }

    if (cleaned.startsWith("0")) {
      return `972${cleaned.slice(1)}`;
    }

    if (cleaned.startsWith("972")) {
      return cleaned;
    }

    return cleaned;
  };

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      companyName: "",
      businessDescription: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const mergedData = {
        ...data,
        ...savedStepOne,
      };
      const formattedData = {
        ...mergedData,
        phone: formatIsraeliPhoneNumber(mergedData.phone),
      };

      const response = await fetch("https://n8n.srv1173890.hstgr.cloud/webhook/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("תודה! פרטיך נשלחו בהצלחה.");
      form.reset();
      setStep(1);
      setSavedStepOne(null);
      onComplete?.();
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    const isValid = await form.trigger(["companyName", "businessDescription"]);
    if (isValid) {
      const companyName = form.getValues("companyName");
      const businessDescription = form.getValues("businessDescription");
      setSavedStepOne({ companyName, businessDescription });
      form.setValue("companyName", "");
      form.setValue("businessDescription", "");
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (savedStepOne) {
      form.setValue("companyName", savedStepOne.companyName);
      form.setValue("businessDescription", savedStepOne.businessDescription);
    }
    setStep(1);
  };


  const formContent = (
    <Card className={variant === "modal" ? " bg-transparent border-transparent" : "bg-transparent border-transparent md:p-8"}>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-right">
            <div>
              {step === 1 ? (
                <div className="md:mx-40 space-y-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="איך פורלי תציג את העסק שלך"
                            {...field}
                            className={`rounded-full bg-card/50 backdrop-blur-sm border-2 border-primary/50 text-center text-foreground placeholder:text-muted-foreground focus:outline-none text-sm md:text-base align-center`}
                          />
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
                          <Input
                            placeholder="כמה מילים על העסק שלך"
                            {...field}
                            className={`rounded-full bg-card/50 backdrop-blur-sm border-2 border-primary/50 text-center text-foreground placeholder:text-muted-foreground focus:outline-none`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    size="lg"
                    className="w-full bg-primary text-black hover:bg-primary/90"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                  >
                    להמשך
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="שם מלא"
                            {...field}
                            className={`rounded-full bg-card/60 backdrop-blur-sm border border-primary/40 text-center text-foreground placeholder:text-muted-foreground focus:outline-none`}
                          />
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
                          <Input
                            placeholder="מספר טלפון"
                            {...field}
                            className={`rounded-full bg-card/60 backdrop-blur-sm border border-primary/40 text-center text-foreground placeholder:text-muted-foreground focus:outline-none`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full bg-success text-black hover:bg-success/95" disabled={isSubmitting}>
                    {isSubmitting ? "שולח..." : "סיים הרשמה"}
                  </Button>
                  <Button type="button" variant="outline" className="w-full no-shine" onClick={handlePrevStep}>
                    חזרה
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );

  const whatsappOption = showWhatsAppOption ? (
    <div className="text-center">
      <p className="text-lg md:text-xl text-muted-foreground">אפשר גם פשוט לשלוח לפורלי הודעה</p>
      <div className="mt-3 max-w-2xl mx-auto">
        <Input
          placeholder="כתבו כאן את הודעתכם..."
          className="w-full px-6 py-4 rounded-full bg-card/50 backdrop-blur-sm border-2 border-primary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300 text-center text-md"
          value={whatsAppMessage}
          onChange={(event) => setWhatsAppMessage(event.target.value)}
        />
            <a
              href={`${whatsappBaseUrl}${encodeURIComponent(whatsAppMessage || defaultWhatsAppMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block"
            >
          <Button size="lg" className="bg-success text-black hover:bg-success/90 text-lg px-8 py-6">
            שליחת הודעת ווטסאפ
          </Button>
        </a>
      </div>
    </div>
  ) : null;

  return (
    variant === "modal" ? (
      <div className="space-y-6">
        {formContent}
        {whatsappOption}
      </div>
    ) : (
      <section id="contact" className="py-0 w-full">
        <div className="md:px-4 md:max-w-4xl md:mx-auto space-y-8">
          {formContent}
          {whatsappOption}
        </div>
      </section>
    )
  );
};

export default ContactUs;
