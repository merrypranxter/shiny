# System 48: Prime Dust

System 48: Prime Dust
Overview
Every sparkle’s position is a prime number.
p(n) mod width, p(n+1) mod height. Size = prime gap.
Color = residue class mod 6 (warm for ￿1, cool for ￿5). Non-repeating, non-clustering, but deterministic.
Secret math message in the glitter.
Mathematical Foundation
Prime Number Theorem: The nth prime p(n) ~ n・ln(n). Prime gaps grow slowly (max gap ~ ln²p).
The distribution is deterministic but appears random — “quasi-random.”
Key Sequences:
• Position: x = p(n) mod W, y = p(n+1) mod H
• Size: s = p(n+1) - p(n) (prime gap)
• Color: hue = 0° if p(n) ≡1 (mod 6), hue = 240° if p(n) ≡5 (mod 6)
• All primes > 3 are ￿1 or 5 (mod 6)
Special Classes:
• Twin primes: gap = 2, connected by lines
• Mersenne primes: 2^p - 1, only 51 known
• Goldbach pairs: even number = sum of two primes
GLSL Shader
See shader.glsl — prime hash for deterministic sparkle placement, mod-6 coloring, gap-based sizing.
JS Module
See module.js — prime sieve, nth-prime lookup, special class detection (twin, Mersenne, Goldbach).

Showcase Builds
1. Ulam Galaxy
Spiral reveals diagonal prime lines as constellations. Ulam spiral places integers in spiral — primes cluster
on diagonals (Euler’s n²+n+41 and others). The galaxy IS the proof.
2. Prime Gap Rain
Gaps as raindrop sizes. Small gaps = fine mist. Large gaps = heavy drops. Deterministic but chaotic
distribution. The rain pattern is a prime signature.
3. Twin Prime Constellation
Only twin pairs (gap=2), connected by glowing lines. Rare and precious. Each twin is a binary star. The
constellation map shows where primes cluster.
4. Mersenne Diamonds
Massive diamonds for the 51 known Mersenne primes. Each diamond size proportional to p in 2^p-1.
The known giants glow brightest — unknown ones are dark holes.
5. Goldbach Glow
Even numbers as sums of two primes. Visual proof-by-light: each even number glows with intensity
proportional to number of Goldbach pairs. The glow IS the theorem.
Implementation Notes
• Precompute primes up to limit (e.g., 1,000,000) for performance
• Use segmented sieve for memory eﬀiciency
• nth-prime approximation: n・(ln n + ln ln n - 1) for bounds
• Twin prime detection: check isPrime(n) && isPrime(n+2)