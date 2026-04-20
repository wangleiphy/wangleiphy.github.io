# The Unreasonable Effectiveness of Autoregressive Models

*Lei Wang and AI Agent*

*April 2026*

---

In an automatic qubit calibration experiment[^rabi], an AI agent can write a pulse schedule, submit it to the control electronics, wait for the oscillation trace, fit the Rabi curve to extract the $\pi$-pulse width, update the parameter, and submit a verification shot. Throughout deployment, the model parameters do not change. Only the context changes: the conversation history, the latest code, the returned trace, and the decision to proceed or retry.

![An AI agent driving superconducting-qubit calibration: code -> instrument -> Rabi trace -> update.](qubit-calibration-loop.png)

At the mechanical level, this system is still just conditional sampling from an autoregressive model: a learned probability distribution over sequences of tokens.

An autoregressive model factorizes the joint probability distribution of a high-dimensional variable $X = (x_1, x_2, \ldots, x_N)$ into a product of low-dimensional conditional factors, using the chain rule of probability:

$$p(X) = p(x_1)\,p(x_2 \mid x_1)\,p(x_3 \mid x_1, x_2) \cdots$$

Each factor $p(x_i \mid x_{<i})$ is far easier to model than the full joint — for a language model, $x_i$ is a single token drawn from a finite vocabulary, rather than one of combinatorially many full sequences. Because each factor is separately normalized, the joint probability is normalized by construction, and sampling reduces to drawing one variable at a time in order. Predicting a conditional distribution is classically called a *regression* task, so iterating this prediction along a sequence is "auto-regression." GPT — Generative Pre-Trained Transformer — is an autoregressive model of exactly this kind, and the same recipe applies to anything one can serialize into a sequence: text, images, crystals, spin configurations.[^1]

The broader puzzle reaches far beyond qubit calibration. At inference time you just sample from the learned model $p_\theta$: $X \sim p_\theta(X \mid y)$, where $y$ is whatever context the model is conditioned on. There is nothing obviously special about that operation. And yet these systems paint photorealistic images of parrots, propose stable crystal structures, and write working code on demand. Why should sampling from a learned distribution do all that?

This post unpacks three aspects of the unreasonable effectiveness of autoregressive models. First, the autoregressive factorization that makes language models work turns out to be universal — the same recipe applies across radically different modalities. Second, after data-driven pretraining, finding good parameters $\theta$ in a vast, high-dimensional space is, counterintuitively, *easier* than searching directly in the configuration space. Third, varying only the context $y$ is surprisingly powerful to steer the model with fixed $\theta$ to solve real scientific tasks, from writing code to driving laboratory experiments.

## Next-token prediction beyond language

The chain-rule factorization above is well suited to language, where each $x_i$ is the next token given its predecessors. However, the factorization does not care what the tokens are. *Language* becomes a token sequence the moment a tokenizer chops a character stream into a finite vocabulary of discrete pieces. A token sequence is essentially a bitstream because each token is an integer, and every integer is a bit pattern. And whatever you can store on a disk, transmit over a network, or read off a sensor is, at some layer of abstraction, a bitstream — text, images, audio, molecular geometries, experimental traces, control pulses. Therefore, autoregressive models apply to, in principle, **anything**.

![From an image to its JPEG bytes to a further autoregressive compression (JPEG-LM).](bitstream-diagram.png)

**Images.** There is more than one way to serialize an image into a sequence. Visual autoregressive modeling (VAR) reformulates image generation as "next-scale prediction": instead of generating pixels left-to-right, the model predicts a sequence of progressively higher-resolution token maps, each conditioned on all coarser scales that came before.[^2] JPEG-LM goes further and chains two compressions: a hand-designed JPEG compression, then a neural compression by an autoregressive language model trained directly on the resulting bytes.[^3] It skips the image tokenizer entirely — the already-compressed image is just another byte sequence to predict one token at a time. The two approaches differ only in what "token" means. In both cases, the autoregressive machinery is preserved exactly, and coherent images fall out of the same chain-rule predictor that handles text. 

