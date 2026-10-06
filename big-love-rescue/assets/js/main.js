/* Big Love Rescue: site interactions (TechnoTaau Team) */
(function () {
  document.documentElement.classList.remove('no-js');

  // Sticky header shadow
  var header = document.querySelector('.site-header');
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Toast helper
  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }

  // Favourite buttons on dog cards
  document.querySelectorAll('.fav').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      toast(on ? 'Saved to your favorites ♥' : 'Removed from favorites');
    });
  });

  // Dog filters
  var filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        var shown = 0;
        document.querySelectorAll('.dog-grid [data-tags]').forEach(function (card) {
          var match = f === 'all' || card.getAttribute('data-tags').split(' ').indexOf(f) > -1;
          card.hidden = !match;
          if (match) shown++;
        });
        var count = document.querySelector('[data-count]');
        if (count) count.textContent = shown + (shown === 1 ? ' dog' : ' dogs');
      });
    });
  }

  // Donation amount picker
  var impacts = {
    25: 'helps cover <strong>dewormer and flea prevention</strong> for one foster dog.',
    50: 'helps cover a <strong>microchip and rabies vaccine</strong> for a new intake.',
    100: 'helps cover <strong>a round of puppy or adult booster shots</strong> plus exam fees.',
    250: 'goes toward <strong>spay/neuter surgery</strong>, one of our biggest costs.'
  };
  var amountBtns = document.querySelectorAll('.amount');
  var impactLine = document.querySelector('.impact-line');
  var freqBtns = document.querySelectorAll('.freq button');
  amountBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      amountBtns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      var v = btn.getAttribute('data-amount');
      if (impactLine) impactLine.innerHTML = '<strong>$' + v + '</strong> ' + impacts[v];
    });
  });
  freqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      freqBtns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
    });
  });
  var giveBtn = document.querySelector('[data-give]');
  if (giveBtn) {
    giveBtn.addEventListener('click', function (e) {
      var sel = document.querySelector('.amount[aria-pressed="true"]');
      var amt = sel ? sel.getAttribute('data-amount') : '';
      // PayPal.me accepts an amount suffix: paypal.me/name/50
      giveBtn.href = 'https://paypal.me/BigLoveRescueCypress' + (amt ? '/' + amt : '');
    });
  }

  // Copy-to-clipboard
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function () {
        btn.classList.add('copied');
        var old = btn.textContent;
        btn.textContent = 'Copied';
        toast('Copied: ' + text);
        setTimeout(function () { btn.classList.remove('copied'); btn.textContent = old; }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { toast(text); });
      } else {
        toast(text);
      }
    });
  });

  // Contact form: opens the visitor's email app with the message pre-filled
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = '[Website] ' + (d.get('topic') || 'Question') + ' from ' + (d.get('name') || 'a visitor');
      var body = (d.get('message') || '') + '\n\n' + (d.get('name') || '') + '\n' + (d.get('email') || '') + (d.get('phone') ? '\n' + d.get('phone') : '');
      window.location.href = 'mailto:blrescuetexas@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var status = form.querySelector('.form-status');
      if (status) status.textContent = 'Opening your email app.';
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
