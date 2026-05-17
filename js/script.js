const SVGS = {
  "ph-whatsapp-logo": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M20.52 3.48A11.79 11.79 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.6 5.97L0 24l6.33-1.66a11.84 11.84 0 005.72 1.46h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.17-1.23-6.15-3.43-8.43zm-8.47 18.3h-.01a9.9 9.9 0 01-5.05-1.39l-.36-.21-3.76.99 1-3.67-.24-.38a9.86 9.86 0 01-1.52-5.24C2.11 6.38 6.54 1.95 12.05 1.95c2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 012.9 7c0 5.51-4.43 9.93-9.9 9.93zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z\"/></svg>",
  "ph-list": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line></svg>",
  "ph-x": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line></svg>",
  "ph-arrow-left": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"></line><polyline points=\"12 19 5 12 12 5\"></polyline></svg>",
  "ph-arrow-right": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><polyline points=\"12 5 19 12 12 19\"></polyline></svg>",
  "ph-phone-call": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" class=\"ph-svg\"><path fill=\"currentColor\" d=\"M144.27 45.93a8 8 0 0 1 9.8-5.66a86.22 86.22 0 0 1 61.66 61.66a8 8 0 0 1-5.66 9.8a8.2 8.2 0 0 1-2.07.27a8 8 0 0 1-7.73-5.94a70.35 70.35 0 0 0-50.33-50.33a8 8 0 0 1-5.67-9.8m-2.33 41.8c13.79 3.68 22.65 12.54 26.33 26.33A8 8 0 0 0 176 120a8.2 8.2 0 0 0 2.07-.27a8 8 0 0 0 5.66-9.8c-5.12-19.16-18.5-32.54-37.66-37.66a8 8 0 1 0-4.13 15.46m81.94 95.35A56.26 56.26 0 0 1 168 232C88.6 232 24 167.4 24 88a56.26 56.26 0 0 1 48.92-55.88a16 16 0 0 1 16.62 9.52l21.12 47.15v.12a16 16 0 0 1-1.27 15.09c-.18.27-.37.52-.57.77L88 129.45c7.49 15.22 23.41 31 38.83 38.51l24.34-20.71a8 8 0 0 1 .75-5.66a16 16 0 0 1 15.17-1.4l.13.06l47.11 21.11a16 16 0 0 1 9.55 16.62m-15.88-2h-.11l-47-21.05l-24.35 20.71a8 8 0 0 1-.74.56a16 16 0 0 1-15.75 1.14c-18.73-9.05-37.4-27.58-46.46-46.11a16 16 0 0 1 1-15.7a6 6 0 0 1 .57-.77L96 95.15l-21-47a.6.6 0 0 1 0-.12A40.2 40.2 0 0 0 40 88a128.14 128.14 0 0 0 128 128a40.21 40.21 0 0 0 40-34.93Z\"/></svg>",
  "ph-phone": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" class=\"ph-svg\"><path fill=\"currentColor\" d=\"m222.37 158.46l-47.11-21.11l-.13-.06a16 16 0 0 0-15.17 1.4a8 8 0 0 0-.75.56l-34.87 160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16 16 0 0 0 1.32-15.06v-.12l-97.54 33.64a16 16 0 0 0-16.62-9.52A56.26 56.26 0 0 0 32 80c0 79.4 64.6 144 144 144a56.26 56.26 0 0 0 55.88-48.92a16 16 0 0 0-9.51-16.62M176 208a128.14 128.14 0 0 1-48 80a40.2 40.2 0 0 1 34.87-40a.6.6 0 0 0 0 .12l21 47l-20.67 24.74a6 6 0 0 0-.57.77a16 16 0 0 0-1-15.7c9.06 18.53 27.73 37.06 46.46 46.11a16 16 0 0 0 15.75-1.14a8 8 0 0 0 .74-.56L168.89 152l47 21.05h.11A40.21 40.21 0 0 1 176 208\"/></svg>",
  "ph-instagram-logo": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" class=\"ph-svg\"><path fill=\"currentColor\" d=\"M128 80a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32m48-136H80a56.06 56.06 0 0 0-56 56v96a56.06 56.06 0 0 0 56 56h96a56.06 56.06 0 0 0 56-56V80a56.06 56.06 0 0 0-56-56m40 152a40 40 0 0 1-40 40H80a40 40 0 0 1-40-40V80a40 40 0 0 1 40-40h96a40 40 0 0 1 40 40ZM192 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12\"/></svg>",
  "ph-facebook-logo": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" class=\"ph-svg\"><path fill=\"currentColor\" d=\"M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m8 191.63V152h24a8 8 0 0 0 0-16h-24v-24a16 16 0 0 1 16-16h16a8 8 0 0 0 0-16h-16a32 32 0 0 0-32 32v24H96a8 8 0 0 0 0 16h24v63.63a88 88 0 1 1 16 0\"/></svg>"
};
// js/script.js

