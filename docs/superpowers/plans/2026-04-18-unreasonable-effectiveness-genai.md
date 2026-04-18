# "The Unreasonable Effectiveness of Generative AI" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a ~2,000–2,500-word essay at `content/teaching/unreasonable-effectiveness-genai.md`, linked from `content/teaching.md`, making the case that generative AI is general-purpose scientific machinery unified by a variational free-energy calculation.

**Architecture:** A single Markdown file rendered client-side by `teaching-post.html?p=unreasonable-effectiveness-genai`. Math via KaTeX (inline `$...$`, display `$$...$$`), footnotes via `marked-footnote`. No new HTML, no new CSS, no build step.

**Tech Stack:** Markdown, KaTeX, marked.js (as already used by `teaching-post.html`).

**Source spec:** `docs/superpowers/specs/2026-04-18-unreasonable-effectiveness-genai-design.md`.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `content/teaching/unreasonable-effectiveness-genai.md` | Create | The post itself |
| `content/teaching.md` | Modify (append under `## 2026`) | Add one list entry linking to the post |

No other files change. The SVG diagram for §4 is a follow-up, not part of this plan. No edits to `ai-agent-research.md`.

---

## Global notes for every writing task

- The page already uses `$...$` and `$$...$$` for math (KaTeX), `##`/`###` for headings, and `[^1]`-style footnotes. Match the conventions in `content/teaching/ai-agent-research.md`.
- **Never generate BibTeX or bibliographic metadata from memory** (per the author's global instructions). Citations must be verified against a primary source before they land in the post. Task 1 handles this upfront so later writing tasks can just consume the verified strings.
- Keep equations minimal; each one should earn its place.
- No emojis.
- External links open in a new tab automatically via `teaching-post.html` — just use standard Markdown link syntax.

---

## Task 1: Verify all citations

**Files:**
- Create: `content/teaching/unreasonable-effectiveness-genai.refs.md` (a scratch file, not published — deleted in Task 10)

This task produces a list of *verified* citation strings used throughout Tasks 3–7. Every citation fetched from a primary source; no memory-derived metadata.

- [ ] **Step 1: Create the refs scratch file**

Create `content/teaching/unreasonable-effectiveness-genai.refs.md` with this skeleton:

```markdown
# Verified citations for unreasonable-effectiveness-genai.md

For each entry: title, authors (order matters), venue, year, arXiv ID / DOI, URL.
Every field verified against the primary source listed.

## §1 Autoregressive models beyond language

- [ ] Tian et al., VAR (images), arXiv:2404.02905 — source: https://arxiv.org/abs/2404.02905
- [ ] Billera et al. (proteins), bioRxiv 2024 — source: bioRxiv search
- [ ] Cao et al., Crystalformer (crystals), arXiv:2403.15734 — source: https://arxiv.org/abs/2403.15734
- [ ] Wu et al. (Ising), arXiv:1809.10606 — source: https://arxiv.org/abs/1809.10606

## §2 Pre-training optimization

- [ ] Li et al., Visualizing the Loss Landscape of Neural Nets, arXiv:1712.09913 — source: https://arxiv.org/abs/1712.09913

## §4 From Bit to It

- [ ] Xie et al., JML 2021 — source: https://global-sci.com/index.php/jml/article/view/13175
- [ ] SciPost Physics 2023 (from author's slide §4 middle column) — source: search SciPost for the free-energy / variational paper the author intends
- [ ] Cao et al., arXiv:2403.15734 — source: https://arxiv.org/abs/2403.15734 (same as §1)
- [ ] Cao et al., arXiv:2504.02367 — source: https://arxiv.org/abs/2504.02367
- [ ] Wheeler, "It from Bit" (1989) — source: Wheeler, "Information, Physics, Quantum: The Search for Links", 1989 (Proc. 3rd Int. Symp. Foundations of Quantum Mechanics, Tokyo, pp. 354–368); commonly cited without a DOI. Verify venue wording from a secondary academic source (e.g., the proceedings record) before committing to phrasing.

## Verified strings (fill in after checking each source above)

### §1
- VAR: (authors) et al., "(exact title)", arXiv:2404.02905 (2024).
- Crystalformer: ...
- Ising: ...
- Protein: ...

### §2
- Li et al.: ...

### §4
- Xie et al. JML '21: ...
- SciPost '23: ...
- Cao 2403.15734: ...
- Cao 2504.02367: ...
- Wheeler 1989: ...
```

- [ ] **Step 2: Verify each arXiv entry by fetching the abstract page**

For each arXiv ID listed, fetch `https://arxiv.org/abs/<id>` and record:
- Exact title (verbatim from the page)
- Full author list in page order
- Submission year

Use `WebFetch` (not memory). If an arXiv ID does not resolve to a matching paper, stop and flag it to the author — do not substitute.

- [ ] **Step 3: Verify the JML entry**

Fetch `https://global-sci.com/index.php/jml/article/view/13175`. Record title, authors, year, volume/pages, DOI.

- [ ] **Step 4: Search for the SciPost '23 reference**

The author's §4 slide lists "SciPost Physics '23" alongside Xie et al. JML '21 under "Nature's cost function / $F[\rho] = E - TS$". Search SciPost Physics 2023 for the paper corresponding to that line (likely a variational free-energy / neural density / ab-initio paper). If the exact paper cannot be uniquely identified, flag it to the author and ask for the DOI rather than guessing.

- [ ] **Step 5: Search for the Billera et al. bioRxiv 2024 protein paper**

Search bioRxiv 2024 for a Billera et al. paper on autoregressive protein modeling. If multiple candidates exist or none match exactly, flag to the author.

- [ ] **Step 6: Record Wheeler 1989**

Wheeler's "It from Bit" phrase originates in *Information, Physics, Quantum: The Search for Links*, in the proceedings of the 3rd International Symposium on the Foundations of Quantum Mechanics (Tokyo, 1989), pages 354–368. Confirm this wording against a secondary academic source (e.g., an article's reference list that cites Wheeler 1989). Record the citation string exactly as you will use it in the post.

