const WEBHOOK_URL = "https://n8n.srv1173890.hstgr.cloud/webhook-test/87b6449c-9a9d-4167-9ce4-cdce8428033f";

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
