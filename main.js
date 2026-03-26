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
