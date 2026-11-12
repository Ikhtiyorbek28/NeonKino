// ================= DATA =================
// Posterlar TMDB (themoviedb.org) rasm serveridan olinadi
const trending = [
  { title: "Dune: Part Two", genre: "Fantastika", year: 2024, rating: 8.5, likes: 91200, mins: 166, img: "1pdfLvkbY9ohJlCjQH2CZjjYVvJ" },
  { title: "Oppenheimer", genre: "Drama", year: 2023, rating: 8.3, likes: 87400, mins: 180, img: "8Gxv8gSFCU0XGDykEGv7zR1n2ua" },
  { title: "Interstellar", genre: "Fantastika", year: 2014, rating: 8.7, likes: 124500, mins: 169, img: "gEU2QniE6E77NI6lCU6MxlNBvIx" },
];

const movies = [
  { title: "Inception", genre: "Fantastika", year: 2010, rating: 8.8, likes: 112300, mins: 148, img: "oYuLEt3zVCKq57qu2F8dT7NIa6f" },
  { title: "The Dark Knight", genre: "Jangari", year: 2008, rating: 9.0, likes: 131800, mins: 152, img: "qJ2tW6WMUDux911r6m7haRef0WH" },
  { title: "Joker", genre: "Drama", year: 2019, rating: 8.4, likes: 98600, mins: 122, img: "udDclJoHjfjb8Ekgsd4FDteOkCU" },
  { title: "It", genre: "Qo'rqinchli", year: 2017, rating: 7.3, likes: 54800, mins: 135, img: "9E2y5Q7WlCVNEhP5GiVTjhEhx1o" },
  { title: "Blade Runner 2049", genre: "Fantastika", year: 2017, rating: 8.0, likes: 61200, mins: 164, img: "gajva2L0rPYkEWjzgFlBXCAVBE5" },
  { title: "Avengers: Endgame", genre: "Jangari", year: 2019, rating: 8.4, likes: 142700, mins: 181, img: "or06FN3Dka5tukK1e9sl16pB3iy" },
  { title: "Parasite", genre: "Drama", year: 2019, rating: 8.5, likes: 73900, mins: 132, img: "7IiTTgloJzvGI1TAYymCfbfl3vT" },
  { title: "A Quiet Place", genre: "Qo'rqinchli", year: 2018, rating: 7.5, likes: 48300, mins: 90, img: "nAU74GmpUk7t5iklEp3bufwDq4n" },
  { title: "The Matrix", genre: "Fantastika", year: 1999, rating: 8.7, likes: 104100, mins: 136, img: "f89U3ADr1oiB1s9GkdPOEpXUk5H" },
  { title: "The Batman", genre: "Jangari", year: 2022, rating: 7.8, likes: 69500, mins: 176, img: "74xTEgt7R36Fpooo50r9T25onhq" },
  { title: "Spider-Man: Across the Spider-Verse", genre: "Jangari", year: 2023, rating: 8.5, likes: 82600, mins: 140, img: "8Vt6mWEReuy4Of61Lnj5Xj704m8" },
  { title: "Avatar: The Way of Water", genre: "Fantastika", year: 2022, rating: 7.5, likes: 77100, mins: 192, img: "t6HIqrRAclMCA60NsSmeqe9RmNV" },
];

const series = [
  { title: "Breaking Bad", info: "5 fasl · 62 qism", progress: 65, mins: 49, img: "ggFHVNu6YYI5L9pCfOacjizRGt" },
  { title: "Game of Thrones", info: "8 fasl · 73 qism", progress: 30, mins: 57, img: "1XS1oqL89opfnbLl8WnZY1O1uJx" },
  { title: "Stranger Things", info: "5 fasl · 42 qism", progress: 90, mins: 51, img: "49WJfeN0moxb9IPfGn8AIqMGskD" },
  { title: "The Last of Us", info: "2 fasl · 16 qism", progress: 45, mins: 55, img: "uKvVjHNqB5VmOrdxqAt2F7J78ED" },
  { title: "Arcane", info: "2 fasl · 18 qism", progress: 15, mins: 40, img: "fqldf2t8ztc9aiwn3k6mlX3tvRT" },
  { title: "Wednesday", info: "2 fasl · 16 qism", progress: 75, mins: 50, img: "9PFonBhy4cQy7Jz20NpMygczOkv" },
  { title: "Dark", info: "3 fasl · 26 qism", progress: 55, mins: 55, img: "apbrbWs8M9lyOpJYU5WXrpFbk1Z" },
];

