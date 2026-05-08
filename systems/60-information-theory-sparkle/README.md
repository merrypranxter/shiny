# System 60: Information Theory Sparkle

System 60: Information Theory Sparkle
Overview
Entropy made visible. Shannon entropy = sparkle density. Mutual information = connected sparkles.
KL divergence = color shift between distributions. The chrome surface is a communication channel, and
the sparkles are the message. Information IS the glitter.
Mathematical Foundation
Shannon Entropy: H(X) = -Σ p(x)・log₂p(x)
• High entropy = uniform distribution = dense, even sparkles
• Low entropy = concentrated = sparse, clustered sparkles
Mutual Information: I(X;Y) = H(X) - H(X|Y)
• Measures dependence between variables
• High MI = sparkles are connected/aligned
• Low MI = independent, random
KL Divergence: D_KL(P||Q) = Σ p(x)・log(p(x)/q(x))
• Measures difference between distributions
• Visualized as color shift from reference
Channel Capacity: C = max_p I(X;Y)
• Maximum information throughput
• Chrome “bandwidth” = sparkle update rate
GLSL Shader
See shader.glsl — entropy field computation, mutual information visualization, divergence coloring.
JS Module
See module.js — probability distribution estimation, entropy calculation, information dynamics, com-
pression ratio tracking.
Showcase Builds
1. Entropy Field
Real-time entropy of pixel neighborhoods. Uniform regions = bright even sparkles. Edges/texture =
chaotic sparkle patterns. The image reveals its own information content.
2. Mutual Information Web
Connected regions share information = connected sparkles. The web of mutual information IS the web
of sparkles. Cut a connection = two separate constellations.

3. KL Divergence Chrome
Two chrome surfaces with different statistics. The divergence between them = color difference. As they
converge, colors merge. Information distance made chromatic.
4. Compression Art
Sparkle density = compression ratio. Highly compressible = few sparkles (low entropy). Incompressible
= dense sparkles (high entropy). The art IS the compression limit.
5. Channel Noise
Add noise to the sparkle channel. Capacity decreases = sparkles blur. At channel capacity = maximum
sparkle clarity. Shannon limit made visible.
Implementation Notes
• Estimate local probability distributions from pixel neighborhoods
• Compute entropy via histogram binning
• Mutual information: joint histogram vs product of marginals
• KL divergence: compare current frame to reference
• Use logarithmic scaling for entropy visualization