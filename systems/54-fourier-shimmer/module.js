// System 54: Fourier Shimmer — JS Module
// Web Audio FFT, frequency bin mapping, beat detection
export class FourierShimmerSystem {
constructor(audioContext = null) {
this.audioContext = audioContext;
this.analyser = null;
this.fftSize = 256;
this.spectrumData = new Uint8Array(this.fftSize);
this.phaseData = new Float32Array(this.fftSize);
this.beatIntensity = 0;
this.mode = 0;
this.time = 0;
this.useSyntheticAudio = false;
this.energyHistory = [];
this.historySize = 43;
this.phaseShift = 0;
this.frozenSpectrum = null;
this.isFrozen = false;
}
async initAudio() {
if (!this.audioContext) {
this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

try {
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
const source = this.audioContext.createMediaStreamSource(stream);
this.analyser = this.audioContext.createAnalyser();
this.analyser.fftSize = this.fftSize;
source.connect(this.analyser);
} catch (e) {
console.log('Audio input failed, using synthetic');
this.useSyntheticAudio = true;
}
}
generateSyntheticSpectrum(time) {
for (let i = 0; i < this.fftSize; i++) {
const freq = i / this.fftSize;
const kick = Math.exp(-Math.pow((freq - 0.05) / 0.02, 2)) * (Math.sin(time * 10) > 0.8 ? 1 :
0);
↪
const snare = Math.exp(-Math.pow((freq - 0.3) / 0.1, 2)) * (Math.sin(time * 10 + 3) > 0.9 ?
0.7 : 0);
↪
const hihat = Math.exp(-Math.pow((freq - 0.8) / 0.2, 2)) * (Math.sin(time * 20) > 0.95 ? 0.5
: 0);
↪
const harmonics = Math.sin(freq * 100) * 0.3 * Math.exp(-freq * 2);
this.spectrumData[i] = (kick + snare + hihat + harmonics) * 255;
this.phaseData[i] = Math.sin(freq * 50 + time) * Math.PI;
}
}
detectBeat() {
let energy = 0;
const bassBins = Math.floor(this.fftSize * 0.1);
for (let i = 0; i < bassBins; i++) {
energy += this.spectrumData[i] / 255;
}
energy /= bassBins;
this.energyHistory.push(energy);
if (this.energyHistory.length > this.historySize) {
this.energyHistory.shift();
}
const avgEnergy = this.energyHistory.reduce((a, b) => a + b, 0) / this.energyHistory.length;
if (energy > avgEnergy * 1.3 && energy > 0.3) {
this.beatIntensity = 1.0;
}
this.beatIntensity *= 0.9;
}
updateAudio() {
if (this.useSyntheticAudio) {

this.generateSyntheticSpectrum(this.time);
} else if (this.analyser) {
this.analyser.getByteFrequencyData(this.spectrumData);
const timeData = new Uint8Array(this.fftSize);
this.analyser.getByteTimeDomainData(timeData);
for (let i = 0; i < this.fftSize; i++) {
this.phaseData[i] = (timeData[i] - 128) / 128 * Math.PI;
}
}
this.detectBeat();
}
freeze() {
this.frozenSpectrum = new Uint8Array(this.spectrumData);
this.isFrozen = true;
}
unfreeze() {
this.isFrozen = false;
}
setPhaseShift(shift) {
this.phaseShift = shift;
}
getSpectrumData() {
return this.isFrozen ? this.frozenSpectrum : this.spectrumData;
}
getPhaseData() {
return this.phaseData;
}
getUniforms() {
return {
u_time: this.time,
u_mode: this.mode,
u_beat: this.beatIntensity,
u_spectrum_size: this.fftSize / 2,
u_phase: this.phaseShift
};
}
update(dt) {
this.time += dt;
this.updateAudio();
}
setMode(mode) {
this.mode = mode;
}

}