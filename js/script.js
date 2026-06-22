/* ============================================================
   LEIADA KRÖZJHEN — script.js
   ============================================================ */

/* ── THEME ──────────────────────────────────────────────────── */
(function () {
  const saved = localStorage.getItem('lk-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('lk-theme', t);
}
function toggleTheme() {
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

/* ── HOME GALLERY DATA ──────────────────────────────────────── */
const galleryItems = [
  { src: 'https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf8480-GVkbqDnernn7OdMM.webp', model: 'Ford Mustang', detail: '@sky5oh', slug: 'ford-mustang' },
  { src: 'https://assets.zyrosite.com/kxao4MjzPYjtZ5FS/_dsf6832-7HmGZG1VeOLH5FKI.webp', model: 'Volkswagen Jetta SE', detail: '@leiadakrozjhen', slug: 'volkswagen-jetta-se' },
  { src: 'https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf2254-ibThNyvEAcCqIl20.webp', model: 'Ford Mustang Duo', detail: '@gt5.0jose', slug: 'ford-mustang-duo' },
  { src: 'https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf1764-FbJvI6um9FjYGtEy.webp', model: '2026 Corvette E-Ray', detail: '@pilot.corey', slug: 'corvette-eray' },
  { src: 'https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf1510-1QJdFqydaiJcojW9.webp', model: 'Pontiac Star Chief', detail: '@charlottemotorspeedway', slug: 'pontiac-star-chief' },
  { src: 'https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf0249-AOsW5IrFveW1lY8N.jpg', model: 'Lexus LC500', detail: '@qllee', slug: 'lexus-lc500' },
  { src: 'https://assets.zyrosite.com/kxao4MjzPYjtZ5FS/_dsf7085-1-ggDTPNAiSH6wTaZx.webp', model: 'BMW G80 M3 6MT', detail: '@iomg_m3_6mt', slug: 'bmw-g80-m3-6mt' },
  { src: 'https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf3257-MjrKsZXbI34Kf9Eh.webp', model: 'Subaru WRX', detail: '@wiichee', slug: 'subaru-wrx' },
  { src: 'https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf2221-Cuj8yliVJc9e9VwD.webp', model: 'Porsche Panamera 4S', detail: '@acjphoto', slug: 'porsche-panamera-4s' },
  { src: 'https://assets.zyrosite.com/kxao4MjzPYjtZ5FS/_dsf6500-Ts6Zh68eMMBnYlly.webp', model: 'Lexus IS 350', detail: '@hungis350', slug: 'lexus-is350' },
  { src: 'https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf5581-1-i2Ft9tJYShu4Ym5A.webp', model: 'Black Behind Bars Exhibition', detail: '@acjphoto × @independenceharleydavidson', slug: 'harley-exhibition' },
  { src: 'https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf2430-8iQWTpAylngBjKpb.webp', model: 'Genesis G70', detail: '@mcrossmedia', slug: 'genesis-g70' },
  { src: 'https://assets.zyrosite.com/kxao4MjzPYjtZ5FS/_dsf4023-2KHB2aVhUdudVWKF.webp', model: 'Project Tohru', detail: '@leiadakrozjhen', slug: 'project-tohru' },
];

/* ── HOME GALLERY ───────────────────────────────────────────── */
function buildGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  const w = window.innerWidth;
  const numCols = w <= 680 ? 1 : w <= 1024 ? 2 : 3;
  gallery.innerHTML = '';
  const colDivs = [];
  for (let i = 0; i < numCols; i++) {
    const c = document.createElement('div');
    c.className = 'gallery-column';
    colDivs.push(c);
    gallery.appendChild(c);
  }
  galleryItems.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `View ${item.model} gallery`);
    div.innerHTML = `
      <img src="${item.src}" alt="${item.model}" loading="lazy">
      <div class="gallery-overlay">
        <div class="overlay-label">
          <p class="model">${item.model}</p>
          ${item.detail ? `<p class="detail">${item.detail}</p>` : ''}
          <span class="overlay-view-btn">View Gallery →</span>
        </div>
      </div>`;
    div.addEventListener('click', () => { window.location.href = `${item.slug}/`; });
    div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') window.location.href = `${item.slug}/`; });
    colDivs[i % numCols].appendChild(div);
  });
  requestAnimationFrame(() => {
    gallery.classList.add('loaded');
    gallery.querySelectorAll('.gallery-item').forEach((el, i) => setTimeout(() => el.classList.add('visible'), 80 + i * 40));
  });
}
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(buildGallery, 250); });

