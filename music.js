// ================= FON MUSIQASI =================
// Fayl yuklanmaydi: yumshoq synthwave musiqasi Web Audio orqali shu yerning o'zida sintez qilinadi.
// Saytga kirganda avtomatik yoqiladi; navbardagi tugma bilan o'chirib-yoqiladi.
const bgMusic = (() => {
  const VOLUME = 0.22;
  const CHORD_SEC = 6;           // har bir akkord davomiyligi
  const STEP_SEC = CHORD_SEC / 16; // arpedjio qadami
  // Am → F → C → G (MIDI raqamlari)
  const CHORDS = [
    { pad: [57, 60, 64, 69], bass: 45 },
    { pad: [53, 57, 60, 65], bass: 41 },
    { pad: [52, 55, 60, 64], bass: 48 },
    { pad: [55, 59, 62, 67], bass: 43 },
  ];
  const ARP = [0, 2, 1, 3, 2, 1, 3, 2]; // akkord tovushlari tartibi

  const btn = document.getElementById("musicBtn");
  let ctx, master, padBus, arpBus, timer;
  let playing = false, ducked = false, filmPlaying = false, nextChordAt = 0, chordIndex = 0;

  const freq = midi => 440 * Math.pow(2, (midi - 69) / 12);

  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);

    // Reverb: shovqindan yasalgan impuls
    const reverb = ctx.createConvolver();
    const len = ctx.sampleRate * 3.5, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
    }
    reverb.buffer = ir;
    const wet = ctx.createGain(); wet.gain.value = 0.55;
    reverb.connect(wet).connect(master);

    // Pad: sekin "nafas oladigan" filtr orqali
    padBus = ctx.createGain(); padBus.gain.value = 0.5;
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass"; padFilter.frequency.value = 900; padFilter.Q.value = 0.7;
    const lfo = ctx.createOscillator(), lfoAmt = ctx.createGain();
    lfo.frequency.value = 0.07; lfoAmt.gain.value = 450;
    lfo.connect(lfoAmt).connect(padFilter.frequency); lfo.start();
    padBus.connect(padFilter);
    padFilter.connect(master); padFilter.connect(reverb);

    // Arpedjio: echo (delay) bilan
    arpBus = ctx.createGain(); arpBus.gain.value = 0.18;
    const delay = ctx.createDelay(2), fb = ctx.createGain(), fbFilter = ctx.createBiquadFilter();
    delay.delayTime.value = STEP_SEC * 3; fb.gain.value = 0.38; fbFilter.type = "lowpass"; fbFilter.frequency.value = 2200;
    arpBus.connect(master); arpBus.connect(reverb); arpBus.connect(delay);
    delay.connect(fbFilter).connect(fb).connect(delay);
    fbFilter.connect(reverb);
  }

  function padNote(midi, t, dur) {
    [-6, 6].forEach(detune => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sawtooth"; o.frequency.value = freq(midi); o.detune.value = detune;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.05, t + 1.8);
      g.gain.setValueAtTime(0.05, t + dur - 0.2);
      g.gain.linearRampToValueAtTime(0, t + dur + 2.2);
      o.connect(g).connect(padBus);
      o.start(t); o.stop(t + dur + 2.4);
    });
  }

  function pluck(midi, t, vol, type = "triangle", len = 0.9) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq(midi);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(g).connect(arpBus);
    o.start(t); o.stop(t + len + 0.05);
  }

  function scheduleChord(t) {
    const c = CHORDS[chordIndex % CHORDS.length];
    c.pad.forEach(n => padNote(n, t, CHORD_SEC));
    pluck(c.bass, t, 0.9, "sine", CHORD_SEC * 0.9);            // yumshoq bas
    pluck(c.bass, t + CHORD_SEC / 2, 0.6, "sine", CHORD_SEC * 0.45);
    for (let s = 0; s < 16; s++) {
      if (Math.random() < 0.25) continue;                      // jonliroq bo'lishi uchun ba'zi qadamlar bo'sh
      const note = c.pad[ARP[s % ARP.length]] + 12;
      pluck(note, t + s * STEP_SEC, 0.25 + Math.random() * 0.15);
    }
    chordIndex++;
  }

  // Oldindan rejalashtirish: har 0,5 soniyada keyingi akkordni kerak bo'lsa navbatga qo'yadi
  function scheduler() {
    while (nextChordAt < ctx.currentTime + 1.5) {
      scheduleChord(nextChordAt);
      nextChordAt += CHORD_SEC;
    }
  }

  function targetVolume() {
    if (filmPlaying) return 0;
    return ducked ? VOLUME * 0.15 : VOLUME;
  }

  function fadeTo(v, sec) {
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(v, now + sec);
  }

  function start() {
    if (playing) return;
    if (!ctx) build();
    ctx.resume();
    playing = true;
    nextChordAt = ctx.currentTime + 0.1;
    scheduler();
    timer = setInterval(scheduler, 500);
    fadeTo(targetVolume(), 3);
    btn.classList.add("on");
  }

  function stop() {
    if (!playing) return;
    playing = false;
    clearInterval(timer);
    fadeTo(0, 1.2);
    setTimeout(() => { if (!playing) ctx.suspend(); }, 1300);
    btn.classList.remove("on");
  }

  btn.addEventListener("click", () => playing ? stop() : start());

  // Saytga kirishi bilan yoqiladi. Agar brauzer ovozni bloklasa (AudioContext "suspended"),
  // musiqa foydalanuvchining birinchi harakatida (bosish, tegish, tugma) davom etadi.
  const UNLOCK_EVENTS = ["pointerdown", "keydown", "touchend"];
  const unlock = () => {
    if (playing) ctx.resume();
    if (ctx.state === "running" || !playing) disarm();
  };
  function disarm() {
    btn.classList.remove("waiting");
    UNLOCK_EVENTS.forEach(ev => document.removeEventListener(ev, unlock, true));
  }
  start();
  if (ctx.state !== "running") {
    btn.classList.add("waiting");
    UNLOCK_EVENTS.forEach(ev => document.addEventListener(ev, unlock, true));
    ctx.addEventListener("statechange", () => { if (ctx.state === "running") disarm(); });
  }

  // Boshqa tabga o'tilganda ovoz to'xtaydi
  document.addEventListener("visibilitychange", () => {
    if (!ctx || !playing) return;
    document.hidden ? ctx.suspend() : ctx.resume();
  });

  return {
    // Teaser ovozi yoqilganda musiqa pasayadi
    duck(on) {
      ducked = on;
      if (ctx && playing) fadeTo(targetVolume(), 0.8);
    },
    // Film o'ynayotganda musiqa butunlay o'chadi, pauza/tugash/yopishda qaytadi
    film(isPlaying) {
      filmPlaying = isPlaying;
      btn.classList.toggle("film-muted", isPlaying);
      if (ctx && playing) fadeTo(targetVolume(), isPlaying ? 0.6 : 2);
    },
    get playing() { return playing; },
    get volume() { return master ? master.gain.value : 0; },
  };
})();
