import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Send, User, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import forliMascot from "@/assets/cropped_circle_image.png";
import { ContactIntegrationService } from "@/services/contactIntegration";
import { validateStep, type ContactFormData } from "@/schemas/contactValidation";
import SEO from "@/components/SEO";

const Contact = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    companyName: "",
    businessDescription: "",
    email: "",
    phone: "",
  });

  const steps = [
    {
      id: "welcome",
      message: "שלום! אני פורלי, הינשופה החכמה של Call4li 🦉",
      submessage: "אשמח לעזור לכם להתחיל. בואו נכיר - איך קוראים לכם?",
    },
    {
      id: "company",
      message: "נחמד להכיר אותך {name}! 😊",
      submessage: "ומה שם החברה/העסק שלכם?",
    },
    {
      id: "description",
      message: "מעולה! 👏",
      submessage: "ספרו לי קצת על העסק - מה אתם עושים?",
    },
    {
      id: "phone",
      message: "מעניין! 🚀",
      submessage: "מה מספר הטלפון?",
    },
    {
      id: "complete",
      message: "תודה רבה {name}! 🎉",
      submessage: "נחזור אליכם תוך 24 שעות עם הצעה מותאמת אישית",
    },
  ];

  const currentMessage = steps[currentStep];
  const isComplete = currentStep === 4;

  const handleNext = async () => {
    // Validate current step before proceeding
    const validation = validateStep(currentStep, formData);
    if (!validation.isValid) {
      setValidationError(validation.error || "שגיאה בוולידציה");
      toast({
        title: "שגיאה בוולידציה",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setValidationError(null);

    if (currentStep === 4) {
      // Form is complete, submit data to integrations
      setIsSubmitting(true);

      try {
        const result = await ContactIntegrationService.submitContactForm(formData);

        if (result.success) {
          toast({
            title: "הטופס נשלח בהצלחה! 🎉",
            description: "נחזור אליכם בהקדם",
          });
        } else {
          // Still proceed to next step even if integrations fail
          console.warn("Integration errors:", result.errors);
          toast({
            title: "הטופס התקבל",
            description: "נחזור אליכם בהקדם",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "הטופס התקבל",
          description: "נחזור אליכם בהקדם",
        });
      } finally {
        setIsSubmitting(false);
      }
    }

    if (currentStep < steps.length) {
      // Add a small delay to show the user message before moving to next step
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 200);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
  };

  const renderInput = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-3 border">
              <User className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="השם שלכם..."
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="flex-1 outline-none text-right"
                onKeyPress={(e) => e.key === "Enter" && validateStep(1, formData).isValid && handleNext()}
                autoFocus
              />
            </div>
            <Button
              onClick={handleNext}
              disabled={!validateStep(1, formData).isValid}
              size="icon"
              className="rounded-full bg-[#25D366] hover:bg-[#128C7E]"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-3 border">
              <span className="text-muted-foreground">🏢</span>
              <input
                type="text"
                placeholder="שם החברה/העסק..."
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className="flex-1 outline-none text-right"
                onKeyPress={(e) => e.key === "Enter" && validateStep(2, formData).isValid && handleNext()}
                autoFocus
              />
            </div>
            <Button
              onClick={handleNext}
              disabled={!validateStep(2, formData).isValid}
              size="icon"
              className="rounded-full bg-[#25D366] hover:bg-[#128C7E]"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="flex gap-2 items-end">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-4 py-3 border">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <textarea
                placeholder="ספרו לנו מה אתם עושים..."
                value={formData.businessDescription}
                onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
                    e.preventDefault();
                    if (validateStep(3, formData).isValid) {
                      handleNext();
                    }
                  }
                }}
                className="flex-1 outline-none resize-none min-h-[60px] text-right"
                rows={3}
                autoFocus
              />
            </div>
            <Button
              onClick={handleNext}
              disabled={!validateStep(3, formData).isValid}
              size="icon"
              className="rounded-full bg-[#25D366] hover:bg-[#128C7E] h-12 w-12"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-3 border">
              <span className="text-muted-foreground">📞</span>
              <input
                type="tel"
                placeholder="מספר הטלפון..."
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="flex-1 outline-none text-right"
                onKeyPress={(e) => e.key === "Enter" && validateStep(4, formData).isValid && handleNext()}
                autoFocus
              />
            </div>
            <Button
              onClick={handleNext}
              disabled={!validateStep(4, formData).isValid || isSubmitting}
              size="icon"
              className="rounded-full bg-[#25D366] hover:bg-[#128C7E]"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <Button onClick={handleNext} className="rounded-full bg-[#25D366] hover:bg-[#128C7E] px-8">
              בואו נתחיל <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        );
    }
  };

  return (
    <>
      <SEO
        title="צור קשר - Call4li"
        description="צרו קשר עם צוות Call4li לקבלת הצעת מחיר מותאמת אישית. נחזור אליכם תוך 24 שעות."
        canonicalUrl={`${import.meta.env.VITE_DOMAIN_URL || "https://call4li.com"}/contact`}
      />
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-[#111b21] border-gray-800">
        {/* WhatsApp Header */}
        <div className="bg-[#202c33] p-4 flex items-center gap-3">
          <Link to="/" className="text-white hover:text-gray-300">
            <ArrowRight className="w-6 h-6 rotate-180" />
          </Link>
          <img src={forliMascot} alt="פורלי" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <h3 className="text-white font-semibold">פורלי - Call4li</h3>
            <p className="text-gray-400 text-sm">מקוון עכשיו</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4 bg-[#0b141a] min-h-[400px] max-h-[500px] overflow-y-auto">
          {/* Welcome Message */}
          <div className="flex gap-2">
            <img src={forliMascot} alt="פורלי" className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className="bg-[#202c33] text-white rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
            <p className="text-sm">שלום! אני פורלי, הינשופה החכמה של Call4li 🦉</p>
              <p className="text-sm mt-1 text-gray-300">אשמח לעזור לכם להתחיל. בואו נכיר - איך קוראים לכם?</p>
              <span className="text-xs text-gray-400 mt-1 block">
                {new Date().toLocaleTimeString("he-IL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* User Name Message */}
          {formData.name && (
            <>
              <div className="flex justify-end">
                <div className="bg-[#005c4b] text-white rounded-lg rounded-br-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm">{formData.name}</p>
                  <span className="text-xs text-gray-300 mt-1 block">✓✓</span>
                </div>
              </div>
              {currentStep > 1 && (
                <div className="flex gap-2">
                  <img src={forliMascot} alt="פורלי" className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="bg-[#202c33] text-white rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                    <p className="text-sm">נחמד להכיר אותך {formData.name}! 😊</p>
                    <p className="text-sm mt-1 text-gray-300">ומה שם החברה/העסק שלכם?</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date().toLocaleTimeString("he-IL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* User Company Name Message */}
          {formData.companyName && (
            <>
              <div className="flex justify-end">
                <div className="bg-[#005c4b] text-white rounded-lg rounded-br-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm">{formData.companyName}</p>
                  <span className="text-xs text-gray-300 mt-1 block">✓✓</span>
                </div>
              </div>
              {currentStep > 2 && (
                <div className="flex gap-2">
                  <img src={forliMascot} alt="פורלי" className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="bg-[#202c33] text-white rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                    <p className="text-sm">מעולה! 👏</p>
                    <p className="text-sm mt-1 text-gray-300">ספרו לי קצת על העסק - מה אתם עושים?</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date().toLocaleTimeString("he-IL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* User Business Description Message */}
          {formData.businessDescription && (
            <>
              <div className="flex justify-end">
                <div className="bg-[#005c4b] text-white rounded-lg rounded-br-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm">{formData.businessDescription}</p>
                  <span className="text-xs text-gray-300 mt-1 block">✓✓</span>
                </div>
              </div>
              {currentStep > 3 && (
                <div className="flex gap-2">
                  <img src={forliMascot} alt="פורלי" className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="bg-[#202c33] text-white rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                    <p className="text-sm">מעניין! 🚀</p>
                    <p className="text-sm mt-1 text-gray-300">מה מספר הטלפון?</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date().toLocaleTimeString("he-IL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* User Phone Message */}
          {formData.phone && (
            <>
              <div className="flex justify-end">
                <div className="bg-[#005c4b] text-white rounded-lg rounded-br-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm">{formData.phone}</p>
                  <span className="text-xs text-gray-300 mt-1 block">✓✓</span>
                </div>
              </div>
              {currentStep > 4 && (
                <div className="flex gap-2">
                  <img src={forliMascot} alt="פורלי" className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="bg-[#202c33] text-white rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                    <p className="text-sm">תודה רבה {formData.name}! 🎉</p>
                    <p className="text-sm mt-1 text-gray-300">נחזור אליכם תוך 24 שעות עם הצעה מותאמת אישית</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date().toLocaleTimeString("he-IL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {currentStep > 4 && (
            <div className="text-center py-4">
              <Link to="/">
                <Button className="bg-[#25D366] hover:bg-[#128C7E] rounded-full px-8">חזרה לאתר</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Input Area */}
        {currentStep >= 0 && currentStep <= 4 && (
          <div className="p-4 bg-[#202c33] border-t border-gray-700">
            {renderInput()}
            {validationError && <div className="mt-2 text-red-400 text-sm text-center">{validationError}</div>}
          </div>
        )}
      </Card>
    </div>
    </>
  );
};

export default Contact;