- [ ] **Step 7: Fill in the "Verified strings" section**

Populate `### §1`, `### §2`, `### §4` with the verified citation strings. Each string formatted for reuse in Markdown footnotes. Check off every `- [ ]` at the top of the file as each source is verified.

- [ ] **Step 8: Commit**

```bash
git add content/teaching/unreasonable-effectiveness-genai.refs.md
git commit -m "add verified citation scratch file for genai post"
```

---

## Task 2: Scaffold the post

**Files:**
- Create: `content/teaching/unreasonable-effectiveness-genai.md`

- [ ] **Step 1: Write the skeleton**

Create `content/teaching/unreasonable-effectiveness-genai.md` with this exact content:

```markdown
# The Unreasonable Effectiveness of Generative AI

*Lei Wang*

*April 2026*

---

<!-- intro: Task 3 -->

## Autoregressive Models Beyond Language

<!-- §1: Task 4 -->

## The Untold Secret of Pre-training

<!-- §2: Task 5 -->

## The Unreasonable Effectiveness of $y \sim p_\theta(y \mid x)$

<!-- §3: Task 6 -->

## Generative AI: from Bit to It

<!-- §4: Task 7 -->

## Coda

<!-- coda: Task 8 -->
```

Match the header style used in `content/teaching/ai-agent-research.md` (title + italic author + italic date + horizontal rule).

- [ ] **Step 2: Serve locally and check rendering**

Run in a separate terminal (the user may already have this running):

```bash
cd /Users/lewang/Documents/Papers/Work/wangleiphy.github.io
python -m http.server 8000
```

Then visit `http://localhost:8000/teaching-post.html?p=unreasonable-effectiveness-genai`.

Expected: page renders with the title, author line, date, horizontal rule, and five empty section headings. No KaTeX errors in the browser console for the `y \sim p_\theta(y \mid x)` inline math in §3's heading.

- [ ] **Step 3: Commit**

```bash
git add content/teaching/unreasonable-effectiveness-genai.md
git commit -m "scaffold unreasonable effectiveness of generative AI post"
```

---

## Task 3: Write the introduction (~200 words)