/* ── VEHICLE GALLERY + LIGHTBOX ─────────────────────────────── */
function initVehicleGallery() {
  const gallery = document.getElementById('vehicleGallery');
  if (!gallery) return;
  const items = Array.from(gallery.querySelectorAll('.vg-item'));
  if (!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vg-visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  // ── Adaptive mosaic sizing + no-orphan packing ──────────────
  // Detects each image's orientation via naturalWidth/naturalHeight.
  // Portrait → 1col × 2rows. Landscape/square → 1col × 1row.
  // After ALL images are sized, packNoOrphans() promotes any lone
  // landscape/square image that would sit by itself on a row to
  // vg-wide (2 cols) so the grid always looks intentional and full.

  function getOrientation(ratio) {
    if (ratio < 0.85) return 'portrait';
    if (ratio > 1.2)  return 'landscape';
    return 'square';
  }

  function packNoOrphans(els) {
    const COLS = 3;
    let col = 0;
    // Walk items left-to-right, tracking column position.
    // Portrait uses 1 col but spans 2 rows — for this linear
    // pass it still counts as 1 col-unit so we can detect orphans.
    for (let i = 0; i < els.length; i++) {
      const el  = els[i];
      const isP = el.classList.contains('vg-portrait');
      col++;
      if (col > COLS) col = 1; // wrapped to new row

      // If this item is the last one and it's alone at col 1 of a new row
      const isAlone = (col === 1 && i === els.length - 1) ||
                      (col === 1 && i < els.length - 1 && (() => {
                        // Peek: if all remaining items won't fit on this row with it
                        return i === els.length - 1;
                      })());

      if (i === els.length - 1 && col === 1 && !isP) {
        // Last item, alone at start of a row → make wide
        el.classList.remove('vg-landscape','vg-square');
        el.classList.add('vg-wide');
      } else if (!isP && col === 1 && i === els.length - 2 && !els[i+1].classList.contains('vg-portrait')) {
        // Second-to-last and next item will be alone if we don't rebalance
        // → promote this one to wide so both fit (wide + 1 = 3 cols? No — skip)
        // Actually just let the last-item rule handle it
      }

      if (col === COLS) col = 0; // row exactly filled, reset to 0 (next item starts new row)
    }
  }

  let loadedCount = 0;
  const totalImages = items.length;

  function onOriented() {
    loadedCount++;
    if (loadedCount >= totalImages) packNoOrphans(items);
  }

  function applyOrientation(imgEl, itemEl) {
    const ratio = imgEl.naturalWidth / imgEl.naturalHeight;
    itemEl.classList.remove('vg-portrait','vg-landscape','vg-square','vg-wide');
    itemEl.classList.add('vg-' + getOrientation(ratio));
    onOriented();
  }

  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 0.04, 0.5)}s`;
    obs.observe(el);
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Enlarge: ${el.querySelector('img')?.alt || ''}`);

    const img = el.querySelector('img');
    if (img) {
      if (img.complete && img.naturalWidth) {
        applyOrientation(img, el);
      } else {
        img.addEventListener('load',  () => applyOrientation(img, el));
        img.addEventListener('error', () => { el.classList.add('vg-landscape'); onOriented(); });
      }
    } else {
      onOriented();
    }
  });

  const srcs = items.map(el => ({ src: el.querySelector('img').src, alt: el.querySelector('img').alt || '' }));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCounter = document.getElementById('lbCounter');
  const lbCaption = document.getElementById('lbCaption');
  if (!lb || !lbImg) return;

  let currentIdx = 0, transitioning = false;

  function updateLbContent(idx, dir) {
    if (transitioning) return;
    transitioning = true;
    lbImg.style.opacity = '0';
    lbImg.style.transform = `scale(0.96) translateX(${dir === 'next' ? '-20px' : '20px'})`;
    setTimeout(() => {
      currentIdx = ((idx % srcs.length) + srcs.length) % srcs.length;
      lbImg.src = srcs[currentIdx].src;
      lbImg.alt = srcs[currentIdx].alt;
      if (lbCaption) lbCaption.textContent = srcs[currentIdx].alt;
      if (lbCounter) lbCounter.textContent = `${currentIdx + 1} / ${srcs.length}`;
      lbImg.style.transition = 'none';
      lbImg.style.transform = `scale(0.96) translateX(${dir === 'next' ? '20px' : '-20px'})`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        lbImg.style.transition = 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.25,0.1,0.25,1)';
        lbImg.style.opacity = '1';
        lbImg.style.transform = 'scale(1) translateX(0)';
        setTimeout(() => { transitioning = false; }, 320);
      }));
    }, 200);
  }

  function openLightbox(idx) {
    currentIdx = idx;
    lbImg.style.transition = 'none';
    lbImg.src = srcs[idx].src; lbImg.alt = srcs[idx].alt;
    if (lbCaption) lbCaption.textContent = srcs[idx].alt;
    if (lbCounter) lbCounter.textContent = `${idx + 1} / ${srcs.length}`;
    lb.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { lbImg.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.25,0.1,0.25,1)'; });
    lb.querySelector('.lb-close')?.focus();
  }

  function closeLightbox() {
    lb.classList.remove('lb-open');
    document.body.style.overflow = '';
    transitioning = false;
  }

  items.forEach((el, i) => {
    el.addEventListener('click', () => openLightbox(i));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); } });
  });
  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lbPrev')?.addEventListener('click', () => updateLbContent(currentIdx - 1, 'prev'));
  document.getElementById('lbNext')?.addEventListener('click', () => updateLbContent(currentIdx + 1, 'next'));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('lb-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLbContent(currentIdx - 1, 'prev');
    if (e.key === 'ArrowRight') updateLbContent(currentIdx + 1, 'next');
  });
  let touchStartX = 0, touchStartY = 0;
  lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX, dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) dx > 0 ? updateLbContent(currentIdx - 1, 'prev') : updateLbContent(currentIdx + 1, 'next');
  });
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } });
}, { threshold: 0.08 });
function initReveal() { document.querySelectorAll('.reveal').forEach(el => revObs.observe(el)); }

