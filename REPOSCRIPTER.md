# ✦ REPOSCRIPTER INTEGRATION

## What RepoScripter Is (In This Context)

RepoScripter is a pipeline tool that reads structured markdown documentation and generates corresponding code files. It's not a specific published tool — it's a **workflow pattern** for converting design-system docs into executable code.

**The Pattern:**
```
Markdown docs (systems/) → Code extraction → File generation → GitHub repo
```

## How This Repo Is Structured for RepoScripter

Every system file follows a consistent structure that RepoScripter can parse:

```markdown
# ✦ System XX: TITLE

## Core Idea
[Concept description]

## Concept
[Visual direction]

## Math Systems
| Component | Math | Purpose |
|-----------|------|---------|
| [name] | [math] | [use] |

## Code Hook (GLSL/JS)
```[language]
[code block]
```

## Variants
- [variant 1]
- [variant 2]

## Cross-Breeds
- + System [N]: [result]

---
```

## RepoScripter Parsing Rules

### 1. Code Block Extraction

RepoScripter scans for fenced code blocks and tags them by language:

```markdown
## Code Hook (GLSL)
```glsl
// This gets extracted to .glsl file
```

## Code Hook (JS)
```javascript
// This gets extracted to .js file
```
```

**Extraction pattern:**
- `## Code Hook (GLSL)` → extract to `shader-translations/[system-name].glsl`
- `## Code Hook (JS)` → extract to `code-snippets/[system-name].js`
- `## Code Hook (Python)` → extract to `code-snippets/[system-name].py`

### 2. Math System Mapping

The "Math Systems" table maps to `math-systems/` reference docs:

| If table mentions... | Link to... |
|---------------------|------------|
| L-systems | `math-systems/l-systems.md` |
| Reaction-diffusion | `math-systems/reaction-diffusion.md` |
| Voronoi | `math-systems/voronoi-delaunay.md` |
| fBm | `math-systems/fbm-noise.md` |
| SDF | `math-systems/signed-distance-functions.md` |
| DLA | `math-systems/dla.md` |
| Flow fields | `math-systems/flow-fields.md` |
| Cellular automata | `math-systems/cellular-automata.md` |
| Thin-film | `math-systems/thin-film-interference.md` |
| Fresnel | `math-systems/fresnel-fields.md` |
| Caustics | `math-systems/caustics.md` |
| Birefringence | `math-systems/birefringence.md` |
| Blue noise | `math-systems/blue-noise.md` |
| Penrose | `math-systems/penrose-tiling.md` |
| Hilbert curve | `math-systems/graph-networks.md` |

### 3. Cross-Breed Resolution

When a system mentions cross-breeds, RepoScripter:
1. Identifies the two parent systems
2. Checks if a cross-mutation file exists
3. If not, generates a stub in `cross-mutations/`

### 4. Showcase Build Generation

From each system, RepoScripter can generate:
- 3-5 showcase concepts (variations on the theme)
- Each with: concept, math system, code hook, visual direction
- Output to `showcase-builds/`

## RepoScripter File Generation Pipeline

```
Input: systems/01-matte-host-brilliant-veins.md

Step 1: Parse frontmatter (system number, title)
Step 2: Extract code hooks
        → code-snippets/vein-generators.js
        → shader-translations/vein-template.glsl
Step 3: Map math systems
        → Link to math-systems/l-systems.md
        → Link to math-systems/reaction-diffusion.md
Step 4: Generate showcase stubs
        → showcase-builds/ (if not already populated)
Step 5: Update cross-mutations
        → Check for cross-breed references
        → Generate stubs if missing
Step 6: Update README
        → Ensure system is listed
        → Update file counts
```

## Code Compatibility Targets

### GLSL (Primary)
- **Target:** GLSL 3.3+ / WebGL 2.0 / OpenGL ES 3.0
- **Uniforms:** `u_time`, `u_resolution`, `u_mouse`
- **Varyings:** `v_uv` (0-1 normalized)
- **Output:** `gl_FragColor` or `out vec4 fragColor`
- **Math functions:** Use standard GLSL + custom noise/utility libs

### JavaScript (Secondary)
- **Target:** ES2020+, Node.js 18+, Browser
- **Modules:** ES modules (`import`/`export`)
- **Dependencies:** Minimal — mostly vanilla math + Canvas 2D/WebGL
- **Style:** Functional, pure where possible

### Python (Tertiary)
- **Target:** Python 3.10+
- **Libraries:** NumPy, Pillow, noise, scipy (optional)
- **Use case:** Offline generation, batch processing, data prep

## RepoScripter Prompt Template

For AI-assisted code generation (ChatGPT, Claude, Copilot):

```
SYSTEM: [system name from systems/XX-*.md]
MATH: [math systems from table]
VARIANT: [specific variant]
TARGET: [GLSL/JS/Python]

Generate [TARGET] code for [SYSTEM] implementing [VARIANT].

Requirements:
- Use math systems: [MATH]
- Include uniforms: u_time, u_resolution
- Include at least 3 tweakable parameters
- Add comments explaining the optical effect
- Make it runnable as standalone [TARGET]

Reference the code hook from systems/XX-*.md as starting point.
```

## Integration with Your AI Pipeline

You mentioned using multiple AI agents. Here's how RepoScripter fits:

| Agent | Role | RepoScripter Interaction |
|-------|------|----------------------|
| **Kimi** (this) | Doc generation, structure, extraction | Creates/updates markdown files |
| **Claude** | Preprocessing, analysis, big-picture | Reads systems, suggests cross-breeds |
| **ChatGPT** | Code generation, implementation | Takes RepoScripter prompts, outputs code |
| **Gemini** | Shader development, GLSL | Generates .glsl from system specs |
| **Copilot** | Repo organization, file management | Executes RepoScripter pipeline |

## Quick Start

1. **Read a system** from `systems/`
2. **Extract the code hook** — copy the fenced block
3. **Drop into your shader environment** (ShaderToy, VS Code + glslCanvas, etc.)
4. **Tweak parameters** — the system doc tells you what each does
5. **Cross-breed** — combine two systems, generate new code
6. **Commit** — RepoScripter organizes files, you commit to GitHub

## File Naming Convention

```
systems/XX-descriptive-name.md
showcase-builds/XX-concept-name.md
code-snippets/[system-key]-[component].js
shader-translations/[system-key]-[variant].glsl
math-systems/[math-name].md
cross-mutations/[system-a]-plus-[system-b].md
prompts/formula-[N]-[description].md
```

## Next Steps

- Populate `code-snippets/` with extracted JS from all 30 systems
- Generate full GLSL files for each system in `shader-translations/`
- Build a RepoScripter CLI tool that automates the extraction
- Create test renders for each showcase build

---

*RepoScripter is the bridge between design thinking and executable code.*