// Har bir filmning barcha janrlari (birinchisi — asosiy janr)
const GENRES_BY_TITLE = {
  "Dune: Part Two": ["Fantastika", "Sarguzasht", "Drama"],
  "Oppenheimer": ["Drama", "Tarixiy", "Triller"],
  "Interstellar": ["Fantastika", "Drama", "Sarguzasht"],
  "Inception": ["Fantastika", "Triller", "Sarguzasht"],
  "The Dark Knight": ["Jangari", "Kriminal", "Drama"],
  "Joker": ["Drama", "Kriminal", "Triller"],
  "It": ["Qo'rqinchli", "Triller"],
  "Blade Runner 2049": ["Fantastika", "Drama", "Detektiv"],
  "Avengers: Endgame": ["Jangari", "Sarguzasht", "Fantastika"],
  "Parasite": ["Drama", "Triller", "Komediya"],
  "A Quiet Place": ["Qo'rqinchli", "Fantastika", "Drama"],
  "The Matrix": ["Fantastika", "Jangari"],
  "The Batman": ["Jangari", "Kriminal", "Detektiv"],
  "Spider-Man: Across the Spider-Verse": ["Multfilm", "Jangari", "Sarguzasht"],
  "Avatar: The Way of Water": ["Fantastika", "Sarguzasht", "Jangari"],
};
const GENRES = ["Fantastika", "Jangari", "Drama", "Triller", "Sarguzasht", "Kriminal",
  "Qo'rqinchli", "Detektiv", "Multfilm", "Komediya", "Tarixiy"];

// Telegram bazasidan kelgan filmlar (telegram-films.js ni bot yozadi). Nomi bir xil bo'lsa, mavjud yozuv yangilanadi.
(window.TG_FILMS || []).forEach(({ filmInfo, kind, ...film }) => {
  FILM_INFO[film.title] = filmInfo;
  GENRES_BY_TITLE[film.title] = film.genres;
  const existing = [...trending, ...movies, ...series].find(m => m.title === film.title);
  if (existing) Object.assign(existing, film);
  else (kind === "serial" ? series : movies).push(film);
});

const catalog = [...movies, ...trending];
catalog.forEach(m => m.genres = GENRES_BY_TITLE[m.title]);

// Faqat Premium obunada ko'rish mumkin bo'lgan filmlar va seriallar
const PREMIUM_TITLES = ["Dune: Part Two", "Oppenheimer", "Avatar: The Way of Water",
  "Spider-Man: Across the Spider-Verse", "The Batman", "The Last of Us", "Arcane"];
[...catalog, ...series].forEach(m => m.premium = m.premium || PREMIUM_TITLES.includes(m.title));
const premiumTag = m => (m.premium ? `<span class="premium-tag">PREMIUM</span>` : "");

// Seriallar uchun janr, reyting va yillar films-info.js dan olinadi
series.forEach(s => {
  const { genres, rating, years } = FILM_INFO[s.title] || {};
  Object.assign(s, { genres: genres || [], rating, year: years });
});

// Har bir film/serialning o'z manzili: #/film/the-dark-knight
const filmSlug = m => m.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const filmHash = m => "#/film/" + filmSlug(m);
// Karta ustiga bosilganda film sahifasi ochiladi (tugma va havolalar o'z ishini qiladi)
const cardOpensFilm = (el, m) => el.addEventListener("click", e => {
  if (!e.target.closest("button, a")) location.hash = filmHash(m);
});

// ================= POSTER =================
const poster = (m, size = "w500") =>
  `<img src="${m.poster || `https://image.tmdb.org/t/p/${size}/${m.img}.jpg`}" alt="${m.title}" loading="lazy" />`;

const fmt = n => n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "k" : n;

// ================= RENDER =================
const trendGrid = document.getElementById("trendGrid");
trending.forEach((m, i) => {
  const el = document.createElement("div");
  el.className = "trend-card" + (i === 0 ? " active" : "");
  if (m.premium) el.dataset.premium = "";
  el.innerHTML = `
    <div class="poster">${poster(m)}${premiumTag(m)}<div class="shine"></div></div>
    <div class="trend-info"><span><a href="${filmHash(m)}">${m.title}</a> <small>(${m.year})</small></span><span class="rating">${m.rating}</span></div>`;
  el.addEventListener("mouseenter", () => {
    trendGrid.querySelectorAll(".trend-card").forEach(c => c.classList.remove("active"));
    el.classList.add("active");
  });
  cardOpensFilm(el, m);
  trendGrid.appendChild(el);
});

const movieGrid = document.getElementById("movieGrid");
const filtersEl = document.getElementById("filters");
let filter = { genre: "all" }; // yoki { year: 2019 }

function renderChips() {
  const chip = (label, attrs, active) =>
    `<button class="chip${active ? " active" : ""}" ${attrs}>${label}</button>`;
  filtersEl.innerHTML =
    chip("Barchasi", 'data-genre="all"', !filter.year && filter.genre === "all") +
    GENRES.map(g => chip(g, `data-genre="${g}"`, filter.genre === g)).join("") +
    (filter.year ? chip(`${filter.year} yil &times;`, 'data-genre="all"', true) : "");
}

