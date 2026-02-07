# Deployment Guide - Personal Drone Study Guide

This guide covers deploying your study guide to various platforms.

## Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

**Why Netlify?**
- Automatic HTTPS
- Free tier included
- Instant previews
- Easy custom domains

**Deploy Steps:**

1. **Create GitHub Repo:**
   ```bash
   # Already initialized! Now create repo on GitHub.com
   # Then run:
   git remote add origin https://github.com/YOUR-USERNAME/PersonalDroneStudyGuide.git
   git add .
   git commit -m "Initial commit: Drone study guide app"
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select `PersonalDroneStudyGuide` repo
   - Build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

3. **Done!** You'll get a URL like `your-site-name.netlify.app`

4. **Optional: Custom Domain**
   - In Netlify dashboard: Site settings → Domain management
   - Add custom domain like `study.vistafly.com`

---

### Option 2: Vercel (Great for React)

**Deploy Steps:**

1. **Push to GitHub** (same as above)

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repo
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Done!** You'll get a URL like `your-project.vercel.app`

---

### Option 3: GitHub Pages (Free hosting)

**Note:** Requires updating `base` in `vite.config.js` to `'/PersonalDroneStudyGuide/'`

1. **Update vite.config.js:**
   ```js
   base: '/PersonalDroneStudyGuide/', // Your repo name
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add to package.json scripts:**
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: `gh-pages` branch
   - Your site: `https://YOUR-USERNAME.github.io/PersonalDroneStudyGuide/`

---

## Connecting to Your Vistafly Website

Once deployed, add a link from your company website:

**Option A: Direct Link**
```html
<a href="https://your-study-guide.netlify.app" target="_blank">
  Drone Training Portal
</a>
```

**Option B: Custom Subdomain**
Set up DNS to point `study.vistafly.com` to your deployed study guide.

**Option C: Embedded (iframe)**
```html
<iframe src="https://your-study-guide.netlify.app"
        width="100%" height="800px" frameborder="0">
</iframe>
```

---

## Build Locally

Test production build before deploying:

```bash
npm run build     # Creates dist/ folder
npm run preview   # Preview production build at localhost:4173
```

---

## Environment Variables

If you need environment variables (API keys, etc.):

1. Create `.env` file (already gitignored)
2. Use `VITE_` prefix:
   ```
   VITE_API_KEY=your-key-here
   ```
3. Access in code:
   ```js
   const apiKey = import.meta.env.VITE_API_KEY
   ```
4. Add to Netlify/Vercel dashboard under Environment Variables

---

## Troubleshooting

**Issue: Blank page after deploy**
- Check browser console for errors
- Verify `base` path in vite.config.js matches your deployment URL

**Issue: Routes don't work (404 on refresh)**
- Add `_redirects` file to public folder:
  ```
  /*    /index.html   200
  ```

**Issue: Assets not loading**
- Check that `base` path is correct in vite.config.js
- Ensure all imports use relative paths

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy to Netlify/Vercel
3. ✅ Get your live URL
4. ✅ Add link from Vistafly website
5. 🎉 Share with your team!
