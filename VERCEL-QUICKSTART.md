# Vercel Quick Start Guide

## 🚀 Deploy in 5 Minutes

### 1. Build & Verify Locally
```bash
npm install
npm run build
npm run verify
```

### 2. Push to Git
```bash
git add .
git commit -m "Production-ready for Vercel"
git push origin main
```

### 3. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your repository
4. Add environment variables (see below)
5. Click "Deploy"

### 4. Environment Variables (Copy to Vercel)

```
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_SUPABASE_URL=https://your_project_id.supabase.co
VITE_DOMAIN_URL=https://yourdomain.vercel.app
VITE_WHATSAPP_PHONE=972553163293
VITE_OG_IMAGE=https://your-og-image-url.com/image.png
N8N_CONTACT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact
N8N_ONBOARDING_WEBHOOK_URL=https://your-n8n-instance.com/webhook/onboarding
```

### 5. Deploy Supabase Functions (Separate)
```bash
supabase login
supabase link --project-ref your_project_id
supabase functions deploy contact-webhook
supabase functions deploy onboarding-webhook
supabase secrets set N8N_CONTACT_WEBHOOK_URL=your_url
supabase secrets set N8N_ONBOARDING_WEBHOOK_URL=your_url
```

## ✅ Done!

Your site is now live. For detailed documentation, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 Quick Commands

```bash
npm run dev              # Local development
npm run build            # Production build
npm run verify           # Verify build
npm run preview          # Preview production build
npm run build:production # Build with linting
```
