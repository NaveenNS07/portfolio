/* ═══════════════════════════════════════════════════════════
   NAVEEN M M — PORTFOLIO INTERACTIVITY
   ═══════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  /* ── PRELOADER ── */
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 1200);
  });

  /* ── THEME TOGGLE ── */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored) html.setAttribute('data-theme', stored);

  themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    initParticles();
  });

  /* ── STICKY NAVBAR ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    })
  );

  /* ── TYPING ANIMATION ── */
  const roles = [
    'Modern Web Apps',
    'Scalable APIs',
    'AI-Powered Solutions',
    'Cloud Architectures',
    'Real-Time Systems',
    'Beautiful Interfaces'
  ];
  const typingEl = document.getElementById('typingText');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIdx];
    if (!deleting) {
      typingEl.textContent = current.substring(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
      setTimeout(typeLoop, 70 + Math.random() * 40);
    } else {
      typingEl.textContent = current.substring(0, --charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(typeLoop, 400); return; }
      setTimeout(typeLoop, 35);
    }
  }
  setTimeout(typeLoop, 1600);

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObs.observe(el));

  /* ── SKILL BAR ANIMATION ── */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.setProperty('--bar-w', e.target.getAttribute('data-width') + '%');
        e.target.classList.add('animate');
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(el => barObs.observe(el));

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('.stat-number');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));

  function animateCounter(el) {
    const target = +el.getAttribute('data-count'), duration = 1500, start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  /* ── CUSTOM CURSOR ── */
  const dot = document.getElementById('cursorDot'), ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
  (function cursorLoop() { rx += (mx - rx) * .15; ry += (my - ry) * .15; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(cursorLoop); })();
  document.querySelectorAll('a,button,.project-card,.skill-chip,.cert-badge,.strength-card,.achievement-card,.contact-item,.social-btn')
    .forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });

  /* ── TILT EFFECT ── */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ── CONTACT FORM ── */
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = '✨ Message sent successfully!';
    document.body.appendChild(t); setTimeout(() => t.remove(), 3200);
    e.target.reset();
  });

  /* ── ACTIVE NAV ── */
  const sections = document.querySelectorAll('.section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active-link'));
        const l = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (l) l.classList.add('active-link');
      }
    });
  }, { threshold: .3, rootMargin: '-100px 0px -40% 0px' });
  sections.forEach(s => activeObs.observe(s));

  /* ══════════ COLORFUL PARTICLE CANVAS ══════════ */
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [], animId;

  function colors() {
    return html.getAttribute('data-theme') === 'dark'
      ? ['#7c3aed', '#06b6d4', '#f472b6', '#facc15', '#34d399', '#fb923c']
      : ['#7c3aed', '#0891b2', '#ec4899', '#d97706', '#059669', '#ea580c'];
  }

  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }

  function initParticles() {
    cancelAnimationFrame(animId); resize(); particles = [];
    const n = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 120);
    const c = colors();
    for (let i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1, vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6,
        color: c[Math.floor(Math.random() * c.length)],
        alpha: Math.random() * .5 + .2, pulse: Math.random() * Math.PI * 2,
      });
    }
    draw();
  }

  function hexA(a) { return Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0'); }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const maxD = 130;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.pulse += .02;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
      const a = p.alpha + Math.sin(p.pulse) * .15;

      // glow
      ctx.beginPath();
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, p.color + hexA(a * .6));
      g.addColorStop(1, p.color + '00');
      ctx.fillStyle = g; ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();

      // core
      ctx.beginPath(); ctx.fillStyle = p.color + hexA(a);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();

      // lines
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          ctx.beginPath(); ctx.strokeStyle = p.color + hexA((1 - d / maxD) * .18);
          ctx.lineWidth = .7; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  initParticles();

  /* mouse → push particles */
  let mc = { x: -9999, y: -9999 };
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mc.x = e.clientX - r.left; mc.y = e.clientY - r.top;
    for (const p of particles) {
      const dx = p.x - mc.x, dy = p.y - mc.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) { const f = (100 - d) / 100 * .8; p.vx += dx / d * f; p.vy += dy / d * f; p.vx *= .95; p.vy *= .95; }
    }
  });
  canvas.addEventListener('mouseleave', () => { mc.x = mc.y = -9999; });

})();
