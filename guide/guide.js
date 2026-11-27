let currentLang = localStorage.getItem('anees_guide_lang') || 'ar';

document.addEventListener('DOMContentLoaded', () => {
  initLangSwitcher();
  initSearch();
  initLightbox();
  initFaq();
  initMobileNav();
  applyLang(currentLang);
});

function initLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      applyLang(lang);
    });
  });
}

function applyLang(lang) {
  if (!I18N[lang]) lang = 'ar';
  currentLang = lang;
  localStorage.setItem('anees_guide_lang', lang);

  const dict = I18N[lang];
  document.documentElement.setAttribute('dir', dict.dir);
  document.documentElement.setAttribute('lang', dict.lang);

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.step-card, .faq-item, .callout');

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

function initLightbox() {
  const overlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  if (!overlay || !modalImg) return;

  document.querySelectorAll('.shot-container').forEach(container => {
    container.addEventListener('click', () => {
      const img = container.querySelector('.shot-img');
      const caption = container.querySelector('.shot-caption');
      if (img) {
        modalImg.src = img.src;
        modalCaption.textContent = caption ? caption.textContent : '';
        overlay.classList.add('open');
      }
    });
  });

  const closeModal = () => overlay.classList.remove('open');
  modalClose?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
}

function initFaq() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      item.classList.toggle('open');
    });
  });
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });

  document.querySelectorAll('.nav-item a').forEach(a => {
    a.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
    });
  });
}
