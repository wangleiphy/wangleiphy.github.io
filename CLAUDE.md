# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Lei Wang (Computational Quantum Physicist, IOP CAS). Static site hosted on GitHub Pages with client-side Markdown rendering.

## Architecture

#### **Markdown-driven content system**: Content lives in Markdown files (`content/*.md`) and is rendered client-side using marked.js. No build step required.

```
content/                  ← Edit these to update website content
├── talks.md              → talks.html (talks and lectures, one chronological list)
├── writings.md           → writings.html (list of essays)
├── teaching/             ← Individual essays (.md), shown via teaching-post.html
│   └── ai-agent-research.md
└── conferences.md        → conferences.html

teaching-post.html        ← Viewer for content/teaching/*.md (via ?p= parameter)
teaching.html, lectures.html ← Redirects to talks.html, kept so old links keep working
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

`content/talks.md`: each entry is two lines: the title followed by its links, then the venue line. `formatTalkList` in `js/markdown-loader.js` turns the title-line links into buttons.

```markdown
## 2025
- **Talk Title** [slides](talks/filename.pdf) [notes](lectures/notes.pdf) [recording](https://url) [code](https://url) [materials](https://url)
  [Event name](https://event-page), place, Month YYYY
```

Use only these button labels, in this order, and full month names. Link the event name only when there is an event page. A multi-part lecture puts its buttons on extra lines after the venue line, one per part (`Part 1, topic: [slides](...) [recording](...)`).

## Writings (Markdown-based)

To add a new essay:
1. Create `content/teaching/my-topic.md`
2. Add an entry in `content/writings.md`:
   ```markdown
   - [Topic Title, Month Year](teaching-post.html?p=my-topic)
   ```

Post URLs stay at `teaching-post.html?p=...` even though the list page is now Writings, because printed QR codes point to them.

## Deployment

Edit content → commit → push. GitHub Pages deploys automatically (~1 minute).

## Editing Content Guidelines

**Be EXTREMELY conservative when editing teaching materials and academic content.**

- **Preserve specific details**: Never remove concrete numbers, specific examples, or technical details unless explicitly asked
- **Keep original wording**: If asked to "fix typos" or "combine citations," only change what's broken—don't rephrase or "improve"
- **Verify all changes**: Re-read edits to ensure no valuable information was removed
- **When in doubt, ask first**: If the scope of changes is unclear, ask for clarification rather than making assumptions
- **Respect the author's voice**: Academic writing has deliberate structure and phrasing—preserve it