// ─── PERFORMANCE UTILITIES (Batching DOM Reads/Writes) ──────────
const raf = (fn) => requestAnimationFrame(fn);

function measure(fn) {
  return fn(); // Read Phase
}

function mutate(fn) {
  raf(fn); // Write Phase
}

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL (Optimized with Ticking Pattern) ───────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let ticking = false;
    let isScrolled = window.scrollY > 50;
    
    if (isScrolled) navbar.classList.add('scrolled');

    window.addEventListener('scroll', () => {
      if (!ticking) {
        mutate(() => {
          const shouldBeScrolled = window.scrollY > 50;
          if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            navbar.classList.toggle('scrolled', isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── REVEAL ANIMATIONS ───────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── STAGGERED PRODUCT CARD REVEAL ───────────────────────────

  // Called after dynamic cards are injected into the DOM
  window.revealCards = function () {
    const cards = document.querySelectorAll('.product-card');
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = (parseInt(entry.target.dataset.index) || 0) * 90;
          setTimeout(() => {
            entry.target.classList.add('card-visible');
          }, delay);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    cards.forEach((card, i) => {
      card.dataset.index = i;
      cardObserver.observe(card);
    });
  };

  // ─── SKELETON LOADER ─────────────────────────────────────────
  window.showSkeletons = function (gridId, count = 6) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = Array.from({ length: count }, () => `
      <div class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-text">
          <div class="skeleton-line medium"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-line medium"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>
    `).join('');
  };

  // ─── SMOOTH SCROLL (Optimized to reduce layout shifts) ───────────
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const rawHref = this.getAttribute('href');
      if (!rawHref || rawHref === '#') return;

      let linkUrl;
      try {
        linkUrl = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (linkUrl.pathname !== window.location.pathname || !linkUrl.hash) return;
      const targetId = linkUrl.hash;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Use offsetTop for a cheaper layout query than getBoundingClientRect if possible
        // or just use scrollIntoView if no offset is needed. 
        // Here we keep the offset but wrap it in a cleaner scroll call.
        measure(() => {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          mutate(() => {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          });
        });

        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('mobile-open')) {
          navLinks.classList.remove('mobile-open');
          const mobileMenuBtn = document.getElementById('mobileMenuBtn');
          if (mobileMenuBtn) mobileMenuBtn.innerHTML = SVGS['ph-list'];
        }
      }
    });
  });

  // ─── MOBILE MENU ─────────────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenuBtn && navLinks) {
    const closeMobileMenu = () => {
      navLinks.classList.remove('mobile-open');
      mobileMenuBtn.innerHTML = SVGS['ph-list'];
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    };

    const setMobileMenu = (isOpen) => {
      navLinks.classList.toggle('mobile-open', isOpen);
      mobileMenuBtn.innerHTML = isOpen
        ? SVGS['ph-x']
        : SVGS['ph-list'];
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.addEventListener('click', () => {
      setMobileMenu(!navLinks.classList.contains('mobile-open'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (event) => {
      if (!navLinks.classList.contains('mobile-open')) return;
      const eventPath = typeof event.composedPath === 'function' ? event.composedPath() : [];
      if (
        eventPath.includes(mobileMenuBtn) ||
        eventPath.includes(navLinks) ||
        eventPath.includes(document.querySelector('.nav-container'))
      ) return;
      closeMobileMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) closeMobileMenu();
    });
  }

  // ─── HOMEPAGE: NEW ARRIVALS (Fixed Unique Selector) ──────────────────────────────────────────────
  const arrivalsTrack = document.getElementById('newArrivalsList');
  if (arrivalsTrack) {
    console.log('✅ New Arrivals track found:', arrivalsTrack);
    window.addEventListener('load', () => {
      const load = () => loadNewArrivals(arrivalsTrack);
      if ('requestIdleCallback' in window) {
        requestIdleCallback(load, { timeout: 2000 });
      } else {
        setTimeout(load, 200);
      }
    });
  }

  // ─── ARRIVALS SLIDER NAV ─────────────────────────────────────
  const btnPrev = document.getElementById('arrivalsPrev');
  const btnNext = document.getElementById('arrivalsNext');
  if (btnPrev && btnNext && arrivalsTrack) {
    const SCROLL_AMOUNT = 300;
    btnNext.addEventListener('click', () => {
      arrivalsTrack.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    });
    btnPrev.addEventListener('click', () => {
      arrivalsTrack.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    });
  }

  // ─── FILTER BUTTONS ──────────────────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.filter-options').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

});