function renderMovies() {
  movieGrid.innerHTML = "";
  const list = catalog.filter(m =>
    filter.year ? m.year === filter.year : filter.genre === "all" || m.genres.includes(filter.genre));
  if (!list.length) movieGrid.innerHTML = `<p class="empty">Bu turkumda hozircha film yo'q</p>`;
  list.forEach((m, i) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    if (m.premium) card.dataset.premium = "";
    card.style.animationDelay = i * 0.07 + "s";
    card.innerHTML = `
      <div class="poster">${poster(m)}${premiumTag(m)}<div class="shine"></div></div>
      <div class="meta">
        <div><h4><a href="${filmHash(m)}">${m.title}</a></h4><span class="genre">${m.year} · ${m.genres.slice(0, 2).join(", ")} · ★ ${m.rating}</span></div>
        <button class="like" data-title="${m.title}" aria-label="Sevimlilarga qo'shish">
          <span></span>
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.3 5 6.8 5c2 0 3.4 1.1 4.2 2.4h2C13.8 6.1 15.2 5 17.2 5c3.5 0 5.6 3.6 4.3 6.8C19.5 16.4 12 21 12 21z"/></svg>
        </button>
      </div>`;
    card.querySelector(".like").addEventListener("click", () => {
      const on = Account.toggleFav(m.title); // kirmagan bo'lsa null — kirish oynasi ochiladi
      if (on !== null) toast(on ? `❤ “${m.title}” sevimlilarga qo'shildi` : `“${m.title}” sevimlilardan olindi`);
    });
    cardOpensFilm(card, m);
    addTilt(card);
    movieGrid.appendChild(card);
  });
  updateLikes();
  updateLocks();
}

// Premium filmlar: obunasi yo'qlarga posterda qulf ko'rinadi
function updateLocks() {
  const open = Account.hasPremium();
  document.querySelectorAll("[data-premium]").forEach(el => el.classList.toggle("locked", !open));
}
document.addEventListener("account:change", updateLocks);

// Sevimlilar foydalanuvchi profilida saqlanadi
function updateLikes() {
  movieGrid.querySelectorAll(".like").forEach(btn => {
    const m = catalog.find(x => x.title === btn.dataset.title), fav = Account.isFav(m.title);
    btn.classList.toggle("liked", fav);
    btn.querySelector("span").textContent = fmt(m.likes + (fav ? 1 : 0));
  });
}
document.addEventListener("account:change", updateLikes);
function applyFilter(f, scroll = false) {
  filter = f;
  renderChips();
  renderMovies();
  if (!scroll) return;
  // Film sahifasida turgan bo'lsa — avval bosh sahifaga, katalogga qaytadi
  if (document.body.classList.contains("film-view")) location.hash = "#movies";
  else document.getElementById("movies").scrollIntoView({ behavior: "smooth" });
}
applyFilter(filter);

filtersEl.addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (chip) applyFilter({ genre: chip.dataset.genre });
});

// ================= TURKUM (Janr / Yil) =================
const turkum = document.getElementById("turkum");
const paneGenre = document.getElementById("paneGenre");
const paneYear = document.getElementById("paneYear");
let yearDesc = true;

paneGenre.innerHTML = GENRES.map(g => {
  const count = catalog.filter(m => m.genres.includes(g)).length;
  return `<button class="genre-item" data-genre="${g}"><span>${g}</span><b>${count}</b></button>`;
}).join("");

function renderYears() {
  const years = [...new Set(catalog.map(m => m.year))].sort((a, b) => yearDesc ? b - a : a - b);
  paneYear.innerHTML = `
    <button class="year-sort" id="yearSort">${yearDesc ? "Yangi → Eski" : "Eski → Yangi"} ⇅</button>
    <div class="year-list">${years.map(y => `
      <div class="year-group">
        <button class="year-head" data-year="${y}">${y}</button>
        ${catalog.filter(m => m.year === y).map(m => `
          <button class="year-film" data-title="${m.title}">
            <span class="mini poster">${poster(m, "w92")}</span>
            <span>${m.title} ${premiumTag(m)}<small>${m.genres[0]} · ★ ${m.rating}</small></span>
          </button>`).join("")}
      </div>`).join("")}
    </div>`;
}
renderYears();

function closeTurkum() { turkum.classList.remove("open"); navLinks.classList.remove("open"); }

