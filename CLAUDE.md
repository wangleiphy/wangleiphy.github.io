# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Lei Wang (Computational Quantum Physicist, IOP CAS). Static site hosted on GitHub Pages with client-side Markdown rendering.

## Architecture

#### **Markdown-driven content system**: Content lives in Markdown files (`content/*.md`) and is rendered client-side using marked.js. No build step required.

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

## Editing Content Guidelines

**Be EXTREMELY conservative when editing teaching materials and academic content.**

- **Preserve specific details**: Never remove concrete numbers, specific examples, or technical details unless explicitly asked
- **Keep original wording**: If asked to "fix typos" or "combine citations," only change what's broken—don't rephrase or "improve"
- **Verify all changes**: Re-read edits to ensure no valuable information was removed
- **When in doubt, ask first**: If the scope of changes is unclear, ask for clarification rather than making assumptions
- **Respect the author's voice**: Academic writing has deliberate structure and phrasing—preserve it
