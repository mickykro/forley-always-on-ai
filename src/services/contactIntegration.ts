interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface IntegrationConfig {
  webhookUrl?: string;
  emailService?: {
    type: 'emailjs' | 'formspree' | 'netlify';
    config: any;
  };
  zapierWebhook?: string;
  slackWebhook?: string;
}

export class ContactIntegrationService {
  private static config: IntegrationConfig = {
    webhookUrl: "https://hook.eu2.make.com/plnfn1an3nb92tnvi6xctpt9wwylqfx8"
  };

  static setConfig(config: IntegrationConfig) {
    this.config = { ...this.config, ...config };
    // Store in localStorage for persistence
    localStorage.setItem('contact_integration_config', JSON.stringify(this.config));
  }

  static getConfig(): IntegrationConfig {
    try {
      const stored = localStorage.getItem('contact_integration_config');
      if (stored) {
        this.config = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load integration config:', error);
    }
    return this.config;
  }

  static async sendToWebhook(data: ContactData, webhookUrl: string): Promise<boolean> {
    try {
      const payload = {
        ...data,
        timestamp: new Date().toISOString(),
        source: 'call4li_contact_form',
        user_agent: navigator.userAgent,
        page_url: window.location.href
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

      console.log('Webhook sent successfully:', payload);
      return true;
    } catch (error) {
      console.error('Failed to send webhook:', error);
      return false;
    }
  }

  static async sendToZapier(data: ContactData, zapierUrl: string): Promise<boolean> {
    return this.sendToWebhook(data, zapierUrl);
  }

  static async sendToSlack(data: ContactData, slackUrl: string): Promise<boolean> {
    try {
      const slackPayload = {
        text: `🆕 New Contact Form Submission`,
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "🦉 New Contact from Call4li"
            }
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Name:*\n${data.name}`
              },
              {
                type: "mrkdwn",
                text: `*Phone:*\n${data.phone}`
              }
            ]
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Message:*\n${data.message}`
            }
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `Submitted at ${new Date().toLocaleString('he-IL')}`
              }
            ]
          }
        ]
      };

      const response = await fetch(slackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slackPayload),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to send to Slack:', error);
      return false;
    }
  }

  static async sendToEmail(data: ContactData): Promise<boolean> {
    const config = this.getConfig();
    
    if (config.emailService?.type === 'formspree' && config.emailService.config.endpoint) {
      try {
        const response = await fetch(config.emailService.config.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            message: data.message,
            _subject: `New Contact Form Submission from ${data.name}`,
          }),
        });

        return response.ok;
      } catch (error) {
        console.error('Failed to send via Formspree:', error);
        return false;
      }
    }

    return false;
  }

  static async submitContactForm(data: ContactData): Promise<{ success: boolean; errors: string[] }> {
    const config = this.getConfig();
    const results: boolean[] = [];
    const errors: string[] = [];

    // Send to webhook if configured
    if (config.webhookUrl) {
      try {
        const success = await this.sendToWebhook(data, config.webhookUrl);
        results.push(success);
        if (!success) errors.push('Webhook failed');
      } catch (error) {
        errors.push('Webhook error');
      }
    }

    // Send to Zapier if configured
    if (config.zapierWebhook) {
      try {
        const success = await this.sendToZapier(data, config.zapierWebhook);
        results.push(success);
        if (!success) errors.push('Zapier failed');
      } catch (error) {
        errors.push('Zapier error');
      }
    }

    // Send to Slack if configured
    if (config.slackWebhook) {
      try {
        const success = await this.sendToSlack(data, config.slackWebhook);
        results.push(success);
        if (!success) errors.push('Slack failed');
      } catch (error) {
        errors.push('Slack error');
      }
    }

    // Send via email service if configured
    if (config.emailService) {
      try {
        const success = await this.sendToEmail(data);
        results.push(success);
        if (!success) errors.push('Email service failed');
      } catch (error) {
        errors.push('Email service error');
      }
    }

    // If no integrations configured, return false
    if (results.length === 0) {
      errors.push('No integrations configured');
      return { success: false, errors };
    }

    // Return success if at least one integration succeeded
    const success = results.some(result => result);
    return { success, errors };
  }
}