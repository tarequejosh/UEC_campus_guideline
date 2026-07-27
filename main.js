// map.js loaded dynamically on living.html only

// ========================================
// Dark Mode
// ========================================
const darkToggle = document.getElementById('darkToggle');
const htmlEl = document.documentElement;

const applyTheme = (isDark) => {
  htmlEl.classList.toggle('dark', isDark);
  htmlEl.classList.toggle('light', !isDark);
  localStorage.setItem('uec-theme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('uec-theme');
if (savedTheme === 'dark') {
  applyTheme(true);
} else if (savedTheme === 'light') {
  applyTheme(false);
} else {
  // OS preference — leave default (handled by @media prefers-color-scheme in CSS)
}

darkToggle?.addEventListener('click', () => {
  const isDark = htmlEl.classList.contains('dark');
  applyTheme(!isDark);
});

// ========================================
// Search Overlay + Search Index
// ========================================
const searchIndex = [
  // Before Arrival (home)
  { page: 'Home', title: 'Visa & COE', desc: 'Apply for student visa using Certificate of Eligibility', url: './#before-arrival' },
  { page: 'Home', title: 'Flight & Airport', desc: 'Booking flights to Narita or Haneda', url: './#before-arrival' },
  { page: 'Home', title: 'Airport to Chofu', desc: 'Directions from Haneda and Narita to Chofu', url: './#before-arrival' },
  { page: 'Home', title: 'Packing Checklist', desc: 'What to pack for studying at UEC', url: './#before-arrival' },
  { page: 'Home', title: 'SIM Card & Pocket WiFi', desc: 'Get internet before you arrive', url: './#before-arrival' },
  { page: 'Home', title: 'Accommodation', desc: 'International House dormitory and private apartments', url: './#before-arrival' },
  { page: 'Home', title: 'Essential Apps', desc: 'Apps to install before arriving in Japan', url: './#before-arrival' },
  { page: 'Home', title: 'COE', desc: 'Certificate of Eligibility', url: './#before-arrival' },
  // First Week (home)
  { page: 'Home', title: 'On-Campus Wi-Fi', desc: 'Connect to UEC-Wireless and eduroam', url: './#first-week' },
  { page: 'Home', title: 'Address Registration', desc: 'Register at Chofu City Hall within 14 days', url: './#first-week' },
  { page: 'Home', title: 'Health Insurance', desc: 'National Health Insurance and Pension Exemption', url: './#first-week' },
  { page: 'Home', title: 'Bank Account', desc: 'Open a Japan Post Bank account', url: './#first-week' },
  { page: 'Home', title: 'My Number', desc: '12-digit personal ID for taxes and healthcare', url: './#first-week' },
  { page: 'Home', title: 'IC Card (SUICA / PASMO)', desc: 'Get a transit IC card at Chofu Station', url: './#first-week' },
  { page: 'Home', title: 'International Student Office', desc: 'Visit UEC ISO for orientation and support', url: './#first-week' },
  { page: 'Home', title: 'Japanese Phone Number', desc: 'Get a SIM from Rakuten Mobile, IIJmio, etc.', url: './#first-week' },
  // Living
  { page: 'Living', title: 'Keio Line', desc: 'Train from Chofu to Shinjuku in 20 min', url: 'living.html#top' },
  { page: 'Living', title: 'Chofu Buses', desc: 'Local bus routes including Chofu City Mini Bus', url: 'living.html#top' },
  { page: 'Living', title: 'Bicycles', desc: 'Bike registration and used bike shops', url: 'living.html#top' },
  { page: 'Living', title: 'Seiyu', desc: '24/7 supermarket near UEC', url: 'living.html#top' },
  { page: 'Living', title: 'OK Super', desc: 'Budget grocery supermarket', url: 'living.html#top' },
  { page: 'Living', title: 'Gyomu Super', desc: 'Wholesale grocery with halal and bulk items', url: 'living.html#top' },
  { page: 'Living', title: 'Don Quijote', desc: 'Discount store open 24h', url: 'living.html#top' },
  { page: 'Living', title: 'Daiso', desc: '100-yen shop at PARCO', url: 'living.html#top' },
  { page: 'Living', title: 'PARCO Chofu', desc: 'Shopping mall with Daiso, Kaldi, and cinema', url: 'living.html#top' },
  { page: 'Living', title: 'Kaldi', desc: 'International foods and imported ingredients', url: 'living.html#top' },
  { page: 'Living', title: '7-Eleven', desc: 'Convenience store near International House', url: 'living.html#top' },
  { page: 'Living', title: 'Jindai-ji Temple', desc: 'Historic temple with beautiful gardens', url: 'living.html#top' },
  { page: 'Living', title: 'AEON Cinema', desc: 'Movie theater with student discounts', url: 'living.html#top' },
  { page: 'Living', title: 'Garbage Disposal', desc: 'Chofu garbage rules — red, blue, and transparent bags', url: 'living.html#top' },
  { page: 'Living', title: 'Mail & Packages', desc: 'Receiving packages and Amazon delivery in Chofu', url: 'living.html#top' },
  { page: 'Living', title: 'Internet Setup', desc: 'NURO, AsahiNet, pocket WiFi options', url: 'living.html#top' },
  { page: 'Living', title: 'Interactive Map', desc: 'Map of UEC, Chofu restaurants, and shops', url: 'living.html#top' },
  // Campus Life
  { page: 'Campus', title: 'UEC Cafeteria', desc: '100-yen breakfast and dietary labels', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Halal Food', desc: 'Halal chicken at Gyomu Super', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Vegetarian Food', desc: 'International ingredients at Kaldi', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'UEC Library', desc: 'Study spaces, computers, book borrowing', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Computer Labs', desc: 'Open-access computers and printing', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Sports & Gym', desc: 'Gymnasium, tennis courts, track field', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'UEC Health Center', desc: 'On-campus health consultations', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Mental Health Support', desc: 'Counseling services for international students', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Student Clubs', desc: '50+ clubs — sports, music, tech, culture', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'UEC Festival', desc: 'Biggest campus event in November', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Chofu Summer Festival', desc: 'Fireworks near Tama River in August', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Part-Time Jobs', desc: 'Work up to 28 hours/week as international student', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Career Center', desc: 'Resume reviews, interview practice, job fairs', url: 'campus-life.html#top' },
  { page: 'Campus', title: 'Japanese Language', desc: 'Free UEC Japanese courses, JLPT N2/N1', url: 'campus-life.html#top' },
  // Emergency
  { page: 'Emergency', title: 'Ambulance', desc: 'Call 119 for ambulance or fire', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Police', desc: 'Call 110 for police', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'UEC Health Center', desc: 'On-campus medical care', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Earthquake Safety', desc: 'Drop, Cover, and Hold On', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Typhoon Safety', desc: 'Typhoon season June–October', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Emergency Kit', desc: 'Water, food, flashlight, first aid', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Emergency Phrases', desc: 'Japanese phrases for emergencies', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Embassy Contacts', desc: 'USA, UK, Canada, Australia, India, China, Korea', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Lost Passport', desc: 'Contact your embassy immediately', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Lost Wallet', desc: 'Cancel cards, report to police (110)', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Sengawa Orthopedics', desc: 'English-speaking orthopedics clinic', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Sengawa ENT', desc: 'English-speaking ear, nose and throat clinic', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Evacuation Areas', desc: 'UEC East and West campus evacuation points', url: 'emergency.html#top' },
  { page: 'Emergency', title: 'Emergency Alerts', desc: 'Earthquake early warning and alert levels', url: 'emergency.html#top' },
];

const searchToggle = document.getElementById('searchToggle');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const heroSearch = document.getElementById('heroSearch');

const openSearch = () => {
  searchOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput?.focus(), 100);
};

const closeSearch = () => {
  searchOverlay.classList.remove('active');
  document.body.style.overflow = '';
  searchInput.value = '';
  searchResults.innerHTML = '';
};

const performSearch = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) {
    searchResults.innerHTML = '';
    return;
  }

  const results = searchIndex.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q) ||
    item.page.toLowerCase().includes(q)
  ).slice(0, 8);

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item" style="color:var(--gray-500);font-size:0.85rem;text-align:center;padding:1rem">No results found</div>';
    return;
  }

  searchResults.innerHTML = results.map(r => `
    <a href="${r.url}" class="search-result-item">
      <strong>${highlightMatch(r.title, q)}</strong>
      <span>${highlightMatch(r.desc, q)}</span>
      <span class="search-page">${r.page}</span>
    </a>
  `).join('');
};

