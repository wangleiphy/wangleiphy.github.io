# The Unreasonable Effectiveness of Generative AI

*Lei Wang*

*April 2026*

---

In 1960, Eugene Wigner marveled at "The Unreasonable Effectiveness of Mathematics in the Natural Sciences" — the uncanny fact that abstract structures invented by mathematicians turn out to describe physical reality with startling precision. Almost fifty years later, Halevy, Norvig, and Pereira wrote a sequel of sorts: "The Unreasonable Effectiveness of Data," arguing that simple models trained on enough data beat carefully engineered ones. This post is another installment in that series, written from a physicist's angle. The protagonist this time is generative AI.

Here is the puzzle. A modern generative AI system is, mechanically, a learned probability distribution $p_\theta$ over sequences of tokens, pixels, atomic coordinates, or control pulses. At inference time you just sample: $y \sim p_\theta(y \mid x)$. There is nothing obviously special about that operation. And yet these systems paint photorealistic images of parrots, fold proteins to atomic accuracy, propose stable crystal structures, drive laboratory qubits through calibration routines, and write working code on demand. Why should sampling from a learned distribution do all that?

This post unpacks three surprises. First, the autoregressive factorization that makes language models work turns out to be universal — the same recipe applies across radically different scientific modalities. Second, finding good parameters $\theta$ in a vast, high-dimensional space is, counterintuitively, *easier* than searching over exponentially large configuration spaces directly. Third, once $\theta$ is frozen you do not need to retrain anything: varying only the context $x$ is enough to steer the model toward real scientific tasks.

## Autoregressive Models Beyond Language

Language models work because they factorize the joint distribution over a token sequence using the chain rule of probability, applying it one factor at a time:

$$p(X) = p(x_1)\,p(x_2 \mid x_1)\,p(x_3 \mid x_1, x_2) \cdots$$

The key realization is that this factorization itself does not care what the tokens are. "Language" becomes a token sequence, a token sequence becomes a bitstream, and a bitstream can represent anything.

**Images.** Visual autoregressive modeling (VAR) reformulates image generation as "next-scale prediction": instead of generating pixels left-to-right, the model predicts a sequence of progressively higher-resolution token maps, each conditioned on all coarser scales that came before.[^1] <!-- footnote 1: VAR images --> The autoregressive structure is preserved exactly — only the notion of "next token" has been replaced by "next resolution scale" — yet the result is a model that generates coherent, detailed images through the same chain-rule machinery.

**Proteins.** Autoregressive models have been applied to protein structure generation by treating backbone geometry — torsion angles and bond parameters — as a sequence to be predicted residue by residue.[^2] <!-- footnote 2: AR protein modeling --> Each residue is generated conditioned on all previously placed residues, allowing the model to capture long-range dependencies in three-dimensional conformation without requiring explicit physical simulation.

**Crystals.** Crystalformer treats crystal structure generation as an autoregressive process over atomic sites: atoms are placed one at a time, with each placement conditioned on the space group, lattice parameters, and all previously placed atoms.[^3] <!-- footnote 3: Crystalformer crystals --> The discrete symmetry constraints of crystallography enter naturally as conditioning information, and the model learns to respect them without any hand-engineered symmetry enforcement.

**Ising spins.** Autoregressive neural networks have been applied directly to statistical-mechanics problems by generating spin configurations one site at a time.[^4] <!-- footnote 4: Wu et al. Ising AR --> The product structure of the autoregressive factorization matches the chain-rule decomposition of the Boltzmann distribution, making it possible to compute variational free energies efficiently and to sample from thermodynamic ensembles of 2D Ising models and related systems.

The takeaway is that no modality-specific architecture is required — the autoregressive machinery transports across domains. This stands in contrast to the tradition in computational physics and structural biology of building bespoke tools for each problem: tensor networks for spin systems, density functional theory for electronic structure, classical force fields for biomolecular dynamics. Each of those frameworks embeds hard-won physical intuition but is largely confined to its own domain. The same transformer, trained autoregressively on a different kind of sequence, handles all four. That is the first of this post's three surprises.

## The Untold Secret of Pre-training

A physicist who wants to find a low-energy configuration has, traditionally, searched $3N$-dimensional configuration space for $\min_X E(X)$. Training a generative model does something different: it searches a much larger *parameter* space for $\min_\theta \mathbb{E}_{X \sim p_\theta(X)}[E(X)]$. On the surface this is strictly harder. In practice it is easier, and understanding why is the second surprise.

$$\min_\theta\; \mathbb{E}_{X \sim p_\theta(X)}\!\left[E(X)\right]
\qquad \text{vs.} \qquad \min_X\; E(X)$$

The left-hand side lives in a parameter space that can be hundreds of millions of dimensions, yet is empirically smooth and largely free of the traps that plague physical energy landscapes.[^5] <!-- footnote 5: Li et al. loss landscape --> The right-hand side lives in a $3N$-dimensional configuration space that is, for any non-trivial system, rugged and crowded with metastable minima — the standard obstruction that motivates replica exchange, parallel tempering, and every other scheme physicists have devised to escape local traps.

