# Lei Wang's Personal Website

A modern, responsive personal academic website for Lei Wang, Computational Quantum Physicist at Institute of Physics, CAS.

## 🎨 Recent Updates (December 2025)

The website has been completely modernized with:

### Markdown-Based Content Management 📝
**The biggest improvement**: You can now update your entire website by simply editing Markdown files!

- **No HTML Required**: Edit simple text files to add talks, lectures, and events
- **Automatic Formatting**: Content is automatically styled and organized
- **Easy Maintenance**: Just edit `content/talks.md`, `content/lectures.md`, or `content/conferences.md`

📖 **See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for detailed instructions on updating content**

### Design Improvements
- **Modern CSS Framework**: Clean, professional design with CSS variables for easy customization
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Improved Typography**: Better readability with modern font stacks
- **Enhanced Navigation**: Consistent navigation across all pages
- **Visual Hierarchy**: Clear content organization with cards and lists
- **Accessibility**: Better focus states and semantic HTML
- **Professional Color Scheme**: Sophisticated blue/gray palette

### Technical Improvements
- **HTML5 Standards**: Updated to modern HTML5 structure
- **Markdown Rendering**: Client-side rendering with marked.js
- **SEO Optimized**: Added meta descriptions and proper document structure
- **Performance**: Lazy loading for images and optimized assets
- **Cross-browser Compatible**: Works on all modern browsers
- **Print-friendly**: Optimized styles for printing

## 📁 Structure

```
/
├── index.html          # Homepage with profile and navigation
├── talks.html          # Research talks (loads from talks.md)
├── lectures.html       # Lectures (loads from lectures.md)
├── conferences.html    # Events (loads from conferences.md)
├── content/            # 📝 Edit these Markdown files to update content!
│   ├── talks.md
│   ├── lectures.md
│   └── conferences.md
├── css/
│   └── modern-style.css # Modern stylesheet
├── js/
│   └── markdown-loader.js # Markdown rendering engine
├── lectures/           # Lecture PDFs
├── talks/              # Talk PDFs
└── ml2016/             # 2016 conference website
```

## ✏️ Quick Start: Updating Content

### To Add a New Talk:

1. Open `content/talks.md`
2. Add your talk under the appropriate year:
   ```markdown
   ## 2025
   - [Talk Title, Location, Date](talks/filename.pdf)
   ```
3. Commit and push!

### To Add a New Lecture:

1. Open `content/lectures.md`
2. Add your lecture:
   ```markdown
   ## 2025
   - [Lecture Title, Location, Date](lectures/filename.pdf)
   ```
3. Done!

📖 **For complete instructions, see [CONTENT_GUIDE.md](CONTENT_GUIDE.md)**

## 🎯 Features

- **Markdown-Based**: Update content without touching HTML
- **Clean, Modern Design**: Professional appearance suitable for academic setting
- **Mobile-First**: Responsive design that works perfectly on all screen sizes
- **Easy Navigation**: Consistent navigation links across all pages
- **Fast Loading**: Optimized CSS and JavaScript for quick page loads
- **Maintainable**: Update content by editing simple text files
- **Automatic Formatting**: Content is automatically styled from Markdown

## 🛠️ Customization

### Colors and Styling
Edit the CSS variables in `css/modern-style.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Main headings color */
    --secondary-color: #3498db;    /* Links and accents */
    --accent-color: #e74c3c;       /* Hover states */
    /* ... more variables ... */
}
```

### Content
Simply edit the Markdown files in the `content/` directory. No programming knowledge needed!

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment Workflow

```bash
# 1. Edit content (example: adding a new talk)
vim content/talks.md

# 2. Upload any new PDFs
cp ~/Downloads/new-talk.pdf talks/

# 3. Commit and push
git add content/talks.md talks/new-talk.pdf
git commit -m "Add new talk from conference"
git push

# 4. GitHub Pages automatically deploys (takes ~1 minute)
```

## 📚 Documentation

- **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)** - Complete guide for updating content
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick cheat sheet for common tasks
- **[TESTING.md](TESTING.md)** - How to test the website locally
- **[Markdown Syntax](https://www.markdownguide.org/basic-syntax/)** - Learn Markdown basics

## 💡 Why This System?

### Before (HTML)
```html
<li>
    <h2><a href="talks/file.pdf">Talk Title, Location, Date</a></h2>
</li>
```

### After (Markdown)
```markdown
- [Talk Title, Location, Date](talks/file.pdf)
```

**Much simpler!** 🎉

## 🔧 Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Markdown Parser**: marked.js (loaded from CDN)
- **Hosting**: GitHub Pages
- **No Build Step**: Everything runs client-side

## 📄 License

© Lei Wang. All rights reserved.

