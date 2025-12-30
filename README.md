# Lei Wang's Personal Website

Academic website with Markdown-based content management. Hosted on GitHub Pages.

## Updating Content

Edit the Markdown files in `content/`:

| File | Page |
|------|------|
| `content/talks.md` | Research talks |
| `content/lectures.md` | Lectures & teaching |
| `content/conferences.md` | Events organized |

Note: Homepage (`index.html`) is static HTML - edit it directly.

### Content Format

```markdown
## 2025
- [Talk Title, Location, Date](talks/filename.pdf)
```

With extra resources:
```markdown
- [Lecture Title](lectures/slides.pdf) ([notes](lectures/notes.pdf), [video](https://url))
```

### Adding New Content

1. Edit the appropriate `content/*.md` file
2. Upload PDFs to `talks/` or `lectures/`
3. Commit and push - deploys automatically (~1 minute)

## Local Testing

Browsers block `file://` JavaScript. Use a local server:

```bash
python -m http.server 8000
# Visit http://localhost:8000/
```

## Architecture

```
content/*.md  -->  markdown-loader.js  -->  marked.js  -->  HTML
```

- `js/markdown-loader.js` - Fetches and renders Markdown
- `css/modern-style.css` - Styling with CSS variables (`:root`)
- HTML pages load corresponding Markdown automatically

## File Structure

```
├── content/           # Markdown content (edit these)
├── talks/             # Talk PDFs
├── lectures/          # Lecture PDFs
├── css/               # Styles
├── js/                # Markdown loader
├── ml2016/            # Archived 2016 conference
└── *.html             # Page templates
```

## License

© Lei Wang. All rights reserved.
