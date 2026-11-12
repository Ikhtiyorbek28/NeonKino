// ================= HISOB, OBUNA VA REKLAMA =================
// Server yo'q: foydalanuvchilar shu brauzerning localStorage'ida saqlanadi (demo rejim).
// Parollar ochiq saqlanmaydi — tasodifiy tuz (salt) + SHA-256 xeshi.
// To'lov TEST rejimida: karta ma'lumotlari hech qayerga yuborilmaydi,
// faqat karta turi va oxirgi 4 raqami to'lovlar tarixida eslab qolinadi.
const Account = (() => {
  // Uchta variant: Bepul (reklama bilan) yoki Premium (reklamasiz + Premium belgili filmlar) — 1 oyga yoki 1 yilga.
  // 4K sifat barcha uchun tekin.
  const OPTIONS = {
    free: { name: "Bepul", label: "Reklama bilan", price: 0 },
    month: { name: "Premium · 1 oy", label: "Reklamasiz + Premium", price: 49000, months: 1 },
    year: { name: "Premium · 1 yil", label: "Reklamasiz + Premium", price: 470000, months: 12 },
  };
  const YEAR_SAVING = OPTIONS.month.price * 12 - OPTIONS.year.price;
  const AD_SEC = 10, SKIP_AFTER = 5;
  const AD_CREATIVES = [
    { kicker: "NeonKino Premium", title: "Reklamasiz. 4K. Dolby Atmos.", text: "Oyiga 49 000 so'm. Istalgan payt bekor qiling.", cta: "Premium olish", plan: "month", art: "premium" },
    { kicker: "Premium · 1 yil", title: "Yillik obunada 20% tejang", text: "470 000 so'm — oyiga atigi ~39 000 so'm.", cta: "Yillikni olish", plan: "year", art: "year" },
    { kicker: "Tez kunda · 18.12.2026", title: "Avengers: Doomsday", text: "Premyerani birinchilardan bo'lib NeonKino Premium'da tomosha qiling.", cta: "Premium olish", plan: "month", art: "doom", img: "1jcDh8qBFzInFjTO5pdYZfDeh7a" },
  ];

  const $ = id => document.getElementById(id);
  const money = n => n.toLocaleString("ru-RU") + " so'm";
  const fmtDate = ts => new Date(ts).toLocaleDateString("ru-RU");
  const fmtDateTime = ts => new Date(ts).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Saqlash ----------
  const db = {
    read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
    write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private rejim */ } },
  };
  const users = () => db.read("nk-users", {});
  let current = null; // joriy foydalanuvchi emaili
  const me = () => (current ? users()[current] || null : null);
  function saveMe(u) {
    const all = users();
    all[u.email] = u;
    db.write("nk-users", all);
  }

  const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  const newSalt = () => hex(crypto.getRandomValues(new Uint8Array(16)));
  async function hash(password, salt) {
    return hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + ":" + password)));
  }

  // ---------- Tarif holati ----------
  // Faol Premium obunasi (yo'q bo'lsa — null, ya'ni Bepul)
  function activePlan(u = me()) {
    if (!u || !u.plan || u.plan.id !== "premium" || u.plan.until < Date.now()) return null;
    return { name: "Premium", months: u.plan.months, until: u.plan.until, autoRenew: u.plan.autoRenew };
  }
  const needsAds = () => !activePlan();
  const findTitle = t => [...catalog, ...series].find(m => m.title === t);
  const initials = name => name.trim().split(/\s+/).map(s => s[0]).join("").slice(0, 2).toUpperCase();

  // ---------- Kirish / ro'yxatdan o'tish ----------
  async function register({ name, email, password }) {
    email = email.trim().toLowerCase();
    const all = users();
    if (all[email]) throw "Bu email bilan hisob allaqachon mavjud";
    const salt = newSalt();
    all[email] = {
      name: name.trim(), email, salt, hash: await hash(password, salt), created: Date.now(),
      plan: null, favorites: [], history: [], payments: [],
    };
    db.write("nk-users", all);
    setSession(email);
  }
  async function login({ email, password }) {
    email = email.trim().toLowerCase();
    const u = users()[email];
    if (!u || u.hash !== await hash(password, u.salt)) throw "Email yoki parol noto'g'ri";
    setSession(email);
  }
  function setSession(email) {
    current = email;
    db.write("nk-session", email);
    changed();
  }
  function logout() {
    current = null;
    db.write("nk-session", null);
    closeDrawer();
    changed();
    toast("Hisobdan chiqdingiz");
  }
  function changed() {
    renderNav();
    renderPlanButtons();
    renderAdBanner();
    if ($("profileDrawer").classList.contains("open")) renderProfile();
    document.dispatchEvent(new CustomEvent("account:change"));
  }

  // ---------- Auth oynasi ----------
  const authModal = $("authModal");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  let pendingAction = null;

  function openAuth(tab = "login", reason = "", then = null) {
    pendingAction = then;
    switchTab(tab);
    $("authReason").hidden = !reason;
    $("authReason").textContent = reason;
    authModal.classList.add("open");
    setTimeout(() => authModal.querySelector(".auth-form.active input").focus(), 300);
  }
  function switchTab(tab) {
    authModal.dataset.tab = tab;
    authModal.querySelectorAll(".auth-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
    authModal.querySelectorAll(".auth-form").forEach(f => f.classList.toggle("active", f.id === tab + "Form"));
    authModal.querySelectorAll("[data-error]").forEach(e => e.textContent = "");
  }
  function fail(form, msg) {
    form.querySelector("[data-error]").textContent = typeof msg === "string" ? msg : "Xatolik yuz berdi, qayta urinib ko'ring";
    form.classList.remove("shake");
    void form.offsetWidth;
    form.classList.add("shake");
  }
  function afterAuth(msg) {
    authModal.classList.remove("open");
    toast(msg);
    const next = pendingAction;
    pendingAction = null;
    if (next) setTimeout(next, 350);
  }

  authModal.querySelectorAll(".auth-tab").forEach(t => t.onclick = () => switchTab(t.dataset.tab));
  authModal.querySelectorAll("[data-goto]").forEach(a => a.onclick = e => { e.preventDefault(); switchTab(a.dataset.goto); });
  authModal.querySelectorAll(".pass-eye").forEach(b => b.onclick = () => {
    const input = b.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
  });

  $("loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, d = Object.fromEntries(new FormData(f));
    if (!EMAIL_RE.test(d.email.trim())) return fail(f, "Email noto'g'ri kiritilgan");
    if (!d.password) return fail(f, "Parolni kiriting");
    try {
      await login(d);
      f.reset();
      afterAuth(`Xush kelibsiz, ${me().name}!`);
    } catch (err) { fail(f, err); }
  });

  $("registerForm").addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, d = Object.fromEntries(new FormData(f));
    if (d.name.trim().length < 2) return fail(f, "Ismingizni kiriting");
    if (!EMAIL_RE.test(d.email.trim())) return fail(f, "Email noto'g'ri kiritilgan");
    if (d.password.length < 6) return fail(f, "Parol kamida 6 ta belgidan iborat bo'lsin");
    if (d.password !== d.confirm) return fail(f, "Parollar mos kelmadi");
    try {
      await register(d);
      f.reset();
      $("strengthBar").className = "";
      afterAuth(`Hisob yaratildi! Xush kelibsiz, ${me().name} 🎉`);
    } catch (err) { fail(f, err); }
  });

  // Parol kuchi ko'rsatkichi
  $("registerForm").elements.password.addEventListener("input", e => {
    const p = e.target.value;
    const score = [p.length >= 6, p.length >= 10, /[a-z]/.test(p) && /[A-Z]/.test(p), /\d/.test(p), /[^\w]/.test(p)]
      .filter(Boolean).length;
    $("strengthBar").className = p ? ["weak", "weak", "fair", "good", "strong", "strong"][score] : "";
  });

  // ---------- Navbar ----------
  function renderNav() {
    const u = me();
    $("loginBtn").hidden = !!u;
    $("userChip").hidden = !u;
    if (!u) return;
    const p = activePlan(u);
    $("chipAvatar").textContent = initials(u.name);
    $("chipName").textContent = u.name.split(" ")[0];
    $("chipPlan").textContent = p ? p.name : "Bepul";
    $("userChip").classList.toggle("premium", !!p);
  }
  $("loginBtn").onclick = () => openAuth("login");
  $("userChip").onclick = () => openDrawer();

  // Foydalanuvchining joriy varianti: free / month / year (mehmon uchun — null)
  function currentOption() {
    if (!me()) return null;
    const p = activePlan();
    return !p ? "free" : p.months === 12 ? "year" : "month";
  }
  function renderPlanButtons() {
    const cur = currentOption();
    document.querySelectorAll("#plans button[data-plan]").forEach(b => {
      const id = b.dataset.plan, isCurrent = cur === id;
      b.textContent = id === "free"
        ? (isCurrent ? "Joriy tarif ✓" : "Tomosha qilish")
        : (isCurrent ? "Joriy tarif ✓ · Uzaytirish" : "Tanlash");
      b.closest(".plan").classList.toggle("current", isCurrent);
    });
  }
  document.querySelectorAll("#plans button[data-plan]").forEach(b => b.onclick = () => {
    if (b.dataset.plan !== "free") return openCheckout(b.dataset.plan);
    document.getElementById("movies").scrollIntoView({ behavior: "smooth" });
    toast("Bepul tarif: ro'yxatdan o'tmasdan, reklama bilan tomosha qiling");
  });

  // ---------- Tomosha ----------
  // Oddiy filmlar hamma uchun ochiq (Bepul — reklama bilan). Premium belgili filmlar faqat Premium'da.
  // Kirgan foydalanuvchining ko'rish tarixi saqlanadi.
  function watch(m, play) {
    if (m.premium && !activePlan()) {
      if (!me()) {
        return openAuth("register", `🔒 “${m.title}” — Premium film. Obuna olish uchun ro'yxatdan o'ting`, () => watch(m, play));
      }
      return openCheckout("month", { film: m, play });
    }
    const u = me();
    if (u) {
      u.history = [{ title: m.title, at: Date.now() }, ...u.history.filter(h => h.title !== m.title)].slice(0, 30);
      saveMe(u);
    }
    play(m, { ads: needsAds(), quality: "4K" });
  }

  // ---------- Sevimlilar ----------
  const isFav = title => !!me()?.favorites.includes(title);
  function toggleFav(title) {
    const u = me();
    if (!u) {
      openAuth("login", "Sevimlilarga qo'shish uchun hisobingizga kiring", () => toggleFav(title));
      return null;
    }
    const on = !u.favorites.includes(title);
    u.favorites = on ? [title, ...u.favorites] : u.favorites.filter(t => t !== title);
    saveMe(u);
    document.dispatchEvent(new CustomEvent("account:change"));
    if ($("profileDrawer").classList.contains("open")) renderProfile();
    return on;
  }

  // ---------- Reklama ----------
  function adHTML(ad, kind) {
    const bg = ad.img ? ` style="--ad-img:url(https://image.tmdb.org/t/p/w780/${ad.img}.jpg)"` : "";
    return `<div class="ad-creative ad-${ad.art}"${bg}>
      <span class="ad-label">Reklama</span>
      <div class="ad-copy"><small>${ad.kicker}</small><h4>${ad.title}</h4><p>${ad.text}</p></div>
      <button class="btn-neon ad-cta" data-plan="${ad.plan}">${ad.cta}</button>
      ${kind === "banner" ? '<button class="ad-close" aria-label="Reklamani yopish">&times;</button>' : ""}
    </div>`;
  }

  let bannerIdx = 0, bannerTimer = null, bannerClosed = false;
  function renderAdBanner() {
    const show = needsAds() && !bannerClosed;
    $("adSlot").hidden = !show;
    clearInterval(bannerTimer);
    if (!show) return;
    const draw = () => { $("adBanner").innerHTML = adHTML(AD_CREATIVES[bannerIdx++ % AD_CREATIVES.length], "banner"); };
    draw();
    bannerTimer = setInterval(draw, 9000);
  }
  $("adBanner").addEventListener("click", e => {
    const cta = e.target.closest(".ad-cta");
    if (cta) return openCheckout(cta.dataset.plan);
    if (e.target.closest(".ad-close")) {
      bannerClosed = true;
      renderAdBanner();
      toast("Reklamasiz ko'rish uchun — Premium tarifi ✦");
    }
  });

  // Film oldidan reklama (pre-roll)
  let rollTimer = null, rollDone = null;
  function preroll(onDone) {
    const ad = AD_CREATIVES[Math.floor(Math.random() * AD_CREATIVES.length)];
    const el = $("adRoll");
    clearInterval(rollTimer);
    rollDone = onDone;
    el.innerHTML = `${adHTML(ad, "roll")}
      <div class="roll-bar"><i></i></div>
      <div class="roll-meta"><span id="rollTime"></span><button class="roll-skip" id="rollSkip" disabled></button></div>`;
    el.hidden = false;
    $("playerModal").classList.add("ad-on");
    bgMusic.film(true);
    const t0 = performance.now();
    const tick = () => {
      const passed = (performance.now() - t0) / 1000;
      const left = Math.max(0, AD_SEC - passed);
      el.querySelector(".roll-bar i").style.width = Math.min(100, passed / AD_SEC * 100) + "%";
      $("rollTime").textContent = `Reklama · 0:${String(Math.ceil(left)).padStart(2, "0")}`;
      const skipIn = Math.ceil(SKIP_AFTER - passed), skip = $("rollSkip");
      skip.disabled = skipIn > 0;
      skip.textContent = skipIn > 0 ? `O'tkazish (${skipIn})` : "O'tkazib yuborish ⏭";
      if (left <= 0) finishRoll();
    };
    tick();
    rollTimer = setInterval(tick, 200);
  }
  function finishRoll() {
    const done = rollDone;
    cancelRoll();
    if (done) done();
  }
  function cancelRoll() {
    clearInterval(rollTimer);
    rollTimer = rollDone = null;
    $("adRoll").hidden = true;
    $("adRoll").innerHTML = "";
    $("playerModal").classList.remove("ad-on");
  }
  $("adRoll").addEventListener("click", e => {
    if (e.target.closest("#rollSkip:not([disabled])")) return finishRoll();
    const cta = e.target.closest(".ad-cta");
    if (cta) {
      closePlayer();
      openCheckout(cta.dataset.plan);
    }
  });

  // ---------- Obuna sotib olish ----------
  const coModal = $("checkoutModal");
  const cardForm = $("cardForm");
  const otpInputs = [...$("otp").children];
  const co = { option: "month", step: 1, otp: "", card: null, pending: null };

  // pending — Premium film uchun ochilgan bo'lsa: { film, play }; to'lovdan keyin shu film boshlanadi
  function openCheckout(option = "month", pending = null) {
    if (!me()) return openAuth("register", "Obuna olish uchun avval ro'yxatdan o'ting", () => openCheckout(option, pending));
    co.option = option;
    co.pending = pending;
    $("coReason").hidden = !pending;
    if (pending) $("coReason").textContent = `🔒 “${pending.film.title}” — Premium film. Ko'rish uchun Premium oling.`;
    resetCard();
    renderCoPlans();
    goStep(1);
    coModal.classList.add("open");
  }
  function goStep(n) {
    co.step = n;
    coModal.querySelectorAll(".co-step").forEach(s => s.classList.toggle("active", +s.dataset.step === n));
    [...$("checkoutSteps").children].forEach((s, i) => s.classList.toggle("active", i < Math.min(n, 3)));
    $("checkoutSteps").hidden = n === 4;
  }
  function renderCoPlans() {
    $("coPlans").innerHTML = Object.entries(OPTIONS).map(([id, o]) => `
      <button class="co-plan co-${id}${id === co.option ? " active" : ""}" data-plan="${id}">
        ${id === "year" ? `<em class="co-save">−20%</em>` : ""}
        <b>${o.name}</b><span>${money(o.price)}</span>
        <small>${o.label}</small>
      </button>`).join("");
    const o = OPTIONS[co.option];
    $("coTotal").textContent = money(o.price) + (o.months === 12 ? " / yil" : o.months ? " / oy" : "");
    $("coSaving").textContent = co.option === "year" ? `Oylikka nisbatan ${money(YEAR_SAVING)} tejaysiz` : "";
    $("coNext1").textContent = co.option === "free" ? "Bepul davom etish" : "To'lovga o'tish";
  }
  $("coPlans").addEventListener("click", e => {
    const b = e.target.closest(".co-plan");
    if (b) { co.option = b.dataset.plan; renderCoPlans(); }
  });
  $("coNext1").onclick = () => {
    if (co.option === "free") return chooseFree();
    goStep(2);
    setTimeout(() => cardForm.elements.number.focus(), 250);
  };
  coModal.querySelectorAll("[data-back]").forEach(b => b.onclick = () => goStep(co.step - 1));

  // Karta
  function brandOf(num) {
    if (/^(8600|5614)/.test(num)) return "UZCARD";
    if (/^9860/.test(num)) return "HUMO";
    if (/^4/.test(num)) return "VISA";
    if (/^(5[1-5]|2[2-7])/.test(num)) return "MASTERCARD";
    return "KARTA";
  }
  const needsCvc = brand => brand === "VISA" || brand === "MASTERCARD";
  function luhn(num) {
    let sum = 0;
    [...num].reverse().forEach((d, i) => {
      let n = +d;
      if (i % 2) { n *= 2; if (n > 9) n -= 9; }
      sum += n;
    });
    return sum % 10 === 0;
  }
  const digits = () => cardForm.elements.number.value.replace(/\D/g, "");

  function resetCard() {
    cardForm.reset();
    $("bcBrand").textContent = "KARTA";
    $("bcNumber").textContent = "•••• •••• •••• ••••";
    $("bcHolder").textContent = "KARTA EGASI";
    $("bcExp").textContent = "MM/YY";
    $("bankCard").dataset.brand = "";
    $("cvcField").hidden = false;
    cardForm.querySelector("[data-error]").textContent = "";
  }
  cardForm.elements.number.addEventListener("input", e => {
    const d = e.target.value.replace(/\D/g, "").slice(0, 16);
    e.target.value = d.replace(/(\d{4})(?=\d)/g, "$1 ");
    const brand = brandOf(d);
    $("bcBrand").textContent = brand;
    $("bankCard").dataset.brand = brand.toLowerCase();
    $("bcNumber").textContent = (d + "•".repeat(16 - d.length)).replace(/(.{4})(?=.)/g, "$1 ");
    $("cvcField").hidden = d.length >= 4 && !needsCvc(brand);
  });
  cardForm.elements.exp.addEventListener("input", e => {
    let d = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (d.length >= 3) d = d.slice(0, 2) + "/" + d.slice(2);
    e.target.value = d;
    $("bcExp").textContent = d || "MM/YY";
  });
  cardForm.elements.cvc.addEventListener("input", e => e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3));
  cardForm.elements.holder.addEventListener("input", e => {
    e.target.value = e.target.value.toUpperCase();
    $("bcHolder").textContent = e.target.value || "KARTA EGASI";
  });

  cardForm.addEventListener("submit", e => {
    e.preventDefault();
    const num = digits(), brand = brandOf(num), [mm, yy] = cardForm.elements.exp.value.split("/").map(Number);
    if (num.length !== 16) return fail(cardForm, "Karta raqami 16 ta raqamdan iborat bo'lishi kerak");
    if (needsCvc(brand) && !luhn(num)) return fail(cardForm, "Karta raqami noto'g'ri");
    const now = new Date(), expEnd = new Date(2000 + yy, mm, 1);
    if (!mm || mm > 12 || !yy || expEnd <= now) return fail(cardForm, "Amal qilish muddati noto'g'ri yoki tugagan");
    if (needsCvc(brand) && cardForm.elements.cvc.value.length !== 3) return fail(cardForm, "CVC kodini kiriting");
    if (cardForm.elements.holder.value.trim().length < 3) return fail(cardForm, "Karta egasining ismini kiriting");
    cardForm.querySelector("[data-error]").textContent = "";

    const btn = $("payBtn");
    btn.disabled = true;
    btn.textContent = "Ishlov berilmoqda…";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "To'lash";
      co.card = { brand, last4: num.slice(-4) };
      co.otp = String(Math.floor(100000 + Math.random() * 900000));
      $("smsHint").innerHTML = `Kod karta egasining telefoniga yuborildi.<br><b class="test-code">TEST rejimi: kod — ${co.otp}</b>`;
      otpInputs.forEach(i => i.value = "");
      $("otpError").textContent = "";
      goStep(3);
      setTimeout(() => otpInputs[0].focus(), 250);
    }, 1200);
  });

  // SMS kod
  // Bir nechta raqam birdan kelsa (tez yozish, joylashtirish, SMS avto-to'ldirish) — keyingi kataklarga taqsimlanadi
  function fillOtp(from, text) {
    const ds = text.replace(/\D/g, "").split("");
    let i = from;
    ds.forEach(d => { if (otpInputs[i]) otpInputs[i++].value = d; });
    otpInputs[Math.min(i, otpInputs.length - 1)].focus();
    if (otpInputs.every(x => x.value)) $("otpBtn").click();
  }
  otpInputs.forEach((input, i) => {
    input.removeAttribute("maxlength");
    input.addEventListener("focus", () => input.select()); // to'la katakka yozilsa — almashtiriladi
    input.addEventListener("input", () => {
      const typed = input.value;
      input.value = "";
      fillOtp(i, typed);
    });
    input.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !input.value && otpInputs[i - 1]) otpInputs[i - 1].focus();
    });
    input.addEventListener("paste", e => {
      e.preventDefault();
      fillOtp(i, e.clipboardData.getData("text"));
    });
  });
  otpInputs[0].setAttribute("autocomplete", "one-time-code");
  $("otpBtn").onclick = () => {
    if (otpInputs.map(i => i.value).join("") !== co.otp) {
      $("otpError").textContent = "Kod noto'g'ri. Qayta kiriting.";
      $("otp").classList.remove("shake");
      void $("otp").offsetWidth;
      $("otp").classList.add("shake");
      otpInputs.forEach(i => i.value = "");
      otpInputs[0].focus();
      return;
    }
    completePurchase();
  };

  function chooseFree() {
    const u = me(), p = activePlan(u);
    coModal.classList.remove("open");
    if (p && p.autoRenew) {
      u.plan.autoRenew = false;
      saveMe(u);
      changed();
      return toast(`Premium ${fmtDate(p.until)} gacha ishlaydi, keyin Bepul tarifga o'tasiz`);
    }
    if (p) return toast("Premium muddati tugagach Bepul tarifga o'tasiz");
    toast(co.pending
      ? `Siz Bepul tarifdasiz — “${co.pending.film.title}”ni tomosha qilish uchun Premium obunaga o'ting`
      : "Siz Bepul tarifdasiz — Premium filmlarni tomosha qilish uchun Premium obunaga o'ting");
    co.pending = null;
  }

  function completePurchase() {
    const u = me(), now = Date.now(), cur = activePlan(u), opt = OPTIONS[co.option];
    // Premium hali faol bo'lsa — yangi muddat uning oxiridan boshlab qo'shiladi
    const until = new Date(cur ? cur.until : now);
    until.setMonth(until.getMonth() + opt.months);
    const receipt = "NK-" + now.toString(36).toUpperCase();
    u.plan = { id: "premium", months: opt.months, until: until.getTime(), autoRenew: true };
    u.payments = [{
      id: receipt, option: co.option, amount: opt.price,
      at: now, card: `${co.card.brand} •••• ${co.card.last4}`,
    }, ...u.payments];
    saveMe(u);
    resetCard();
    $("successTitle").textContent = "Premium faollashtirildi!";
    $("successText").textContent = `${opt.name} — ${fmtDate(until)} gacha amal qiladi. Chek raqami: ${receipt}`;
    $("successBtn").textContent = co.pending ? `“${co.pending.film.title}”ni ko'rish` : "Tomosha qilishni boshlash";
    goStep(4);
    bannerClosed = false;
    changed();
    confetti(coModal.querySelector(".checkout-card"));
  }

  // Premium film uchun sotib olingan bo'lsa — darhol o'sha film boshlanadi
  $("successBtn").addEventListener("click", () => {
    const p = co.pending;
    co.pending = null;
    if (p) setTimeout(() => watch(p.film, p.play), 300);
  });

  function confetti(host) {
    const colors = ["#ff2d6f", "#a86bff", "#5ad7ff", "#ffc94d", "#e639c4"];
    const r = host.getBoundingClientRect();
    for (let i = 0; i < 40; i++) {
      const s = document.createElement("i");
      s.className = "confetti";
      s.style.cssText = `left:${r.left + r.width / 2 + (Math.random() - .5) * r.width * .3}px;top:${r.top + r.height * .35}px;` +
        `background:${colors[i % colors.length]};` +
        `--dx:${(Math.random() - .5) * 520}px;--dy:${-160 - Math.random() * 260}px;--r:${Math.random() * 720}deg;` +
        `animation-delay:${Math.random() * .15}s`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1800);
    }
  }

  // ---------- Shaxsiy profil ----------
  let pfTab = "favs";
  function openDrawer() {
    renderProfile();
    $("profileDrawer").classList.add("open");
    $("drawerBackdrop").classList.add("open");
  }
  function closeDrawer() {
    $("profileDrawer").classList.remove("open");
    $("drawerBackdrop").classList.remove("open");
  }
  $("drawerClose").onclick = closeDrawer;
  $("drawerBackdrop").onclick = closeDrawer;
  $("logoutBtn").onclick = logout;
  document.querySelectorAll(".pf-tabs button").forEach(b => b.onclick = () => { pfTab = b.dataset.pf; renderProfile(); });

  const mediaRow = (m, sub) => `
    <button class="pf-row" data-title="${esc(m.title)}">
      <span class="mini poster">${poster(m, "w92")}</span>
      <span><b>${esc(m.title)}</b><small>${sub}</small></span>
    </button>`;

  function renderProfile() {
    const u = me();
    if (!u) return;
    const p = activePlan(u);
    $("pfAvatar").textContent = initials(u.name);
    $("pfName").textContent = u.name;
    $("pfEmail").textContent = u.email;
    $("pfPlan").className = "pf-plan" + (p ? " gold" : "");
    $("pfPlan").innerHTML = p
      ? `<div class="plan-badge">Premium · ${p.months === 12 ? "1 yil" : "1 oy"}</div>
         <p>${p.autoRenew ? "Keyingi to'lov" : "Amal qiladi"}: <b>${fmtDate(p.until)}</b>${p.autoRenew ? "" : " gacha · yangilanmaydi"}</p>
         <div class="pf-plan-actions">
           <button class="btn-neon" data-act="upgrade">Uzaytirish</button>
           ${p.autoRenew ? '<button class="link-btn" data-act="cancel">Obunani bekor qilish</button>'
                         : '<button class="link-btn" data-act="resume">Qayta yoqish</button>'}
         </div>`
      : `<div class="plan-badge">Bepul</div>
         <p>Reklama bilan, 4K sifatda tomosha. Premium — reklamasiz va Premium filmlar.</p>
         <div class="pf-plan-actions"><button class="btn-neon" data-act="upgrade">Premium olish</button></div>`;
    $("pfWatched").textContent = u.history.length;
    $("pfFavs").textContent = u.favorites.length;
    $("pfPays").textContent = u.payments.length;
    document.querySelectorAll(".pf-tabs button").forEach(b => b.classList.toggle("active", b.dataset.pf === pfTab));

    const body = $("pfBody");
    if (pfTab === "favs") {
      const list = u.favorites.map(findTitle).filter(Boolean);
      body.innerHTML = list.length
        ? `<div class="pf-grid">${list.map(m => `
            <button class="pf-fav" data-title="${esc(m.title)}"><span class="poster">${poster(m, "w185")}</span><small>${esc(m.title)}</small></button>`).join("")}</div>`
        : `<p class="pf-empty">Hali sevimli film yo'q.<br>Katalogdagi ❤ belgisini bosing.</p>`;
    } else if (pfTab === "history") {
      const list = u.history.map(h => ({ h, m: findTitle(h.title) })).filter(x => x.m);
      body.innerHTML = list.length
        ? list.map(({ h, m }) => mediaRow(m, fmtDateTime(h.at))).join("") +
          `<button class="link-btn" data-act="clear-history">Tarixni tozalash</button>`
        : `<p class="pf-empty">Hali hech narsa ko'rilmagan.</p>`;
    } else if (pfTab === "payments") {
      body.innerHTML = u.payments.length
        ? u.payments.map(pay => `
            <div class="pay-row">
              <div><b>${OPTIONS[pay.option]?.name || "Premium"}</b><small>${fmtDateTime(pay.at)} · ${pay.card}</small></div>
              <div class="pay-amount">${money(pay.amount)}<small>${pay.id}</small></div>
            </div>`).join("")
        : `<p class="pf-empty">To'lovlar hali yo'q.</p>`;
    } else {
      body.innerHTML = `
        <form class="pf-form" id="nameForm">
          <label class="field"><span>Ism</span><input name="name" value="${esc(u.name)}" /></label>
          <button class="btn-outline">Saqlash</button>
        </form>
        <form class="pf-form" id="passForm">
          <label class="field"><span>Joriy parol</span><input type="password" name="old" autocomplete="current-password" /></label>
          <label class="field"><span>Yangi parol</span><input type="password" name="next" autocomplete="new-password" /></label>
          <p class="form-error" data-error></p>
          <button class="btn-outline">Parolni o'zgartirish</button>
        </form>
        <button class="link-btn danger" data-act="delete">Hisobni o'chirish</button>`;
    }
  }

  $("pfPlan").addEventListener("click", e => {
    const act = e.target.closest("[data-act]")?.dataset.act;
    const u = me();
    if (act === "upgrade") { closeDrawer(); openCheckout(currentOption() === "year" ? "year" : "month"); }
    if (act === "cancel" || act === "resume") {
      u.plan.autoRenew = act === "resume";
      saveMe(u);
      toast(act === "cancel" ? "Obuna bekor qilindi — muddati tugaguncha ishlaydi" : "Avtomatik yangilanish yoqildi");
      changed();
    }
  });
  $("pfBody").addEventListener("click", e => {
    const item = e.target.closest("[data-title]");
    if (item) {
      closeDrawer();
      location.hash = filmHash(findTitle(item.dataset.title));
      return;
    }
    const act = e.target.closest("[data-act]")?.dataset.act;
    const u = me();
    if (act === "clear-history") { u.history = []; saveMe(u); renderProfile(); }
    if (act === "delete" && confirm("Hisobingiz va barcha ma'lumotlaringiz o'chiriladi. Davom etasizmi?")) {
      const all = users();
      delete all[u.email];
      db.write("nk-users", all);
      logout();
    }
  });
  $("pfBody").addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, d = Object.fromEntries(new FormData(f)), u = me();
    if (f.id === "nameForm") {
      if (d.name.trim().length < 2) return toast("Ism juda qisqa");
      u.name = d.name.trim();
      saveMe(u);
      toast("Ism saqlandi");
      changed();
    }
    if (f.id === "passForm") {
      if (u.hash !== await hash(d.old, u.salt)) return fail(f, "Joriy parol noto'g'ri");
      if (d.next.length < 6) return fail(f, "Yangi parol kamida 6 ta belgi");
      u.salt = newSalt();
      u.hash = await hash(d.next, u.salt);
      saveMe(u);
      f.reset();
      toast("Parol o'zgartirildi");
    }
  });

  // ---------- Umumiy: oynalarni yopish ----------
  [authModal, coModal].forEach(m => {
    m.addEventListener("click", e => {
      if (e.target === m || e.target.closest("[data-close]")) m.classList.remove("open");
    });
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    authModal.classList.remove("open");
    coModal.classList.remove("open");
    closeDrawer();
  });

  // ---------- Boshlash ----------
  const saved = db.read("nk-session", null);
  if (saved && users()[saved]) current = saved;
  renderNav();
  renderPlanButtons();
  renderAdBanner();

  return {
    watch, preroll, isFav, toggleFav, openAuth, openCheckout,
    hasPremium: () => !!activePlan(),
    cancelAd: cancelRoll,
    adActive: () => rollTimer !== null,
  };
})();
