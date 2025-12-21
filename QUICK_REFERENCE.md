# Quick Reference Card

## 🚀 Most Common Tasks

### Add a New Talk

**File:** `content/talks.md`

```markdown
## 2025

- [Talk Title, Conference/Location, 2025 Month](talks/filename.pdf)
```

### Add a New Lecture

**File:** `content/lectures.md`

```markdown
## 2025

- [Lecture Title, Location, 2025 Month](lectures/filename.pdf)
```

**With extra resources:**
```markdown
- [Lecture Title, Location, 2025](lectures/slides.pdf) ([notes](lectures/notes.pdf), [video](https://url.com))
```

### Add a New Event

**File:** `content/conferences.md`

```markdown
- [Event Name, Location, Date](https://event-url.com)
```

## 📋 Markdown Syntax Cheatsheet

| Element | Syntax |
|---------|--------|
| Heading | `## Section Title` |
| Link | `[Text](url)` |
| List Item | `- Item` |
| Bold | `**bold text**` |
| Italic | `*italic text*` |

## 🔄 Git Workflow

```bash
# 1. Edit the markdown file
vim content/talks.md

# 2. Check changes
git status
git diff

# 3. Stage changes
git add content/talks.md

# 4. If you added PDFs
git add talks/new-file.pdf

# 5. Commit
git commit -m "Add talk from X conference"

# 6. Push to GitHub
git push

# Wait ~1 minute for deployment
```

## 📂 File Organization

```
content/
├── talks.md         ← Research talks (organized by year)
├── lectures.md      ← Teaching materials (organized by year)
└── conferences.md   ← Events you organized

talks/               ← Upload talk PDFs here
lectures/            ← Upload lecture PDFs here
```

## ✅ Checklist for New Content

- [ ] Edit appropriate markdown file
- [ ] Upload PDF to correct folder
- [ ] Use correct markdown syntax
- [ ] Check link paths are correct
- [ ] Commit with descriptive message
- [ ] Push to GitHub
- [ ] Verify on website (after ~1 minute)

## 🎯 Format Examples

### Research Talk (Simple)
```markdown
- [Neural Networks for Physics, MIT, 2025 March](talks/nn-physics-mit-2025.pdf)
```

### Lecture with Resources
```markdown
- [Deep Learning Course, Beijing, 2025 Spring](lectures/dl-course.pdf) ([code](https://github.com/user/repo), [video](https://youtube.com/...))
```

### Event/Conference
```markdown
- [Workshop on ML and Physics, IOP Beijing, 2025 June](https://workshop-url.com)
```

## 🆘 Common Issues

**Content not showing?**
- Clear browser cache (Ctrl+F5)
- Check markdown file is in `content/` folder
- Verify filename matches exactly

**Link broken?**
- Check for typos in path
- Ensure PDF is in correct folder
- Use relative paths: `talks/file.pdf` not `/talks/file.pdf`

**Formatting wrong?**
- Check space after `#` in headings: `## Title` not `##Title`
- List items need space: `- Item` not `-Item`
- Year headings should be H2: `## 2025`

## 📱 Edit from GitHub Web

Can't use command line? Edit directly on GitHub:

1. Go to `https://github.com/wangleiphy/wangleiphy.github.io`
2. Navigate to `content/` folder
3. Click on file (e.g., `talks.md`)
4. Click pencil icon ✏️ to edit
5. Make changes
6. Click "Commit changes" at bottom
7. Done!

## 💾 Backup Tip

GitHub automatically backs up everything. To see history:
```bash
git log content/talks.md
```

---

**Need more details?** See [CONTENT_GUIDE.md](CONTENT_GUIDE.md)

