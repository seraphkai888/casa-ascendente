# 🏛️ Casa Ascendente - Setup Guide

> Complete setup instructions for the family website

---

## ✅ What's Already Done

1. **Website Built** — Full landing page with all sections
2. **GitHub Pages Enabled** — Automatic deployment on every push
3. **Domain** — https://seraphkai888.github.io/casa-ascendente/
4. **Automation** — GitHub Actions deploys on every commit

---

## 📧 Email Capture Setup (Formspree - FREE)

### Step 1: Create Formspree Account
1. Go to https://formspree.io
2. Sign up with email (FREE tier = 50 submissions/month)
3. Click "New Form"
4. Name it "Casa Ascendente Signups"
5. Copy your form ID (looks like: `f/xyzabc123`)

### Step 2: Update the Website
1. Open `src/index.html`
2. Find `action="https://formspree.io/f/YOUR_FORM_ID"`
3. Replace `YOUR_FORM_ID` with your actual form ID
4. Commit and push — auto-deploys!

### Step 3: Configure Formspree
- Set up email notifications
- Add a thank-you redirect URL (optional)
- Enable reCAPTCHA (optional, prevents spam)

---

## 🎨 Custom Domain (Optional)

### Option 1: Buy a domain
- Recommended: Namecheap, Porkbun, Cloudflare
- Suggestions: 
  - casaascendente.com
  - ascendente.family
  - theascendinghouse.com

### Option 2: Configure DNS
1. Add CNAME record pointing to `seraphkai888.github.io`
2. In GitHub repo Settings → Pages → Custom domain
3. Enter your domain and save
4. Enable "Enforce HTTPS"

---

## 🛍️ Merchandise Setup (Print-on-Demand)

### Recommended: Printful + Etsy

**Printful (FREE to start)**
1. Create account at printful.com
2. Upload designs (Seraph emblem, wordmark, etc.)
3. Create products (tees, hoodies, etc.)
4. Connect to Etsy

**Etsy Store (FREE listing, fees on sale)**
1. Create Etsy seller account
2. Connect Printful integration
3. Products auto-sync
4. Orders auto-fulfill

### Alternative: Shopify
- $29/month but more control
- Use Printful or Printify app

---

## 📊 Analytics (Optional)

### Privacy-Friendly Options
- **Plausible** — $9/mo, privacy-focused
- **Simple Analytics** — $9/mo, no cookies
- **Google Analytics** — Free, but tracks users

### Adding to Site
Add script before `</head>` in index.html

---

## 🔄 Making Updates

### Edit Content
1. Edit files in `src/` folder
2. Commit: `git add -A && git commit -m "Update: description"`
3. Push: `git push origin main`
4. Auto-deploys in ~30 seconds!

### Local Preview
```bash
cd src && python3 -m http.server 8000
# Open http://localhost:8000
```

---

## 📁 Project Structure

```
casa-ascendente-website/
├── .github/workflows/deploy.yml   # Auto-deployment
├── src/
│   ├── index.html                 # Main page
│   ├── css/style.css              # Styles
│   ├── js/main.js                 # Scripts
│   └── assets/images/             # (copied from root)
├── assets/images/                 # Source images
├── docs/                          # Documentation
├── STRATEGY.md                    # Brand strategy
└── README.md                      # Project readme
```

---

## 🚨 Troubleshooting

**Site not updating?**
- Check GitHub Actions tab for failed runs
- Clear browser cache (Ctrl+Shift+R)

**Forms not working?**
- Verify Formspree form ID is correct
- Check Formspree dashboard for submissions

**Images not loading?**
- Ensure images are in `assets/images/`
- Check file paths are lowercase

---

*Ascendemos Siempre* 🏛️
