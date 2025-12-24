# Production Deployment Guide for Vercel

## ✅ Production-Ready Status

This project is fully optimized and ready for Vercel deployment. All security, performance, and configuration requirements have been addressed.

## 🔧 Production Optimizations Completed

### Security Enhancements
- ✅ **Environment Variables**: `.env` removed from git and properly gitignored
- ✅ **Security Headers**: X-Content-Type-Options, X-Frame-Options, XSS-Protection configured
- ✅ **CORS Configuration**: Restricted to specific domain, not wildcard
- ✅ **JWT Verification**: Enabled for all Supabase edge functions
- ✅ **Rate Limiting**: Implemented on webhook endpoints

### Performance Optimizations
- ✅ **Code Splitting**: Lazy loading implemented for all routes
- ✅ **Bundle Optimization**: Dynamic imports reduce initial load
- ✅ **Asset Caching**: Long-term caching headers for static assets
- ✅ **Browser Data**: Updated caniuse-lite database

### Configuration
- ✅ **Vercel Config**: `vercel.json` created with SPA routing
- ✅ **Environment Variables**: All values externalized
- ✅ **Build Verification**: Automated verification script added
- ✅ **Build Process**: Optimized for production deployment

## 🚀 Step-by-Step Vercel Deployment

### Step 1: Pre-Deployment Verification

Before deploying, verify your build locally:

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Verify the build
npm run verify

# Preview locally (optional)
npm run preview
```

### Step 2: Prepare Your Repository

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Production-ready for Vercel deployment"
   git push origin main
   ```

2. **Verify `.env` is not in git:**
   ```bash
   git ls-files | grep .env
   # Should return nothing (only .env.example should exist)
   ```

### Step 3: Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect the configuration from `vercel.json`

### Step 4: Configure Environment Variables

In Vercel dashboard, add these environment variables:

**Required - Supabase Configuration:**
```bash
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_SUPABASE_URL=https://your_project_id.supabase.co
```

**Required - Domain & WhatsApp:**
```bash
VITE_DOMAIN_URL=https://yourdomain.vercel.app
VITE_WHATSAPP_PHONE=972553163293
```

**Required - N8N Webhooks:**
```bash
N8N_CONTACT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact
N8N_ONBOARDING_WEBHOOK_URL=https://your-n8n-instance.com/webhook/onboarding
```

**Optional - Custom Branding:**
```bash
VITE_OG_IMAGE=https://your-og-image-url.com/image.png
```

💡 **Tip:** Use the same values from your local `.env` file (if you have one) or refer to `.env.example`

### Step 5: Deploy

1. Click "Deploy" in Vercel dashboard
2. Wait for the build to complete (usually 1-2 minutes)
3. Vercel will provide you with a deployment URL

### Step 6: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. **Important:** Update `VITE_DOMAIN_URL` environment variable to your custom domain
6. Redeploy to apply changes

### Step 7: Deploy Supabase Edge Functions

The Vercel deployment only handles the frontend. Deploy edge functions separately:

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your_project_id

# Deploy functions
supabase functions deploy contact-webhook
supabase functions deploy onboarding-webhook