turkum.querySelector(".nav-drop-btn").addEventListener("click", () => turkum.classList.toggle("open"));
turkum.querySelectorAll(".mega-tab").forEach(tab => tab.addEventListener("click", () => {
  turkum.querySelectorAll(".mega-tab, .mega-pane").forEach(el => el.classList.remove("active"));
  tab.classList.add("active");
  document.getElementById(tab.dataset.pane).classList.add("active");
}));
paneGenre.addEventListener("click", e => {
  const item = e.target.closest(".genre-item");
  if (!item) return;
  closeTurkum();
  applyFilter({ genre: item.dataset.genre }, true);
});
paneYear.addEventListener("click", e => {
  if (e.target.closest("#yearSort")) { yearDesc = !yearDesc; renderYears(); return; }
  const head = e.target.closest(".year-head");
  const film = e.target.closest(".year-film");
  if (head) { closeTurkum(); applyFilter({ year: +head.dataset.year }, true); }
  if (film) { closeTurkum(); location.hash = filmHash(catalog.find(m => m.title === film.dataset.title)); }
});
document.addEventListener("click", e => { if (!turkum.contains(e.target)) turkum.classList.remove("open"); });

const slider = document.getElementById("seriesSlider");
series.forEach(s => {
  const el = document.createElement("div");
  el.className = "series-card";
  if (s.premium) el.dataset.premium = "";
  el.innerHTML = `
    <div class="poster">${poster(s)}<div class="shine"></div></div>${premiumTag(s)}
    <div class="overlay"><h4><a href="${filmHash(s)}">${s.title}</a></h4><small>${s.info}</small>
      <div class="ep-bar"><i style="width:${s.progress}%"></i></div></div>`;
  cardOpensFilm(el, s);
  slider.appendChild(el);
});
updateLocks();
document.getElementById("slideNext").onclick = () => slider.scrollBy({ left: 360, behavior: "smooth" });
document.getElementById("slidePrev").onclick = () => slider.scrollBy({ left: -360, behavior: "smooth" });

// Marquee
const genres = ["FANTASTIKA", "JANGARI", "DRAMA", "KOMEDIYA", "TRILLER", "ANIME", "QO'RQINCHLI", "DETEKTIV", "MULTFILM", "SARGUZASHT"];
document.getElementById("marqueeTrack").innerHTML =
  [...genres, ...genres].map(g => `<span>${g}</span><span>✦</span>`).join("");

