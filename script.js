/* ── Year ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Hamburger ── */
const overlay = document.getElementById('lk-mobile-overlay');
const btn = document.getElementById('hamburger');

function openMenu() {
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('open'));
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    overlay.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => overlay.style.display = 'none', 350);
}

btn.addEventListener('click', () => overlay.classList.contains('open') ? closeMenu() : openMenu());
overlay.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));

/* ── Gallery ── */
const items = [
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf3257-MjrKsZXbI34Kf9Eh.webp", model: "SUBARU WRX", detail: "@wiichee" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf2254-ibThNyvEAcCqIl20.webp", model: "Ford Mustang", detail: "@gt5.0jose" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf1764-FbJvI6um9FjYGtEy.webp", model: "2026 Corvette E-Ray", detail: "@pilot.corey" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf1510-1QJdFqydaiJcojW9.webp", model: "Pontiac Star Chief", detail: "@charlottemotorspeedway" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf0249-AOsW5IrFveW1lY8N.jpg", model: "Lexus LC500", detail: "@qllee" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf8480-GVkbqDnernn7OdMM.webp", model: "Ford Mustang", detail: "@sky5oh" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf2221-Cuj8yliVJc9e9VwD.webp", model: "Porsche Panamera 4S", detail: "@acjphoto" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf5581-1-i2Ft9tJYShu4Ym5A.webp", model: "'Black Behind Bars' Exhibition", detail: "@acjphoto & @independenceharleydavidson" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf9541-lq9v3DxANDyddFj5.webp", model: "SS Chevelle", detail: "@streetsideclassics" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf8015-QYCSlVbeHCWJkBCY.webp", model: "Genesis GV80", detail: "@genesisofcharlotte" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf2430-8iQWTpAylngBjKpb.webp", model: "Genesis G70", detail: "@mcrossmedia" },
    { src: "https://assets.zyrosite.com/Jt4lDSQe2RLluQD3/_dsf7043-IwaqibNWcUGoe0zr.webp", model: "2026 Toyota Supra", detail: "@venommkv" }
];

const gallery = document.getElementById('gallery');
const numCols = window.innerWidth <= 600 ? 1 : 3;
const columnDivs = [];

for (let i = 0; i < numCols; i++) {
    const col = document.createElement('div');
    col.className = 'gallery-column';
    columnDivs.push(col);
    gallery.appendChild(col);
}

items.forEach((item, index) => {
    const colIndex = index % numCols;
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${item.src}" alt="${item.model}" loading="lazy" />
        <div class="gallery-overlay">
            <div class="overlay-label">
                <p class="model">${item.model}</p>
                <p class="detail">${item.detail}</p>
            </div>
        </div>`;
    columnDivs[colIndex].appendChild(div);
});

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.12, rootMargin: "-60px 0px -80px 0px" });

function initGallery() {
    gallery.classList.add('loaded');
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
            galleryObserver.observe(item);
        }, 80 + (index * 35));
    });
}

window.addEventListener('load', () => setTimeout(initGallery, 120));
setTimeout(initGallery, 800);

/* ── Footer reveal ── */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
