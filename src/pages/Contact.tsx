import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Send, User, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import forliMascot from "@/assets/cropped_circle_image.png";

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const steps = [
    {
      id: "welcome",
      message: "שלום! אני פורלי, הינשוף החכם של Call4li 🦉",
      submessage: "אשמח לעזור לכם להתחיל. בואו נכיר - איך קוראים לכם?"
    },
    {
      id: "phone", 
      message: "נחמד להכיר אותך {name}! 😊",
      submessage: "ומה מספר הטלפון שלכם?"
    },
    {
      id: "message",
      message: "אחלה! עוד רגע נתחיל 🚀",
      submessage: "ספרו לי קצת על העסק שלכם ואיך נוכל לעזור"
    },
    {
      id: "complete",
      message: "תודה רבה {name}! 🎉",
      submessage: "נחזור אליכם תוך 24 שעות עם הצעה מותאמת אישית"
    }
  ];

  const currentMessage = steps[currentStep];
  const isComplete = currentStep === 4;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // Add a small delay to show the user message before moving to next step
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 100);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderInput = () => {
    switch(currentStep) {
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
                onKeyPress={(e) => e.key === "Enter" && formData.name.trim() && handleNext()}
                autoFocus
              />
            </div>
            <Button 
              onClick={handleNext}
              disabled={!formData.name.trim()}
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
              <span className="text-muted-foreground">📞</span>
              <input
                type="tel"
                placeholder="מספר הטלפון..."
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="flex-1 outline-none text-right"
                onKeyPress={(e) => e.key === "Enter" && formData.phone.trim() && handleNext()}
                autoFocus
              />
            </div>
            <Button 
              onClick={handleNext}
              disabled={!formData.phone.trim()}
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
                placeholder="ספרו לנו על העסק שלכם..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="flex-1 outline-none resize-none min-h-[60px] text-right"
                rows={3}
                autoFocus
              />
            </div>
            <Button 
              onClick={handleNext}
              disabled={!formData.message.trim()}
              size="icon"
              className="rounded-full bg-[#25D366] hover:bg-[#128C7E] h-12 w-12"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <Button 
              onClick={handleNext}
              className="rounded-full bg-[#25D366] hover:bg-[#128C7E] px-8"
            >
              בואו נתחיל <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
        );
    }
  };

  return (
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
              <p className="text-sm">שלום! אני פורלי, הינשוף החכם של Call4li 🦉</p>
              <p className="text-sm mt-1 text-gray-300">אשמח לעזור לכם להתחיל. בואו נכיר - איך קוראים לכם?</p>
              <span className="text-xs text-gray-400 mt-1 block">
                {new Date().toLocaleTimeString("he-IL", { 
                  hour: "2-digit", 
                  minute: "2-digit" 
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
                    <p className="text-sm mt-1 text-gray-300">ומה מספר הטלפון שלכם?</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date().toLocaleTimeString("he-IL", { 
                        hour: "2-digit", 
                        minute: "2-digit" 
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
              {currentStep > 2 && (
                <div className="flex gap-2">
                  <img src={forliMascot} alt="פורלי" className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="bg-[#202c33] text-white rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                    <p className="text-sm">אחלה! עוד רגע נתחיל 🚀</p>
                    <p className="text-sm mt-1 text-gray-300">ספרו לי קצת על העסק שלכם ואיך נוכל לעזור</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date().toLocaleTimeString("he-IL", { 
                        hour: "2-digit", 
                        minute: "2-digit" 
                      })}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* User Message */}
          {formData.message && (
            <>
              <div className="flex justify-end">
                <div className="bg-[#005c4b] text-white rounded-lg rounded-br-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm">{formData.message}</p>
                  <span className="text-xs text-gray-300 mt-1 block">✓✓</span>
                </div>
              </div>
              {currentStep > 3 && (
                <div className="flex gap-2">
                  <img src={forliMascot} alt="פורלי" className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="bg-[#202c33] text-white rounded-lg rounded-bl-none px-4 py-2 max-w-[80%]">
                    <p className="text-sm">תודה רבה {formData.name}! 🎉</p>
                    <p className="text-sm mt-1 text-gray-300">נחזור אליכם תוך 24 שעות עם הצעה מותאמת אישית</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date().toLocaleTimeString("he-IL", { 
                        hour: "2-digit", 
                        minute: "2-digit" 
                      })}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {currentStep === 4 && (
            <div className="text-center py-4">
              <Link to="/">
                <Button className="bg-[#25D366] hover:bg-[#128C7E] rounded-full px-8">
                  חזרה לאתר
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Input Area */}
        {currentStep >= 0 && currentStep <= 3 && (
          <div className="p-4 bg-[#202c33] border-t border-gray-700">
            {renderInput()}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Contact;