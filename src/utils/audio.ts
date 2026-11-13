// Web Audio API controller for authentic Mars atmospheric audio and UI sound effects
class MarsAudioController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientSource: AudioBufferSourceNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle ambient Mars atmospheric wind sound
  toggleAmbient(enable?: boolean) {
    if (typeof window === 'undefined') return;
    this.initCtx();
    if (!this.ctx) return;

    const shouldPlay = enable !== undefined ? enable : !this.isAmbientPlaying;
    if (shouldPlay && !this.isMuted) {
      if (this.isAmbientPlaying) return;
      try {
        const bufferSize = this.ctx.sampleRate * 4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02; // Pink-ish noise filter
          lastOut = data[i];
          data[i] *= 3.5;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 2.0);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
        this.ambientSource = noise;
        this.ambientGain = gain;
        this.isAmbientPlaying = true;
      } catch {}
    } else {
      if (this.ambientGain && this.ctx) {
        try {
          this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
          setTimeout(() => {
            if (this.ambientSource) {
              try {
                this.ambientSource.stop();
              } catch {}
              this.ambientSource = null;
            }
            this.isAmbientPlaying = false;
          }, 1100);
        } catch {
          this.isAmbientPlaying = false;
        }
      }
    }
  }

  // Button click feedback
  playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {}
  }

  // Scene transition swoosh
  playTransition() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(550, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }

  // Hotspot discovery chime
  playChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.09, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch {}
  }

  // Success celebration fanfare
  playSuccess() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.14, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.5);
      });
    } catch {}
  }

  // Dust storm howling wind
  playStorm() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(260, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch {}
  }
}

export const marsAudio = new MarsAudioController();
