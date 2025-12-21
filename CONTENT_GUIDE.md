# Content Management Guide

## 📝 Overview

Your website now uses **Markdown files** for content management. This means you can update your talks, lectures, and events by simply editing text files - no HTML knowledge required!

## 🗂️ Content Structure

All content is stored in the `content/` directory:

```
content/
├── talks.md          # Your research talks
├── lectures.md       # Lectures and teaching
├── conferences.md    # Events you've organized
└── profile.md        # Homepage content (if needed)
```

## ✏️ How to Update Content

### Adding a New Talk

1. Open `content/talks.md`
2. Find the appropriate year section (or create a new one)
3. Add your new talk using this format:

```markdown
## 2025

- [Talk Title, Location, Date](talks/filename.pdf)
```

**Example:**
```markdown
- [Neural Networks for Quantum Systems, MIT, 2025 May](talks/neural-quantum-mit.pdf)
```

### Adding a New Lecture

1. Open `content/lectures.md`
2. Find or create the year section
3. Add your lecture:

```markdown
## 2025

- [Lecture Title, Location, Date](lectures/filename.pdf)
```

**With additional links (notes, recordings, code):**
```markdown
- [Lecture Title, Location, Date](lectures/slides.pdf) ([lecture note](lectures/notes.pdf), [recording](https://example.com/video), [tutorial codes](https://github.com/username/repo))
```

### Adding a New Conference/Event

1. Open `content/conferences.md`
2. Add your event:

```markdown
- [Event Name, Location, Date](https://event-website.com)
```

## 📋 Markdown Syntax Quick Reference

### Headings

```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection (H3)
```

### Links

```markdown
[Link Text](https://url.com)
[Link Text](path/to/file.pdf)
```

### Lists

```markdown
- Item 1
- Item 2
- Item 3
```

### Multiple Links in One Line

```markdown
- [Main Link](file.pdf) ([additional link 1](url1), [additional link 2](url2))
```

## 🎨 Organizing by Year

For talks and lectures, organize content by year using H2 headings:

```markdown
# Research Talks

## 2025

- [Talk 1, Place, Date](talks/file1.pdf)
- [Talk 2, Place, Date](talks/file2.pdf)

## 2024

- [Talk 3, Place, Date](talks/file3.pdf)
```

The system will automatically style these sections with borders and proper spacing.

## 📁 Adding PDF Files

When you add a new talk or lecture:

1. Upload the PDF to the appropriate folder (`talks/` or `lectures/`)
2. Reference it in the markdown file using the relative path
3. Use descriptive filenames (e.g., `neural-networks-MIT-2025.pdf`)

## 🔗 Link Types

### Internal Links (PDFs, Pages)
```markdown
[Download PDF](talks/myfile.pdf)
[Other Page](lectures.html)
```

### External Links (Open in New Tab)
External links (starting with `http://` or `https://`) automatically open in new tabs.

```markdown
[GitHub Repository](https://github.com/username/repo)
```

## 🎯 Best Practices

### 1. **Consistent Formatting**
Keep a consistent format for entries:
```markdown
- [Title, Location, Date](link)
```

### 2. **Chronological Order**
List most recent items first (reverse chronological order).

### 3. **Clear Descriptions**
Make titles descriptive but concise.

### 4. **Test Your Links**
After updating, check that all links work correctly.

### 5. **Commit and Push**
After making changes:
```bash
git add content/
git commit -m "Update talks/lectures"
git push
```

## 🚀 Example Workflow

Let's say you gave a new talk. Here's the complete workflow:

### Step 1: Add the PDF
```bash
# Upload your PDF to the talks folder
cp ~/Downloads/my-new-talk.pdf talks/quantum-ml-2025.pdf
```

### Step 2: Update the Markdown
Edit `content/talks.md`:
```markdown
# Research Talks

## 2025

- [Quantum Machine Learning, Stanford, 2025 March](talks/quantum-ml-2025.pdf)
- [Neural Canonical Transformations (fermions), Paris, 2025 December](talks/NeuralCT-Paris.pdf)
...
```

### Step 3: Commit and Push
```bash
git add talks/quantum-ml-2025.pdf content/talks.md
git commit -m "Add Stanford talk from March 2025"
git push
```

### Step 4: Verify
Visit your website to see the changes (may take a minute to deploy).

## 🛠️ Advanced Features

### Adding Emphasis
```markdown
- [**Important Talk**, Location, Date](file.pdf)
- [*Invited Talk*, Location, Date](file.pdf)
```

### Multiple Resources
```markdown
- [Talk Title, Location, Date](slides.pdf) 
  - [Extended Abstract](abstract.pdf)
  - [Video Recording](https://youtube.com/...)
  - [Code Repository](https://github.com/...)
```

### Comments (Not Displayed)
```markdown
<!-- This is a comment, won't show on website -->
```

## 📱 Preview Changes Locally

To preview your changes before pushing:

1. Open the HTML file in your browser
2. The content will load from the markdown files
3. Check formatting and links

## 🐛 Troubleshooting

### Content Not Showing?
- Check that the markdown file is in the `content/` folder
- Verify the filename matches (e.g., `talks.md` not `talk.md`)
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)

### Links Not Working?
- Check for typos in file paths
- Ensure PDFs are in the correct folder
- Verify relative paths are correct

### Formatting Issues?
- Check markdown syntax
- Ensure headings have space after `#`
- Verify list items start with `- ` (dash and space)

## 💡 Tips

1. **Edit in any text editor** - Use VS Code, Sublime, Notepad++, or even GitHub's web editor
2. **Preview markdown** - Many editors have markdown preview features
3. **Keep it simple** - Markdown is designed to be readable as plain text
4. **Consistent naming** - Use clear, descriptive filenames for PDFs
5. **Regular backups** - Git automatically backs up your content

## 📖 Need Help?

- [Markdown Guide](https://www.markdownguide.org/basic-syntax/)
- [GitHub Markdown Reference](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## 🎉 That's It!

You can now maintain your entire website by editing simple text files. No HTML required!

