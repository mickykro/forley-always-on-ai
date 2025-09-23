const WEBHOOK_URL = "https://hook.eu2.make.com/k5cd2cfp5bmt2vwjdywe1ha8g2mins1y";

export interface OnboardingEvent {
  event: "page_opened" | "button_clicked";
  client_id: string;
  action?: "activate" | "cancel" | "check";
}

export const logOnboardingEvent = async (eventData: OnboardingEvent): Promise<void> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to log onboarding event:", error);
    // Silently fail - don't block user experience
  }
};