// ================= 3D TILT =================
function addTilt(el) {
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px)`;
  });
  el.addEventListener("mouseleave", () => el.style.transform = "");
}

// ================= DOOMSDAY TEASER =================
// Rasmiy teaserlardan qisqa parchalar (YouTube, Rotten Tomatoes Trailers kanali).
// still — video yuklanguncha yoki internet sekin bo'lsa ko'rinadigan kadr (TMDB).
const teaserClips = [
// Bir videodagi parchalar ketma-ket turadi — video qayta yuklanmaydi, faqat o'tkaziladi.
  { title: "Qahramonlar jamlanmoqda", video: "LYRmPlm6oV0", start: 9, end: 15, still: "pYd7HFVQQ2Tda1kgsXK0y5iz2KE" },
  { title: "Yangi ittifoq", video: "LYRmPlm6oV0", start: 16, end: 22, still: "lzncCJNDfvJgzYlaKosyUPsmwpT" },
  { title: "Qasoskorlar qaytadi", video: "LYRmPlm6oV0", start: 23, end: 29, still: "pGbP900NvKzOtLWdyH0sWmLQu1G" },
  { title: "Stiv Rojers qaytdi", video: "pVPOa6_EfiA", start: 3, end: 10, still: "5ZjwGeiGGq11UpxhmZlOtGEO3Zt" },
  { title: "Uyga qaytish", video: "pVPOa6_EfiA", start: 14, end: 22, still: "iKUZ2yFIlEejgSiDUfvlTIrQu6P" },
  { title: "Shaxmat partiyasi", video: "E6fobg5x168", start: 28, end: 36, still: "9N21RJNwDuYJP5M0Of3mN4xG3IA" },
];
const LOAD_GRACE = 6; // video yuklanishini kutish (soniya), keyin rasm bilan davom etadi
const slidesEl = document.getElementById("teaserSlides");
const barsEl = document.getElementById("teaserBars");
const teaserEl = document.getElementById("teaser");
const glitchEl = document.getElementById("teaserGlitch");
const videoWrap = document.getElementById("teaserVideo");
slidesEl.innerHTML = teaserClips.map(c =>
  `<div class="teaser-slide"><img src="https://image.tmdb.org/t/p/w780/${c.still}.jpg" alt="${c.title}" /></div>`).join("");
barsEl.innerHTML = teaserClips.map(() => "<span><i></i></span>").join("");
const slides = slidesEl.children, bars = barsEl.children;

let clip = -1, teaserPaused = false, ytPlayer = null, ytReady = false;
let clipStartedAt = 0, pausedElapsed = 0;

const clipLen = c => c.end - c.start;

function showClip(n) {
  if (clip >= 0) slides[clip].classList.remove("active");
  clip = (n + teaserClips.length) % teaserClips.length;
  const c = teaserClips[clip];
  slides[clip].classList.add("active");
  [...bars].forEach((b, i) => {
    b.className = i < clip ? "done" : "";
    b.firstChild.style.width = i < clip ? "100%" : "0";
  });
  document.getElementById("teaserCount").textContent =
    `${String(clip + 1).padStart(2, "0")} / ${String(teaserClips.length).padStart(2, "0")}`;
  glitchEl.classList.remove("on"); void glitchEl.offsetWidth; glitchEl.classList.add("on");
  clipStartedAt = performance.now();
  pausedElapsed = 0;
  if (!ytReady) return;
  if (ytPlayer.getVideoData().video_id === c.video) {
    ytPlayer.seekTo(c.start, true); // o'sha video — shunchaki o'tkazamiz
  } else {
    videoWrap.classList.remove("playing");
    ytPlayer.loadVideoById({ videoId: c.video, startSeconds: c.start });
  }
  if (teaserPaused) ytPlayer.pauseVideo();
  else if (ytPlayer.getPlayerState() !== YT.PlayerState.PLAYING) ytPlayer.playVideo();
}

// Progress: video o'ynasa — videoning vaqtidan, aks holda — soat bo'yicha (rasm rejimi)
function teaserLoop() {
  const c = teaserClips[clip];
  let elapsed;
  if (ytReady && videoWrap.classList.contains("playing")) {
    // o'tkazishdan keyin birinchi lahzalarda getCurrentTime() hali eski vaqtni qaytarishi mumkin
    const justSwitched = performance.now() - clipStartedAt < 600;
    elapsed = justSwitched ? 0 : Math.max(0, ytPlayer.getCurrentTime() - c.start);
  } else {
    elapsed = teaserPaused ? pausedElapsed : (performance.now() - clipStartedAt) / 1000;
  }
  const waitingVideo = ytReady && !videoWrap.classList.contains("playing");
  const limit = clipLen(c) + (waitingVideo ? LOAD_GRACE : 0);
  bars[clip].firstChild.style.width = Math.min(100, (elapsed / clipLen(c)) * 100) + "%";
  if (!teaserPaused && elapsed >= limit) showClip(clip + 1);
  requestAnimationFrame(teaserLoop);
}

function initYouTube() {
  ytPlayer = new YT.Player("teaserPlayer", {
    width: "100%", height: "100%",
    playerVars: { autoplay: 1, mute: 1, controls: 0, disablekb: 1, playsinline: 1, rel: 0, iv_load_policy: 3, fs: 0 },
    events: {
      onReady: () => {
        ytReady = true;
        ytPlayer.mute();
        showClip(clip);
      },
      onStateChange: e => {
        // Video haqiqatan o'ynay boshlagandagina kadr ustiga chiqadi
        // (keyingi parchaga o'tishni teaserLoop boshqaradi)
        if (e.data === YT.PlayerState.PLAYING) videoWrap.classList.add("playing");
      },
      onError: () => { ytReady = false; videoWrap.classList.remove("playing"); },
    },
  });
}
window.onYouTubeIframeAPIReady = initYouTube;
const ytScript = document.createElement("script");
ytScript.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(ytScript);

showClip(0);
requestAnimationFrame(teaserLoop);

document.getElementById("teaserNext").onclick = () => showClip(clip + 1);
document.getElementById("teaserPrev").onclick = () => showClip(clip - 1);
document.getElementById("teaserPause").onclick = e => {
  teaserPaused = !teaserPaused;
  teaserEl.classList.toggle("paused", teaserPaused);
  e.currentTarget.querySelector("svg").innerHTML = teaserPaused
    ? '<path d="M8 5v14l11-7z"/>' : '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';
  if (teaserPaused) pausedElapsed = (performance.now() - clipStartedAt) / 1000;
  else clipStartedAt = performance.now() - pausedElapsed * 1000;
  if (ytReady) teaserPaused ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
};
document.getElementById("teaserSound").onclick = e => {
  if (!ytReady) return;
  const btn = e.currentTarget;
  if (ytPlayer.isMuted()) { ytPlayer.unMute(); ytPlayer.setVolume(70); btn.classList.add("on"); bgMusic.duck(true); }
  else { ytPlayer.mute(); btn.classList.remove("on"); bgMusic.duck(false); }
};
// Sichqoncha bilan 3D egilish
teaserEl.addEventListener("mousemove", e => {
  const r = teaserEl.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  teaserEl.style.setProperty("--rx", `${-y * 8}deg`);
  teaserEl.style.setProperty("--ry", `${x * 10}deg`);
});
teaserEl.addEventListener("mouseleave", () => {
  teaserEl.style.setProperty("--rx", "0deg");
  teaserEl.style.setProperty("--ry", "-8deg");
});

// ================= COUNTDOWN =================
const premiere = new Date("2026-12-18T00:00:00").getTime(); // Avengers: Doomsday
const cd = ["cdDays", "cdHours", "cdMins", "cdSecs"].map(id => document.getElementById(id));
function tick() {
  let s = Math.max(0, Math.floor((premiere - Date.now()) / 1000));
  const vals = [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
  vals.forEach((v, i) => {
    const t = String(v).padStart(2, "0");
    if (cd[i].textContent !== t) {
      cd[i].textContent = t;
      const box = cd[i].parentElement;
      box.classList.add("tick");
      setTimeout(() => box.classList.remove("tick"), 400);
    }
  });
}
tick();
setInterval(tick, 1000);

// ================= COUNTERS & REVEAL =================
function animateCounter(el) {
  const target = +el.dataset.target;
  const start = performance.now();
  const step = now => {
    const p = Math.min((now - start) / 1800, 1);
    const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
    el.textContent = val.toLocaleString("ru-RU");
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("visible");
    en.target.querySelectorAll?.(".counter").forEach(animateCounter);
    if (en.target.classList.contains("counter")) animateCounter(en.target);
    io.unobserve(en.target);
  });
}, { threshold: .15 });
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.12 + "s";
  io.observe(el);
});
document.querySelectorAll(".float-badge .counter").forEach(c => io.observe(c));

// ================= NAVBAR =================
const navbar = document.getElementById("navbar");
const links = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", scrollY > 30);
  let current = document.body.classList.contains("film-view") ? "" : "home";
  document.querySelectorAll("section[id]").forEach(s => {
    if (s.offsetParent && scrollY >= s.offsetTop - 160) current = s.id;
  });
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});
const navLinks = document.getElementById("navLinks");
document.getElementById("burger").onclick = () => navLinks.classList.toggle("open");
links.forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// ================= SEARCH =================
const overlay = document.getElementById("searchOverlay");
const input = document.getElementById("searchInput");
const results = document.getElementById("searchResults");
const all = [...trending, ...movies].map(m => ({ ...m, type: "Film" })).concat(series.map(s => ({ ...s, type: "Serial" })));
document.getElementById("searchBtn").onclick = () => { overlay.classList.add("open"); setTimeout(() => input.focus(), 200); };
document.getElementById("searchClose").onclick = () => overlay.classList.remove("open");
input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  results.innerHTML = "";
  if (!q) return;
  const found = all.filter(m => m.title.toLowerCase().includes(q));
  if (!found.length) { results.innerHTML = `<p style="color:var(--muted);text-align:center">Hech narsa topilmadi 😔</p>`; return; }
  found.forEach((m, i) => {
    const it = document.createElement("div");
    it.className = "search-item";
    it.style.animationDelay = i * .05 + "s";
    it.innerHTML = `<div class="mini poster">${poster(m, "w92")}</div><div><b>${m.title}</b> ${premiumTag(m)}<br><small>${m.type} · ${m.genre || m.info}</small></div>`;
    it.onclick = () => { overlay.classList.remove("open"); location.hash = filmHash(m); };
    results.appendChild(it);
  });
});

// ================= PLAYER =================
const modal = document.getElementById("playerModal");
const screen = document.getElementById("screen");
const fill = document.getElementById("progressFill");
const timeNow = document.getElementById("timeNow");
const playIcon = document.getElementById("playIcon");
let TOTAL = 0, pos = 0, playing = false, timer;

const fmtTime = s => [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map(v => String(v).padStart(2, "0")).join(":");
function setPlaying(p) {
  if (p && Account.adActive()) return; // reklama tugamaguncha film boshlanmaydi
  if (p && pos >= TOTAL) pos = 0; // tugagan filmni boshidan
  playing = p;
  bgMusic.film(p); // film o'ynasa fon musiqasi o'chadi, pauza/tugash/yopishda qaytadi
  screen.classList.toggle("paused", !p);
  playIcon.innerHTML = p ? '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>' : '<path d="M8 5v14l11-7z"/>';
  clearInterval(timer);
  if (p) timer = setInterval(() => {
    pos = Math.min(TOTAL, pos + 7);
    fill.style.width = (pos / TOTAL) * 100 + "%";
    timeNow.textContent = fmtTime(pos);
    if (pos >= TOTAL) setPlaying(false); // film tugadi
  }, 100);
}
// Hisob tekshiriladi (kirmagan bo'lsa — kirish oynasi), keyin tarifga qarab o'ynatiladi
function openPlayer(m = trending[0]) { Account.watch(m, startPlayback); }

function startPlayback(m, { ads, quality }) {
  document.getElementById("screenArt").innerHTML =
    `<div class="art-bg">${poster(m, "w342")}</div><div class="art-fg">${poster(m, "w500")}</div>`;
  document.getElementById("screenTitle").textContent = m.title;
  document.getElementById("quality").textContent = quality;
  TOTAL = m.mins * 60;
  pos = 0; fill.style.width = "0"; timeNow.textContent = "00:00:00";
  document.getElementById("timeTotal").textContent = fmtTime(TOTAL);
  modal.classList.add("open");
  if (ads) {
    setPlaying(false);
    Account.preroll(() => setPlaying(true));
  } else {
    setPlaying(true);
  }
}
function closePlayer() { Account.cancelAd(); modal.classList.remove("open"); setPlaying(false); }

document.getElementById("heroPlay").onclick = () => { location.hash = filmHash(trending[0]); };
document.getElementById("playerClose").onclick = closePlayer;
document.getElementById("playToggle").onclick = () => setPlaying(!playing);
modal.addEventListener("click", e => { if (e.target === modal) closePlayer(); });
document.getElementById("progress").addEventListener("click", e => {
  const r = e.currentTarget.getBoundingClientRect();
  pos = Math.floor(((e.clientX - r.left) / r.width) * TOTAL);
  fill.style.width = (pos / TOTAL) * 100 + "%";
  timeNow.textContent = fmtTime(pos);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closePlayer(); overlay.classList.remove("open"); }
  if (e.key === " " && modal.classList.contains("open")) { e.preventDefault(); setPlaying(!playing); }
});


// ================= TOAST =================
const toastEl = document.getElementById("toast");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
}

// ================= CURSOR GLOW =================
const glowEl = document.getElementById("cursorGlow");
window.addEventListener("mousemove", e => {
  glowEl.style.left = e.clientX + "px";
  glowEl.style.top = e.clientY + "px";
});

// ================= PARTICLES =================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W, H, parts;
function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  parts = Array.from({ length: Math.min(90, Math.floor(W / 14)) }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
    r: Math.random() * 1.8 + .4,
    c: ["255,45,111", "168,107,255", "90,215,255"][Math.floor(Math.random() * 3)],
  }));
}
function draw() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.c},.8)`;
    ctx.shadowBlur = 10; ctx.shadowColor = `rgb(${p.c})`;
    ctx.fill();
    for (let j = i + 1; j < parts.length; j++) {
      const q = parts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 120) {
        ctx.strokeStyle = `rgba(${p.c},${(1 - d / 120) * .15})`;
        ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
resize();
draw();
window.addEventListener("resize", resize);

// ================= FILM SAHIFASI =================
// Sahifa qayta yuklanmaydi (musiqa uzilmaydi), manzil esa har bir film uchun alohida: #/film/inception
const filmPage = document.getElementById("filmPage");
const allFilms = [...catalog, ...series];
const SITE_TITLE = document.title;
let filmOpen = null, homeHash = null, homeScroll = 0, teaserAutoPaused = false;

history.scrollRestoration = "manual";
const jumpTo = y => scrollTo({ top: y, behavior: "instant" });

function fmtLength(m) {
  if (series.includes(m)) return `${m.info} · qismi ~${m.mins} daqiqa`;
  const h = Math.floor(m.mins / 60), rest = m.mins % 60;
  return (h ? `${h} soat ` : "") + (rest ? `${rest} daqiqa` : "");
}

// O'xshash filmlar: umumiy janrlari ko'pi birinchi, teng bo'lsa reytingi yuqorisi
function similarTo(m) {
  return (series.includes(m) ? series : catalog)
    .filter(x => x !== m)
    .map(x => ({ x, shared: x.genres.filter(g => m.genres.includes(g)).length }))
    .filter(s => s.shared)
    .sort((a, b) => b.shared - a.shared || b.x.rating - a.x.rating)
    .slice(0, 6)
    .map(s => s.x);
}

function renderFilmPage(m) {
  const info = FILM_INFO[m.title] || {};
  const isSeries = series.includes(m);
  const locked = m.premium && !Account.hasPremium();
  const fav = Account.isFav(m.title);
  const facts = [
    [isSeries ? "Yaratuvchilar" : "Rejissyor", info.creators || info.director],
    ["Rollarda", info.cast && info.cast.join(", ")],
    ["Janr", m.genres.join(", ")],
    ["Mamlakat", info.country],
    [isSeries ? "Yillar" : "Chiqqan yili", m.year],
    [isSeries ? "Hajmi" : "Davomiyligi", fmtLength(m)],
    ["Yosh chegarasi", info.age],
    ["Sifat", "4K"],
  ].filter(([, value]) => value);
  const similar = similarTo(m);

  filmPage.innerHTML = `
    <div class="film-bg">${poster(m)}</div>
    <div class="film-wrap">
      <button class="film-back" data-act="back">
        <svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg> Orqaga
      </button>
      <div class="film-hero">
        <div class="film-poster poster">${poster(m)}${premiumTag(m)}</div>
        <div class="film-main">
          <small class="film-kind">${isSeries ? "SERIAL" : "FILM"}</small>
          <h1>${m.title}</h1>
          <div class="film-meta">
            ${m.rating ? `<span class="film-rating">★ ${m.rating}</span>` : ""}
            <span>${m.year}</span>
            ${info.age ? `<span class="film-age">${info.age}</span>` : ""}
            <span>${fmtLength(m)}</span>
            <span class="quality">4K</span>
          </div>
          <div class="film-genres">${m.genres.map(g => `<span>${g}</span>`).join("")}</div>
          ${info.desc ? `<p class="film-desc">${info.desc}</p>` : ""}
          <div class="film-actions">
            <button class="btn-neon" data-act="watch">
              ${locked ? "🔒 Premium bilan ko'rish" : '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Tomosha qilish'}
            </button>
            <a class="btn-outline" target="_blank" rel="noopener"
               href="${info.trailer || `https://www.youtube.com/results?search_query=${encodeURIComponent(`${m.title} official trailer`)}`}">Treyler</a>
            <button class="film-fav${fav ? " on" : ""}" data-act="fav" aria-pressed="${fav}">
              <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.3 5 6.8 5c2 0 3.4 1.1 4.2 2.4h2C13.8 6.1 15.2 5 17.2 5c3.5 0 5.6 3.6 4.3 6.8C19.5 16.4 12 21 12 21z"/></svg>
              ${fav ? "Sevimlilarda" : "Sevimlilarga"}
            </button>
          </div>
        </div>
      </div>
      <section class="film-block glass">
        <h2>Ma'lumotlar</h2>
        <dl class="film-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
      </section>
      ${similar.length ? `
        <section class="film-block">
          <h2>O'xshash ${isSeries ? "seriallar" : "filmlar"}</h2>
          <div class="film-similar">${similar.map(x => `
            <a href="${filmHash(x)}">
              <span class="poster">${poster(x, "w342")}${premiumTag(x)}</span>
              <b>${x.title}</b><small>★ ${x.rating} · ${x.year}</small>
            </a>`).join("")}
          </div>
        </section>` : ""}
    </div>`;
}

filmPage.addEventListener("click", e => {
  const act = e.target.closest("[data-act]")?.dataset.act;
  if (act === "back") {
    if (homeHash !== null) history.back();
    else location.hash = "";
  }
  if (act === "watch") openPlayer(filmOpen);
  if (act === "fav") {
    const on = Account.toggleFav(filmOpen.title); // kirmagan bo'lsa null — kirish oynasi ochiladi
    if (on !== null) toast(on ? `❤ “${filmOpen.title}” sevimlilarga qo'shildi` : `“${filmOpen.title}” sevimlilardan olindi`);
  }
});
document.addEventListener("account:change", () => { if (filmOpen) renderFilmPage(filmOpen); });
document.querySelectorAll(".logo").forEach(l => l.addEventListener("click", () => { homeScroll = 0; }));

