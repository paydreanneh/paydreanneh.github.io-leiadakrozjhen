const galleryItems = [
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf3257-MjrKsZXbI34Kf9Eh.webp",model:"Subaru WRX",detail:"@wiichee"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf2254-ibThNyvEAcCqIl20.webp",model:"Ford Mustang",detail:"@gt5.0jose"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf1764-FbJvI6um9FjYGtEy.webp",model:"2026 Corvette E-Ray",detail:"@pilot.corey"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf1510-1QJdFqydaiJcojW9.webp",model:"Pontiac Star Chief",detail:"@charlottemotorspeedway"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf0249-AOsW5IrFveW1lY8N.jpg",model:"Lexus LC500",detail:"@qllee"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf8480-GVkbqDnernn7OdMM.webp",model:"Ford Mustang",detail:"@sky5oh"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf2221-Cuj8yliVJc9e9VwD.webp",model:"Porsche Panamera 4S",detail:"@acjphoto"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf5581-1-i2Ft9tJYShu4Ym5A.webp",model:"Black Behind Bars Exhibition",detail:"@acjphoto & @independenceharleydavidson"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf9541-lq9v3DxANDyddFj5.webp",model:"SS Chevelle",detail:"@streetsideclassics"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf8015-QYCSlVbeHCWJkBCY.webp",model:"Genesis GV80",detail:"@genesisofcharlotte"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf2430-8iQWTpAylngBjKpb.webp",model:"Genesis G70",detail:"@mcrossmedia"},
  {src:"https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf7043-IwaqibNWcUGoe0zr.webp",model:"2026 Toyota Supra",detail:"@venommkv"}
];

function buildGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const cols = 3;
  const colDivs = [];
  for (let i = 0; i < cols; i++) {
    const c = document.createElement('div');
    c.className = 'gallery-column';
    colDivs.push(c);
    gallery.appendChild(c);
  }

  galleryItems.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${item.src}" alt="${item.model}" loading="lazy">
      <div class="gallery-overlay">
        <div class="overlay-label">
          <p class="model">${item.model}</p>
          <p class="detail">${item.detail}</p>
        </div>
      </div>`;
    colDivs[i % cols].appendChild(div);
  });

  setTimeout(() => {
    gallery.classList.add('loaded');
    document.querySelectorAll('.gallery-item').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 60 + i * 30);
    });
  }, 150);
}

const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
}

function initNavScroll() {
  window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 20);
  });
}

function setYear() {
  const yr = new Date().getFullYear();
  document.querySelectorAll('.year').forEach(el => el.textContent = yr);
}

function initMobileMenu() {
  const burger = document.getElementById('burgerBtn');
  const mMenu = document.getElementById('mobileMenu');
  if (burger && mMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mMenu.classList.toggle('open');
    });
  }
}

function selectClient(type, btn) {
  document.querySelectorAll('.client-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.packages-wrap').forEach(p => p.classList.remove('active'));
  document.getElementById('pkg-' + type).classList.add('active');
  document.getElementById('bookingForm').classList.remove('open');
}

function openBookingForm(clientType, pkg) {
  const section = document.getElementById('bookingForm');
  document.getElementById('formPackageLabel').textContent = 'Selected: ' + pkg;
  section.classList.add('open');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function submitForm(btn) {
  btn.textContent = 'Request Sent ✓';
  btn.style.background = '#4a7c4a';
  btn.disabled = true;
}

function submitContactForm(btn) {
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('contactSuccess').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  buildGallery();
  initReveal();
  initNavScroll();
  setYear();
  initMobileMenu();
});
