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

<!-- §2: Task 5 -->

## The Unreasonable Effectiveness of $y \sim p_\theta(y \mid x)$

<!-- §3: Task 6 -->

## Coda

<!-- coda: Task 8 -->
