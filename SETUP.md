# Setup Instructions

## Initial Setup

Your portfolio site is ready! Follow these steps to get it deployed:

### 1. Review and Update Your Content

Open `_data/profile.yml` and replace the placeholder content with your actual information:

- Name and tagline
- Personal bio/introduction
- Skills and tech stack
- Contact information (email, LinkedIn, GitHub, Calendly)

### 2. Add Your Profile Photo

Replace `assets/images/profile.jpg` with your own professional photo:

- Recommended size: 400x400px or larger
- Format: JPG, PNG, or WebP
- Keep the filename as `profile.jpg` or update the path in `_data/profile.yml`

### 3. Initialize Git Repository (if not already done)

```bash
cd /Users/lpspsl/Projects/portfolio
git init
git add .
git commit -m "Initial portfolio setup"
```

### 4. Connect to GitHub Repository

```bash
git remote add origin git@github.com:Lukaspspsl/lpspsl.git
git branch -M main
git push -u origin main
```

### 5. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/Lukaspspsl/lpspsl
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **GitHub Actions**
4. GitHub Actions will automatically build and deploy your site

### 6. Access Your Live Site

After the first successful deployment (check the Actions tab), your site will be available at:

**https://lukaspspsl.github.io/lpspsl/**

## Local Development

To preview your site locally before pushing:

```bash
# Install dependencies (first time only)
bundle install

# Start local server
bundle exec jekyll serve

# Open in browser: http://localhost:4000/lpspsl/
```

## Making Updates

1. Edit `_data/profile.yml` with your changes
2. Test locally with `bundle exec jekyll serve`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```
4. GitHub Actions will automatically rebuild and deploy

## Customization Tips

### Change Color Scheme

Edit `assets/css/main.scss` color variables (lines 4-10):

```scss
$color-bg: #1a1b26; // Background (Tokyo Night theme)
$color-accent: #bb9af7; // Accent color (purple/violet)
$color-text: #c0caf5; // Text color
```

### Adjust Sections

All content sections are in `index.html`. You can:

- Reorder sections
- Remove sections you don't need
- Adjust text and styling

### Modify Animations

Edit `assets/js/main.js` to adjust hover effects and animations.

## Troubleshooting

**Site not building?**

- Check the Actions tab on GitHub for error details
- Verify `Gemfile` dependencies are correct

**Styles not loading?**

- Clear browser cache
- Check browser console for errors
- Verify `baseurl` in `_config.yml` matches repository name

**Need help?**

- Check README.md for more details
- Review Jekyll documentation: https://jekyllrb.com/docs/

---

You're all set! 🚀
