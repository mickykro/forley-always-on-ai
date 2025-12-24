import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('VITE_DOMAIN_URL') || 'https://call4li.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // Max requests per client_id per day
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in ms

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientId);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

// Validation functions
function validateEvent(value: unknown): boolean {
  return value === 'page_opened' || value === 'button_clicked';
}

function validateAction(value: unknown): boolean {
  if (value === undefined || value === null) return true; // Optional field
  return value === 'activate' || value === 'cancel' || value === 'check';
}

function validateClientId(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  // Allow alphanumeric, hyphens, underscores - typical client ID format
  const clientIdRegex = /^[a-zA-Z0-9_-]{1,100}$/;
  return clientIdRegex.test(value);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get('N8N_ONBOARDING_WEBHOOK_URL');
    if (!webhookUrl) {
      console.error('N8N_ONBOARDING_WEBHOOK_URL not configured');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    
    // Server-side validation
    const errors: string[] = [];
    
    if (!validateEvent(body.event)) {
      errors.push('Invalid event type. Must be "page_opened" or "button_clicked"');
    }
    
    if (!validateClientId(body.client_id)) {
      errors.push('Invalid client_id format');
    }
    
    if (!validateAction(body.action)) {
      errors.push('Invalid action. Must be "activate", "cancel", or "check"');
    }

    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit by client_id
    if (isRateLimited(body.client_id)) {
      console.log(`Rate limited client_id: ${body.client_id}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize and prepare payload
    const payload = {
      event: body.event,
      client_id: body.client_id.substring(0, 100),
      action: body.action || undefined,
      timestamp: new Date().toISOString(),
    };

    console.log('Forwarding validated onboarding event to n8n webhook');

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Webhook responded with error:', response.status);
      return new Response(
        JSON.stringify({ error: 'Failed to process request' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Onboarding event logged successfully');
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in onboarding-webhook function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