const highlightMatch = (text, query) => {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return text;
  return text.slice(0, idx) + '<strong style="color:var(--accent);font-weight:700">' + text.slice(idx, idx + query.length) + '</strong>' + text.slice(idx + query.length);
};

searchToggle?.addEventListener('click', openSearch);

heroSearch?.addEventListener('focus', openSearch);

searchOverlay?.addEventListener('click', (e) => {
  if (e.target === searchOverlay) closeSearch();
});

searchInput?.addEventListener('input', (e) => performSearch(e.target.value));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
    closeSearch();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }
});

// ========================================
// Emergency FAB
// ========================================
const emergencyFab = document.getElementById('emergencyFab');
const emergencyPanel = document.getElementById('emergencyPanel');

emergencyFab?.addEventListener('click', () => {
  const isHidden = emergencyPanel.hasAttribute('hidden');
  emergencyPanel.toggleAttribute('hidden');
});

document.addEventListener('click', (e) => {
  if (emergencyPanel && !emergencyPanel.hasAttribute('hidden')) {
    if (!emergencyFab.contains(e.target) && !emergencyPanel.contains(e.target)) {
      emergencyPanel.toggleAttribute('hidden', true);
    }
  }
});

// ========================================
// Interactive Checklists (localStorage)
// ========================================
document.querySelectorAll('.checklist input[type="checkbox"]').forEach(cb => {
  const key = 'uec-checklist-' + cb.id;
  const saved = localStorage.getItem(key);
  if (saved === 'checked') {
    cb.checked = true;
  }
  cb.addEventListener('change', () => {
    localStorage.setItem(key, cb.checked ? 'checked' : '');
  });
});

