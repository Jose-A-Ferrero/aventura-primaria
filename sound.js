/**
 * MOTOR DE AUDIO SINTETIZADO (Web Audio API)
 * Efectos de sonido divertidos e instantáneos sin dependencias externas
 */

class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(freq, type = "sine", duration = 0.15, gain = 0.15, delay = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    const startTime = this.ctx.currentTime + delay;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    g.gain.setValueAtTime(gain, startTime);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(g);
    g.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Sonido de clic alegre
  click() {
    this.playTone(600, "sine", 0.08, 0.08);
  }

  // Sonido de respuesta correcta
  correct() {
    this.playTone(523.25, "triangle", 0.12, 0.15, 0);      // C5
    this.playTone(659.25, "triangle", 0.12, 0.15, 0.08);   // E5
    this.playTone(783.99, "triangle", 0.25, 0.2, 0.16);    // G5
  }

  // Sonido de error suave (amigable, tipo 'boing')
  wrong() {
    this.playTone(280, "sawtooth", 0.18, 0.12, 0);
    this.playTone(210, "sawtooth", 0.25, 0.12, 0.12);
  }

  // Sonido al ganar monedas o estrella
  coin() {
    this.playTone(987.77, "sine", 0.08, 0.12, 0);          // B5
    this.playTone(1318.51, "sine", 0.25, 0.18, 0.06);      // E6
  }

  // Sonido de estallido de burbuja
  pop() {
    this.playTone(800 + Math.random() * 300, "sine", 0.06, 0.12);
  }

  // Fanfarria de victoria y superación
  fanfare() {
    if (this.muted) return;
    const notes = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 0.12 },
      { f: 783.99, d: 0.12, t: 0.24 },
      { f: 1046.50, d: 0.4, t: 0.36 }
    ];
    notes.forEach(n => this.playTone(n.f, "triangle", n.d, 0.2, n.t));
  }

  // Subida de nivel o logro desbloqueado
  levelUp() {
    if (this.muted) return;
    const notes = [
      { f: 440, d: 0.1, t: 0 },
      { f: 554.37, d: 0.1, t: 0.09 },
      { f: 659.25, d: 0.1, t: 0.18 },
      { f: 880, d: 0.35, t: 0.27 }
    ];
    notes.forEach(n => this.playTone(n.f, "sine", n.d, 0.2, n.t));
  }
}

const sounds = new SoundFX();