function getSingleProductImage(product, fallback = 'images/cozy_bedroom.webp') {
  if (!product) return fallback;
  if (product.detailImage) return product.detailImage;
  if (product.cardImage) return product.cardImage;
  if (product.image) return product.image;
  if (product.photo) return product.photo;
  if (Array.isArray(product.images) && product.images.length) {
    const first = product.images[0];
    if (typeof first === 'string') return first;
    return first.detailImage || first.cardImage || first.image || fallback;
  }
  return fallback;
}

// ─── NEW ARRIVALS: Double-Safety Dynamic Loader ──────
async function loadNewArrivals(track) {
  try {
    let allProducts = [];
    
    // Attempt 1: Dynamic Live Data (Real-time)
    // Mobile-safe fetch options: explicit headers force cache bypass on iOS/Android
    const noCacheOpts = {
      cache: "no-store",
      headers: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' }
    };

    try {
      const response = await fetch(`/api/products?v=${Date.now()}`, noCacheOpts);
      if (response.ok) {
        allProducts = await response.json();
        console.log('✨ Live Products loaded via API:', allProducts.length);
      } else {
        throw new Error('API failed');
      }
    } catch (e) {
      console.warn('Live API failed, trying static fallback...');
      const response = await fetch(`/data/all-products.json?v=${Date.now()}`, noCacheOpts);
      if (!response.ok) throw new Error('Failed to fetch product data');
      allProducts = await response.json();
    }



    // Sort newest first (by createdAt)
    allProducts.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    // Take latest 8
    const newest = allProducts.slice(0, 8);

    if (!newest.length) {
      track.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 2rem;">Discovering our latest collections...</p>';
      return;
    }

    const fragment = document.createDocumentFragment();
    newest.forEach(product => {
      const productImage = getSingleProductImage(product);

      const card = document.createElement('a');
      card.className = 'arrival-card reveal-fade-up';
      card.href = `product.html?slug=${product.slug}`;
      card.setAttribute('aria-label', product.title);
      card.innerHTML = `
        <div class="arrival-img">
          <img decoding="async" width="600" height="800"
            src="${productImage}"
            alt="${product.title}"
            loading="lazy"
            onerror="this.src='https://placehold.co/480x600/f7f2ec/888480?text=CHC+Handlooms'"
          >
        </div>
        <div class="arrival-info">
          <span class="arrival-category">${product.category || 'Handmade'}</span>
          <h4>${product.title}</h4>
          <div class="price-row">
            <span class="arrival-price">₹${product.price}</span>
            <span class="arrival-id">#${product.id}</span>
          </div>
        </div>
      `;
      fragment.appendChild(card);
    });

    requestAnimationFrame(() => {
      track.innerHTML = '';
      track.appendChild(fragment);
      
      // Manually trigger the reveal for dynamic cards
      const newCards = track.querySelectorAll('.reveal-fade-up');
      newCards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('active');
        }, i * 100); // Staggered reveal
      });
    });

  } catch (err) {
    console.error('Dynamic New Arrivals load error:', err);
    track.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 2rem;">Stay tuned for our newest collections.</p>';
  }
}

// ─── COLLECTION PAGES: dynamic load (single-source via all-products.json) ──────
// Maps every possible filename → canonical category key stored in JSON
const PAGE_CATEGORY_MAP = {
  'bedsheets':            'bedsheets',
  'bedsheet':             'bedsheets',
  'bedsheetscollection':  'bedsheets',
  'bedsheetscollections': 'bedsheets',
  'curtains':             'curtains',
  'curtain':              'curtains',
  'curtaincollection':    'curtains',
  'curtaincollections':   'curtains',
  'blankets':             'blankets',
  'blanket':              'blankets',
  'blanketscollection':   'blankets',
  'blanketscollections':  'blankets',
  'comforters':           'comforters',
  'comforter':            'comforters',
  'comforterscollection': 'comforters',
  'comfortersandthrows':  'comforters',
  'comfortersthrow':      'comforters'
};