**Crystals.** Crystalformer treats crystal structure generation as an autoregressive process over atomic sites: atoms are placed one at a time, with each placement conditioned on the space group, lattice parameters, and all previously placed atoms.[^4] The discrete symmetry constraints of crystallography enter naturally into the tokenization, and the model learns to respect them without any hand-engineered symmetry enforcement.

The takeaway is that no modality-specific generative principle is required — the autoregressive machinery transports across domains. The same transformer, trained autoregressively on a different kind of sequence, can render a photorealistic landscape or propose a stable crystal, among many other scientific objects. An earlier [lecture on autoregressive models for alphabets, actions, and atoms](lectures/AAA-hangzhou2025.pdf) walks through several more, and prefigures the three themes of this post.

## Pre-training simplifies the landscape

Many modern generative systems separate pretraining from post-training — **pretraining** fits the parameters $\theta$ by maximum likelihood on data, and **post-training** (RLHF/RLVR) then shifts $\theta$ toward a task-specific reward $\min_\theta \mathbb{E}_{X \sim p_\theta(X)}[E(X)]$. Two recent works demonstrate the recipe on scientific problems. CrystalFormer-CSP reinforcement-fine-tunes a pretrained crystal-generation model to find stable crystal structures that direct energy minimization misses.[^5] Test-time reinforcement learning updates $\theta$ during inference to find high-quality solutions across domains from mathematics to GPU kernels, outperforming direct search over the answer space.[^6]

Why should this work at all? The pretrained model has hundreds of millions to billions of parameters $\theta$, yet the configuration space where a physicist traditionally searches for $\min_X E(X)$ has tens to thousands of dimensions — orders of magnitude smaller. By a naive dimensional argument, optimizing $\theta$ ought to be harder. Yet in practice it is easier — SGD on $10^{10}$-parameter models finds meaningful structures, while global optimization in a few thousand dimensions struggles. That is the second surprise.

**Our conjecture.** Pre-training learns a representation in which the downstream policy landscape — the objective seen by fine-tuning — is simpler than the raw configuration-space energy landscape.

$$\min_\theta\; \mathbb{E}_{X \sim p_\theta(X)}\!\left[E(X)\right]
\qquad \text{vs.} \qquad \min_X\; E(X)$$

![Parameter landscape (left) vs. configuration landscape (right).](loss-landscape.png)

The parameter landscape (left) lives in a space with hundreds of millions of dimensions yet is empirically navigable by SGD, in contrast to the traps that plague physical energy landscapes. The configuration landscape (right) is, for any non-trivial system, rugged and crowded with metastable minima — the standard obstruction that motivates replica exchange, parallel tempering, and every scheme physicists have devised to escape local traps.

The reason is that coordinated directions in $\theta$-space can control nonlocal, physically meaningful degrees of freedom rather than individual coordinates. In CrystalFormer-CSP, these directions effectively move coordination polyhedra around, not lone atoms; fine-tuning navigates a landscape of chemically plausible motifs rather than raw $3N$-dimensional atomic positions. In test-time reinforcement learning, they move program motifs — reasoning patterns, proof templates, subroutines — rather than individual tokens; fine-tuning navigates a landscape of solution strategies. In both cases a policy-gradient step in $\theta$-space is a coordinated, nonlocal move in configuration space, and nonlocal moves can cross barriers that local energy minimization cannot.

In the end, what matters is the geometry of the landscape the optimizer actually sees, not the dimensionality. Representation learning via pre-training changes that geometry.

## Context alone steers the agent

When deployed as an LLM, the parameters $\theta$ of the autoregressive model are frozen. Only the context $y$ varies from one task to the next. This sounds unremarkable. Yet the same model answers questions, drafts prose, writes code, debugs programs, drives a browser, navigates a terminal — and, increasingly, runs real experiments on real instruments.

An [agentic harness](teaching-post.html?p=ai-agent-research) amplifies this by wrapping the sampler in a loop: **observe** the environment, **reason**, **act** via tool use, **verify** the outcome. Reasoning, tool use, and reflection all extend $y$ — with deliberation, external information, and feedback respectively. In the end, agentic AI still carries out conditional sampling $X \sim p_\theta(X \mid y)$.

