# The Unreasonable Effectiveness of Generative AI

*Lei Wang*

*April 2026*

---

In 1960, Eugene Wigner marveled at "The Unreasonable Effectiveness of Mathematics in the Natural Sciences" — the uncanny fact that abstract structures invented by mathematicians turn out to describe physical reality with startling precision. Almost fifty years later, Halevy, Norvig, and Pereira wrote a sequel of sorts: "The Unreasonable Effectiveness of Data," arguing that simple models trained on enough data beat carefully engineered ones. This post is another installment in that series, written from a physicist's angle. The protagonist this time is generative AI.

Here is the puzzle. A modern generative AI system is, mechanically, a learned probability distribution $p_\theta$ over sequences of tokens, pixels, atomic coordinates, or control pulses. At inference time you just sample: $y \sim p_\theta(y \mid x)$. There is nothing obviously special about that operation. And yet these systems paint photorealistic images of parrots, fold proteins to atomic accuracy, propose stable crystal structures, drive laboratory qubits through calibration routines, and write working code on demand. Why should sampling from a learned distribution do all that?

This post unpacks three surprises. First, the autoregressive factorization that makes language models work turns out to be universal — the same recipe applies across radically different scientific modalities. Second, finding good parameters $\theta$ in a vast, high-dimensional space is, counterintuitively, *easier* than searching over exponentially large configuration spaces directly. Third, once $\theta$ is frozen you do not need to retrain anything: varying only the context $x$ is enough to steer the model toward real scientific tasks.

## Autoregressive Models Beyond Language

<!-- §1: Task 4 -->

## The Untold Secret of Pre-training

<!-- §2: Task 5 -->

## The Unreasonable Effectiveness of $y \sim p_\theta(y \mid x)$

<!-- §3: Task 6 -->

## Coda

<!-- coda: Task 8 -->