/* ── NAV ────────────────────────────────────────────────────── */
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── MOBILE MENU ────────────────────────────────────────────── */
function initMobileMenu() {
  const burger = document.getElementById('burgerBtn');
  const mMenu = document.getElementById('mobileMenu');
  if (!burger || !mMenu) return;
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mMenu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  mMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open'); mMenu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !mMenu.contains(e.target)) {
      burger.classList.remove('open'); mMenu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── UTILS ──────────────────────────────────────────────────── */
function setYear() { document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear()); }

function setMinDates() {
  const d = new Date();
  d.setDate(d.getDate() + 7); // 7-day minimum lead time
  const minStr = d.toISOString().split('T')[0];
  ['bf-date', 'bf-alt-date'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.min = minStr;
  });
}

/* ── AVAILABILITY ENGINE ────────────────────────────────────── */
/*
  Monday    : 05:00–19:00
  Tue–Thu   : 17:00–19:00
  Friday    : 05:00–07:00
  Saturday  : 05:00–09:00  AND  17:00–19:00
  Sunday    : UNAVAILABLE

  Minimum booking lead time: 7 days from today.
*/

// Time slot value format: "slotKey|HH:MM-HH:MM"  (start-end in 24h)
// Returns parsed { key, start, end } or null
function parseSlot(slotVal) {
  if (!slotVal) return null;
  const parts = slotVal.split('|');
  if (parts.length !== 2) return null;
  const [key, range] = parts;
  const [s, e] = range.split('-');
  return { key, start: s, end: e };
}