// ========================================
// Mobile Menu
// ========================================
document.querySelector('.nav-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
});

// ========================================
// Unified Scroll Handler (RAF-backed)
// ========================================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const heroBg = document.querySelector('.hero-bg');

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 20);
      backToTop?.classList.toggle('visible', y > 500);
      if (heroBg && y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.3}px) scale(${1 + y * 0.0004})`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ========================================
// Cursor Glow (idle-aware, stops when mouse still)
// ========================================
const glow = document.getElementById('cursorGlow');
let glowX = -250, glowY = -250;
let targetX = -250, targetY = -250;
let glowTimer = null;
let glowRaf = null;

if (glow && window.innerWidth > 768) {
  const startGlow = () => {
    if (glowRaf) return;
    const animateGlow = () => {
      glowX += (targetX - glowX) * 0.08;
      glowY += (targetY - glowY) * 0.08;
      glow.style.transform = `translate(${glowX - 250}px, ${glowY - 250}px)`;
      glowRaf = requestAnimationFrame(animateGlow);
    };
    animateGlow();
  };

  const stopGlow = () => {
    if (glowRaf) {
      cancelAnimationFrame(glowRaf);
      glowRaf = null;
    }
  };

  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
    clearTimeout(glowTimer);
    startGlow();
    glowTimer = setTimeout(stopGlow, 2000);
  }, { passive: true });
}

// ========================================
// Lightbox
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

const openLightbox = index => {
  if (galleryItems.length === 0) return;
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

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => navigateLightbox(1));

lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// Scroll Reveal with Staggered Delays
// ========================================
const revealElements = () => {
  const cards = document.querySelectorAll(
    '.step-card, .content-card, .gallery-item, .resource-link, .info-card, .brand-card'
  );

  cards.forEach((el, i) => {
    el.classList.add('fade-up');
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

// ========================================
// Init
// ========================================
const scheduleIdle = (fn) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(fn, { timeout: 500 });
  } else {
    setTimeout(fn, 1);
  }
};

const onReady = () => {
  scheduleIdle(revealElements);
  if (document.getElementById('map-render')) {
    import('./map.js').then(m => m.initMap());
  }
};

if (document.readyState === 'complete') {
  onReady();
} else {
  window.addEventListener('load', onReady);
}

// Close mobile menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.remove('open');
  });
});
