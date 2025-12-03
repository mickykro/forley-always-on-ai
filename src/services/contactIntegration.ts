import { ContactFormData } from "@/schemas/contactValidation";

interface ContactData {
  name: string;
  companyName: string;
  businessDescription: string;
  email: string;
  phone: string;
}

const WEBHOOK_URL = "https://n8n.srv1173890.hstgr.cloud/webhook-test/1b3e6b9c-86c7-4b7b-80a0-091e927f61c2";

const normalizePhoneNumber = (phone: string): string => {
  const cleanPhone = phone.trim();

  if (cleanPhone.startsWith("0")) {
    return `+972${cleanPhone.substring(1)}`;
  }

  if (cleanPhone.startsWith("972")) {
    return `+${cleanPhone}`;
  }

  return cleanPhone;
};

export class ContactIntegrationService {
  static async submitContactForm(data: ContactFormData): Promise<{ success: boolean; errors: string[] }> {
    try {
      const payload = {
        name: data.name,
        company_name: data.companyName,
        business_description: data.businessDescription,
        email: data.email || "",
        phone: normalizePhoneNumber(data.phone),
        timestamp: new Date().toISOString(),
        source: "website",
        user_agent: navigator.userAgent,
        page_url: window.location.href,
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      console.log("Webhook sent successfully:", payload);
      return { success: true, errors: [] };
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      return {
        success: false,
        errors: ["שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר."],
      };
    }
  }
}