// Convert "HH:MM" → minutes since midnight
function toMins(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/*  Availability windows per day-of-week (0=Sun…6=Sat)
    Each window: [startMins, endMins]  */
const AVAIL = {
  0: [],                                         // Sunday — unavailable
  1: [[300, 1140]],                              // Mon  05:00–19:00
  2: [[1020, 1140]],                             // Tue  17:00–19:00
  3: [[1020, 1140]],                             // Wed  17:00–19:00
  4: [[1020, 1140]],                             // Thu  17:00–19:00
  5: [[300, 420]],                              // Fri  05:00–07:00
  6: [[300, 540], [1020, 1140]],               // Sat  05:00–09:00 & 17:00–19:00
};

// Human-readable summary per day
const AVAIL_LABEL = {
  0: null,
  1: 'Mon: 5:00 AM – 7:00 PM',
  2: 'Tue: 5:00 PM – 7:00 PM',
  3: 'Wed: 5:00 PM – 7:00 PM',
  4: 'Thu: 5:00 PM – 7:00 PM',
  5: 'Fri: 5:00 AM – 7:00 AM',
  6: 'Sat: 5:00–9:00 AM and 5:00–7:00 PM',
};

// Returns true if the date is valid (not Sun, ≥ 7 days out)
function isDateValid(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr + 'T12:00:00');
  const dow = d.getDay();
  if (dow === 0) return false;
  if (AVAIL[dow].length === 0) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = (d - today) / 86400000;
  return diff >= 7;
}

// Returns whether a given slot (parsed) fits within ANY window for a day
function isSlotValidForDay(dow, slot) {
  if (!slot) return false;
  const windows = AVAIL[dow];
  if (!windows || windows.length === 0) return false;
  const slotStart = toMins(slot.start);
  const slotEnd = toMins(slot.end);
  return windows.some(([ws, we]) => slotStart >= ws && slotEnd <= we);
}

// Returns { ok, dateMsg, timeMsg } — both date and time validated together
function validateDateAndTime(dateStr, slotVal) {
  const result = { dateOk: false, timeOk: false, dateMsg: '', timeMsg: '' };

  if (!dateStr) {
    result.dateMsg = 'Please choose a date.';
    return result;
  }

  const d = new Date(dateStr + 'T12:00:00');
  const dow = d.getDay();

  // 7-day lead check
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = (d - today) / 86400000;
  if (diff < 7) {
    result.dateMsg = 'Bookings must be made at least 7 days in advance. Please pick a later date.';
    return result;
  }

  // Sunday check
  if (dow === 0) {
    result.dateMsg = 'Sundays are unavailable. Please pick another day.';
    return result;
  }

  // Day is valid
  result.dateOk = true;
  result.dateMsg = '';

  // Now validate the time slot against this day
  if (!slotVal) {
    result.timeMsg = 'Please select a time window.';
    return result;
  }

  const slot = parseSlot(slotVal);
  if (!slot) {
    result.timeMsg = 'Please select a valid time window.';
    return result;
  }

  if (!isSlotValidForDay(dow, slot)) {
    const label = AVAIL_LABEL[dow] || 'this day';
    result.timeMsg = `That time window isn't available on this day. Availability: ${label}.`;
    return result;
  }

  result.timeOk = true;
  return result;
}

// Returns the hint text shown below the date field
function getDateHint(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  const dow = d.getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = (d - today) / 86400000;

  if (diff < 7) return null; // error state handled separately
  if (dow === 0) return null;
  return AVAIL_LABEL[dow] || '';
}

