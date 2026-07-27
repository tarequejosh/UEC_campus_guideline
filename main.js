// --- Interactive Map ---
import { initMap } from './map.js';

// --- Smooth Nav Scroll ---
document.querySelectorAll('.nav-link').forEach(link => {
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
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-link');

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
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });

// --- Mobile Menu Toggle ---
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
});

// --- Scroll Reveal ---
const revealElements = () => {
  const els = document.querySelectorAll('.step-card, .content-card, .gallery-item, .resource-link');
  els.forEach(el => {
    if (!el.classList.contains('fade-up')) {
      el.classList.add('fade-up');
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
};

// Init map and reveal after load
const onReady = () => {
  revealElements();
  initMap();
};

if (document.readyState === 'complete') {
  onReady();
} else {
  window.addEventListener('load', onReady);
}

// --- Lightbox with Prev/Next ---
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

// --- Back to Top Button ---
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
