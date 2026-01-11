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

## Working Effectively with AI Agents

To get the most out of AI agents, you need both solid engineering practices and good interaction habits. Let me share what I've learned.

### Engineering Foundations

Agile development encompasses several core engineering practices—documentation, automated testing, and version control—woven into iterative development cycles.[^1] In the era of AI agents, these practices become even more essential, but for interesting new reasons.

**Test-Driven Development (TDD)—verifications for AI.** Traditionally, TDD ensures code correctness by writing tests before implementation—catching bugs early and enabling confident refactoring. With AI agents, this practice becomes even more critical. AI-generated code is not automatically correct; the only way to trust it is to **test it**. Jinguo Liu has a [nice take on it](https://www.jinguo-group.science/vibe-coding/). You can build confidence and trust in AI incrementally: unit tests for functions, integration tests for modules, end-to-end tests for the full pipeline, and validation against known benchmarks.

**Documentation — context for Humans AND AI.** In Agile, documentation keeps team members aligned on project structure, workflows, and conventions. With AI agents, documentation takes on a new role: it becomes the AI's long-term memory. Documents such as `CLAUDE.md` tells the AI agent about project goals, key files, gochas, and lessons learned. AI reads those files to provide contexts at run time. 

**Version Control — Your Safety Net.** Git has always been essential for tracking changes and enabling collaboration. With AI agents, it becomes your safety net. The agent will make mistakes—it will sometimes break things. Frequent commits let you easily roll back when something goes wrong. Branches let you explore experimental approaches without risk. And you always have a clear history of what has changed and why. 

### Interaction Habits

Beyond engineering practices, how you interact with AI agents matters.

**From "?" to "!".** How we interact with AI is shifting. We typically start by asking questions—to gain understanding and context. But increasingly, we'll use imperative commands to have AI complete tasks directly.

**Build step by step.** Don't ask for everything at once. Start small, verify, then expand. Each step should be testable before moving to the next. Most AI agents have a "plan mode" that enforces this discipline.

**Learn from mistakes.** AI will make errors—this is expected. But don't just retry blindly. Diagnose first: ask "Why did this fail?", check assumptions about paths, formats, and types, then record lessons in your memory file. Watch for patterns—the AI improves over the session. Claude Code lets you store lessons in `CLAUDE.md`, creating persistent memory across sessions.

### Building Your Personal System

As you develop your workflow, you'll accumulate tools, lessons, and skills. The system you interact with becomes personalized:

![Three-layer architecture](three-layer.svg)

Even though everyone is interacting with the same underlying LLM and agent, the power one can unleash depends on the contexts and cultivation you bring.

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

Thanks to Jinguo Liu, Kun Chen, Linfeng Zhang, Hiroshi Shinaoka, Qi Yang, Zhendong Cao, and Ruisi Wang for discussions and sharing their perspectives.

[^1]: I first learned those things systematically in [Matthias Troyer's PT2 lecture](https://github.com/DanielMarchand/progtech2/tree/master/wiki). The [MIT Missing Semester](https://missing.csail.mit.edu/) is another excellent resource.