/* ── BOOKING ────────────────────────────────────────────────── */
function selectClient(type, btn) {
  document.querySelectorAll('.client-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.packages-wrap').forEach(p => p.classList.remove('active'));
  document.getElementById('pkg-' + type)?.classList.add('active');
  document.getElementById('bookingForm')?.classList.remove('open');
}

function openBookingForm(clientType, pkg) {
  const section = document.getElementById('bookingForm');
  const labelEl = document.getElementById('formPackageLabel');
  const innerEl = document.getElementById('bookingFormInner');
  const successEl = document.getElementById('bookingSuccess');
  if (labelEl) labelEl.textContent = pkg;
  if (innerEl) innerEl.style.display = '';
  if (successEl) successEl.style.display = 'none';
  if (section) {
    section.classList.add('open');
    setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
}

/* ── VALIDATION ─────────────────────────────────────────────── */
function validateName(v) { return /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+$/.test(v.trim()); }
function validateLastName(v) { const t = v.trim(); return /^[A-Za-z]\.$/.test(t) || /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+$/.test(t); }
function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }
const BLOCKED = ['fuck', 'shit', 'bitch', 'cunt', 'dick', 'cock', 'pussy', 'bastard', 'crap', 'piss', 'slut', 'whore', 'faggot', 'retard'];
function hasProfanity(s) { const q = s.toLowerCase().replace(/[^a-z]/g, ''); return BLOCKED.some(w => q.includes(w)); }

function setField(el, state, errEl, msg) {
  if (!el) return;
  el.classList.remove('valid', 'invalid');
  if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
  if (state === true) el.classList.add('valid');
  if (state === false) { el.classList.add('invalid'); if (msg && errEl) { errEl.textContent = msg; errEl.classList.add('visible'); } }
}

/* ── WEB3FORMS SUBMISSION ───────────────────────────────────── */
const WEB3_KEY = '20af0837-25da-465b-9f3a-79d0fdac8145';

async function submitWeb3Form(data) {
  // data = plain object of field name→value pairs
  const formData = new FormData();
  formData.append('access_key', WEB3_KEY);
  Object.entries(data).forEach(([k, v]) => formData.append(k, v));

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || 'Web3Forms error');
  return true;
}