# Set secrets for edge functions
supabase secrets set N8N_CONTACT_WEBHOOK_URL=your_contact_webhook_url
supabase secrets set N8N_ONBOARDING_WEBHOOK_URL=your_onboarding_webhook_url
```

## 📋 Post-Deployment Testing Checklist

After deployment, verify everything works:

### Functionality Tests
- [ ] **Homepage loads correctly** - Visit your deployment URL
- [ ] **Contact form submission** - Fill and submit the form
- [ ] **WhatsApp link works** - Click WhatsApp button (should open WhatsApp with correct number)
- [ ] **Navigation works** - Test all menu links and routes
- [ ] **Onboarding tracking** - Check Supabase logs for event tracking
- [ ] **404 page** - Visit a non-existent route to test error handling

### Performance Tests
- [ ] **Page load speed** - Should be under 3 seconds
- [ ] **Mobile responsiveness** - Test on different screen sizes
- [ ] **RTL support** - Verify Hebrew text displays correctly

### SEO Tests
- [ ] **Meta tags** - Use browser DevTools to check `<head>` tags
- [ ] **Canonical URLs** - Should match your domain
- [ ] **Open Graph preview** - Test URL on social media platforms

### Security Tests
- [ ] **Environment variables** - Verify no secrets in source code (View Page Source)
- [ ] **CORS headers** - Edge functions should only accept requests from your domain
- [ ] **HTTPS** - All pages should use HTTPS (Vercel provides this automatically)

## 🔧 Troubleshooting

### Build Fails on Vercel

**Problem:** Build fails with module errors
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Problem:** Environment variables not loading
**Solution:** Ensure all `VITE_*` prefixed variables are set in Vercel dashboard

### Contact Form Not Working

**Problem:** Form submission fails
**Solution:**
1. Check Supabase edge function logs: `supabase functions logs contact-webhook`
2. Verify `N8N_CONTACT_WEBHOOK_URL` is set correctly
3. Check browser console for CORS errors
4. Ensure `VITE_DOMAIN_URL` matches your actual domain

### Routes Return 404

**Problem:** Direct URL access returns 404
**Solution:** Vercel should use `vercel.json` rewrites automatically. If not, redeploy.

### Slow Page Load

**Problem:** Initial load is slow
**Solution:**
- Lazy loading is already implemented
- Check Network tab in DevTools to identify large assets
- Consider optimizing video files in `/src/assets`

## 🔒 Security Best Practices

### Implemented Security Features
- ✅ **Security Headers**: Protection against XSS, clickjacking, MIME sniffing
- ✅ **CORS Restrictions**: Only your domain can access edge functions
- ✅ **Rate Limiting**: Prevents abuse of webhook endpoints
- ✅ **JWT Verification**: All edge function calls are authenticated
- ✅ **Environment Isolation**: No secrets in client-side code

### Additional Recommendations
- 🔐 **Regular Updates**: Keep dependencies updated with `npm update`
- 🔐 **Audit Dependencies**: Run `npm audit` regularly
- 🔐 **Monitor Logs**: Check Vercel and Supabase logs for suspicious activity
- 🔐 **Backup Data**: If using Supabase database, set up regular backups

## ⚡ Performance Optimizations

### Already Implemented
- ✅ **Code Splitting**: All routes are lazy-loaded
- ✅ **Asset Caching**: Static assets cached for 1 year
- ✅ **Vite Optimizations**: Fast build with SWC compiler
- ✅ **Bundle Analysis**: Verified bundle sizes are reasonable

### Future Improvements (Optional)
- 📊 **Image Optimization**: Convert images to WebP format
- 📊 **Video Optimization**: Compress video files or use lazy loading
- 📊 **CDN**: Vercel already provides global CDN
- 📊 **Analytics**: Add Vercel Analytics for performance monitoring

## 🆘 Need Help?

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/)

### Common Issues
- **Build fails**: Check Node.js version (should be 18.x or 20.x)
- **Environment variables not working**: Ensure they start with `VITE_` for client-side access
- **Edge functions not working**: Deploy them separately via Supabase CLI

## 📊 Project Structure Reference

```
forley-always-on-ai/
├── src/
│   ├── pages/          # All routes (lazy-loaded)
│   ├── components/     # UI components
│   ├── services/       # API integration
│   └── lib/            # Utilities
├── supabase/
│   └── functions/      # Edge functions (deploy separately)
├── dist/               # Build output (generated)
├── vercel.json         # Vercel configuration
├── .env.example        # Environment variable template
└── DEPLOYMENT.md       # This file
```

---

**Last Updated:** December 2024
**Status:** ✅ Production Ready