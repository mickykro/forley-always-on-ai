import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max requests per IP per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

// Validation functions
function validateString(value: unknown, minLength: number, maxLength: number): boolean {
  return typeof value === 'string' && value.trim().length >= minLength && value.trim().length <= maxLength;
}

function validateEmail(value: unknown): boolean {
  if (typeof value !== 'string' || value === '') return true; // Optional field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) && value.length <= 255;
}

function validatePhone(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const phoneRegex = /^(\+972|972|0)?[0-9]{9,10}$/;
  return phoneRegex.test(value.replace(/[\s-]/g, ''));
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get('N8N_CONTACT_WEBHOOK_URL');
    if (!webhookUrl) {
      console.error('N8N_CONTACT_WEBHOOK_URL not configured');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';

    // Check rate limit
    if (isRateLimited(clientIp)) {
      console.log(`Rate limited IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    
    // Server-side validation
    const errors: string[] = [];
    
    if (!validateString(body.name, 2, 100)) {
      errors.push('Name must be between 2 and 100 characters');
    }
    
    if (!validateString(body.companyName, 2, 100)) {
      errors.push('Company name must be between 2 and 100 characters');
    }
    
    if (!validateString(body.businessDescription, 10, 1000)) {
      errors.push('Business description must be between 10 and 1000 characters');
    }
    
    if (!validatePhone(body.phone)) {
      errors.push('Invalid phone number format');
    }
    
    if (!validateEmail(body.email)) {
      errors.push('Invalid email format');
    }

    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize and normalize data
    const normalizedPhone = (() => {
      const cleanPhone = body.phone.replace(/[\s-]/g, '').trim();
      if (cleanPhone.startsWith('0')) {
        return `+972${cleanPhone.substring(1)}`;
      }
      if (cleanPhone.startsWith('972')) {
        return `+${cleanPhone}`;
      }
      return cleanPhone;
    })();

    const payload = {
      name: body.name.trim().substring(0, 100),
      company_name: body.companyName.trim().substring(0, 100),
      business_description: body.businessDescription.trim().substring(0, 1000),
      email: (body.email || '').trim().substring(0, 255),
      phone: normalizedPhone,
      timestamp: new Date().toISOString(),
      source: 'website',
    };

    console.log('Forwarding validated contact form to n8n webhook');

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

    console.log('Contact form submitted successfully');
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in contact-webhook function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
