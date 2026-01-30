import { supabase } from "@/integrations/supabase/client";
import { hashClientId } from "@/lib/hashUtils";

export interface OnboardingEvent {
  event: "page_opened" | "button_clicked";
  client_id: string;
  action?: "activate" | "cancel" | "check";
}

export const logOnboardingEvent = async (eventData: OnboardingEvent): Promise<void> => {
  try {
    if (!supabase) {
      console.warn("Skipping onboarding event logging because Supabase is not configured.");
      return;
    }

    // Hash the client_id to prevent PII exposure in logs
    const hashedClientId = await hashClientId(eventData.client_id);
    
    const { error } = await supabase.functions.invoke('onboarding-webhook', {
      body: {
        ...eventData,
        client_id: hashedClientId, // Send hashed version to external systems
      },
    });

    if (error) {
      console.error("Failed to log onboarding event");
    }
  } catch (error) {
    console.error("Failed to log onboarding event");
    // Silently fail - don't block user experience
  }
};
