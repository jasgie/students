# GitHub Pages Deployment Guide

Follow these steps to deploy CodeLab to GitHub Pages and make it accessible online.

## Quick Deployment Steps

### 1. Upload to GitHub

1. **Create a new repository** on GitHub
   - Go to [github.com](https://github.com) and sign in
   - Click "New repository" or the "+" button
   - Name it something like `codelab-editor` or `student-code-editor`
   - Make it **Public** (required for free GitHub Pages)
   - Initialize with README (optional)

2. **Upload your files**
   - Click "uploading an existing file" or use Git commands
   - Upload all files from your CodeLab folder:
     - `index.html`
     - `app.js`
     - `styles.css`
     - `sw.js`
     - `manifest.json`
     - `README.md`
     - `examples.md`

### 2. Enable GitHub Pages

1. **Go to repository Settings**
   - Click on the "Settings" tab in your repository
   - Scroll down to the "Pages" section (in the left sidebar)

2. **Configure Pages**
   - Under "Source", select "Deploy from a branch"
   - Choose "main" or "master" branch
   - Select "/ (root)" folder
   - Click "Save"

3. **Wait for deployment**
   - GitHub will build and deploy your site
   - This usually takes 1-5 minutes
   - You'll see a green checkmark when ready

### 3. Access Your Site

Your CodeLab will be available at:
```
https://yourusername.github.io/repository-name
```

For example:
- Username: `johndoe`
- Repository: `codelab-editor`
- URL: `https://johndoe.github.io/codelab-editor`

## Alternative: GitHub Desktop Method

If you prefer a GUI approach:

1. **Download GitHub Desktop** from [desktop.github.com](https://desktop.github.com)
2. **Clone or create** a new repository
3. **Copy files** into the local repository folder
4. **Commit and push** changes
5. **Enable Pages** in repository settings

## Git Command Line Method

If you're comfortable with Git:

```bash
# Initialize repository
git init
git add .
git commit -m "Initial commit: CodeLab Student Code Editor"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/yourusername/repository-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Troubleshooting

### Site Not Loading
- **Check repository is public** (required for free Pages)
- **Verify file names** - `index.html` must be in root directory
- **Wait a few minutes** - deployment takes time
- **Check GitHub Actions** tab for build errors

### CDN Resources Not Loading
- **HTTPS requirement** - GitHub Pages uses HTTPS
- **All CDN links in index.html are HTTPS** - this is already configured
- **Mixed content errors** - ensure all resources use HTTPS

### Judge0 API Issues
- **CORS restrictions** may apply when hosted
- **API limits** - free tier has usage limits
- **Fallback messaging** - app will show limited functionality warning

## Custom Domain (Optional)

To use your own domain:

1. **Add CNAME file** to repository root with your domain
2. **Configure DNS** to point to `yourusername.github.io`
3. **Update Pages settings** in GitHub to use custom domain
4. **Enable HTTPS** (recommended)

## Performance Optimization

Your CodeLab is already optimized with:
- ✅ **CDN resources** for fast loading
- ✅ **Service Worker** for offline support
- ✅ **Compressed assets** via GitHub Pages
- ✅ **Progressive Web App** features

## Updates and Maintenance

To update your deployed site:
1. **Edit files** locally or directly on GitHub
2. **Commit changes** to the main branch
3. **GitHub Pages will auto-deploy** within minutes

## Sharing Your CodeLab

Once deployed, you can:
- **Share the URL** with students
- **Embed in course websites** using iframes
- **Add to learning management systems**
- **Use in coding workshops** and tutorials

## Example Deployed Sites

Your CodeLab will look and function exactly like the local version, but will be accessible from anywhere with internet access!

---

**Need help?** Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or open an issue in your repository.