async function loadProducts() {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  try {
    // Derive page key: handle both '&' and '%26' and other symbols
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const pageKey = path.toLowerCase()
      .replace('.html', '')
      .replace(/%26/g, '') // handle encoded &
      .replace(/&/g, '')   // handle raw &
      .replace(/[^a-z]/g, '');

    let category = PAGE_CATEGORY_MAP[pageKey];

    // SMART FALLBACK: If mapping fails, try to guess from the filename
    if (!category) {
      if (pageKey.includes('bed'))     category = 'bedsheets';
      else if (pageKey.includes('curt')) category = 'curtains';
      else if (pageKey.includes('blanket'))  category = 'blankets';
      else if (pageKey.includes('comfort')) category = 'comforters';
    }

    console.log(`🔍 Page: ${path} -> Key: ${pageKey} -> Category: ${category}`);

    if (!category) {
      console.warn('No category mapping found for page:', pageKey);
      productsGrid.innerHTML = `<div class="empty-state"><p>Category not found.</p><a href="index.html#collections">View other categories</a></div>`;
      return;
    }

    // Try Dynamic API first, then fallback to static
    // Mobile-safe fetch options: explicit headers force cache bypass on iOS/Android
    const noCacheOpts = {
      cache: "no-store",
      headers: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' }
    };
    let allProducts = [];
    try {
      const res = await fetch(`/api/products?v=${Date.now()}`, noCacheOpts);
      if (res.ok) {
        allProducts = await res.json();
      } else {
        throw new Error('API failed');
      }
    } catch (e) {
      console.warn('Live API fallback to static...');
      const res = await fetch(`/data/all-products.json?v=${Date.now()}`, noCacheOpts);
      allProducts = await res.json();
    }

    // Strict lowercase filtering to prevent mismatch
    const products = allProducts.filter(p => 
      p.category && p.category.toLowerCase().trim() === category.toLowerCase()
    );
    
    console.log(`🎯 Products for "${category}":`, products.length);
    console.log(`📦 All products in JSON:`, allProducts.length);
    console.log(`🎯 Filtered products for "${category}":`, products.length);
    console.log(`🆔 Filtered IDs:`, products.map(p => p.id));

    if (!Array.isArray(products) || products.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-state">
          <p>No curated pieces found in this collection yet. <br> 
          <a href="index.html#collections">View other categories</a></p>
        </div>`;
      return;
    }

    // Show count
    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = `${products.length} piece${products.length !== 1 ? 's' : ''}`;

    // Wire sort select
    const sortSel = document.getElementById('sortSelect');
    if (sortSel) {
      sortSel.addEventListener('change', () => {
        renderProductCards(products, sortSel.value, productsGrid, category);
      });
    }

    renderProductCards(products, 'latest', productsGrid, category);

  } catch (error) {
    console.error('Collection Load Error:', error);
    productsGrid.innerHTML = '<p style="text-align:center;padding:3rem;">We encountered an error loading the collection. Please try again later.</p>';
  }
}

function renderProductCards(products, sortOrder, productsGrid, category) {
  const placeholder = 'https://placehold.co/600x800/f7f2ec/888480?text=CHC+Handlooms';
  const sorted = [...products];
  if (sortOrder === 'latest') {
    sorted.sort((a, b) => (parseInt(b.id) || 0) - (parseInt(a.id) || 0));
  } else if (sortOrder === 'price-low') {
    sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortOrder === 'price-high') {
    sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  const fragment = document.createDocumentFragment();

  sorted.forEach((product, i) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.index = i;

      const productImage = getSingleProductImage(product);

      // Safety check for category display
      const displayCategory = category ? (category.charAt(0).toUpperCase() + category.slice(1)) : 'Collection';

      card.innerHTML = `
        <div class="product-image" data-category="${displayCategory}">
          <a href="product.html?slug=${product.slug || ''}" aria-label="View ${product.title || 'Product'}">
            <img src="${productImage}"
                 alt="${product.title || ''}" width="600" height="800" 
                 loading="${i < 4 ? 'eager' : 'lazy'}" 
                 decoding="async">
          </a>
          <div class="product-image-overlay">
            <a href="product.html?slug=${product.slug}" class="product-overlay-btn">View Details</a>
          </div>
        </div>
        <div class="product-content">
          <span style="font-size: 0.7rem; color: var(--clr-text-light); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 0.4rem; display: block;">ID: #${product.id}</span>
          <h3><a href="product.html?slug=${product.slug}">${product.title}</a></h3>
          <p class="price">₹${product.price}</p>
          <p class="description">${product.description || 'A thoughtfully designed handcrafted piece for your home.'}</p>
          
          <div style="margin-top: auto;">
             <p><strong>Material:</strong> ${product.material || 'Premium Cotton'}</p>
             <p><strong>Sizes:</strong> ${product.sizes || 'Standard'}</p>
             <a href="https://wa.me/919818712020?text=${encodeURIComponent(`Hi, I'm interested in Product #${product.id} - ${product.title}`)}"
                target="_blank" class="whatsapp-btn">Enquire on WhatsApp</a>
          </div>
        </div>
      `;
      fragment.appendChild(card);
    });

    mutate(() => {
      productsGrid.innerHTML = '';
      productsGrid.appendChild(fragment);
      if (window.revealCards) window.revealCards();
    });
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productsGrid')) {
    loadProducts();
  }
});
