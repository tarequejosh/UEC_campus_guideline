import { initMap } from './map.js';

// --- Mouse-follow Gradient ---
const glow = document.getElementById('cursorGlow');
let glowX = -250;
let glowY = -250;
let targetX = -250;
let targetY = -250;

if (glow && window.innerWidth > 768) {
  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  const animateGlow = () => {
    glowX += (targetX - glowX) * 0.08;
    glowY += (targetY - glowY) * 0.08;
    glow.style.transform = `translate(${glowX - 250}px, ${glowY - 250}px)`;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();
}

// --- Hero Parallax ---
const heroBg = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0004})`;
    }
  }, { passive: true });
}

// --- Smooth Nav Scroll & active state ---
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section[id]');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.querySelector('.nav-links')?.classList.remove('open');
  });
});

// --- Scroll Spy ---
const scrollSpy = () => {
  const scrollY = window.scrollY + 120;
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', scrollSpy, { passive: true });

// --- Navbar Shadow ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// --- Mobile Menu ---
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
});

// --- Scroll Reveal with Staggered Delays ---
const revealElements = () => {
  const cards = document.querySelectorAll(
    '.step-card, .content-card, .gallery-item, .resource-link'
  );

  cards.forEach((el, i) => {
    el.classList.add('fade-up');
    // Stagger delays based on card position
    if (i < 4) el.classList.add('delay-' + (i + 1));
    else if (i < 8) el.classList.add('delay-' + (i - 3));
    else if (i < 12) el.classList.add('delay-4');
    else el.classList.add('delay-4');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
};

// --- Brand cards stagger ---
const brandCards = document.querySelectorAll('.brand-card');
brandCards.forEach((card, i) => {
  card.classList.add('fade-up');
  const delayClass = 'delay-' + Math.min(Math.floor(i / 3) + 1, 4);
  card.classList.add(delayClass);
});

// --- Init ---
const onReady = () => {
  revealElements();
  initMap();
};

if (document.readyState === 'complete') {
  onReady();
} else {
  window.addEventListener('load', onReady);
}

// --- Lightbox ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

const openLightbox = index => {
  currentIndex = index;
  const item = galleryItems[index];
  lightboxImg.src = item.dataset.src;
  lightboxCaption.textContent = item.dataset.caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
};

const navigateLightbox = direction => {
  currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentIndex];
  lightboxImg.src = item.dataset.src;
  lightboxCaption.textContent = item.dataset.caption;
};

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// --- Back to Top ---
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
