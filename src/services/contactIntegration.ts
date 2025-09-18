interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const WEBHOOK_URL = "https://hook.eu2.make.com/plnfn1an3nb92tnvi6xctpt9wwylqfx8";

export class ContactIntegrationService {
  static async submitContactForm(data: ContactData): Promise<{ success: boolean; errors: string[] }> {
    try {
      const payload = {
        ...data,
        timestamp: new Date().toISOString(),
        source: 'website',
        user_agent: navigator.userAgent,
        page_url: window.location.href
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      console.log('Webhook sent successfully:', payload);
      return { success: true, errors: [] };
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      return { 
        success: false, 
        errors: ['שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.'] 
      };
    }
  }
}