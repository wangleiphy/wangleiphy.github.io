# AI Agents and Your Research

*Lei Wang and AI agents*

*January 2026*

---

AI agents are transforming scientific research in unprecedented ways. Among many things, vibe coding is particularly relevant to computational physics. The way we work—and what we should focus on—is changing rapidly. In this note, I'll share some practical experiences and thoughts with you. 

## From Chatbot to Agent

A Large Language Model (LLM) is an autoregressive neural network that predicts the next token. Chatbots building on this techniques are impressive, but fundamentally limited when used in isolation. 

An **AI agent** is something more:

```
Agent = LLM + Tools + Memory + Autonomy
```

- **Tools**: Interact with the environment—read/write files, run bash command and codes, search the web
- **Memory**: Retain context within and across sessions
- **Autonomy**: Observe outcomes, decide next steps, iterate toward a goal

The key is the loop: **Observe → Reason → Act → Reflect → Repeat**. Unlike a chatbot that responds once and waits, an agent keeps going until the task is done.

![Agent Loop](agent-loop.svg)

## What Can Agents Do for Your Research?

Current AI agents (Cursor, Claude Code, Codex, etc) are remarkably useful for computational research. With direct access to files and programs on your computer, there's no more copying and pasting in from you dialog with a chatbot.

Here's what they can help with:

- **Onboarding**: Read papers, code, and documentation to quickly understand a topic
- **Brainstorming**: Explore different approaches and catch edge cases you might miss
- **Prototyping**: Write code fast, iterate until it works
- **Monitoring**: Babysit jobs, parse logs, restart on failure
- **Analysis**: Compute statistics, generate publication-quality figures
- **Reporting**: Summarize research logs, draft progress reports

Let's see this in action. We ask an AI agent to compute the [Hofstadter Butterfly](https://en.wikipedia.org/wiki/Hofstadter%27s_butterfly)—the fractal energy spectrum of electrons on a 2D lattice in a magnetic field.

The workflow:

1. **Read** → Understand the Harper equation from Hofstadter's 1976 paper
2. **Plan** → Design the parameter sweep over magnetic flux values
3. **Implement** → Write ~200 lines of Python (hofstadter.py)
4. **Test** → Run 9 unit tests, all passing
5. **Run** → Compute spectrum for q_max=50 in ~2 seconds
6. **Visualize** → Generate the butterfly plot

## Agile Development in the Agentic Era

Agile development encompasses several core engineering practices—documentation, automated testing, and version control—woven into iterative development cycles.[^1] In the era of AI agents, these practices have been even more enssential for your success, but for interesting new reasons.

### 1. Documentation — for Humans AND AI

I now maintain a `CLAUDE.md` file in every project. It serves as a memory file that tells the AI about the project structure, key files, common commands, and workflows. Over time, I add lessons learned from past mistakes, performance tips, and gotchas. The AI reads this at the start of each session. It's like onboarding a new collaborator—except this one has perfect recall.

### 2. Version Control — Your Safety Net

Git becomes even more essential when working with AI. The agent will make mistakes. It will sometimes break things. With frequent commits, you can easily roll back when something goes wrong. Branches let you explore experimental approaches without risk. And you always have a clear history of what changed and why.

### 3. Test-Driven Development

