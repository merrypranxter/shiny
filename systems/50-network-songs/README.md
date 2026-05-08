# System 50: Network Songs

System 50: Network Songs
Overview
Network shine where graph Laplacian eigenvalues = color frequencies. The Fiedler vector (￿￿) detects
communities — positive = warm, negative = cool, boundary = white flash. Each eigenmode is a different
“dance” the network performs. The graph is a musical instrument made of light.
Mathematical Foundation
Graph Laplacian: L = D - A where D = degree matrix, A = adjacency matrix.
Spectral Decomposition: L = UΛUᵀwhere Λ = diag(￿￿, ￿￿, …, ￿￿), ￿￿= 0 ￿￿￿￿… ￿￿￿.
Key Eigenvalues:
• λ₁ = 0: constant eigenvector, trivial
• λ₂ (Fiedler value): algebraic connectivity. Small = graph nearly disconnected.
• λ₂ eigenvector (Fiedler vector): signs define communities. Zero-crossings = cuts.
Effective Resistance: R_eff(i,j) = (eᵢ-eⱼ)ᵀL⁺ (eᵢ-eⱼ) — measures how “connected” two nodes are.

GLSL Shader
See shader.glsl — node positions from eigenvectors, edge glow from effective resistance, community
coloring from Fiedler vector.
JS Module
See module.js — graph construction, sparse Laplacian, power iteration for eigenvectors, effective resis-
tance computation.
Showcase Builds
1. Fiedler Choir
Communities sing different notes. Fiedler vector signs = warm vs cool. Boundary nodes (near zero) pulse
white — conflicted, torn between communities. The network’s social tension made color.
2. Expander Pulse
Pulse spreads instantly through well-connected graph (expander). No bottlenecks. The flash reaches all
nodes in O(log n) time. Network eﬀiciency made visible.
3. Bridge Flash
Critical edges glow proportional to effective resistance. High resistance = vulnerable bridge. The glow
map IS the vulnerability map. Cut the bright edges, graph falls apart.
4. Spectral Dance
Rapid cycling through eigenmodes.
Network morphs between states.
Each eigenmode is a different
“dance” — some nodes always move together (eigenvector entry signs), some always opposite.
5. Random Walk Glow
Walker leaves heat trail. Well-connected areas visited often = bright. Bottlenecks = dark (walker gets
stuck). The heat map IS the connectivity map.
Implementation Notes
• Use sparse matrix formats for large graphs
• Power iteration for dominant eigenvectors
• Lanczos algorithm for extremal eigenvalues
• Effective resistance: solve linear system with Laplacian pseudoinverse