// Bosh sahifadagi teaser film sahifasida o'ynab turmasligi kerak
function setTeaserHidden(hidden) {
  if (hidden && !teaserPaused) {
    teaserAutoPaused = true;
    document.getElementById("teaserPause").click();
  } else if (!hidden && teaserAutoPaused) {
    teaserAutoPaused = false;
    document.getElementById("teaserPause").click();
  }
}

function route(e) {
  const inFilmView = document.body.classList.contains("film-view");
  if (location.hash.startsWith("#/film/")) {
    if (!inFilmView) {
      homeHash = e ? new URL(e.oldURL).hash : null;
      homeScroll = scrollY;
      document.body.classList.add("film-view");
      filmPage.hidden = false;
      setTeaserHidden(true);
    }
    filmOpen = allFilms.find(m => filmHash(m) === location.hash) || null;
    if (filmOpen) {
      renderFilmPage(filmOpen);
      document.title = `${filmOpen.title} — NeonKino`;
    } else {
      filmPage.innerHTML = `<div class="film-wrap film-missing"><h1>Film topilmadi</h1><a class="btn-neon" href="#movies">Katalogga qaytish</a></div>`;
      document.title = SITE_TITLE;
    }
    jumpTo(0);
    return;
  }
  if (!inFilmView) return;
  document.body.classList.remove("film-view");
  filmPage.hidden = true;
  filmPage.innerHTML = "";
  filmOpen = null;
  document.title = SITE_TITLE;
  setTeaserHidden(false);
  const target = location.hash.length > 1 && document.querySelector(location.hash);
  if (location.hash === homeHash) jumpTo(homeScroll);
  else if (target) target.scrollIntoView({ behavior: "instant" });
  else jumpTo(0);
}
window.addEventListener("hashchange", route);
route();
