# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Lei Wang (Computational Quantum Physicist, IOP CAS). Static site hosted on GitHub Pages with client-side Markdown rendering.

## Architecture

**Markdown-driven content system**: Content lives in Markdown files (`content/*.md`) and is rendered client-side using marked.js. No build step required.

```
content/                  ← Edit these to update website content
├── talks.md              → talks.html
├── teaching.md           → teaching.html (list of materials)
├── teaching/             ← Individual teaching materials (.md)
│   └── ai-agent-research.md
└── conferences.md        → conferences.html

teaching-post.html        ← Viewer for content/teaching/*.md (via ?p= parameter)
index.html                ← Homepage (static HTML, not Markdown-driven)

js/markdown-loader.js     ← Fetches and renders Markdown via marked.js
css/modern-style.css      ← All styling (uses CSS variables in :root)
```

The `MarkdownLoader` class auto-detects the current page, fetches the corresponding Markdown file, and renders it into the `#markdown-content` container.

## Local Development

Browsers block `file://` JavaScript loading. Must use a local server:

```bash
python -m http.server 8000
# Visit http://localhost:8000/
```

## Content Format

```markdown
## 2025
- [Talk Title, Location, Date](talks/filename.pdf)
- [Lecture Title](lectures/slides.pdf) ([notes](lectures/notes.pdf), [video](https://url))
```

## Teaching Materials (Markdown-based)

To add a new markdown-based teaching material:
1. Create `content/teaching/my-topic.md`
2. Add entry in `content/teaching.md`:
   ```markdown
   - [Topic Title](teaching-post.html?p=my-topic)
   ```

## Deployment

Edit content → commit → push. GitHub Pages deploys automatically (~1 minute).