Test-driven development is arguably the most important practices nowadays. Jinguo Liu has a [nice take on it](https://www.jinguo-group.science/vibe-coding/). AI-generated code is not automatically correct. The only way to trust it is to **test it**.

Build confidence incrementally. Start with unit tests for individual functions, then integration tests for modules, then end-to-end tests for the full pipeline. Finally, compare against known benchmarks for validation. If it's not tested, it's not trusted.

In modern terms: tests provide **verification** for the AI, while documentation and version control provide **context**. Both play a major role in guiding AI behavior.

## Practical Tips

### From "?" to "!"

How we interact with AI is shifting. We typically start by asking questions—to gain understanding and context. But increasingly, we'll use imperative commands to have AI complete tasks directly.

### Build Step by Step

Don't ask for everything at once. Start small, verify, then expand. Each step should be testable before moving to the next. Most AI agents have a "plan mode" that enforces this discipline.

### Learn from Mistakes

AI will make errors—this is expected. But don't just retry blindly. Diagnose first:

- Ask: "Why did this fail?"
- Check assumptions: paths, formats, types
- Record lessons in your memory file
- Watch for patterns → the AI improves over the session

Claude Code lets you store lessons in `CLAUDE.md`, creating persistent memory across sessions.

As you develop your workflow, you'll accumulate tools, lessons, and skills. The system you interact with becomes personalized as illustrated in this figure.

![Three-layer architecture](three-layer.svg)

Even though everyone is interacting with the same underlying LLM and agent, the power one can unleash depends on the the contexts and cultivation.

## The "Center of Mass" of Human-AI Collaboration

In human-AI collaboration, the "center of mass" (CoM) can be different depending on the the experiences of the user.

1. **Novices** tend to let the AI lead. The center of knowledge sits with the AI, and the human follows.
2. **Experienced researchers** maintain initiative. They direct the AI, and the center of mass stays with the human.

This may causes a problem. There used to be the "10,000-hour rule"—the idea that mastery requires 10,000 hours of deliberate practice. If one always use AI to shortcut parts of that learning curve, how can one gain experience, intuitive, and therefore, taste?  Or, are those hours still necessary in the age of AI agents ? A thought-provoking essay, ["The Disappearing Apprentice"](https://mp.weixin.qq.com/s/XySs_pdwA7Nd7Sw28qujWA), argues that AI is sawing off the very ladder that traditionally led from novice to expert. 

Boris Cherny, the creator of Claude Code has made two suggestions on using it. The first one, sup rinsing enough, it is actually not using it to write code. But askying Claude Code to explain stuff to you. His second advices is to actively explore the boundaries of what AI can and cannot do. This is a moving target as the technology evolves, but you need a working mental model. Think of tasks in [three categories](https://youtu.be/iF9iV4xponk?t=1069):

- **Delegate entirely**: routine tasks where AI handles everything
- **Collaborate**: tasks where you and AI work together
- **Lead yourself**: tasks too nuanced or novel for AI to handle alone

Knowing about the limitation of the state of the art AI agent, In this way you can freely control the CoM of human-AI collaboration.

## The Future

Computational research is changing rapidly. Here are some trends I see emerging:

**"Code is cheap. Show me the idea."** The bottleneck in computational science is shifting from implementation to ideas and understanding. Code is becoming commodity—anyone can generate it. Hamming's timeless advice about problem selection becomes even more critical. As he said, "The purpose of computing is insight, not numbers." What matters now is what he emphasized in ["You and Your Research"](https://www.cs.virginia.edu/~robins/YouAndYourResearch.html):

- Asking the right questions
- Knowing what to compute
- Understanding why it matters
- Interpreting the results

This could be a golden age for those who are theoretically oriented and imaginative. In this sense, AI agents do not replace scientific thinking—they expose it.

**The terminal is back.** The terminal is the oldest way we interact with computers, and it's making a comeback. AI agents work naturally in terminal environments, where text commands flow seamlessly between human and machine.

**Natural language as the most dynamic programming language.** We've long faced the "two-language problem" in scientific computing: a slow dynamic language for prototyping, a fast static language for production. Natural language is becoming the front-end that compiles down to optimized low-level code. As Andrej Karpathy [put it](https://x.com/karpathy/status/1617979122625712128), "The hottest new programming language is English."

---

**Acknowledgments**

Thanks to Jinguo Liu, Kun Chen, Linfeng Zhang, Hiroshi Shinaoka, Qi Yang, and Ruisi Wang for discussions and sharing their perspectives.

[^1]: I first learned those things systematically in [Matthias Troyer's PT2 lecture](https://github.com/DanielMarchand/progtech2/tree/master/wiki). The [MIT Missing Semester](https://missing.csail.mit.edu/) is another excellent resource.