Return to the qubit calibration experiment from the opening. The agent driving it is exactly this sampler wrapped in a harness. Code becomes an experimental action, the measured trace becomes new context, and the next sampled action updates the calibration — all in pure text. The agent reads raw numerical traces, writes fitting code, and reasons about the results; no vision model is involved. Multimodality, here, comes from tool use rather than from a fused vision encoder. A recent benchmark, QCalEval, makes the contrast concrete: it evaluates how well vision-language models (VLMs) interpret calibration *plots* — images of the same oscillation traces and spectroscopy maps that our agent handles as arrays.[^7] Current VLMs see visual features but lack the domain knowledge to diagnose them reliably, and fine-tuning or rich in-context demonstrations are needed to close the gap. An agent with programmatic access to the instrument already has the data; routing it through a plotting pipeline and a vision encoder is a lossy detour.

Writing a custom calibration loop for each experiment would be ad hoc. But the protocol for a successful calibration — what to sweep, what constitutes a good fit, when to retry — can be written once as a *skill*: a reusable block of instructions that the agent loads into its context on demand. A Rabi calibration skill, a T1 measurement skill, a spectroscopy skill — each encodes the domain knowledge that QCalEval finds missing from zero-shot VLMs. And skills are just text appended to $y$.

That is the third surprise. A frozen autoregressive model, steered only through $y$, can write code, use a computer, and run a qubit calibration experiment — no gradient update, no vision encoder, no modality-specific module.

## Coda

The three surprises in this post correspond to three aspects of autoregressive models: **representation** — the autoregressive architecture turns out to be general-purpose machinery for modeling probability distributions over bitstreams; **optimization** — representation learning via pre-training may reshape the parameter landscape so that policy gradients may win over direct configuration-space optimization; and **sampling** — a frozen $p_\theta$, steered only through context, is able to interact with [the](https://x.com/karpathy/status/2005067301511630926?s=20) [real](https://x.com/andreasklinger/status/2033850814515564673?s=20) [world](https://x.com/AnthropicAI/status/1938630294807957804). It is hard not to wonder whether autoregressive modeling is capturing some truth about our Universe.

## Acknowledgments

Thanks Shigang Ou,  Zhendong Cao and Pan Zhang for discussions and collaborations.

[^1]: Wu, Wang, and Zhang, "Solving Statistical Mechanics Using Variational Autoregressive Networks", Physical Review Letters 122, 080602 (2019). https://arxiv.org/abs/1809.10606

[^2]: Tian, Jiang, Yuan, Peng, and Wang, "Visual Autoregressive Modeling: Scalable Image Generation via Next-Scale Prediction", arXiv:2404.02905 (2024). https://arxiv.org/abs/2404.02905

[^3]: Han, Ghazvininejad, Koh, and Tsvetkov, "JPEG-LM: LLMs as Image Generators with Canonical Codec Representations", arXiv:2408.08459 (2024). https://arxiv.org/abs/2408.08459

[^4]: Cao, Luo, Lv, and Wang, "Space Group Informed Transformer for Crystalline Materials Generation", arXiv:2403.15734 (2024). https://arxiv.org/abs/2403.15734

[^5]: Cao, Ou, and Wang, "CrystalFormer-CSP: Thinking Fast and Slow for Crystal Structure Prediction", arXiv:2512.18251 (2025). https://arxiv.org/abs/2512.18251

[^6]: Yuksekgonul, Koceja, Li, Bianchi, McCaleb, Wang, Kautz, Choi, Zou, Guestrin, and Sun, "Learning to Discover at Test Time", arXiv:2601.16175 (2026). https://arxiv.org/abs/2601.16175

[^rabi]: This experiment was carried out by Shigang Ou (IOP) at BAQIS during his internship at DP Technology.

[^7]: Cao, Pancotti, Lubowe, Svore, Kyoseva, Stanwyck, Costa, Zhang, Mantilla Calderon, and Aspuru-Guzik, "QCalEval: Benchmarking Vision-Language Models for Quantum Calibration Plot Understanding" (NVIDIA, April 2026). https://research.nvidia.com/publication/2026-04_qcaleval-benchmarking-vision-language-models-quantum-calibration-plot