**Files:**
- Modify: `content/teaching/unreasonable-effectiveness-genai.md` (replace `<!-- intro: Task 3 -->`)

Section must contain:
1. **Opening hook** — a one-paragraph Wigner allusion. Name-check "The Unreasonable Effectiveness of Mathematics in the Natural Sciences" (Wigner, 1960) and, optionally, "The Unreasonable Effectiveness of Data" (Halevy, Norvig, Pereira, 2009). Pitch this post as a sequel framed from a physicist's angle.
2. **The puzzle** — one paragraph stating the question the post answers: modern generative AI systems are, mechanically, sampling from a learned distribution $p_\theta$. Why, then, do they paint images of parrots, fold proteins, generate crystals, drive laboratory qubits, and write working code?
3. **Roadmap** — one short paragraph (two to three sentences) listing the four surprises the post unpacks: (1) autoregressive modeling is universal across modalities; (2) pre-training in huge parameter spaces is surprisingly *easier* than configuration-space optimization; (3) a frozen $p_\theta$ with only the context varied is enough for real scientific work; (4) a single variational calculation sits under all three.

- [ ] **Step 1: Draft the three paragraphs in place of the `<!-- intro: Task 3 -->` marker**

Constraints:
- ~200 words total.
- No citations in the intro beyond the Wigner / Halevy–Norvig–Pereira allusion; keep footnote-free.
- Do **not** give away the §4 punchline — tease it as "one calculation physicists already know" without naming variational free energy yet.

- [ ] **Step 2: Re-read for accuracy**

Check: is each claim defensible? Does the roadmap sentence match the four section headings exactly in order?

- [ ] **Step 3: Render locally and eyeball**

Reload `http://localhost:8000/teaching-post.html?p=unreasonable-effectiveness-genai`. Expected: three paragraphs render cleanly; no math in this section so no KaTeX surprises.

- [ ] **Step 4: Commit**

```bash
git add content/teaching/unreasonable-effectiveness-genai.md
git commit -m "write intro for genai post"
```

---

## Task 4: Write §1 — Autoregressive models beyond language (~450 words)

**Files:**
- Modify: `content/teaching/unreasonable-effectiveness-genai.md` (replace `<!-- §1: Task 4 -->`)
- Reference: `content/teaching/unreasonable-effectiveness-genai.refs.md` (verified strings from Task 1)

Section must contain, in order:

1. **Chain rule, displayed math.** Use exactly:

    ```
    $$p(X) = p(x_1)\,p(x_2 \mid x_1)\,p(x_3 \mid x_1, x_2) \cdots$$
    ```

2. **The pivot sentence.** A single sentence of the form:
   "'Language' becomes a token sequence, a token sequence becomes a bitstream, and a bitstream can represent *anything*."

3. **Four concrete demonstrations**, each a short paragraph (50–80 words) that names the domain, describes briefly what the AR model does, and cites the paper as a footnote. Order: **images, proteins, crystals, Ising spins**. Use the verified strings from Task 1's refs file.

4. **Takeaway paragraph.** One paragraph (~80 words) making the point that no modality-specific architecture is needed — the AR machinery transports. Contrast briefly with the tradition of hand-built per-domain tools in computational physics (e.g., tensor networks for spins, DFT for crystals, force fields for proteins).

- [ ] **Step 1: Draft §1 in place**

Replace the `<!-- §1: Task 4 -->` marker with the section. Use `[^1]`, `[^2]`, … for footnote references; define the footnote bodies at the bottom of the file inside a `## References` section created at the end of Task 8. For now, leave the footnote *references* in place (`[^1]`, `[^2]`, etc.) with a comment `<!-- footnote 1 -->` nearby so Task 8 can locate them.

Numbering convention across the whole post: footnotes are numbered in order of first appearance. Reserve `[^1]`–`[^4]` for the four §1 citations (images, proteins, crystals, Ising — in that order).

- [ ] **Step 2: Render locally and verify**