/* ── CONTACT FORM (Web3Forms) ───────────────────────────────── */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const F = {
    fname: { el: () => document.getElementById('cf-fname'), err: () => document.getElementById('err-fname') },
    lname: { el: () => document.getElementById('cf-lname'), err: () => document.getElementById('err-lname') },
    email: { el: () => document.getElementById('cf-email'), err: () => document.getElementById('err-email') },
    topic: { el: () => document.getElementById('cf-topic'), err: () => document.getElementById('err-topic') },
    message: { el: () => document.getElementById('cf-message'), err: () => document.getElementById('err-message') },
  };

  const vFname = () => { const el = F.fname.el(), err = F.fname.err(), v = el?.value || ''; if (!v.trim()) { setField(el, null, err); return false; } if (!validateName(v)) { setField(el, false, err, 'Name may only contain letters, hyphens, and apostrophes.'); return false; } setField(el, true, err); return true; };
  const vLname = () => { const el = F.lname.el(), err = F.lname.err(), v = el?.value || ''; if (!v.trim()) { setField(el, null, err); return false; } if (!validateLastName(v)) { setField(el, false, err, 'Use letters or an initial like "D."'); return false; } setField(el, true, err); return true; };
  const vEmail = () => { const el = F.email.el(), err = F.email.err(), v = el?.value || ''; if (!v.trim()) { setField(el, null, err); return false; } if (!validateEmail(v)) { setField(el, false, err, 'Please enter a valid email.'); return false; } setField(el, true, err); return true; };
  const vTopic = () => { const el = F.topic.el(), err = F.topic.err(); if (!el?.value) { setField(el, false, err, 'Please select a topic.'); return false; } setField(el, true, err); return true; };
  const vMsg = () => { const el = F.message.el(), err = F.message.err(), v = el?.value?.trim() || ''; if (!v) { setField(el, null, err); return false; } if (v.length < 10) { setField(el, false, err, 'Please write a bit more.'); return false; } if (hasProfanity(v)) { setField(el, false, err, 'Please keep your message respectful.'); return false; } setField(el, true, err); return true; };

  F.fname.el()?.addEventListener('input', vFname);
  F.lname.el()?.addEventListener('input', vLname);
  F.email.el()?.addEventListener('input', vEmail);
  F.topic.el()?.addEventListener('change', vTopic);
  F.message.el()?.addEventListener('input', vMsg);

  document.getElementById('contactSubmitBtn')?.addEventListener('click', async function (e) {
    e.preventDefault();
    if (![vFname(), vLname(), vEmail(), vTopic(), vMsg()].every(Boolean)) {
      contactForm.querySelector('.invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const btn = this;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    const data = {
      name: `${F.fname.el().value.trim()} ${F.lname.el().value.trim()}`,
      email: F.email.el().value.trim(),
      subject: `Contact: ${F.topic.el().value}`,
      message: `From: ${F.fname.el().value.trim()} ${F.lname.el().value.trim()} <${F.email.el().value.trim()}>\nTopic: ${F.topic.el().value}\n\n${F.message.el().value.trim()}`,
    };

    try {
      await submitWeb3Form(data);
      document.getElementById('contactFormWrap').style.display = 'none';
      document.getElementById('contactSuccess').style.display = 'block';
    } catch (err) {
      console.error(err);
      btn.disabled = false;
      btn.textContent = 'Send Message';
      // Show inline error — friendly
      let errDiv = contactForm.querySelector('.form-send-error');
      if (!errDiv) {
        errDiv = document.createElement('p');
        errDiv.className = 'form-send-error';
        errDiv.style.cssText = 'color:var(--crimson);font-size:0.8rem;text-align:center;margin-top:0.75rem;';
        btn.parentNode.insertBefore(errDiv, btn.nextSibling);
      }
      errDiv.textContent = 'Something went wrong — please email hello@leiadakrozjhen.com directly.';
    }
  });
}

