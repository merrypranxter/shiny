// System 50: Network Songs — JS Module
// Graph Laplacian, spectral decomposition, effective resistance
export class NetworkSongsSystem {
constructor(nodeCount = 50) {
this.nodeCount = nodeCount;
this.nodes = []; // {x, y, fiedler, degree, eigenvectors[]}
this.edges = []; // {i, j, weight}
this.adjacency = new Array(nodeCount).fill(null).map(() => new Array(nodeCount).fill(0));
this.laplacian = new Array(nodeCount).fill(null).map(() => new Array(nodeCount).fill(0));
this.eigenvalues = [];
this.eigenvectors = [];
this.mode = 0;
this.eigenmode = 0;
}
// Generate random graph (Erdős–Rényi)
generateRandomGraph(p = 0.1) {
this.edges = [];
this.adjacency = new Array(this.nodeCount).fill(null).map(() => new
Array(this.nodeCount).fill(0));
↪
for (let i = 0; i < this.nodeCount; i++) {
for (let j = i + 1; j < this.nodeCount; j++) {
if (Math.random() < p) {
const weight = Math.random();
this.edges.push({i, j, weight});
this.adjacency[i][j] = this.adjacency[j][i] = weight;
}
}
}
this.computeLaplacian();
this.computeSpectral();
}

// Generate expander graph (well-connected)
generateExpanderGraph() {
this.edges = [];
this.adjacency = new Array(this.nodeCount).fill(null).map(() => new
Array(this.nodeCount).fill(0));
↪
// Random regular graph approximation
const degree = 4;
for (let i = 0; i < this.nodeCount; i++) {
for (let d = 1; d <= degree / 2; d++) {
const j = (i + d) % this.nodeCount;
const weight = 1.0;
this.edges.push({i, j, weight});
this.adjacency[i][j] = this.adjacency[j][i] = weight;
}
}
this.computeLaplacian();
this.computeSpectral();
}
// Generate graph with communities (for Fiedler demo)
generateCommunityGraph(communities = 2) {
this.edges = [];
this.adjacency = new Array(this.nodeCount).fill(null).map(() => new
Array(this.nodeCount).fill(0));
↪
const nodesPerCommunity = Math.floor(this.nodeCount / communities);
for (let i = 0; i < this.nodeCount; i++) {
for (let j = i + 1; j < this.nodeCount; j++) {
const ci = Math.floor(i / nodesPerCommunity);
const cj = Math.floor(j / nodesPerCommunity);
// High probability within community, low between
const p = (ci === cj) ? 0.3 : 0.02;
if (Math.random() < p) {
const weight = (ci === cj) ? 1.0 : 0.3;
this.edges.push({i, j, weight});
this.adjacency[i][j] = this.adjacency[j][i] = weight;
}
}
}
this.computeLaplacian();
this.computeSpectral();
}
// Compute Laplacian matrix

computeLaplacian() {
const n = this.nodeCount;
this.laplacian = new Array(n).fill(null).map(() => new Array(n).fill(0));
for (let i = 0; i < n; i++) {
let degree = 0;
for (let j = 0; j < n; j++) {
degree += this.adjacency[i][j];
}
this.laplacian[i][i] = degree;
for (let j = 0; j < n; j++) {
if (i !== j) {
this.laplacian[i][j] = -this.adjacency[i][j];
}
}
}
}
// Power iteration for eigenvectors
computeSpectral(numEigenvectors = 5) {
const n = this.nodeCount;
this.eigenvectors = [];
this.eigenvalues = [];
// Simple power iteration (for demo — use Lanczos in production)
for (let k = 0; k < numEigenvectors; k++) {
let v = new Array(n).fill(0).map(() => Math.random() - 0.5);
// Gram-Schmidt against previous eigenvectors
for (let prev = 0; prev < k; prev++) {
const prevVec = this.eigenvectors[prev];
let dot = 0;
for (let i = 0; i < n; i++) dot += v[i] * prevVec[i];
for (let i = 0; i < n; i++) v[i] -= dot * prevVec[i];
}
// Normalize
let norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
v = v.map(x => x / norm);
// Power iteration
for (let iter = 0; iter < 100; iter++) {
let newV = new Array(n).fill(0);
for (let i = 0; i < n; i++) {
for (let j = 0; j < n; j++) {
newV[i] += this.laplacian[i][j] * v[j];
}
}
// Gram-Schmidt
for (let prev = 0; prev < k; prev++) {

const prevVec = this.eigenvectors[prev];
let dot = 0;
for (let i = 0; i < n; i++) dot += newV[i] * prevVec[i];
for (let i = 0; i < n; i++) newV[i] -= dot * prevVec[i];
}
norm = Math.sqrt(newV.reduce((s, x) => s + x * x, 0));
v = newV.map(x => x / norm);
}
// Compute eigenvalue
let lambda = 0;
for (let i = 0; i < n; i++) {
let lv = 0;
for (let j = 0; j < n; j++) {
lv += this.laplacian[i][j] * v[j];
}
lambda += v[i] * lv;
}
this.eigenvectors.push(v);
this.eigenvalues.push(lambda);
}
// Update node data
this.updateNodeData();
}
// Update node positions and spectral data
updateNodeData() {
this.nodes = [];
const n = this.nodeCount;
for (let i = 0; i < n; i++) {
const degree = this.adjacency[i].reduce((s, w) => s + w, 0);
const fiedler = this.eigenvectors[1] ? this.eigenvectors[1][i] : 0;
// Position from first two non-trivial eigenvectors
const x = this.eigenvectors[1] ? (this.eigenvectors[1][i] + 1) * 0.5 : Math.random();
const y = this.eigenvectors[2] ? (this.eigenvectors[2][i] + 1) * 0.5 : Math.random();
this.nodes.push({
x, y,
fiedler,
degree,
eigenvectors: this.eigenvectors.map(v => v[i])
});
}
}
// Compute effective resistance between two nodes

effectiveResistance(i, j) {
// Simplified: use pseudoinverse approximation
// In production: solve Lx = e_i - e_j, return x[i] - x[j]
const n = this.nodeCount;
// Use spectral formula: R_eff = sum_k (v_k[i] - v_k[j])² / lambda_k
let resistance = 0;
for (let k = 1; k < this.eigenvectors.length; k++) {
const diff = this.eigenvectors[k][i] - this.eigenvectors[k][j];
resistance += diff * diff / (this.eigenvalues[k] + 0.001);
}
return Math.min(resistance, 1.0);
}
// Get node position texture data (for shader)
getNodeTextureData() {
const data = new Float32Array(this.nodeCount * 4);
for (let i = 0; i < this.nodeCount; i++) {
const node = this.nodes[i];
data[i * 4] = node.x;
data[i * 4 + 1] = node.y;
data[i * 4 + 2] = node.fiedler;
data[i * 4 + 3] = node.degree;
}
return data;
}
// Get edge texture data (for shader)
getEdgeTextureData() {
const data = new Float32Array(this.edges.length * 4);
for (let i = 0; i < this.edges.length; i++) {
const edge = this.edges[i];
data[i * 4] = edge.i;
data[i * 4 + 1] = edge.j;
data[i * 4 + 2] = edge.weight;
data[i * 4 + 3] = this.effectiveResistance(edge.i, edge.j);
}
return data;
}
// Get uniforms for shader
getUniforms() {
return {
u_node_count: this.nodeCount,
u_edge_count: this.edges.length,
u_mode: this.mode,
u_eigenmode: this.eigenmode,
u_time: performance.now() * 0.001
};
}

setMode(mode) {
this.mode = mode;
}
setEigenmode(mode) {
this.eigenmode = mode;
}
}