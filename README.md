# Modern Minimalist Portfolio

A sleek, single-page portfolio website built with Jekyll and deployed automatically to GitHub Pages.

## ✨ Features

- **Minimalist Design**: Clean Tokyo Night/Mocha-inspired theme with purple/violet accents
- **Smooth Animations**: Subtle glow effects on hover
- **Responsive**: Looks great on all devices
- **Fast**: Optimized for performance
- **Easy to Customize**: All content is in a single YAML file
- **Automated Deployment**: GitHub Actions handles building and deployment

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone git@github.com:Lukaspspsl/lpspsl.git
cd lpspsl
```

### 2. Install Dependencies

```bash
bundle install
```

### 3. Customize Your Content

Edit `_data/profile.yml` with your information:

```yaml
name: 'Your Name'
tagline: 'Your Title/Tagline'

bio: |
  Your personal introduction here...

skills:
  - category: 'Languages'
    items: 'JavaScript, TypeScript, Python'
  - category: 'Frontend'
    items: 'React, Vue.js, TailwindCSS'

contact:
  email: 'your.email@example.com'
  linkedin: 'https://linkedin.com/in/yourprofile'
  github: 'https://github.com/yourusername'
  calendly: 'https://calendly.com/yourname'
```

### 4. Add Your Profile Photo

Replace `assets/images/profile.jpg` with your own photo (recommended: 400x400px or larger, square format).

### 5. Local Development

Run the site locally to preview changes:

```bash
bundle exec jekyll serve
```

Then open `http://localhost:4000/lpspsl/` in your browser.

### 6. Deploy

Push your changes to the `main` branch:

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

GitHub Actions will automatically build and deploy your site to GitHub Pages.

## 🎨 Customization

### Colors

Edit the color variables in `assets/css/main.scss`:

```scss
$color-bg: #1a1b26; // Background color (Tokyo Night)
$color-accent: #bb9af7; // Accent color (purple/violet)
$color-text: #c0caf5; // Text color
```

### Sections

The site includes these sections (all in `index.html`):

- Hero (photo, name, tagline)
- Contact (email, LinkedIn, GitHub, Calendly)
- Bio (personal introduction)
- Skills (tech stack and tools)

### Fonts

The site uses Google Fonts (Inter). To change the font, edit the link in `_layouts/default.html` and update the `$font-family` variable in `main.scss`.

## 📁 Project Structure

```
.
├── _config.yml              # Jekyll configuration
├── _data/
│   └── profile.yml          # Your portfolio data
├── _layouts/
│   └── default.html         # HTML template
├── assets/
│   ├── css/
│   │   └── main.scss        # Styles
│   ├── js/
│   │   └── main.js          # Interactive effects
│   └── images/
│       └── profile.jpg      # Your photo
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
├── index.html               # Main page content
├── Gemfile                  # Ruby dependencies
└── README.md                # This file
```

## 🔧 Troubleshooting

### Site not deploying?

1. Check GitHub Actions tab for build errors
2. Ensure GitHub Pages is enabled in repository settings
3. Verify the source is set to "GitHub Actions"

### Local preview not working?

```bash
# Install bundler if needed
gem install bundler

# Update dependencies
bundle update

# Try again
bundle exec jekyll serve
```

### Images not showing?

- Ensure your profile photo is at `assets/images/profile.jpg`
- Check that the path in `_data/profile.yml` matches

## 📝 License

Feel free to use this template for your own portfolio!

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a pull request.

---

Made with ❤️ using Jekyll
