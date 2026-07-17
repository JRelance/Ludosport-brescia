// ============================================
// LudoSport Brescia — script condiviso
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Menu mobile (overlay full-screen, icona hamburger -> X) ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    };
    const openMenu = () => {
      links.classList.add('open');
      toggle.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    toggle.addEventListener('click', () => {
      links.classList.contains('open') ? closeMenu() : openMenu();
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
  }

  // --- Segna il link di navigazione attivo in base alla pagina corrente ---
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  // --- Reveal on scroll ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // --- Filtro galleria (solo nella pagina galleria) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          const match = filter === 'tutti' || item.dataset.category === filter;
          item.style.display = match ? '' : 'none';
        });
      });
    });
  }

});