Reload the page. Expected:
- The chain-rule equation renders as display math.
- "token sequence", "bitstream", and "anything" read naturally.
- Each of the four demonstrations has a footnote marker (the target body appears later once Task 8 defines it; for now the marker will render as raw `[^1]` if footnotes aren't active — that's OK mid-flight, but verify footnote rendering works after Task 8).

- [ ] **Step 3: Commit**

```bash
git add content/teaching/unreasonable-effectiveness-genai.md
git commit -m "write §1 AR beyond language for genai post"
```

---

## Task 5: Write §2 — The untold secret of pre-training (~500 words)

**Files:**
- Modify: `content/teaching/unreasonable-effectiveness-genai.md` (replace `<!-- §2: Task 5 -->`)

Section must contain, in order:

1. **Frame the two minimizations.** One short paragraph setting up the comparison: a physicist who wants to find a low-energy configuration has, traditionally, searched $3N$-dimensional configuration space for $\min_X E(X)$. Training a generative model instead searches a much larger *parameter* space for $\min_\theta \mathbb{E}_{X \sim p_\theta(X)}[E(X)]$. On the surface this is a strictly harder problem. In practice it is easier.

2. **Side-by-side displayed math.** Two display equations, with one-line labels beneath each:

    ```
    $$\min_\theta\; \mathbb{E}_{X \sim p_\theta(X)}\!\left[E(X)\right]
    \qquad \text{vs.} \qquad \min_X\; E(X)$$
    ```
   Follow with a sentence explicitly saying the left-hand side lives in a ~million-dimensional parameter space that is empirically smooth, while the right-hand side lives in a $3N$-dimensional configuration space that is typically rugged, citing the loss-landscape visualizations of Li et al. (footnote `[^5]`).

3. **The conjecture (flagged as such).** One or two paragraphs stating the author's conjecture: pre-training provides two benefits at once — it supplies a good **System 1** (fast, intuitive sampling) that reduces the need for **System 2** (slow, deliberative energy minimization); and it learns a representation that simplifies the downstream policy landscape seen by fine-tuning. Introduce Kahneman's System 1 / System 2 terminology on first use with a one-line explanation, then use the terms freely.

4. **Physicist's payoff.** One closing paragraph (~80 words) contrasting pre-training with VMC / tensor networks, where every additional parameter is "paid for." In pre-training, over-parameterization seems to *help* — a genuine inversion of the traditional bias–variance intuition.

- [ ] **Step 1: Draft §2 in place**

