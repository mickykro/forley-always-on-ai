import { ContactFormData } from "@/schemas/contactValidation";
import { supabase } from "@/integrations/supabase/client";

export class ContactIntegrationService {
  static async submitContactForm(data: ContactFormData): Promise<{ success: boolean; errors: string[] }> {
    if (!supabase) {
      console.warn("Skipping contact form submission because Supabase is not configured.");
      return {
        success: false,
        errors: ["המערכת אינה מוגדרת. אנא נסה מאוחר יותר או צור קשר עם התמיכה."],
      };
    }

    try {
      const { data: responseData, error } = await supabase.functions.invoke('contact-webhook', {
        body: {
          name: data.name,
          companyName: data.companyName,
          businessDescription: data.businessDescription,
          email: data.email || "",
          phone: data.phone,
        },
      });

      if (error) {
        console.error("Failed to submit contact form:", error);
        return {
          success: false,
          errors: ["שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר."],
        };
      }

      if (responseData?.error) {
        console.error("Contact form validation error:", responseData.error);
        return {
          success: false,
          errors: responseData.details || ["שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר."],
        };
      }

      console.log("Contact form submitted successfully");
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
