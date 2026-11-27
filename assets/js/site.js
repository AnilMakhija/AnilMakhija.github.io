/* Progressive enhancement only: the site is fully readable and navigable without this file. */
(function () {
  var root = document.documentElement;

  /* Theme toggle (preference is a per-browser convenience; storage may be unavailable). */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    var sync = function () {
      var dark = root.dataset.theme !== 'light';
      themeBtn.setAttribute('aria-pressed', dark ? 'false' : 'true');
      themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#0a0a0f' : '#f7f7fa');
    };
    sync();
    themeBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('am-theme', next); } catch (e) { /* ignore */ }
      sync();
    });
  }

  /* Mobile menu. */
  var menuBtn = document.getElementById('menu-toggle');
  var links = document.getElementById('nav-links');
  if (menuBtn && links) {
    var setOpen = function (open) {
      links.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    menuBtn.addEventListener('click', function () {
      var open = !links.classList.contains('open');
      setOpen(open);
      /* The menu sits before the button in the DOM, so move focus into it for keyboard users. */
      if (open && menuBtn.matches(':focus-visible')) { var first = links.querySelector('a'); if (first) first.focus(); }
    });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { setOpen(false); menuBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('open') && !links.contains(e.target) && !menuBtn.contains(e.target)) setOpen(false);
    });
  }

  /* Highlight the current section in the nav (home page only). */
  var navAnchors = links ? links.querySelectorAll('a[href^="#"]') : [];
  if (navAnchors.length && 'IntersectionObserver' in window) {
    var map = {};
    navAnchors.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          navAnchors.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }
})();
