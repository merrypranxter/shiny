// System 48: Prime Dust — JS Module
// Prime sieve, nth-prime, special class detection
export class PrimeDustSystem {
constructor(maxPrime = 1000000) {
this.primes = this.sieve(maxPrime);
this.maxPrime = maxPrime;
this.startIndex = 0;
this.count = 100;
this.mode = 0; // 0=ulam, 1=gap rain, 2=twin, 3=mersenne, 4=goldbach
}
// Sieve of Eratosthenes
sieve(limit) {
const isPrime = new Uint8Array(limit + 1).fill(1);
isPrime[0] = isPrime[1] = 0;

for (let i = 2; i * i <= limit; i++) {
if (isPrime[i]) {
for (let j = i * i; j <= limit; j += i) {
isPrime[j] = 0;
}
}
}
const primes = [];
for (let i = 2; i <= limit; i++) {
if (isPrime[i]) primes.push(i);
}
return primes;
}
// Get nth prime (0-indexed)
nthPrime(n) {
if (n < this.primes.length) return this.primes[n];
// Approximate for large n
const ln_n = Math.log(n);
return Math.floor(n * (ln_n + Math.log(ln_n) - 1));
}
// Check if n is prime (for numbers beyond sieve)
isPrime(n) {
if (n <= this.maxPrime) {
// Binary search in primes array
let lo = 0, hi = this.primes.length;
while (lo < hi) {
const mid = (lo + hi) >> 1;
if (this.primes[mid] < n) lo = mid + 1;
else hi = mid;
}
return this.primes[lo] === n;
}
// Trial division for large numbers
if (n < 2) return false;
if (n % 2 === 0) return n === 2;
if (n % 3 === 0) return n === 3;
for (let i = 5; i * i <= n; i += 6) {
if (n % i === 0 || n % (i + 2) === 0) return false;
}
return true;
}
// Get twin primes (pairs with gap=2)
getTwinPrimes(start, count) {
const twins = [];
let found = 0;
let idx = start;
while (found < count && idx < this.primes.length - 1) {

const p = this.primes[idx];
if (this.primes[idx + 1] === p + 2) {
twins.push([p, p + 2]);
found++;
}
idx++;
}
return twins;
}
// Get Mersenne primes (2^p - 1 where p is prime)
// Only 51 known — hardcoded exponents for accuracy
getMersenneExponents() {
return [2, 3, 5, 7, 13, 17, 19, 31, 61, 89, 107, 127, 521, 607, 1279,
2203, 2281, 3217, 4253, 4423, 9689, 9941, 11213, 19937, 21701,
23209, 44497, 86243, 110503, 132049, 216091, 756839, 859433,
1257787, 1398269, 2976221, 3021377, 6972593, 13466917, 20996011,
24036583, 25964951, 30402457, 32582657, 37156667, 42643801,
43112609, 57885161, 74207281, 77232917, 82589933];
}
// Goldbach pairs for even number n
getGoldbachPairs(n) {
if (n % 2 !== 0 || n < 4) return [];
const pairs = [];
for (let p of this.primes) {
if (p > n / 2) break;
if (this.isPrime(n - p)) {
pairs.push([p, n - p]);
}
}
return pairs;
}
// Get uniforms for shader
getUniforms() {
return {
u_prime_index: this.startIndex,
u_count: this.count,
u_mode: this.mode,
u_time: performance.now() * 0.001
};
}
// Animate through primes
animate(speed = 1.0) {
this.startIndex += speed;
if (this.startIndex > this.primes.length - this.count) {
this.startIndex = 0;
}
}

// Set mode
setMode(mode) {
this.mode = mode;
}
}