/* ── BOOKING FORM (Web3Forms) ───────────────────────────────── */
function initBookingForm() {
  const bookingForm = document.getElementById('bookingForm');
  if (!bookingForm) return;

  const REQUIRED = ['bf-fname', 'bf-lname', 'bf-email', 'bf-vehicle', 'bf-date', 'bf-time'];
  const getEl = id => document.getElementById(id);
  const getErr = id => document.getElementById('berr-' + id.replace('bf-', ''));

  // ── Date + Time cross-field validation ──────────────────────
  const dateEl = getEl('bf-date');
  const timeEl = getEl('bf-time');
  const availHint = document.getElementById('date-avail-hint');
  const timeHint = document.getElementById('time-avail-hint');

  function refreshDateTimeUI() {
    const dateVal = dateEl?.value || '';
    const timeVal = timeEl?.value || '';
    if (availHint) availHint.textContent = '';
    if (timeHint) timeHint.textContent = '';

    const { dateOk, timeOk, dateMsg, timeMsg } = validateDateAndTime(dateVal, timeVal || null);

    // ── Date feedback ──
    if (!dateVal) {
      setField(dateEl, null, getErr('bf-date'));
    } else if (!dateOk) {
      setField(dateEl, false, getErr('bf-date'), dateMsg);
    } else {
      setField(dateEl, true, getErr('bf-date'));
      const hint = getDateHint(dateVal);
      if (availHint && hint) {
        availHint.textContent = `✓ Available · ${hint}`;
        availHint.style.color = '#2d8c5a';
      }
    }

    // ── Time feedback (only meaningful if date is valid) ──
    if (!timeVal) {
      setField(timeEl, null, getErr('bf-time'));
      if (timeHint && dateOk && dateVal) {
        const dow = new Date(dateVal + 'T12:00:00').getDay();
        const label = AVAIL_LABEL[dow];
        if (label) {
          timeHint.textContent = `Available windows for this day: ${label}`;
          timeHint.style.color = 'var(--text-muted)';
        }
      }
    } else if (!dateVal || !dateOk) {
      setField(timeEl, null, getErr('bf-time'));
    } else if (!timeOk) {
      setField(timeEl, false, getErr('bf-time'), timeMsg);
      if (timeHint) timeHint.textContent = '';
    } else {
      setField(timeEl, true, getErr('bf-time'));
      if (timeHint) {
        timeHint.textContent = '✓ This time works for that day.';
        timeHint.style.color = '#2d8c5a';
      }
    }
  }

  dateEl?.addEventListener('change', refreshDateTimeUI);
  timeEl?.addEventListener('change', refreshDateTimeUI);

  function validateBF(id) {
    const el = getEl(id);
    const err = getErr(id);
    if (!el) return true;
    const v = el.value?.trim() || '';

    if (id === 'bf-fname') {
      if (!v) { setField(el, null, err); return false; }
      if (!validateName(v)) { setField(el, false, err, 'Letters, hyphens, and apostrophes only.'); return false; }
    } else if (id === 'bf-lname') {
      if (!v) { setField(el, null, err); return false; }
      if (!validateLastName(v)) { setField(el, false, err, 'Use letters or an initial like "D."'); return false; }
    } else if (id === 'bf-email') {
      if (!v) { setField(el, null, err); return false; }
      if (!validateEmail(v)) { setField(el, false, err, 'Please enter a valid email.'); return false; }
    } else if (id === 'bf-date') {
      if (!v) { setField(el, false, err, 'Please choose a date.'); return false; }
      const { dateOk, dateMsg } = validateDateAndTime(v, timeEl?.value || null);
      if (!dateOk) { setField(el, false, err, dateMsg); return false; }
      setField(el, true, err); return true;
    } else if (id === 'bf-time') {
      const dateVal = dateEl?.value || '';
      if (!v) { setField(el, false, err, 'Please select a time window.'); return false; }
      if (dateVal) {
        const { timeOk, timeMsg } = validateDateAndTime(dateVal, v);
        if (!timeOk) { setField(el, false, err, timeMsg); return false; }
      }
    } else {
      if (!v) { setField(el, false, err, 'This field is required.'); return false; }
    }
    setField(el, true, err);
    return true;
  }

  // Live validation — all required fields
  REQUIRED.forEach(id => {
    const el = getEl(id); if (!el) return;
    el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => {
      // For date/time — always refresh both fields together
      if (id === 'bf-date' || id === 'bf-time') { refreshDateTimeUI(); return; }
      validateBF(id);
    });
  });

  document.getElementById('bookingSubmitBtn')?.addEventListener('click', async function (e) {
    e.preventDefault();
    if (REQUIRED.map(id => validateBF(id)).some(r => !r)) {
      bookingForm.querySelector('.invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const btn = this; btn.disabled = true; btn.textContent = 'Sending…';

    const pkg = getEl('formPackageLabel')?.textContent || '';
    const g = id => getEl(id)?.value?.trim() || '';
    const chk = name => Array.from(bookingForm.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value).join(', ');

    const message = [
      `BOOKING REQUEST — ${pkg}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Name:   ${g('bf-fname')} ${g('bf-lname')}`,
      `Email:  ${g('bf-email')}`,
      `Phone:  ${g('bf-phone') || 'Not provided'}`,
      ``,
      `VEHICLE`,
      `Vehicle:  ${g('bf-vehicle')}`,
      `Color:    ${g('bf-color') || 'Not specified'}`,
      `Mods:     ${g('bf-mods') || 'None listed'}`,
      ``,
      `DATE & TIME`,
      `Preferred Date:   ${g('bf-date')}`,
      `Alternative Date: ${g('bf-alt-date') || 'None'}`,
      `Time Window:      ${g('bf-time')}`,
      ``,
      `LOCATION`,
      `Has a spot in mind: ${chk('bf-has-location-sel') || 'Not specified'}`,
      `Location:           ${g('bf-location') || 'None'}`,
      ``,
      `CREATIVE VISION`,
      `Vision:  ${g('bf-vision') || 'None'}`,
      `Style:   ${chk('bf-style') || 'Not specified'}`,
      ``,
      `GOALS`,
      `Goals:         ${g('bf-goals') || 'None'}`,
      `Deliverables:  ${chk('bf-deliverables') || 'Not specified'}`,
      ``,
      `OTHER`,
      `Prior experience:  ${g('bf-experience') || 'Not specified'}`,
      `Budget flex:       ${g('bf-budget-flex') || 'Not specified'}`,
      `Inspiration:       ${g('bf-inspo') || 'None'}`,
      `Notes:             ${g('bf-notes') || 'None'}`,
    ].join('\n');

    try {
      await submitWeb3Form({
        name: `${g('bf-fname')} ${g('bf-lname')}`,
        email: g('bf-email'),
        subject: `Booking Request: ${pkg}`,
        message,
      });
      document.getElementById('bookingFormInner').style.display = 'none';
      document.getElementById('bookingSuccess').style.display = 'block';
    } catch (err) {
      console.error(err);
      btn.disabled = false; btn.textContent = 'Send Booking Request';
      let errDiv = bookingForm.querySelector('.form-send-error');
      if (!errDiv) {
        errDiv = document.createElement('p');
        errDiv.className = 'form-send-error';
        errDiv.style.cssText = 'color:var(--crimson);font-size:0.8rem;text-align:center;margin-top:0.75rem;';
        btn.parentNode.insertBefore(errDiv, btn.nextSibling);
      }
      errDiv.textContent = 'Something went wrong — please email hello@leiadakrozjhen.com directly.';
    }
  });
}

/* ── NEWSLETTER (Web3Forms) ─────────────────────────────────── */
function initNewsletter() {
  const form = document.getElementById('mcEmbedForm');
  if (!form) return;

  const emailEl = document.getElementById('nl-email');
  const consentEl = document.getElementById('nl-consent');
  const emailErr = document.getElementById('nl-email-err');
  const consentErr = document.getElementById('nl-consent-err');
  const formWrap = document.getElementById('newsletterFormWrap');
  const successEl = document.getElementById('newsletterSuccess');

  function vEmail() {
    const v = emailEl?.value?.trim() || '';
    if (!v) { setField(emailEl, false, emailErr, 'Please enter your email address.'); return false; }
    if (!validateEmail(v)) { setField(emailEl, false, emailErr, 'Please enter a valid email address.'); return false; }
    setField(emailEl, true, emailErr); return true;
  }
  function vConsent() {
    if (!consentEl?.checked) {
      if (consentErr) { consentErr.textContent = 'Please check the box to continue.'; consentErr.classList.add('visible'); }
      return false;
    }
    if (consentErr) { consentErr.textContent = ''; consentErr.classList.remove('visible'); }
    return true;
  }

  emailEl?.addEventListener('input', vEmail);
  consentEl?.addEventListener('change', vConsent);

  form.addEventListener('submit', function (e) {
    const emailOk = vEmail();
    const consentOk = vConsent();
    if (!emailOk || !consentOk) {
      e.preventDefault();
      return;
    }
    // Mailchimp handles the actual submission in a new tab
    // Show local pending success immediately for a smooth UX
    setTimeout(() => {
      if (formWrap) formWrap.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
    }, 350);
  });
}

/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.theme-toggle,.mobile-theme-toggle').forEach(btn => btn.addEventListener('click', toggleTheme));
  buildGallery();
  initReveal();
  initNavScroll();
  setYear();
  setMinDates();
  initMobileMenu();
  initContactForm();
  initBookingForm();
  initVehicleGallery();
  initNewsletter();
});
