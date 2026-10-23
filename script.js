/* Adem Jlassi — portfolio behaviour. Vanilla, ~4 KB, no dependencies. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Tunis clock ---------------------------------------- */
  var clock = document.getElementById('clock');
  function tick() {
    if (!clock) return;
    var t = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Africa/Tunis', hour12: false,
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    clock.textContent = 'TUN ' + t;
  }
  tick();
  setInterval(tick, 1000);

  /* ---- mobile nav ----------------------------------------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- scroll reveal -------------------------------------- */
  var targets = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var group = en.target.parentElement;
        var siblings = group ? group.querySelectorAll(':scope > .reveal') : [];
        var i = Array.prototype.indexOf.call(siblings, en.target);
        en.target.style.transitionDelay = Math.min(Math.max(i, 0) * 55, 280) + 'ms';
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- active nav ----------------------------------------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---- copy e-mail ---------------------------------------- */
  var toast = document.getElementById('toast');
  var copyBtn = document.getElementById('copy');
  var toastTimer;

  function say(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('on'); }, 2200);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var mail = copyBtn.getAttribute('data-mail');
      var done = function () { say('copied — ' + mail); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(mail).then(done).catch(fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = mail;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:absolute;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); }
        catch (err) { say(mail); }
        document.body.removeChild(ta);
      }
    });
  }

  /* ---- header hairline on scroll -------------------------- */
  var bar = document.getElementById('topbar');
  var last = false;
  function onScroll() {
    var now = window.scrollY > 8;
    if (now !== last && bar) bar.style.borderBottomColor = now ? '#2b322e' : '';
    last = now;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