Replace `<!-- §2: Task 5 -->`. Use footnote `[^5]` for Li et al. (the next footnote after §1's four). Leave a `<!-- footnote 5 -->` marker nearby for Task 8.

- [ ] **Step 2: Explicitly flag the conjecture**

The paragraph introducing the two-benefit claim must start with the word "Conjecture" or a close equivalent ("A working hypothesis:", "We conjecture that..."), so the reader does not mistake it for a proven theorem. This is the author's stated framing in the source slide.

- [ ] **Step 3: Render and verify**

Reload. Expected:
- Both equations render cleanly side by side (the `\qquad \text{vs.} \qquad` spacing should hold).
- The System 1 / System 2 terms are defined before they are reused.
- The conjecture is explicitly labeled.

- [ ] **Step 4: Commit**

```bash
git add content/teaching/unreasonable-effectiveness-genai.md
git commit -m "write §2 untold secret of pre-training for genai post"
```

---

## Task 6: Write §3 — Frozen $p_\theta$ with varying context (~500 words)

**Files:**
- Modify: `content/teaching/unreasonable-effectiveness-genai.md` (replace `<!-- §3: Task 6 -->`)

Section must contain, in order:

1. **Thesis equation.** Display math:

    ```
    $$y \sim p_\theta(y \mid x)$$
    ```
   Followed by one sentence stating that in deployment $p_\theta$ is frozen; only the context $x$ varies. This is both unremarkable (it's just sampling) and extraordinary (it's enough).

2. **Self-contained recap of what an agent is** (~150 words). Enough that a reader who has not read `ai-agent-research.md` can follow. Cover: the observe–reason–act–verify loop; tools (code execution, file I/O, web); context as working memory. One-line cross-link to the prior post:

    ```
    See also *AI Agents and Your Research* for a fuller treatment of the agent loop.
    ```

    (Markdown link: `[*AI Agents and Your Research*](teaching-post.html?p=ai-agent-research)`.)

3. **The qubit example (~200 words).** A concrete vignette based on **ongoing work by Shigang Ou (IOP / DP Tech / BAQIS)**: an agent that drives qubit calibration and control — generating experiment recipes, reading back traces, fitting Rabi oscillations, updating pulse parameters in a closed loop. Describe as ongoing work; do **not** cite an external URL or preprint (per the spec). Emphasize that the model weights never change during any of this; the loop only varies $x$.

4. **The surprise (~100 words).** Close the section with the observation: competence emerges from compositional sampling with frozen weights. We did not have to retrain a model to turn a text generator into an experimentalist. That is the *unreasonable* part.

- [ ] **Step 1: Draft §3 in place**

Replace `<!-- §3: Task 6 -->`. No new footnote markers in this section.

- [ ] **Step 2: Cross-link check**

Confirm the Markdown link `[*AI Agents and Your Research*](teaching-post.html?p=ai-agent-research)` renders as a working link and opens the other post.

- [ ] **Step 3: Render and verify**

Reload. Expected:
- The `$$y \sim p_\theta(y \mid x)$$` display equation renders without KaTeX errors.
- The cross-link works.
- The Ou example reads as a concrete story, not a footnoted citation.

- [ ] **Step 4: Commit**

```bash
git add content/teaching/unreasonable-effectiveness-genai.md
git commit -m "write §3 frozen p_theta for genai post"
```

---

## Task 7: Write §4 — Generative AI, from Bit to It (~650 words)

**Files:**
- Modify: `content/teaching/unreasonable-effectiveness-genai.md` (replace `<!-- §4: Task 7 -->`)

This is the keystone section. Must contain, in order:

1. **The setup.** One paragraph (~80 words): three frontiers that look disjoint — LLM post-training, equilibrium physics, materials inverse design — turn out to be the *same calculation*: minimize an energy term plus an entropy penalty against a prior. One variational free-energy / Bayesian-posterior form, three costumes.

2. **Three faces, each its own short subsection.** Use `###` headings.

   **Face 1 — LLM post-training.** (~150 words.) State the reward framing $X \mapsto r(X)$. Write the RLHF / DPO objective as

    ```
    $$\min_{q_\theta}\; \mathbb{E}_{X \sim q_\theta}\!\left[-r(X)\right]
    \;+\; T\,\mathrm{KL}\!\left(q_\theta \,\|\, q_{\text{pretrain}}\right)$$
    ```
   Then unpack: this is a free-energy minimization where the "energy" is $-r$ and the "entropy" term is the KL to the pre-trained prior. Everyday analogy (from the author's slide): the model finishing "… the murderer is ___". Citations: OpenAI (InstructGPT) and DeepSeek, using verified strings from Task 1.

   **Face 2 — Nature's cost function.** (~150 words.) Write

    ```
    $$F[\rho] = E - T S$$
    ```
   Recall that equilibrium matter minimizes $F$; the Boltzmann distribution is the maximum-entropy solution at fixed $\langle E \rangle$. Point out that variational neural-network approaches to statistical mechanics and to electronic structure are doing exactly this minimization with $\rho$ parameterized by $\theta$. Citations: Xie et al. JML '21 (verified via Task 1, from https://global-sci.com/index.php/jml/article/view/13175) and the SciPost Physics 2023 paper (if Task 1 identified it; otherwise leave a footnote marker and escalate to the author).

   **Face 3 — Inverse design.** (~150 words.) Write

    ```
    $$p(X \mid y) \propto p(X)\, p(y \mid X)$$
    ```
   Explain: a prior over structures $p(X)$ combined with a property-likelihood $p(y \mid X)$ gives a posterior that is biased toward designs with the target property $y$. Sampling from this posterior is materials/molecule inverse design. Citations: Cao et al. arXiv:2403.15734 and arXiv:2504.02367 (verified strings from Task 1).

3. **The "same" claim, explicit.** One short paragraph stating the claim the author's slide makes in red: **same objective, same model, same algorithm**. Three apparently separate frontiers, one variational computation.

4. **The tagline paragraph (~100 words).** Bridge to the motif: Wheeler's *It from Bit* (1989) asked us to read physical reality as information. Generative AI runs the arrow the other way — it takes bits and produces real *it*: molecules, crystals, pulses that steer a qubit. Coin the phrase **"Generative AI: from Bit to It."** Cite Wheeler 1989 via footnote.

- [ ] **Step 1: Draft §4 in place**

Replace `<!-- §4: Task 7 -->`. Footnote numbering is fixed as follows — **reuse `[^3]` for the Crystalformer paper, do not create a new number for it**:

- `[^6]` — OpenAI (InstructGPT)
- `[^7]` — DeepSeek post-training paper
- `[^8]` — Xie et al. JML '21
- `[^9]` — SciPost Physics '23 (or flag if Task 1 could not resolve)
- reuse `[^3]` — Cao et al. arXiv:2403.15734 (Crystalformer), already introduced in §1
- `[^10]` — Cao et al. arXiv:2504.02367
- `[^11]` — Wheeler 1989

Final numbering across the post: `[^1]` through `[^11]`, with `[^3]` referenced in both §1 and §4. Task 8's References section lists each body exactly once in ascending order.

- [ ] **Step 2: Check each display equation**

Render the page. Expected: the three display equations in Faces 1–3 render cleanly; in particular the KL term `\mathrm{KL}(q_\theta \| q_{\text{pretrain}})` renders (note: the `\|` in Markdown may need to be escaped or written as `\mid` if KaTeX struggles — try `\|` first; if KaTeX shows an error, switch to `\,\|\,` or `\lVert \cdot \rVert`).

- [ ] **Step 3: Check internal consistency**

Re-read: does the "same objective, same model, same algorithm" paragraph actually match the three equations above it? It should — all three have the form (expected energy) + T·(entropy or KL) with different $E$ and different prior.

- [ ] **Step 4: Commit**

```bash
git add content/teaching/unreasonable-effectiveness-genai.md
git commit -m "write §4 from bit to it for genai post"
```

---

## Task 8: Write the coda and references (~200 words + references)

**Files:**
- Modify: `content/teaching/unreasonable-effectiveness-genai.md` (replace `<!-- coda: Task 8 -->`, add `## References` section)

The coda and the references section both land in this task.

### Coda (~200 words)

One to two paragraphs with this shape:

1. **Implication for the physicist's toolkit.** Generative modeling joins Monte Carlo, variational wavefunctions, and tensor networks as a first-class computational method. It has the same mathematical core (variational free energy) but runs on a different substrate (neural networks trained on bitstreams).

2. **Pointers to further reading.** Three or four links at most:
   - The author's earlier lecture *Autoregressive model: alphabets, actions, and atoms* (linked as `[lecture notes](lectures/AAA-hangzhou2025.pdf)` — path relative to site root, as in `content/teaching.md`).
   - The author's 2022 summer-school talk *Unlocking the power of the variational free-energy principle* (linked similarly).
   - The companion post `[AI Agents and Your Research](teaching-post.html?p=ai-agent-research)`.

- [ ] **Step 1: Draft the coda in place of `<!-- coda: Task 8 -->`**

- [ ] **Step 2: Append the References section**

At the very end of the file, add:

```markdown
---

## References
```

Then, below, write out the footnote *bodies* for every `[^N]` marker used earlier in the post. Use the verified strings from Task 1's refs file. Syntax:

```markdown
[^1]: Tian, Jiang, Yuan, Peng, Wang, "Visual Autoregressive Modeling: Scalable Image Generation via Next-Scale Prediction", arXiv:2404.02905 (2024). https://arxiv.org/abs/2404.02905
```

(The above is illustrative only — replace with the *verified* string from Task 1.)

Footnotes must appear in ascending numeric order.

- [ ] **Step 3: Render and verify**

Reload. Expected:
- The coda reads as a short outward-facing close, not a recap.
- The References section renders as a numbered footnote list at the bottom.
- Every in-text footnote marker `[^N]` now has a corresponding body.
- Every footnote body corresponds to an in-text marker (no orphans).

- [ ] **Step 4: Word-count check**

Rough check: the article body (intro through coda, excluding References) should land in the 2,000–2,500 word range. Use `wc -w` on the content between the title block and the `## References` line if needed. Do not pad; if short, it is fine. If over 2,700, tighten §4 first.

- [ ] **Step 5: Commit**

```bash
git add content/teaching/unreasonable-effectiveness-genai.md
git commit -m "write coda and references for genai post"
```

---

## Task 9: Link the post from `content/teaching.md`

**Files:**
- Modify: `content/teaching.md` (append under the `## 2026` heading)

- [ ] **Step 1: Read the current 2026 block**

`content/teaching.md` currently begins:

```markdown
# Teaching

## 2026

- [AI Agents and Your Research, IOP, January 2026](teaching-post.html?p=ai-agent-research)

## 2025
...
```

- [ ] **Step 2: Insert the new entry above the existing 2026 entry**

New entries are most-recent-first (matching the file's overall chronology). Result:

```markdown
## 2026

- [The Unreasonable Effectiveness of Generative AI, April 2026](teaching-post.html?p=unreasonable-effectiveness-genai)
- [AI Agents and Your Research, IOP, January 2026](teaching-post.html?p=ai-agent-research)
```

Use `Edit` with a unique anchor (the `## 2026` heading plus the AI-agents line) to insert above the existing entry.

- [ ] **Step 3: Render the teaching index**

Visit `http://localhost:8000/teaching.html`. Expected: the new link appears at the top of the 2026 list. Clicking it navigates to the post, which renders fully (with the intro, four sections, coda, and references from earlier tasks).

- [ ] **Step 4: Commit**

```bash
git add content/teaching.md
git commit -m "link unreasonable effectiveness of generative AI post from teaching index"
```

---

## Task 10: Final verification and cleanup

**Files:**
- Modify (delete): `content/teaching/unreasonable-effectiveness-genai.refs.md`

- [ ] **Step 1: Read the finished post end-to-end in the browser**

At `http://localhost:8000/teaching-post.html?p=unreasonable-effectiveness-genai`, read the whole thing. Check:

- Every equation renders without a red KaTeX error message.
- Every in-text footnote marker is clickable and scrolls to the right reference.
- The cross-link to `ai-agent-research.md` works.
- `lectures/AAA-hangzhou2025.pdf` and other "further reading" PDFs load (or at least resolve to a URL that the user can later verify; broken PDF links in the coda should be flagged).
- No stray `<!-- Task N -->` comments remain.
- Title in browser tab updates to "The Unreasonable Effectiveness of Generative AI - Lei Wang".

- [ ] **Step 2: Open the browser console and confirm no JavaScript errors**

Open DevTools → Console. Expected: no red errors. (KaTeX parse errors appear here if any equation is malformed.)

- [ ] **Step 3: Delete the refs scratch file**

The scratch file was a working note for Task 1 and is no longer needed — the verified strings now live inside the post's `## References` section.

```bash
git rm content/teaching/unreasonable-effectiveness-genai.refs.md
```

- [ ] **Step 4: Final commit**

```bash
git commit -m "remove citation scratch file after genai post publish"
```

- [ ] **Step 5: Report the finished state to the user**

Summarize: new post published at `content/teaching/unreasonable-effectiveness-genai.md`, indexed in `content/teaching.md`, renders at `http://localhost:8000/teaching-post.html?p=unreasonable-effectiveness-genai`. Note that **the user pushes to GitHub themselves** — do not run `git push` unless explicitly asked.

---

## Out of scope for this plan (reminder from the spec)

- **No refactor of `ai-agent-research.md`.**
- **No new site navigation or "blog" section.**
- **No quantitative scaling-law / benchmark survey.**
- **No treatment of diffusion models, flow matching, or non-AR generative families beyond one-line mentions in passing.**
- **No SVG diagram** for §4's "three faces of one calculation" — that is a deliberate follow-up pass, not part of this plan.