**Conjecture.** Pre-training does two things simultaneously, and it is the combination that accounts for its surprising power. First, it provides a good *System 1* — borrowing Kahneman's terminology, System 1 is the fast, intuitive mode of cognition; System 2 is the slow, deliberative mode — in the form of a sampler $p_\theta$ that already concentrates probability mass near low-energy, high-quality configurations. When System 1 is good, far less System 2 effort (explicit energy minimization, exhaustive search, rejection sampling) is needed to obtain useful outputs. Second, and more subtly, pre-training learns a representation in which the downstream policy landscape — the objective seen by fine-tuning or reinforcement learning — is itself smoother and simpler than it would be in raw configuration space. Fine-tuning then navigates a gentler terrain.

These two mechanisms are distinct but reinforce each other. A good prior from pre-training reduces the effective search volume; a smooth policy landscape means gradient descent on that smaller volume converges reliably rather than getting stuck. Neither claim is a theorem. The evidence is empirical: fine-tuning a pre-trained model consistently succeeds with far less data and compute than training from scratch on the same downstream task. The conjecture is that landscape geometry, not merely prior knowledge, is a key part of the explanation.

Physicists familiar with variational Monte Carlo (VMC) or tensor-network methods will feel a familiar discomfort here. In those frameworks, every additional variational parameter incurs a cost: a more flexible ansatz introduces more variational degrees of freedom, raising the risk of over-fitting a finite Monte Carlo sample and worsening the bias-variance trade-off. The community has learned to be parsimonious — adding parameters is never free. Pre-training appears to invert this intuition. Over-parameterized neural networks, trained on broad corpora, generalize *better* as they grow, not worse. The regime where more parameters help rather than hurt is not a quirk to be explained away — it is the operative regime of modern generative AI, and it demands a rethinking of the bias-variance intuitions computational physicists carry from their training.

## The Unreasonable Effectiveness of $y \sim p_\theta(y \mid x)$

$$y \sim p_\theta(y \mid x)$$

In deployment, $p_\theta$ is frozen — the weights never change after training ends. Only the context $x$ varies from one task to the next. This sounds unremarkable. It is enough.

### What is an AI agent?

A raw language model does one thing: it samples $y$ from $p_\theta(y \mid x)$ and stops. An agent extends that sampler into a persistent loop. At each step the agent **observes** the current state of its environment — a file, a terminal output, a measurement trace — **reasons** about what to do next, **acts** by invoking a tool, and **verifies** whether the action achieved its goal before proceeding. This observe–reason–act–verify loop can repeat dozens of times inside a single task.

The tools are what connect the loop to the real world: code execution, file read and write, web search, or any hardware interface that accepts a programmatic call. Between tool calls the agent's context window — the $x$ in the equation above — serves as working memory. It holds the current goal, the plan, the recent outputs, the error messages, and whatever background the agent has retrieved. Nothing persists outside that window; each new sample from $p_\theta$ draws on exactly what $x$ contains.

See also [*AI Agents and Your Research*](teaching-post.html?p=ai-agent-research) for a fuller treatment of the agent loop.

### Qubit calibration as a case study

Shigang Ou (IOP / DP Tech / BAQIS) is pursuing ongoing work in which an AI agent operates inside a superconducting qubit calibration workflow. The setup is roughly as follows. The agent is given access to three kinds of resources: experiment-recipe code that constructs pulse sequences, a hardware interface that submits those sequences to the control electronics, and measurement traces that come back from the readout chain. With these tools in hand the agent can plan and execute a calibration routine autonomously.

Consider a time-Rabi experiment to locate the $\pi$-pulse width. The agent writes the pulse schedule, submits it to hardware, waits for the oscillation trace to return, fits the Rabi curve to extract the half-period, updates the pulse parameter, and submits a verification shot. If the updated pulse produces the expected population inversion it moves to the next calibration step; if not, it diagnoses the discrepancy and iterates. Throughout this closed loop, $p_\theta$ never changes. What changes — step by step, tool call by tool call — is $x$: the conversation history grows to include the latest code, the returned trace, the fit result, and the decision to proceed or retry.

The physicist's intuition is that running an experiment requires a trained experimentalist who knows the instrument, the failure modes, and the relevant physics. What this work demonstrates is that much of that competence can be encoded in context and iterated at inference time.

### The unreasonable part

The third surprise, then, is a kind of inversion of the first two. Autoregressive factorization turned out to be universal across modalities. Pre-training turned out to navigate parameter space more smoothly than direct configuration-space search. Now we find that a frozen $p_\theta$, steered only through $x$, can act as an experimentalist, a programmer, and a scientific reasoner — without any retraining, without any gradient update at deployment time. The heavy lifting that one might have expected to require domain-specific fine-tuning is instead performed at the level of context and tool calls.

Wigner marveled that mathematics, developed with no particular application in mind, nevertheless describes physical reality. The parallel here is that a distribution trained to predict the next token, with no particular laboratory in mind, nevertheless closes the loop on a qubit calibration experiment. That is the unreasonable part.

## Coda

<!-- coda: Task 8 -->
