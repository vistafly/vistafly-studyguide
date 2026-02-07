# GitHub Pages Deployment Guide

Your study guide is configured to deploy to GitHub Pages at:
**https://vistafly.github.io/vistafly-studyguide/**

## Initial Setup (One Time)

### 1. Create GitHub Repository

1. Go to https://github.com/vistafly
2. Click **"New repository"**
3. Repository name: `vistafly-studyguide`
4. Make it **Public** (required for free GitHub Pages)
5. **Don't** initialize with README (we already have code)
6. Click **"Create repository"**

### 2. Push Your Code to GitHub

```bash
# Connect to your GitHub repo
git remote add origin https://github.com/vistafly/vistafly-studyguide.git

# Push your code
git branch -M main
git push -u origin main
```

### 3. Deploy to GitHub Pages

```bash
# This builds and deploys in one command
npm run deploy
```

This command:
- Builds your app (`npm run build`)
- Creates a `gh-pages` branch
- Pushes the `dist` folder to that branch
- GitHub automatically publishes it

### 4. Enable GitHub Pages (First Time Only)

1. Go to your repo: https://github.com/vistafly/vistafly-studyguide
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Source":
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

**Your site will be live at:** https://vistafly.github.io/vistafly-studyguide/

---

## Future Updates

After the initial setup, updating your site is simple:

```bash
# Make changes to your code
# Commit changes
git add .
git commit -m "Updated study content"
git push

# Deploy updated version
npm run deploy
```

That's it! Your changes will be live in ~1 minute.

---

## Testing Before Deploy

Always test your production build locally first:

```bash
npm run build     # Build for production
npm run preview   # Preview at http://localhost:4173
```

Check that everything works before deploying.

---

## Linking from Vistafly Website

Once deployed, add this link to your main Vistafly website:

```html
<a href="https://vistafly.github.io/vistafly-studyguide/" target="_blank">
  Drone Training Portal
</a>
```

Or create a button:

```html
<a href="https://vistafly.github.io/vistafly-studyguide/"
   class="btn btn-primary"
   target="_blank">
  Launch Study Guide
</a>
```

---

## Using a Custom Domain (Optional)

Want to use `study.vistafly.com` instead?

1. **Add CNAME file:**
   ```bash
   echo "study.vistafly.com" > public/CNAME
   git add public/CNAME
   git commit -m "Add custom domain"
   npm run deploy
   ```

2. **Update DNS settings** (in your domain registrar):
   - Add CNAME record: `study` → `vistafly.github.io`

3. **Enable in GitHub:**
   - Go to Settings → Pages
   - Enter `study.vistafly.com` in Custom domain
   - Enable "Enforce HTTPS"

---

## Troubleshooting

### Blank page after deploy
- Check browser console for errors
- Verify `base: '/vistafly-studyguide/'` in [vite.config.js](vite.config.js)
- Make sure repo name matches exactly

### 404 errors on routes
- The `_redirects` file in [public/_redirects](public/_redirects) should handle this
- If issues persist, create a 404.html that redirects to index.html

### Build fails
- Run `npm run build` locally to see errors
- Check that all dependencies are installed: `npm install`
- Ensure Node.js version 18+ is installed

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |
| `git push` | Push code changes to GitHub |

---

## Repository Links

- **GitHub Repo:** https://github.com/vistafly/vistafly-studyguide
- **Live Site:** https://vistafly.github.io/vistafly-studyguide/
- **Settings:** https://github.com/vistafly/vistafly-studyguide/settings/pages
