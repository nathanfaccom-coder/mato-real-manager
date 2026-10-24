import test from "node:test";
import assert from "node:assert/strict";
import { StadiumAudio } from "../../src/simulation/stadium-audio.js";
class Param {
  constructor() {
    this.value = 0;
    this.calls = [];
  }
  setValueAtTime(v) {
    this.value = v;
  }
  linearRampToValueAtTime(v) {
    this.calls.push(v);
  }
  setTargetAtTime(v) {
    this.value = v;
    this.calls.push(v);
  }
  cancelScheduledValues() {}
}
class Node {
  constructor() {
    this.gain = new Param();
    this.frequency = new Param();
    this.stops = 0;
  }
  connect() {}
  disconnect() {}
  start() {
    this.started = true;
  }
  stop() {
    this.stops++;
  }
}
class Context {
  constructor() {
    this.state = "suspended";
    this.sampleRate = 100;
    this.currentTime = 0;
    this.destination = {};
    this.sources = [];
    this.oscs = [];
  }
  createGain() {
    return new Node();
  }
  createBiquadFilter() {
    return new Node();
  }
  createBuffer(_, n) {
    return { getChannelData: () => new Float32Array(n) };
  }
  createBufferSource() {
    const n = new Node();
    this.sources.push(n);
    return n;
  }
  createOscillator() {
    const n = new Node();
    this.oscs.push(n);
    return n;
  }
  async resume() {
    this.state = "running";
  }
  close() {
    this.state = "closed";
  }
}
test("audio reuses one crowd source, whistles at kickoff/fouls and respects mute/volume/disposal", async () => {
  const a = new StadiumAudio(Context);
  a.whistle("kickoff");
  assert.equal(a.context.oscs.length, 0);
  await a.unlock();
  a.setPlaying(true);
  assert.ok(a.crowdGain.gain.value > 0);
  a.whistle("kickoff");
  assert.equal(a.context.oscs.length, 2);
  a.whistle("foul");
  assert.equal(a.context.oscs.length, 3);
  a.cheer();
  a.setPlaying(false);
  assert.equal(a.crowdGain.gain.value, 0);
  a.setPlaying(true);
  assert.equal(a.context.sources.length, 1);
  a.setVolumes(0, 0);
  a.whistle("foul");
  assert.equal(a.context.oscs.length, 3);
  assert.equal(a.crowdGain.gain.value, 0);
  a.close();
  assert.equal(a.context.state, "closed");
  assert.equal(a.crowd.stops, 1);
});
