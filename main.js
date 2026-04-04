// ═══════════════════════════════════════════════
// jeevdev Portfolio - main.js
// ═══════════════════════════════════════════════

// ─── Nav scroll effect ─────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── URLs de los proyectos en vivo ─────────────
// Actualiza estas URLs cuando el VPS esté listo
const projectURLs = {
  jira: 'http://TU_IP_VPS:3001',   // Jira Command Center
  n8n:  'http://TU_IP_VPS:5678',   // n8n
  ai:   'http://TU_IP_VPS:3002',   // AI Agents
  sql:  'http://TU_IP_VPS:3003',   // SQL Generator
  mcp:  'http://TU_IP_VPS:3004',   // MCP Server
};

// ─── Click en "Ver demo" ────────────────────────
document.querySelectorAll('.demo-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const project = link.dataset.project;
    const url = projectURLs[project];
    if (url && !url.includes('TU_IP_VPS')) {
      window.open(url, '_blank', 'noopener');
    } else {
      showToast('🚧 Demo próximamente disponible');
    }
  });
});

// ─── Toast notification ─────────────────────────
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: rgba(13,13,26,.95); border: 1px solid rgba(139,92,246,.4);
    color: #e2e8f0; padding: .75rem 1.5rem; border-radius: 10px;
    font-size: .875rem; font-weight: 500; z-index: 999;
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 30px rgba(0,0,0,.4);
    animation: fadeInUp .3s ease;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes fadeInUp { from { opacity:0; transform:translateX(-50%) translateY(10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ─── Intersection Observer: animate cards ──────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card, .stack-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
  el.classList.add('animate-in');
  observer.observe(el);
});

// ─── Modal Gallery: ChatBox Mani ──────────────
let currentImgIndex = 0;
const maniImages = [
  'assets/img/chatbox-mani/step-1.png',
  'assets/img/chatbox-mani/step-2.png',
  'assets/img/chatbox-mani/step-3.png',
  'assets/img/chatbox-mani/step-4.png',
  'assets/img/chatbox-mani/step-5.png'
];

function openGallery() {
  currentImgIndex = 0;
  updateGallery();
  const modal = document.getElementById('gallery-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  const modal = document.getElementById('gallery-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function nextImg() {
  currentImgIndex = (currentImgIndex + 1) % maniImages.length;
  updateGallery();
}

function prevImg() {
  currentImgIndex = (currentImgIndex - 1 + maniImages.length) % maniImages.length;
  updateGallery();
}

function updateGallery() {
  const img = document.getElementById('modal-img');
  const counter = document.getElementById('modal-counter');
  img.src = maniImages[currentImgIndex];
  counter.textContent = `${currentImgIndex + 1} / ${maniImages.length}`;
}

// Close on escape or outside click
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeGallery();
});

document.getElementById('gallery-modal').addEventListener('click', (e) => {
  if (e.target.id === 'gallery-modal') closeGallery();
});
