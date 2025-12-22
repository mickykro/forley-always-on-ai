import { supabase } from "@/integrations/supabase/client";

export interface OnboardingEvent {
  event: "page_opened" | "button_clicked";
  client_id: string;
  action?: "activate" | "cancel" | "check";
}

export const logOnboardingEvent = async (eventData: OnboardingEvent): Promise<void> => {
  try {
    const { error } = await supabase.functions.invoke('onboarding-webhook', {
      body: eventData,
    });

    if (error) {
      console.error("Failed to log onboarding event:", error);
    }
  } catch (error) {
    console.error("Failed to log onboarding event:", error);
    // Silently fail - don't block user experience
  }
};
