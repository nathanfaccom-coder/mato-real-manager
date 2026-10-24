// All audio is synthesized locally; one reusable crowd loop, no network or per-frame nodes.
export class StadiumAudio {
  constructor(Context) {
    this.context = new Context();
    const c = this.context;
    this.whistleVolume = 0.65;
    this.crowdVolume = 0.4;
    this.voices = [];
    this.anthemVoices = [];
    this.playing = false;
    this.crowdGain = c.createGain();
    this.crowdGain.gain.value = 0;
    const filter = c.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1400;
    const buffer = c.createBuffer(1, c.sampleRate * 4, c.sampleRate),
      data = buffer.getChannelData(0);
    let seed = 12345,
      smooth = 0;
    for (let i = 0; i < data.length; i++) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      smooth = 0.88 * smooth + 0.12 * (seed / 2147483648 - 1);
      data[i] = smooth * 3 * (0.7 + 0.3 * Math.sin((i / c.sampleRate) * 6.28));
    }
    this.crowd = c.createBufferSource();
    this.crowd.buffer = buffer;
    this.crowd.loop = true;
    this.crowd.connect(filter);
    filter.connect(this.crowdGain);
    this.crowdGain.connect(c.destination);
    this.crowd.start();
  }
  async unlock() {
    await this.context.resume();
    if (this.context.state !== "running") throw Error("audio suspended");
  }
  setVolumes(whistle, crowd) {
    this.whistleVolume = whistle;
    this.crowdVolume = crowd;
    this.setPlaying(this.playing);
  }
  setPlaying(value) {
    this.playing = value;
    const g = this.crowdGain.gain,
      t = this.context.currentTime;
    g.cancelScheduledValues(t);
    g.setTargetAtTime(value ? this.crowdVolume * 0.15 : 0, t, 0.15);
    if (!value) {
      this.stopWhistles();
      this.stopAnthem();
    }
  }
  stopWhistles() {
    for (const o of this.voices) {
      try {
        o.stop();
      } catch {}
    }
    this.voices = [];
  }
  stopAnthem() {
    for (const o of this.anthemVoices) {
      try {
        o.stop();
      } catch {}
    }
    this.anthemVoices = [];
  }
  anthem() {
    if (this.context.state !== "running" || !this.whistleVolume) return;
    this.stopAnthem();
    const c = this.context,
      start = c.currentTime + 0.04,
      beat = 0.62,
      melody = [
        392, 392, 440, 494, 523, 494, 440, 392,
        330, 392, 440, 392, 330, 294, 330, 392,
        440, 494, 523, 587, 523, 494, 440, 392,
      ];
    melody.forEach((frequency, i) => {
      const at = start + i * beat,
        length = beat * 0.88;
      for (const [pitch, volume, type] of [
        [frequency, 0.075, "triangle"],
        [frequency / 2, 0.035, "sine"],
      ]) {
        const oscillator = c.createOscillator(),
          gain = c.createGain();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(pitch, at);
        gain.gain.setValueAtTime(0, at);
        gain.gain.linearRampToValueAtTime(
          this.whistleVolume * volume,
          at + 0.07,
        );
        gain.gain.setValueAtTime(this.whistleVolume * volume, at + length * 0.65);
        gain.gain.linearRampToValueAtTime(0, at + length);
        oscillator.connect(gain);
        gain.connect(c.destination);
        oscillator.start(at);
        oscillator.stop(at + length + 0.01);
        this.anthemVoices.push(oscillator);
        oscillator.onended = () => {
          oscillator.disconnect();
          gain.disconnect();
        };
      }
    });
  }
  whistle(type = "foul") {
    if (this.context.state !== "running" || !this.whistleVolume) return;
    this.stopWhistles();
    const c = this.context;
    const n =
      type === "fulltime" ? 3 : ["kickoff", "halftime"].includes(type) ? 2 : 1;
    for (let i = 0; i < n; i++) {
      const start = c.currentTime + i * 0.32,
        osc = c.createOscillator(),
        gain = c.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(2600, start);
      osc.frequency.linearRampToValueAtTime(3100, start + 0.09);
      osc.frequency.linearRampToValueAtTime(2800, start + 0.24);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(
        this.whistleVolume * 0.16,
        start + 0.025,
      );
      gain.gain.setValueAtTime(this.whistleVolume * 0.16, start + 0.19);
      gain.gain.linearRampToValueAtTime(0, start + 0.29);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(start);
      osc.stop(start + 0.3);
      this.voices.push(osc);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    }
  }
  cheer() {
    if (!this.playing) return;
    const g = this.crowdGain.gain,
      t = this.context.currentTime;
    g.cancelScheduledValues(t);
    g.setTargetAtTime(this.crowdVolume * 0.32, t, 0.15);
    g.setTargetAtTime(this.crowdVolume * 0.15, t + 2, 0.6);
  }
  close() {
    this.stopWhistles();
    this.crowd.stop();
    return this.context.close();
  }
}
